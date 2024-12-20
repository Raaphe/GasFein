import React, { createContext, useEffect, useState } from 'react';
import { getToken, logout, login, signUp } from '../util/ClientAuthService';
 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            if (token) {
                setAuthToken(token);
            }
        }
        checkAuth();
    }, [])

    const loginUser = async (username, password) => {
        const token = await login(username, password);
        setAuthToken(token);
    }

    const logoutUser = async ( ) => {
        setAuthToken(null);
        await logout();
    }

    const register = ({ password, firstName, lastName, email, imageId }) => {
        try {
            signUp({ password, firstName, lastName, email, imageId });
        } catch (e) {

        }
    }

    return (
        <AuthContext.Provider value={{ authToken, loginUser, logoutUser, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);
