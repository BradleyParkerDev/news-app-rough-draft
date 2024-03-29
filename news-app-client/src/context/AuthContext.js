// AuthContext.js
import React, { createContext, useReducer,useEffect } from 'react';
import { authCheck } from '../lib';
import axios from 'axios';
const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext();

const initialState = {
    isAuth: false,
    accessToken: null,
    authLoading: true, 
};


const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuth: true,
                accessToken: action.payload.accessToken,
                authLoading: false,
            };
        case 'SET_CHECK':
            return{
                ...state,
                expireTime: action.payload.expireTime

            }
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);


    useEffect(()=>{

        console.log(state.accessToken)
        authCheck(state,dispatch)


    },[state])




    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
