import UsersApi from "../api/generated-client/src/api/UsersApi";
import AsyncStorage from "@react-native-async-storage/async-storage"

const userApi = new UsersApi();

export const login = async (username, password) => {
    try {
        const res = await userApi.usersLoginPost({
            email: username,
            password: password
        }, async (err, data, response) => {
            console.log(response);
            await AsyncStorage.setItem("jwt_token", data);
            return res.data.jwt;
        });

        return res;
    } catch (e) {
        throw e;
    }
}

export const signUp = async ({password, firstName, lastName, email, imageId}) => {
    try {
        const res = await userApi.usersPost({firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            profileImage: imageId
        }, async (err, data, response) => {
            console.log(response);
            await AsyncStorage.setItem("jwt_token", data);
            return res.data.jwt;
        });

        return res;
    } catch (e) {
        throw e;
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('jwt_token');
    } catch (e) {
        throw e;
    }
}

export const getToken  = async () => {
    try {
        await AsyncStorage.getItem("jwt_token");
    } catch (e) {
        throw e;
    }
}