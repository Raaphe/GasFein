import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useDarkMode } from "../Providers/DarkModeProvider";
import { darkTheme, lightTheme } from "../App";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Providers/AuthProvider";
import { Regex } from '../Components/Regex';

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
        const validationResults = {
            firstNameValid: Regex.firstNameRegex.test(form.firstName.trim()),
            lastNameValid: Regex.lastNameRegex.test(form.lastName.trim()),
            emailValid: Regex.emailRegex.test(form.email.trim()),
            passwordValid: Regex.passwordRegex.test(form.password.trim()),
        };

        const errorMessages = [];
        if (!validationResults.firstNameValid) {
            errorMessages.push("First name must be between 2 and 30 letters.");
        }
        if (!validationResults.lastNameValid) {
            errorMessages.push("Last name must be between 2 and 30 letters.");
        }
        if (!validationResults.emailValid) {
            errorMessages.push("Email format is invalid.");
        }
        if (!validationResults.passwordValid) {
            errorMessages.push(
                "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
            );
        }

        if (form.password.trim() !== form.confirmPassword.trim()) {
            console.log(form.password, form.confirmPassword);
            
            errorMessages.push("Passwords do not match.");
        }

        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n"));
            return;
        }

        console.log("Registration successful!");
        try {
            await register({
                password: form.password.trim(),
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                imageId: "1",
            });
    
            alert("Registration successful!");
            nav.navigate("Home");
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
