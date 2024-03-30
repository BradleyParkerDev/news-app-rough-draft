// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { fetchUserData, fetchAccessToken} from '../lib';
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
            return action.payload      
        case 'RESET_USER':
            return initalState;
        default:
            return state;
    }
}





export const UserProvider = ({ children }) => {
    const {state: authState, dispatch:authDispatch} = useContext(AuthContext)
    const {isAuth, accessToken} = authState;
    const [state,dispatch] = useReducer(userReducer,initalState)


    useEffect(() => {
        // const setUserData = async () => {
        //     try {
        //         // Fetch access token
        //         const token = await fetchAccessToken();
                
        //         // Now that we have the access token, fetch user data
        //         const user = await fetchUserData();
        //         console.log(user)
    
        //         // Update the user context with the fetched user data
        //         if (user) {
        //             dispatch({ type: 'FETCH_USER_DATA', payload: user });
        //         }
        //     } catch (error) {
        //         console.error('Error setting user data:', error);
        //         // You might want to handle errors here
        //     }
        // };
    
        // // Call the function to set user data
        // setUserData();

        console.log(state)
    }, []);
    

    return (
        <UserContext.Provider value={{state, dispatch }}>
        {children}
        </UserContext.Provider>
    );
};

