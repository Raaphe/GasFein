import { createContext, useContext, useState } from 'react';
import { useColorScheme } from "react-native";

export const DarkModeContext = createContext({});

export const DarkModeProvider = ({ children }) => {
    const [isDarkTheme, setDarkTheme] = useState(useColorScheme() === "dark");

    return (
        <DarkModeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export const useDarkMode = () => useContext(DarkModeContext);