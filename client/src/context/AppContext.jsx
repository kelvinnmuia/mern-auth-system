import { createContext } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userDate, setUserData] = useState(false)
    
    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userDate, setUserData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}