import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, IconButton, Button } from 'react-native-paper';
import { useDarkMode } from "../Providers/DarkModeProvider";
import { darkTheme, lightTheme } from "../App";
import {useAuth} from "../Providers/AuthProvider";

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isDarkTheme } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);
    const { authToken, loginUser, logoutUser, register } = useAuth();

    // Update theme dynamically when isDarkTheme changes
    useEffect(() => {
        setTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    const handleLogin = async () => {
        try {
            await loginUser({ username, password });
        } catch (e) {
            console.error('Login error:', e);
        }
    };

    const handleSignUpRedirect = () => {
        navigation.navigate('Registration'); // Assumes you have a "SignUp" screen in your navigation stack
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Text variant="headlineLarge" style={{ color: theme.colors.text }}>
                Login
            </Text>

            <TextInput
                textColor={theme.colors.text}
                mode="outlined"
                label="email"
                placeholder="Enter your Email"
                secureTextEntry
                value={username}
                onChangeText={setUsername}
                style={[
                    styles.input,
                    { backgroundColor: theme.colors.surface },
                ]}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        placeholder: theme.colors.text,
                    },
                }}
                outlineStyle={{
                    borderColor: theme.colors.primary,
                }}
            />
            <TextInput
                textColor={theme.colors.text}
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={[
                    styles.input,
                    { backgroundColor: theme.colors.surface },
                ]}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        placeholder: theme.colors.text,
                    },
                }}
                outlineStyle={{
                    borderColor: theme.colors.primary,
                }}
            />

            <IconButton
                icon="fingerprint"
                size={50}
                style={styles.iconButton}
                iconColor={theme.colors.primary}
                onPress={handleLogin}
            />

            <Button
                mode="text"
                onPress={handleSignUpRedirect}
                labelStyle={{ color: theme.colors.primary }}
            >
                Don't have an account? Sign Up
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '80%',
        marginBottom: 16,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    iconButton: {
        marginTop: 12,
    },
});
