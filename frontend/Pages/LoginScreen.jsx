import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, IconButton, Button, Modal, Portal } from 'react-native-paper';
import { useDarkMode } from "../Providers/DarkModeProvider";
import { darkTheme, lightTheme } from "../App";
import { useAuth } from "../Providers/AuthProvider";

export const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isDarkTheme } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);
    const { loginUser } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // Update theme dynamically when isDarkTheme changes
    useEffect(() => {
        setTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    const handleLogin = async () => {
        try {
            await loginUser({username, password});
        } catch (e) {
            setErrorMessage('Login failed. Please check your credentials and try again.');
            setModalVisible(true);
            console.error('Login error:', e);
        }
    };

    const handleSignUpRedirect = () => {
        navigation.navigate('Registration');
    };

    const hideModal = () => {
        setModalVisible(false);
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

            {/* Modal for displaying errors */}
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text variant="bodyLarge" style={styles.modalText}>
                        {errorMessage}
                    </Text>
                    <Button mode="contained" onPress={hideModal} style={styles.modalButton}>
                        Close
                    </Button>
                </Modal>
            </Portal>
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
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
        position: 'absolute',
        top: '30%', // Adjust the top position as needed
        left: '10%',
        right: '10%',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        alignSelf: 'center',
    },
});
