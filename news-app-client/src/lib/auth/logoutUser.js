import axios from "axios";

export const logoutUser = (props) =>{
    console.log('logging user out...')
    localStorage.removeItem('refreshToken')
    delete axios.defaults.headers.common['Authorization'];
    alert('User logged out!')
    return(
        <div>

        </div>
    )

}