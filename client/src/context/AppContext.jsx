import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContent = createContext();

/**
 * AppContextProvider component provides the application context to its children.
 * 
 * This context includes authentication state, user data, and methods to retrieve
 * authentication and user data from the backend.
 * 
 * - `isLoggedin`: A boolean state indicating whether the user is logged in.
 * - `setIsLoggedin`: A function to update the `isLoggedin` state.
 * - `userData`: An object containing user-specific data.
 * - `setUserData`: A function to update the `userData` state.
 * - `getUserData`: A function to fetch user data from the backend.
 * 
 * The component uses an effect to check the authentication state when it mounts.
 * It fetches the authentication state from the backend and updates the state accordingly.
 * 
 * @param {Object} props - The component's props.
 * @returns {JSX.Element} A provider component that supplies the context value to its children.
 */

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false)

    /**
     * Retrieves the authentication state from the backend and updates the state accordingly.
     * 
     * It makes a GET request to the backend to check if the user is logged in.
     * If the response is successful, it sets the `isLoggedin` state to true and fetches the user data.
     * If the response is not successful, it displays an error message.
     * 
     * @returns {Promise<void>} A promise that resolves when the request is finished.
     */
    const getAuthState = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    
    /**
     * Retrieves the user data from the backend and updates the state accordingly.
     * 
     * It makes a GET request to the backend to fetch the user data.
     * If the response is successful, it sets the `userData` state to the user data.
     * If the response is not successful, it displays an error message.
     * 
     * @returns {Promise<void>} A promise that resolves when the request is finished.
     */
    const getUserData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(data.message)
        }
    }
    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    useEffect(()=>{
        getAuthState()
    },[])

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}