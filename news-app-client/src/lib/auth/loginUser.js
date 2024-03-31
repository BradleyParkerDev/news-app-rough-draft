import axios from "axios";
import { setHeaderToken } from "./setHeaderToken";
import { fetchUserData } from "../data/fetchUserData";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const loginUser = async (userData, userDispatch, authDispatch) => {
    console.log('logging user in...')

    try {
        const cookies = new Cookies();
        const response = await axios.post(`${urlEndPoint}/users/login`, {
            emailAddress: userData.emailAddress,
            password: userData.password
        });
        const { accessToken, refreshToken } = response.data; 
        
        cookies.set('refreshToken', refreshToken); 
        const decodedToken = jwtDecode(accessToken);

        // Calculate the expiration time in milliseconds
        const expirationTime = (decodedToken.exp - decodedToken.iat) * 1000;
        console.log(expirationTime)
        // Set the access token cookie with expiration time
        cookies.set('accessToken', accessToken, { expires: new Date(Date.now() + expirationTime) });



        
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
    }
};
