import styles from './UserPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { logoutUser, fetchAccessToken, fetchUserData, authCheck } from '../../lib';
import { uploadImage } from '../../lib';
import maleUserImage from '../../assets/images/male_user_image_1.jpg';

const UserPage = (props) => {
    const { state: user, dispatch: userDispatch, setUserData } = useContext(UserContext);
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
    const { accessToken, isAuth, authLoading } = authState;
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState('');

    const handleLogout = () => {
        logoutUser();
    };

    const handleFetchUserData = async () => {
        const userData = await fetchUserData();
        userDispatch({ type: 'FETCH_USER_DATA', payload: userData });
    };

    const handleRefreshAccessToken = () => {
        fetchAccessToken();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleImageUpload = async () => {
        try {
            const uploadedUrl = await uploadImage(imageFile);
            console.log("Uploaded image URL: ", uploadedUrl);
            setImageUrl(uploadedUrl);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };
    
    return (
        <div>
            UserPage
            <br />
            <input type="file" accept="image/*" onChange={handleImageChange} />

            <img className={styles.imageSize} src={imageUrl || maleUserImage} alt="User Image" />

            <br />
            <div className={styles.buttonContainerDiv}>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleFetchUserData}>Fetch User Data</button>
                <button onClick={handleRefreshAccessToken}>Refresh Access Token</button>
                <button onClick={handleImageUpload}>Upload Image</button>
            </div>

            <LoginForm />
            <br />
            <RegistrationForm />
        </div>
    );
};

export default UserPage;
