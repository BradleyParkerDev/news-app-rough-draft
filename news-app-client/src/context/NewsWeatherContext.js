import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';

export const NewsWeatherContext = createContext();

const initialState = {
    news: {},
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
            return { ...state, news: action.payload, loadingNews: false };
        case 'FETCH_WEATHER':
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
                const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=donald%20trump&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
                dispatch({ type: 'FETCH_NEWS', payload: newsResponse.data.articles });
            } catch (error) {
                console.error('Error fetching news:', error);
            }

            try {
                const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${state.location}`);
                dispatch({ type: 'FETCH_WEATHER', payload: weatherResponse.data });
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };

        fetchData();
    }, [state.location]);

    const getUserData = (userData) => {
        dispatch({ type: 'GET_USER_DATA', payload: userData });
    };

    return (
        <NewsWeatherContext.Provider value={{ state, getUserData }}>
            {children}
        </NewsWeatherContext.Provider>
    );
};
