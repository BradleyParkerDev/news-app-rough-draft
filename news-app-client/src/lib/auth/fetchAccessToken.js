import axios from "axios";
import { setHeaderToken } from "./setHeaderToken";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const urlEndPoint = process.env.REACT_APP_BASE_URL;

export const fetchAccessToken = async () => {
    try {
        const cookies = new Cookies();
        let accessToken = cookies.get('accessToken');
        let refreshToken = cookies.get('refreshToken');

        if (!accessToken && !refreshToken) {
            console.log('Neither access token nor refresh token found in cookies.');
            return;
        }

        if (!accessToken) {
            console.log('Access token not found in cookies. Refreshing...');
            const response = await axios.post(`${urlEndPoint}/users/refresh-access-token`, { refreshToken });
            accessToken = response.data.accessToken;

            if (!accessToken) {
                console.error('Error refreshing access token: Access token is null or undefined.');
                return;
            }

            const decodedToken = jwtDecode(accessToken);

            // Calculate the expiration time in milliseconds
            const expirationTime = (decodedToken.exp - decodedToken.iat) * 1000;
            console.log(expirationTime)
            // Set the access token cookie with expiration time
            cookies.set('accessToken', accessToken, { expires: new Date(Date.now() + expirationTime) });
        } else {
            console.log('Using access token from cookies.');
        }

        // Set the refresh token cookie if it exists
        if (refreshToken) {
            cookies.set('refreshToken', refreshToken);
        }

        setHeaderToken(accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error fetching/accessing access token:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
