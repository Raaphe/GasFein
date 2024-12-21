import { View, Text } from "react-native";
import { useAuth } from "../Providers/AuthProvider";


export const LogoutScreen = () => {
    const { authToken, loginUser, logoutUser, register } = useAuth();
    return (
        <View>
            <Text>Logging out...</Text>
        </View>
    );
};