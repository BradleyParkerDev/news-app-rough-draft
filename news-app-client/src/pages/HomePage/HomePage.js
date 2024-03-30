import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { NewsWeatherContext } from '../../context/NewsWeatherContext';
import { UserContext } from '../../context/UserContext';




const HomePage = (props) =>{
    const { state: newsWeatherState } = useContext(NewsWeatherContext);
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    // Destructure news and weather from state
    const { news, weather, loadingWeather, loadingNews } = newsWeatherState;
    

    // Check if weather data has been loaded
    const weatherTemp = weather && weather.current ? weather.current.temp_f : 'Loading...';

    // Display loading message if weather data is still loading
    const weatherDisplay = loadingWeather ? 'Loading Weather...' : `Weather: ${weatherTemp} degrees Fahrenheit`;


    function Modal() {
        const [isOpen, setIsOpen] = useState(false);
      
        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);
      
        return (
          <div>
            <button onClick={openModal}>Open Modal</button>
            {isOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <p>This is a modal dialog.</p>
                </div>
              </div>
            )}
          </div>
        );
      }

    return (
        <div>
            <Modal/>
  
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