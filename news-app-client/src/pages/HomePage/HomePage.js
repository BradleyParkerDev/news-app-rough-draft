import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // Assuming you will use useState and useEffect later
import { NewsContext } from '../../context/NewsContext';
import { UserContext } from '../../context/UserContext';
import GlimmerButton from '../../components/GlimmerButton/GlimmerButton';

const HomePage = (props) => {
    const { state: news } = useContext(NewsContext);
    const { topHeadlines, categories } = news;

    const renderArticles = (articles) => {
        return (
            <ul className='font-bold'>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url}>{article.title}</a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <GlimmerButton/>
            <h1>Top Headlines</h1>
            {topHeadlines.loadingTopHeadlines ? (
                <p>Loading Top Headlines...</p>
            ) : (
                renderArticles(topHeadlines.articles)
            )}

            <h1>Categories</h1>
            {Object.values(categories).map(category => (
                <div key={category.name}>
                    <h2>{category.name}</h2>
                    {category.loadingCategory ? (
                        <p>Loading {category.name} articles...</p>
                    ) : (
                        renderArticles(category.articles)
                    )}
                </div>
            ))}
        </div>
    );
};

export default HomePage;



