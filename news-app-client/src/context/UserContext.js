// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { fetchUserData } from '../lib';
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
        // case 'FETCH_USER_DATA': 
        //     fetchUserData()
        //     return 
        // case 'UPDATE_USER':
        //     updateUser(action.payload)
        //     return state;       
        case 'RESET_USER':
            return initalState;
        default:
            return state;
    }
}






// const updateUser = async (accessToken,userData) =>{
//     try {
//         const response = await axios.put(`${urlEndPoint}/users/update-user`, userData)
//         console.log('Update: Success')            
//     } catch (error) {
//         console.error('Error updating user:', error);
//     }


// }



export const UserProvider = ({ children }) => {
    const {state: authState, dispatch:authDispatch} = useContext(AuthContext)
    const {isAuth, accessToken} = authState;
    const [state,dispatch] = useReducer(userReducer,initalState)

    const setUserData = async (userData) =>{

        dispatch({type: 'SET_USER_DATA', payload: userData})
        console.log('User data set!')
    }  

    return (
        <UserContext.Provider value={{state, dispatch, setUserData }}>
        {children}
        </UserContext.Provider>
    );
};

