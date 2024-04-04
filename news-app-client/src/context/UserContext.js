// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { fetchUserData, setLocalStorageData, getLocalStorageData} from '../lib';
import { AuthContext } from './AuthContext';

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
    userLoading: true   
}

const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            setLocalStorageData('user',action.payload)
            return {...action.payload, userLoading: false}
        case 'FETCH_USER_DATA': 
            return {...action.payload, userLoading: false}     
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
        const setUserData = async () => {
            try {
                const user = await fetchUserData();
                if (user) {
                    dispatch({ type: 'FETCH_USER_DATA', payload: user });
                }                                       
    
            } catch (error) {
                console.error('Error setting user data:', error);
            }
        };
    
        setUserData();

        console.log(`isAuth: ${isAuth}`)

    }, [isAuth, accessToken]);
    

    return (
        <UserContext.Provider value={{state, dispatch }}>
        {children}
        </UserContext.Provider>
    );
};

