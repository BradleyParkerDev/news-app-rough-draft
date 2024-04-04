import axios from "axios";
import setHeaderToken from "./setHeaderToken";
import Cookies from "universal-cookie";
import logoutUser from "./logoutUser";
import { jwtDecode } from "jwt-decode";

const urlEndPoint = process.env.REACT_APP_BASE_URL;

const fetchAccessToken = async () => {
    try {
        const cookies = new Cookies();
        let accessToken = cookies.get('accessToken');
        let refreshToken = cookies.get('refreshToken');


        if (!accessToken && !refreshToken) {
            console.log('Neither access token nor refresh token found in cookies.');
            localStorage.removeItem('user')
            return;
        }

        if (!accessToken) {
            console.log('Access token not found in cookies. Refreshing...');
            const response = await axios.post(`${urlEndPoint}/users/refresh-access-token`, { refreshToken });
            const{
                newRefreshToken,
                refreshTokenExpiration,
                accessToken,
                accessTokenExpiration
            } = response.data.tokens

            cookies.set('accessToken', accessToken, {expires: accessTokenExpiration});
            cookies.set('refreshToken', newRefreshToken, {expires: refreshTokenExpiration});



        } else {
            console.log('Using access token from cookies.');
        }


        setHeaderToken(accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error fetching/accessing access token:', error);
        if (error.response && error.response.status === 403) {
            console.log('Invalid refresh token. Logging out...');
            localStorage.removeItem('user')
        }
        throw error; // Re-throw the error to handle it in the calling function
    }
};

export default fetchAccessToken;
