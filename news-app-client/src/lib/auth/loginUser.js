import axios from "axios";
import { setHeaderToken } from "./setHeaderToken";
import { fetchUserData } from "../data/fetchUserData";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const loginUser = async (userData, userDispatch, authDispatch) => {
    console.log('logging user in...')

    try {
        const response = await axios.post(`${urlEndPoint}/users/login`, {
            emailAddress: userData.emailAddress,
            password: userData.password
        });
        const { accessToken, refreshToken } = response.data; // Destructure tokens from response
        localStorage.setItem('refreshToken', refreshToken); // Store refresh token in localStorage

        if (accessToken) {
            setHeaderToken(accessToken);
            authDispatch({ type: 'SET_AUTHENTICATED', payload: true });
            authDispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
        } else {
            authDispatch({ type: 'SET_AUTHENTICATED', payload: false });
        }

        const user = await fetchUserData();

        if (user) {
            userDispatch({ type: 'FETCH_USER_DATA', payload: user });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        // Optionally handle error and provide feedback to the user
    }
};
