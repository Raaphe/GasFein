import { View, Text } from "react-native";
import { useContext } from "react";
import {AuthContext} from "../Providers/AuthProvider";


export const LogoutScreen = () => {
    const { setIsAuth } = useContext(AuthContext);
    return (
        <View>
            <Text>Logging out...</Text>
            {setIsAuth(false)}
        </View>
    );
};