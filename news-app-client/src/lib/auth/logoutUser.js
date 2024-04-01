import axios from "axios";
import Cookies from 'universal-cookie'

const logoutUser = (props) =>{
    const cookies = new Cookies();

    console.log('logging user out...');
    cookies.remove('refreshToken');
    cookies.remove('accessToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    alert('User logged out!')
    return(
        <div>

        </div>
    )

}

export default logoutUser;