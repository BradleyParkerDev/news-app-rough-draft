import axios from "axios";
const urlEndPoint = process.env.REACT_APP_BASE_URL;


const fetchUserData = async () => {

    try {

        console.log('fetching user data...');
        const response = await axios.get(`${urlEndPoint}/users/get-user`)
        const user = response.data.userData;
        console.log(user)
        return user


    } catch (error) {
        console.log(`Error fetching user data: ${error}`)

    }

}

export default fetchUserData;