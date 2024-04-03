const setLocalStorageData = (dataType,data) =>{
    
    if(dataType === 'user'){
        const userString = JSON.stringify(data)
        localStorage.setItem('user',userString)
        return
    }
    if(dataType === 'news'){
        const newsString = JSON.stringify(data)
        localStorage.setItem('news',newsString)
        return
    }
    if(dataType === 'weather'){
        const weatherString = JSON.stringify(data)
        localStorage.setItem('weather',weatherString)
        return
    }
}

export default setLocalStorageData;