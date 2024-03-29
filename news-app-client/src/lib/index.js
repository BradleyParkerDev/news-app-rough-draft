// index.js

// Import functions from individual files
import { authCheck } from './auth/authCheck';
import { fetchAccessToken } from './auth/fetchAccessToken';
import { loginUser } from './auth/loginUser';
import { logoutUser } from './auth/logoutUser';
import { registerUser } from './auth/registerUser';
import { setHeaderToken } from './auth/setHeaderToken';
import { fetchUserData } from './data/fetchUserData';
import { fetchNews } from './data/fetchNews';


// Export the functions
export {
  authCheck,
  fetchAccessToken,
  loginUser,
  logoutUser,
  registerUser,
  setHeaderToken,
  fetchUserData,
  fetchNews
};
