import axios from "axios"


export const setHeaderToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Authorization headers set!')
        console.log(token)
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }

}