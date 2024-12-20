import {Button, Text, View} from "react-native";
import {useContext, useState} from "react";
import {AuthContext} from "../Providers/AuthProvider";
import UsersApi from "../api/generated-client/src/api/UsersApi";

export const LoginScreen = () => {
    const { authToken, loginUser, logoutUser, register } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await loginUser();
        } catch (e) {
            console.log("error" + e);
        }
    }

    return (
        <View>
            <Text>Login Screen</Text>
            <Button color="red" title="Log In" onPress={() => handleLogin()} />
        </View>
    );
}