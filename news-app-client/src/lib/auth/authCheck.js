import fetchAccessToken from "./fetchAccessToken";
import authCountdown from "./authCountdown";

const authCheck = async (state, dispatch) => {
    try {
        console.log(`Authentication check in progress...`)
        const accessToken = await fetchAccessToken()

        if(accessToken){
            dispatch({type:'SET_AUTHENTICATED',payload:true})
            dispatch({type:'SET_ACCESS_TOKEN',payload: accessToken})
        }
        authCountdown(state, dispatch, accessToken)
    } catch (error) {
        console.error('Error checking authentication:', error);
    }


};

export default authCheck;