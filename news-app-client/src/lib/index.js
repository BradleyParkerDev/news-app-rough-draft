// index.js

// Import functions from individual files
import { authCheck } from './auth/authCheck';
import { fetchAccessToken } from './auth/fetchAccessToken';
import { checkRefreshToken } from './auth/checkRefreshToken';
import { loginUser } from './auth/loginUser';
import { logoutUser } from './auth/logoutUser';
import { registerUser } from './auth/registerUser';
import { setHeaderToken } from './auth/setHeaderToken';
import { fetchUserData } from './data/fetchUserData';
import { fetchNews } from './data/fetchNews';
import { fetchWeather} from './data/fetchWeather';


// Export the functions
export {
  authCheck,
  fetchAccessToken,
  checkRefreshToken,
  loginUser,
  logoutUser,
  registerUser,
  setHeaderToken,
  fetchUserData,
  fetchNews,
  fetchWeather
};
