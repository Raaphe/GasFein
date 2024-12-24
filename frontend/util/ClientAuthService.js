import axios from "axios";
import * as GasFeinApi from "../api/generated-client/src";
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "./Config/general.config";

const userApi = new GasFeinApi.UsersApi();

export const login = async (loginInfo) => {


    try {

        console.log(loginInfo);
        
        const response = await axios.post(`${GasFeinApi.ApiClient.instance.basePath}/users/login`, {
            email: loginInfo.username,
            password: loginInfo.password
        });
    
        console.log(response);
        

        if (response.status === 200 && response.data.jwt && response.data.id) {
            const { jwt, id } = response.data;
            await AsyncStorage.setItem("jwt_token", jwt);
            await AsyncStorage.setItem("user_id", id.toString());
            console.log("User logged in successfully:", response.data);
            return response.data;
        }
    
        console.error("Unexpected response format:", response.data);
        throw new Error("Unexpected response format.");
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message || error);
        throw new Error("Failed to create user.");
    }
    

    let usersLoginPostRequest = new GasFeinApi.UsersLoginPostRequest();
    usersLoginPostRequest.email = loginInfo.username.trim();
    usersLoginPostRequest.password = loginInfo.password.trim();

    userApi.usersLoginPost(usersLoginPostRequest, async (error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            if (response.status === 200) {
                await AsyncStorage.setItem("jwt_token", response.body.jwt);
                await AsyncStorage.setItem("user_id", response.body.id.toString());
                
                return response.body.jwt;
            }

            throw new Error("Sign-in failed. Status not 200.");
        }
    });
};

export const signUp = async ({ password, firstName, lastName, email, imageId }) => {
    try {
        const response = await axios.post(`${GasFeinApi.ApiClient.instance.basePath}/users`, {
            firstName,
            lastName,
            email,
            password,
            profileImage: imageId,
        });
    
        if (response.status === 201 && response.data.jwt && response.data.id) {
            const { jwt, id } = response.data;
            await AsyncStorage.setItem("jwt_token", jwt);
            await AsyncStorage.setItem("user_id", id.toString());
            console.log("User created successfully:", response.data);
            return response.data;
        }
    
        console.error("Unexpected response format:", response.data);
        throw new Error("Unexpected response format.");
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message || error);
        throw new Error("Failed to create user.");
    }
    
};



export const logout = async () => {
    try {
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('user_id');
    } catch (e) {
        throw e;
    }
}

export const getToken  = async () => {
    try {
        return await AsyncStorage.getItem("jwt_token");
    } catch (e) {
        throw e;
    }
}

export const getUserId  = async () => {
    try {
        return await AsyncStorage.getItem("user_id");
    } catch (e) {
        throw e;
    }
}