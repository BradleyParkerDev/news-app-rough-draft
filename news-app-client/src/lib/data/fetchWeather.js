import axios from "axios";

const fetchWeather = async (location) =>{
    try {
        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${location}`);
        return weatherResponse
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

export default fetchWeather;