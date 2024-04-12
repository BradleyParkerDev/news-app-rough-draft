import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // Assuming you will use useState and useEffect later
import { NewsContext } from '../../context/NewsContext';
import { UserContext } from '../../context/UserContext';

const HomePage = (props) => {

    const { state: news } = useContext(NewsContext);
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    const { topHeadlines, query } = news;
    const { business, entertainment, general, health, science, sports, technology } = news.categories;

    const showTopHeadlines = () => {
        return (
            <div>
                <ul>
                    {topHeadlines.articles.map((article, index) => (
                        <li key={index}>
                            <a href={article.url}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <h1>Top Headlines</h1>
            {topHeadlines.loadingTopHeadlines ? (
                <p>Loading Top Headlines...</p>
            ) : (
                showTopHeadlines()
            )}
        </div>
    );
};

export default HomePage;
