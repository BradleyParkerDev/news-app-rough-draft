import { jwtDecode } from "jwt-decode";

const authCountdown = async (dispatch, accessToken) => {
  const decodedAccessToken = jwtDecode(accessToken);
  let accessTokenExp = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;

  // Function to update and display the countdown
  const updateCountdown = () => {
    accessTokenExp -= 1;
    let seconds = accessTokenExp / 1000
    if (Number.isInteger(seconds)){ // i want it to only show if seconds is a whole number
        console.log(`Access token expires in ${seconds} seconds`); // Output remaining milliseconds
    }
    
    if (accessTokenExp <= 0) {
      clearInterval(intervalId); // Stop the countdown when it reaches zero
      console.log('Access token expired!'); // Output 'Time up!' message
      dispatch({type:'SET_ACCESS_TOKEN', payload:''})
    }
  };

  // Start the countdown
  const intervalId = setInterval(updateCountdown, 1);
};

export default authCountdown;
