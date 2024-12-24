import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DarkModeProvider, useDarkMode } from "./Providers/DarkModeProvider";
import { createTheme, ThemeProvider } from "@shopify/restyle";
import { PaperProvider } from "react-native-paper";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

import { StationsScreen } from "./Pages/StationsScreen";
import { MapScreen } from "./Pages/MapScreen";
import { StationDetailsScreen } from "./Pages/StationDetailsScreen";
import { CarScreen } from "./Pages/CarScreen";
import { LoginScreen } from "./Pages/LoginScreen";
import { SettingsScreen } from "./Pages/SettingsScreen";
import { AuthProvider, useAuth } from "./Providers/AuthProvider";
import { LogoutButton } from "./Components/LogoutButton";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkModeToggle } from "./Components/DarkModeToggle";
import { createStackNavigator } from "@react-navigation/native/src/__stubs__/createStackNavigator";
import { RegistrationScreen } from "./Pages/RegistrationScreen";
import { AddCarScreen } from "./Pages/AddCarScreen";
import { GasStationsProvider } from "./Providers/GasStationProvider";
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';
  

// reanimated config
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
});

export const lightTheme = createTheme({
    colors: {
        background: '#ffffff',
        text: '#000000',
        primary: '#6200ee',
        secondary: '#534f4f',
        border: '#ccc',
        surface: '#ffffff',
        tabBarBackground: '#f8f8f8',
        drawerBackground: '#ffffff',
        drawerHeaderBackground: '#ccc',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 32,
    },
    typography: {
        title: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontSize: 16,
            fontWeight: 'normal',
        },
    },
});

export const darkTheme = createTheme({
    colors: {
        background: '#000000',
        text: '#ffffff',
        primary: '#6200ee',
        secondary: '#534f4f',
        border: '#ccc',
        surface: '#121212',
        tabBarBackground: '#333333',
        drawerBackground: '#121212',
        drawerHeaderBackground: '#333333',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 32,
    },
    typography: {
        title: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        body: {
            fontSize: 16,
            fontWeight: 'normal',
        },
    },
});

// Create the drawer and tab navigators
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Component with dynamic styles
const BottomTabs = () => {
    const { authToken } = useAuth();
    const { isDarkTheme } = useDarkMode();

    const tabScreens = [
        <Tab.Screen
            key="Map"
            name="Map"
            component={MapScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="map" size={size} color={color} />
                ),
            }}
        />,
        <Tab.Screen
            key="Car"
            name="Car"
            component={CarScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="car" size={size} color={color} />
                ),
            }}
        />,
        <Tab.Screen
            key="StationsScreen"
            name="Stations"
            component={StationsScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="list" size={size} color={color} />
                ),
            }}
        />,
    ];

    if (!authToken) {
        tabScreens.push(<Tab.Screen key="Login" name="Login" component={LoginScreen} />);
        tabScreens.push(
            <Tab.Screen
                key="Toggle"
                name="Toggle"
                component={DarkModeToggle}
                options={{
                    tabBarButton: () => <DarkModeToggle />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="moon" size={size} color={color} />
                    ),
                }}
            />
        );
    } else {
        tabScreens.push(
            <Tab.Screen
                key="Toggle"
                name="Toggle"
                component={DarkModeToggle}
                options={{
                    tabBarButton: () => <DarkModeToggle />,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="moon" size={size} color={color} />
                    ),
                }}
            />
        );
    }

    return (
        <Tab.Navigator
            key="tabKey"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: isDarkTheme
                        ? darkTheme.colors.tabBarBackground
                        : lightTheme.colors.tabBarBackground,
                },
                tabBarActiveTintColor: isDarkTheme
                    ? darkTheme.colors.text
                    : lightTheme.colors.text,
                tabBarInactiveTintColor: 'gray',
            }}
            id="tabs"
        >
            {tabScreens}
        </Tab.Navigator>
    );
};

const DrawerNavigator = () => {
    const { authToken } = useAuth();
    const { isDarkTheme, toggleDarkMode } = useDarkMode();

    const drawerScreens = [
        <Drawer.Screen key="Home" name="Home" component={BottomTabs} />,
        <Drawer.Screen
            key="DrawerMapKey"
            name="Map"
            component={MapScreen}
            options={{
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="map" size={size} color={color} />
                ),
            }}
        />,
        <Drawer.Screen key="Settings" name="Settings" component={SettingsScreen} />,
        <Drawer.Screen
            key="StationDetails"
            name="StationDetails"
            component={StationDetailsScreen}
            options={{
                title: "Station Details",
                headerTitle: "Station Details",
                drawerIcon: ({ color, size }) => (
                    <Ionicons name="ios-information-circle" size={size} color={color} />
                ),
            }}
        />,
    ];

    if (authToken) {
        drawerScreens.push(
            <Drawer.Screen
                key="Logout"
                name="Logout"
                component={LogoutButton}
                options={{
                    drawerItemStyle: {
                        backgroundColor: isDarkTheme
                            ? darkTheme.colors.drawerBackground
                            : lightTheme.colors.drawerBackground,
                    },
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="log-out" size={size} color={color} />
                    ),
                }}
            />
        );
        drawerScreens.push(
            <Drawer.Screen
                key="AddCarScreen"
                name="AddCarScreen"
                component={AddCarScreen}
                options={{
                    title: "Add Car",
                    headerTitle: "Add Car",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="car-sport" size={size} color={color} />
                    ),
                }}
            />
        );
    } else {
        drawerScreens.push(
            <Drawer.Screen
                key="Registration"
                name="Registration"
                component={RegistrationScreen}
            />
        );
    }

    return (
        <Drawer.Navigator
            key="drawerKey"
            id="drawer"
            screenOptions={{
                headerTransparent: true,
                drawerStyle: {
                    backgroundColor: isDarkTheme ? darkTheme.colors.drawerBackground : lightTheme.colors.drawerBackground,
                },
                drawerActiveTintColor: isDarkTheme ? darkTheme.colors.primary : lightTheme.colors.primary,
                drawerInactiveTintColor: isDarkTheme ? darkTheme.colors.text : lightTheme.colors.text,
                headerStyle: {
                    backgroundColor: isDarkTheme ? darkTheme.colors.drawerHeaderBackground : lightTheme.colors.drawerHeaderBackground,
                },
                headerTintColor: isDarkTheme ? darkTheme.colors.text : lightTheme.colors.text,
            }}
        >
            {drawerScreens}
        </Drawer.Navigator>
    );
};

export default function App() {
    const { isDarkTheme } = useDarkMode();
    return (
        <PaperProvider>
            <AuthProvider>
                <GasStationsProvider>
                    <DarkModeProvider>
                        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                            <NavigationContainer>
                                <DrawerNavigator />
                            </NavigationContainer>
                        </ThemeProvider>
                    </DarkModeProvider>
                </GasStationsProvider>
            </AuthProvider>
        </PaperProvider>
    );
}
