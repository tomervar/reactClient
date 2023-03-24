import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [ auth, setAuth, removeAuth ] = useLocalStorage('token', '' );
    return (
        <AuthContext.Provider value={{ auth, setAuth, removeAuth}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;