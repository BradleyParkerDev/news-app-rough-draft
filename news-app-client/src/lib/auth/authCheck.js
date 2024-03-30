import { fetchAccessToken } from "./fetchAccessToken";

export const authCheck = async () => {
    try {
        console.log('Running authCheck...');
        const accessToken = await fetchAccessToken();
        return accessToken
    } catch (error) {
        console.error('Error checking authentication:', error);
        return null

    }
};
