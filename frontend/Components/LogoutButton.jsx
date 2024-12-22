import { useAuth } from "../Providers/AuthProvider";
import {IconButton, MD3Colors} from "react-native-paper";
import React, {useEffect} from "react";
import {useDarkMode} from "../Providers/DarkModeProvider";
import {StyleSheet} from "react-native";

export const LogoutButton = () => {
    const { logoutUser } = useAuth();
    const { isDarkTheme } = useDarkMode();

    useEffect(() => {
        const logout = async () => {
            await logoutUser();
        }
        logout();
    }, []);

    return (
        <IconButton
            icon="door-open"
            size={40}
            style={{marginTop: 0}}
            iconColor={isDarkTheme ? MD3Colors.secondary100 : MD3Colors.primary0}
            onPress={async () => await logoutUser()}
        />
    );
};