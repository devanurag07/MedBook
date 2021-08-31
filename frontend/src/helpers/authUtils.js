import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const token = getUserToken();
    if (!token) {
        return false;
    }
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    }
    else {
        return true;
    }
}
/**
 * Returns the logged in user
 */
const getUserToken = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    return token && token != "undefined" ? token : null;
}
/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get("user");
    return user && user != "undefined" ? (typeof (user) == 'object' ? user : JSON.parse(user)) : null;
}

export { isUserAuthenticated, getLoggedInUser, getUserToken };