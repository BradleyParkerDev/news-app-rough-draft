const getLocalStorageData = (dataType) =>{
    if(dataType==='user'){
        const user = localStorage.getItem('user');
        const userData = JSON.parse(user);
        console.log(userData); 
        return userData
    }

    if(dataType==='news'){
        const news = localStorage.getItem('news');
        const newsData = JSON.parse(news);
        console.log(newsData); 
        return newsData
    }

    if(dataType==='weather'){
        const weather = localStorage.getItem('weather');
        const weatherData = JSON.parse(weather);
        console.log(weatherData); 
        return weatherData
    }

}

export default getLocalStorageData;