import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from 'axios';
import { fetchNews, createNewsObject, setLocalStorageData} from "../lib";
export const NewsContext = createContext();

const categories = {
    business: {
        name: 'business',
        country: 'us',
        articles:[]
    },
    entertainment: {
        name: 'entertainment',
        country: 'us',
        articles:[]
    },
    general: {
        name: 'general',
        country: 'us',
        articles:[]
    },
    health: {
        name: 'health',
        country: 'us',
        articles:[]
    },
    science: {
        name: 'science',
        country: 'us',
        articles:[]
    },
    sports: {
        name: 'sports',
        country: 'us',
        articles:[]
    },
    technology: {
        name: 'technology',
        country: 'us',
        articles:[]
    }
};

const topHeadlines ={
    name: 'top-headlines',
    country: 'us',
    articles:[]
}
const query = {
    endpoint:'everything',
    startDate: '',
    endDate: '',
    country:'us',
    query: true,
    topic: ''
}

const initialState = {
    topHeadlines,
    categories,
    query,
    loadingNews: true
};

const newsReducer = (state, action) => {
    switch(action.type) {
        case 'GET_USER_news':
            return 
        case 'FETCH_TOP_HEADLINES':
            return
        case 'FETCH_NEWS_BY_CATEGORY':
            return
        case 'QUERY_NEWS_API':
            return
        default:
            return state;
    }
};

export const NewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(newsReducer, initialState);
    const {topHeadlines, categories, query} = state;
    const {business, entertainment, general, health, science, sports, technology } = categories;
    useEffect(() => {
        const fetchData = async () => {


        };

        fetchData();



    }, []);



    return (
        <NewsContext.Provider value={{ state, dispatch }}>
            {children}
        </NewsContext.Provider>
    );
};
