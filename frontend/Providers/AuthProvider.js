import React, {createContext, useEffect, useState} from 'react';
import {getToken, login, logout, signUp} from '../util/ClientAuthService';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken();
            if (token) {
                setAuthToken(token ?? "");
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

    const register = async ({password, firstName, lastName, email, imageId}) => {
        try {
            await signUp({password, firstName, lastName, email, imageId})
                .then(async result => {
                    await login(password, email);
                    return result;
                }).catch(error => {
                    console.log(error);
                    return "";
                });
        } catch (e) {
            console.log('error', e);
        }
    }

    return (
        <AuthContext.Provider value={{ authToken, loginUser, logoutUser, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => React.useContext(AuthContext);
