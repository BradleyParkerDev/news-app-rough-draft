import axios from "axios"
const urlEndPoint = process.env.REACT_APP_BASE_URL;


export const fetchUserData = async () => {
    
    try {
        console.log('fetching user data...');
        const response = await axios.get(`${urlEndPoint}/users/get-user`)
        console.log(response.data)        
    } catch (error) {
        console.log(`Error fetching user data: ${error}`)
    }

}