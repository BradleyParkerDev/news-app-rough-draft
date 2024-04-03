import axios from "axios";
import setDataInLocalStorage from "./setLocalStorageData";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

const updateUserData = async (userObj) => {
    try {
        console.log('Updating user data on the server....');
        const response = await axios.put(`${urlEndPoint}/users/update-user`, userObj);
        console.log(response);
    } catch (error) {
        console.log(`Error server failed to update: ${error}`);
        return error;
    }

    try {
        // After successful update, fetch the updated data from the server
        console.log('Fetching updated user data from the server...');
        const updatedResponse = await axios.get(`${urlEndPoint}/users/get-user`);
        const updatedUserData = updatedResponse.data.userData;

        console.log('Updating user data in local storage...');
        setDataInLocalStorage('user', updatedUserData);
    } catch (fetchError) {
        console.log(`Error fetching updated user data: ${fetchError}`);
    }
};

export default updateUserData;
