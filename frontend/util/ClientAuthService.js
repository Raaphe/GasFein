import UsersApi from "../api/generated-client/src/api/UsersApi";
import AsyncStorage from "@react-native-async-storage/async-storage"

const userApi = new UsersApi();

export const login = async (username, password) => {
    try {
        const res = await userApi.usersLoginPost({
            email: username,
            password: password
        })
        console.log(request);
    
        await AsyncStorage.setItem("jwt_token", res.data);
        return res.data.jwt;
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
        });
        console.log(request);
    
        await AsyncStorage.setItem("jwt_token", res.data);
        return res.data.jwt;
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