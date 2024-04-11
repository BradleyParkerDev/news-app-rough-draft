const getLocalStorageData = (dataType) =>{
    if(dataType==='user'){
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        // console.log(userData); 
        return userData
    }

    if(dataType==='newsWeather'){
        const newsWeather = localStorage.getItem('newsWeather');
        const newsWeatherData = JSON.parse(newsWeather);
        console.log(newsWeatherData); 
        return newsWeatherData
    }


}

export default getLocalStorageData;