import React, { useContext } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../Providers/ThemeProvider";
import { Switch } from "react-native-paper";


export const DarkModeToggle = () => {
    const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);

    return (
      <View style={styles.toggleContainer}>
          <Text>{isDarkTheme ? "⚪" : "⚫"}</Text>
          <Switch value={isDarkTheme} onChange={() => setDarkTheme(!isDarkTheme)} />
      </View>
    );
}

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
});