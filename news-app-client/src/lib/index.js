// index.js

import 	authCheck from './auth/authCheck';
import  fetchAccessToken  from './auth/fetchAccessToken';
import  checkRefreshToken  from './auth/checkRefreshToken';
import  loginUser  from './auth/loginUser';
import  logoutUser  from './auth/logoutUser';
import  registerUser  from './auth/registerUser';
import  setHeaderToken  from './auth/setHeaderToken';
import  fetchUserData  from './data/fetchUserData';
import  fetchNews  from './data/fetchNews';
import  fetchWeather from './data/fetchWeather';
import  setLocalStorageData from './data/setLocalStorageData';
import 	getLocalStorageData from './data/getLocalStorageData';
import createNewsObject from './data/createNewsObject';
import uploadImage from './data/uploadImage';

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
	fetchWeather,
	setLocalStorageData,
	getLocalStorageData,
	createNewsObject,
	uploadImage
	
};