import React from 'react';
import {useDarkMode} from "../Providers/DarkModeProvider";
import {IconButton, MD3Colors} from "react-native-paper";

export const DarkModeToggle = () => {
    const { isDarkTheme, setDarkTheme } = useDarkMode();

    return (

        <IconButton
            style={{paddingBottom: 12, paddingLeft: 10}}
            icon={isDarkTheme ? "weather-sunny" : "moon-waning-crescent" }
            iconColor={isDarkTheme ? MD3Colors.secondary100 : MD3Colors.primary0}
            size={35}
            onPress={() => setDarkTheme(!isDarkTheme)}
        />
    );
}