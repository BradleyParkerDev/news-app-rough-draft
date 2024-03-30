import styles from './UserPage.module.css';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { logoutUser, fetchAccessToken, fetchUserData, authCheck } from '../../lib';

const UserPage = (props) => {
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
    const {accessToken, isAuth, authLoading} = authState;
    const handleLogout = () => {
        logoutUser(); // Call the logout function
    };

    const handleFetchUserData = async() => {
        const userData = await fetchUserData(); // Call the function to fetch user data
        console.log(userData)
        userDispatch({type:'FETCH_USER_DATA', payload: userData})
    };

    const handleRefreshAccessToken = () => {
        fetchAccessToken(); // Call the function to refresh access token
    };

    
    return (
        <div>
            UserPage
            <br />
            <div className={styles.buttonContainerDiv}>
                <button onClick={handleLogout}>
                    Logout
                </button>
                <button onClick={handleFetchUserData}>
                    Fetch User Data
                </button>
                <button onClick={handleRefreshAccessToken}>
                    Refresh Access Token
                </button>
            </div>

            <LoginForm />
            <br />
            <RegistrationForm />
        </div>
    );
};

export default UserPage;
