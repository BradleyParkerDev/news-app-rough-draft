import axios from "axios";
import { setHeaderToken } from "./setHeaderToken";
import { jwtDecode } from "jwt-decode";

const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const fetchAccessToken = async () => {
    try {

        let accessToken = localStorage.getItem('accessToken');
        const decoded = jwtDecode(accessToken);
        let refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken && !refreshToken) {
            console.log('Neither access token nor refresh token found in local storage.');
            return;
        }
        if (!accessToken) {
            console.log('Access token not found in local storage. Refreshing...');
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await axios.post(`${urlEndPoint}/users/refresh-access-token`, { refreshToken });
            let accessToken = response.data.accessToken;
        } else {
            console.log('Using access token from local storage.');
        }

        localStorage.setItem('accessToken', accessToken);

        setHeaderToken(accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
