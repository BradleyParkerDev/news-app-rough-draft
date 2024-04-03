import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { fetchAccessToken , loginUser, logoutUser, authCheck} from '../lib';
import { UserContext } from './UserContext';
import Cookies from 'universal-cookie';
export const AuthContext = createContext();

const initialState = {
    isAuth: false,
    accessToken: '',
    authLoading: true,
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
            return {...state,  accessToken: action.payload}

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(()=>{
        authCheck(dispatch);

    },[state.accessToken])


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
