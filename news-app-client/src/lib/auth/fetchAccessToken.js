import axios from "axios";
import { fetchUserData } from "../data/fetchUserData";
import { setHeaderToken } from "./setHeaderToken";
const urlEndPoint = process.env.REACT_APP_BASE_URL

export const fetchAccessToken = async () => {

    console.log('refreshing access token...');
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${urlEndPoint}/users/refresh-access-token`, {refreshToken: refreshToken})
    const accessToken = response.data.accessToken
    setHeaderToken(accessToken)
    return accessToken

}