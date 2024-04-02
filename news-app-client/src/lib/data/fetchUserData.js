import axios from "axios";
import getLocalStorageData from "./getLocalStorageData";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

const fetchUserData = async () => {
    try {
        console.log('Checking local storage...');
        let localUserData = getLocalStorageData('user');

        if (!localUserData) {
            console.log('Fetching user data from the server...');
            const response = await axios.get(`${urlEndPoint}/users/get-user`);
            const serverUserData = response.data.userData;
            console.log(serverUserData);
            return serverUserData;
        }

        console.log('Comparing local storage and server data...');
        const response = await axios.get(`${urlEndPoint}/users/get-user`);
        const serverUserData = response.data.userData;

        if (serverUserData.lastUpdated > localUserData.lastUpdated) {
            console.log('Server data is more recent, updating local storage...');
            // Update local storage data with server data
            // For example:
            // localStorage.setItem('user', JSON.stringify(serverUserData));
            return serverUserData;
        } else {
            console.log('Local storage data is up-to-date.');
            return localUserData;
        }
    } catch (error) {
        console.log(`Error fetching user data: ${error}`);
    }
};

export default fetchUserData;
