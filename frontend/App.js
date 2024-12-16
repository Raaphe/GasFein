import "@/global.css";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext, ThemeProvider } from "./Providers/ThemeProvider";
import { useContext } from "react";

import { MapScreen } from "./Pages/MapScreen";
import { CarScreen } from "./Pages/CarScreen";
import { LoginScreen } from "./Pages/LoginScreen";
import { SettingsScreen } from "./Pages/SettingsScreen";
import { AuthContext, AuthProvider } from "./Providers/AuthProvider";
import { LogoutScreen } from "./Pages/LogoutScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);
    const { isAuth } = useContext(AuthContext);

    return (
        <Tab.Navigator
            id="tabs"
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: "#1E1E1E" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Car" component={CarScreen} />
            {!isAuth && <Tab.Screen name="Login" component={LoginScreen} />}
            <Tab.Screen
                name="Toggle"
                component={View}
                options={{
                    tabBarLabel: "Toggle",
                    tabBarButton: () => (
                        <TouchableOpacity
                            style={styles.toggleButton}
                            onPress={() => setDarkTheme(!isDarkTheme)}
                        >
                            <Text style={styles.toggleButtonText}>Toggle</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const DrawerNavigator = () => {
    const { isAuth } = useContext(AuthContext);

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} id="drawer">
            <Drawer.Screen
                name="Home"
                component={BottomTabs}
                options={{ drawerItemStyle: { display: "none" } }}
            />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            {isAuth && <Drawer.Screen name="Logout" component={LogoutScreen} />}
        </Drawer.Navigator>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <DrawerNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    toggleButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "transparent",
    },
    toggleButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
