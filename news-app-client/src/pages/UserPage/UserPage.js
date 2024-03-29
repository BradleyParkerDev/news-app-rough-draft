import styles from './UserPage.module.css';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { logoutUser, fetchAccessToken, fetchUserData } from '../../lib';

const UserPage = (props) => {

    const handleLogout = () => {
        logoutUser(); // Call the logout function
    };

    const handleFetchUserData = () => {
        fetchUserData(); // Call the function to fetch user data
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
