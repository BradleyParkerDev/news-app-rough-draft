import React, { createContext, useReducer, useEffect, useRef } from 'react';
import {authCheck} from '../lib';
export const AuthContext = createContext();

const initialState = {
    isAuth: false,
    accessToken: '',
    authLoading: true,
    authCountdown: false,
    abortCountdown: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuth: action.payload,
                authLoading: false,
            };
        case 'SET_ACCESS_TOKEN':
            return {...state,  accessToken: action.payload};

        case 'SET_AUTH_COUNTDOWN':
            return {...state, authCountdown: action.payload};
        case 'ABORT_AUTH_COUNTDOWN':
            return {...state, abortCountdown: action.payload}

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if(state.accessToken  === '' && user ){
            authCheck(state, dispatch);
        }

    },[state.accessToken])


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
