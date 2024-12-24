import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { getToken, login, logout, signUp } from '../util/ClientAuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as GasFeinApi from "../api/generated-client/src";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        const initializeToken = async () => {
            const token = await getToken();
            setAuthToken(token ?? "");
        };

        initializeToken();
    }, []);

    useEffect(() => {
        const axiosInstance = axios.create();

        axiosInstance.interceptors.request.use(
            (config) => {
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
        let res = await login(loginInfo);
        let token = res.jwt;
        console.log("token", token);
        setAuthToken(token);
    };

    const logoutUser = async () => {
        setAuthToken(null);
        await logout();
    };

    const getUser = async () => {
        try {
            const id =  await AsyncStorage.getItem("user_id");
            console.log(`${GasFeinApi.ApiClient.instance.basePath}/users/${id}`);

            const response = await axios.get(`${GasFeinApi.ApiClient.instance.basePath}/users/${id}`);
            
            if (response.status === 200 && response.data) {
                return response.data;
            }
        
            console.error("Unexpected response format:", response.data);
            throw new Error("Unexpected response format.");
        } catch (error) {
            console.error("fetching error:", error.response?.data || error.message || error);
            throw new Error("Failed to fetch user.");
        }
    }

    const register = async ({ password, firstName, lastName, email, imageId }) => {
        try {
            const result = await signUp({ password, firstName, lastName, email, imageId });
            if (result?.jwt) {
                setAuthToken(result.jwt)
                return result.jwt;
            }
            throw new Error("Failed to create user.");
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, loginUser, logoutUser, register, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
