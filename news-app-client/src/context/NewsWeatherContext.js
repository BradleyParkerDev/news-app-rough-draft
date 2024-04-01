import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { fetchWeather, fetchNews, createNewsObject, setLocalStorageData} from "../lib";
export const NewsWeatherContext = createContext();

const initialState = {
    news: {
        topHeadlines:'',
        categories:'',

    },
    weather: {},
    location: 'chicago',
    user: {},
    loadingNews: true,
    loadingWeather: true
};

const newsWeatherReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USER_DATA':
            return { ...state, user: action.payload };
        case 'FETCH_NEWS':
            setLocalStorageData('news',action.payload)
            return { ...state, news: action.payload, loadingNews: false };
        case 'FETCH_WEATHER':
            setLocalStorageData('weather',action.payload)
            return { ...state, weather: action.payload, loadingWeather: false };
        default:
            return state;
    }
};

export const NewsWeatherProvider = ({ children }) => {
    const [state, dispatch] = useReducer(newsWeatherReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://newsapi.org/v2/everything?q=donald%20trump`
                const newsResponse = await fetchNews(url)
                console.log(newsResponse)
                dispatch({ type: 'FETCH_NEWS', payload: newsResponse});
            } catch (error) {
                console.error('Error fetching news:', error);
            }

            try {
                const weatherResponse = await fetchWeather(state.location);
                dispatch({ type: 'FETCH_WEATHER', payload: weatherResponse.data });

            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };
        const newsObj = createNewsObject();
        console.log(newsObj)
        fetchData();


        console.log(state)

    }, []);



    return (
        <NewsWeatherContext.Provider value={{ state, dispatch }}>
            {children}
        </NewsWeatherContext.Provider>
    );
};
