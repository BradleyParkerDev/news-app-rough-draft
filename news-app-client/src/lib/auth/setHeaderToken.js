import axios from "axios"


export const setHeaderToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Authorization headers set!')
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }

}