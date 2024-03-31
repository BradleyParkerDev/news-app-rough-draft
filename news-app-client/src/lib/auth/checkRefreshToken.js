import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";


export const checkRefreshToken = async () =>{
    const cookies = new Cookies();
    let refreshToken = cookies.get()

    if (!refreshToken) {
        console.log('Refresh token not found in cookies.');
        return null; // Return null if refresh token is not found
    }
    try {
        const decodedToken = jwtDecode(refreshToken);
        return decodedToken
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('Refresh token is expired.');
            // Handle token expiration as needed
        } else {
            console.error('Error decoding refresh token:', error);
        }
        return null; // Return null if decoding fails or token is expired    
    }


}