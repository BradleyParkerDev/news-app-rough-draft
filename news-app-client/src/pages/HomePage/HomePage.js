import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { PreferencesContext } from '../../context/PreferencesContext';
import { UserContext } from '../../context/UserContext';

const HomePage = (props) =>{

    const { state: preferences } = useContext(PreferencesContext);
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    // Destructure news and weather from state
    const { news, weather, loadingWeather, loadingNews } = preferences;
    

    // Check if weather data has been loaded
    const weatherTemp = weather && weather.current ? weather.current.temp_f : 'Loading...';

    // Display loading message if weather data is still loading
    const weatherDisplay = loadingWeather ? 'Loading Weather...' : `Weather: ${weatherTemp} degrees Fahrenheit`;

	console.log(news)
    return (
        <div>
            <h1>{weatherDisplay}</h1>
            <h1>Latest News</h1>
            {loadingNews ? (
                <p>Loading News...</p>
            ) : (
                <ul>
                    {news.map((article, index) => (
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