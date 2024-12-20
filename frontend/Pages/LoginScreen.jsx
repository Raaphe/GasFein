import {Button, Text, View} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider";

export const LoginScreen = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    return (
        <View>
            <Text>Login Screen</Text>
            <Button color="red" title="Log In" onPress={() => setIsAuth(true)} />
        </View>
    );
}