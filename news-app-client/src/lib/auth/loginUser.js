import axios from "axios";
import { setHeaderToken } from "./setHeaderToken";
import { fetchUserData } from "../data/fetchUserData";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const loginUser = async (userData, state, dispatch) => {
    console.log('logging user in...')

    try {
        const response = await axios.post(`${urlEndPoint}/users/login`, {
            emailAddress: userData.emailAddress,
            password: userData.password
        });

        // console.log(response);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        await dispatch({ type: 'LOGIN_SUCCESS', payload: { accessToken: response.data.accessToken } });
        setHeaderToken(response.data.accessToken)
        fetchUserData()
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};