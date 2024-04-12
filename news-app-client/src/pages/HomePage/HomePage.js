import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { NewsContext } from '../../context/NewsContext';
import { UserContext } from '../../context/UserContext';

const HomePage = (props) =>{

    const { state: news } = useContext(NewsContext);
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    const { topHeadlines, categories, loadingNews } = news;

	console.log(news)
    return (
        <div>
            <h1>Latest News</h1>
            {loadingNews ? (
                <p>Loading News...</p>
            ) : (
                <ul>
                    {topHeadlines.articles.map((article, index) => (
                        <li key={index}>
                            <a href={article.url}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default HomePage;