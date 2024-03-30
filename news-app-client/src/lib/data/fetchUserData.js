import axios from "axios";
import { authCheck } from "../auth/authCheck";
const urlEndPoint = process.env.REACT_APP_BASE_URL;


export const fetchUserData = async () => {

    try {

        console.log('fetching user data...');
        const response = await axios.get(`${urlEndPoint}/users/get-user`)
        const user = response.data.userData;
        console.log(user) 


    } catch (error) {
        console.log(`Error fetching user data: ${error}`)

    }

}