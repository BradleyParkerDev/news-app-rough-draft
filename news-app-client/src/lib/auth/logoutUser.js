import axios from "axios";

export const logoutUser = (props) =>{
    console.log('logging user out...')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common['Authorization'];
    alert('User logged out!')
    return(
        <div>

        </div>
    )

}