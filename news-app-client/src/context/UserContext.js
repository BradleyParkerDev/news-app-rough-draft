// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
const urlEndPoint = process.env.REACT_APP_BASE_URL




export const UserContext = createContext();

const following = {
    categories:[],
    sources:[],
    countries:[]

}


const initalState = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '', 
    following: following,
    readLater: {},
    loadingUser: true   
}

const userReducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_USER_DATA': 
            fetchUserData(action.payload)
            return state
        case 'UPDATE_USER':
            updateUser(action.payload)
            return state;       
        case 'RESET_USER':
            return initalState;
        default:
            return state;
    }
}





const fetchUserData = async (accessToken) => {
    try {
        const response = await axios.get(`${urlEndPoint}/users/get-user`,{
            headers: {
                Authorization:`Bearer: ${accessToken}`
            }
        });

        console.log(response)
    } catch (error) {
        console.log('Error fetching user data: ', error)
        throw error; 
    }
}


const updateUser = async (accessToken,userData) =>{
    try {
        const response = await axios.put(`${urlEndPoint}/users/update-user`, userData)
        console.log('Update: Success')            
    } catch (error) {
        console.error('Error updating user:', error);
    }


}



export const UserProvider = ({ children }) => {
    const {state: authState, dispatch:authDispatch} = useContext(AuthContext)
    const {isAuth, accessToken} = authState;
    const [state,dispatch] = useReducer(userReducer,initalState)

    useEffect(()=>{

        if(isAuth){
            dispatch({type:'FETCH_USER', payload: accessToken})
        }
        console.log(accessToken)
        console.log('User Authenticated: ', isAuth)

    },[isAuth])

    console.log(state)



    return (
        <UserContext.Provider value={{state, dispatch }}>
        {children}
        </UserContext.Provider>
    );
};

