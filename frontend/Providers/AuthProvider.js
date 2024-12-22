import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { getToken, login, logout, signUp } from '../util/ClientAuthService';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const initializeToken = async () => {
            const token = await getToken();
            setAuthToken(token ?? "");
        };

        initializeToken();
    }, []);

    useEffect(() => {
        // Set up Axios interceptors
        const axiosInstance = axios.create();

        axiosInstance.interceptors.request.use(
            (config) => {
                // Add Authorization header if token exists
                if (authToken) {
                    config.headers.Authorization = `Bearer ${authToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Invalidate token and trigger logout
                    setAuthToken(null);
                    await logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Clean up interceptors if needed
        };
    }, [authToken]);

    const loginUser = async (loginInfo) => {
        await login(loginInfo);
        let token = await getToken();
        console.log("token", token);
        setAuthToken(token);
    };

    const logoutUser = async () => {
        setAuthToken(null);
        await logout();
    };

    const register = async ({ password, firstName, lastName, email, imageId }) => {
        try {
            const result = await signUp({ password, firstName, lastName, email, imageId });
            if (result.status === 201) {
                setAuthToken(result.body.jwt);
                return result;
            }
            throw new Error("Failed to create user.");
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, loginUser, logoutUser, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
