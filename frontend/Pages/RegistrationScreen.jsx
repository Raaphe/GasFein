import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useDarkMode } from "../Providers/DarkModeProvider";
import { darkTheme, lightTheme } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Providers/AuthProvider";

export const RegistrationScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
    });
    const { isDarkTheme } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);
    const nav = useNavigation();
    const { authToken, loginUser, logoutUser, register } = useAuth();


    useEffect(() => {
        setTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    const handleInputChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleRegister = async () => {
        if (form.password.trim() !== form.confirmPassword.trim()) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await register({
                password: form.password.trim(),
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                imageId: "1",
            });
            console.log(res);
            alert("Registration successful!");
            nav.navigate("NextScreen"); // Redirect after success
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };
    const handleLoginRedirect = () => {
        nav.navigate("Login");
    };

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Text
                variant="headlineLarge"
                style={[styles.header, { color: theme.colors.text }]}
            >
                Create an Account
            </Text>

            <TextInput
                textColor={theme.colors.text}
                mode="outlined"
                label="First Name"
                placeholder="Enter your First Name"
                value={form.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
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
                label="Last Name"
                placeholder="Enter your Last Name"
                value={form.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
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
                label="Email"
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(value) => handleInputChange('email', value)}
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
                placeholder="Create a password"
                secureTextEntry
                value={form.password}
                onChangeText={(value) => handleInputChange('password', value)}
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
                label="Confirm Password"
                placeholder="Re-enter your password"
                secureTextEntry
                value={form.confirmPassword}
                onChangeText={(value) =>
                    handleInputChange('confirmPassword', value)
                }
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

            <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.button}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.onPrimary}
            >
                Register
            </Button>
            <Button
                mode="outlined"
                onPress={() => nav.goBack()}
                style={styles.button}
            >
                Cancel
            </Button>

            <Button
                mode="text"
                onPress={handleLoginRedirect}
                labelStyle={{ color: theme.colors.primary }}
            >
                Already have an account? Login
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '85%',
        marginBottom: 16,
        borderRadius: 8,
    },
    button: {
        width: '85%',
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 8,
    },
});
