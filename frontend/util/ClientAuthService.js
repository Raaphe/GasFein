import * as GasFeinApi from "../api/generated-client/src";
import AsyncStorage from "@react-native-async-storage/async-storage"

const userApi = new GasFeinApi.UsersApi();

export const login = async (loginInfo) => {
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
        console.log("Creating new user...");
        const result = await userApi.usersPost({
            firstName,
            lastName,
            email,
            password,
            profileImage: imageId,
        });
        console.log(result);
        
        if (result.status === 201) {
            await AsyncStorage.setItem("jwt_token", result.body.jwt);
            await AsyncStorage.setItem("user_id", result.body.id.toString());
            return result;
        }

        throw new Error("Sign-up failed. Status not 201.");
    } catch (e) {
        console.error("Sign-up error:", e);
        throw e;
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