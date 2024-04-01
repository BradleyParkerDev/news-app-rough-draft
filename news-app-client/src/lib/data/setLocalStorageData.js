const setDataInLocalStorage = (dataType,data) =>{
    
    if(dataType === 'user'){
        const userString = JSON.stringify(data)
        localStorage.setItem('user',userString)
    }


}

export default setDataInLocalStorage;