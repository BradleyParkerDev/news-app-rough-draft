// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { fetchUserData, fetchAccessToken, setLocalStorageData, getLocalStorageData} from '../lib';
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
    readLater: [],
    loadingUser: true   
}

const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            setLocalStorageData('user',action.payload)
            return action.payload
        case 'FETCH_USER_DATA': 
            return action.payload      
        case 'RESET_USER':
            return initalState;
        default:
            return state;
    }
}





export const UserProvider = ({ children }) => {
    const {state: authState, dispatch:authDispatch} = useContext(AuthContext)
    const [state,dispatch] = useReducer(userReducer,initalState)


    useEffect(() => {
        const setUserData = async () => {
            try {
                const accessToken = await fetchAccessToken();

                if(accessToken) {
                    const user = await fetchUserData();
                    console.log(user) 

                    if (user) {
                        dispatch({ type: 'FETCH_USER_DATA', payload: user });
                    }                                       
                }
    
            } catch (error) {
                console.error('Error setting user data:', error);
            }
        };
    
        setUserData();

        console.log(state)
    }, []);
    

    return (
        <UserContext.Provider value={{state, dispatch }}>
        {children}
        </UserContext.Provider>
    );
};

