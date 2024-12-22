import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useDarkMode } from "../Providers/DarkModeProvider";
import { lightTheme, darkTheme } from "../App";
import { useAuth } from "../Providers/AuthProvider";
import * as GasFeinApi from "../api/generated-client/src";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export const CarScreen = () => {
    const { isDarkTheme } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);
    const { authToken } = useAuth();
    const [cars, setCars] = useState([]);
    const CarClient = new GasFeinApi.CarsApi();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    useEffect(() => {
        const fetchCars = async () => {
            setIsLoading(true);
            let userId = await AsyncStorage.getItem("user_id");
            CarClient.usersUserIdCarsGet(userId, (err, data, response) => {
                setCars(response.body)
            })

            setIsLoading(false);
        }

        if (authToken) {
            fetchCars();
        }
    }, []);

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            {authToken ? (
                <>
                    <Text
                        variant="headlineLarge"
                        style={[styles.header, { color: theme.colors.text }]}
                    >
                        Your Cars
                    </Text>
                    {cars.length === 0 && (
                        <Text>You have no cars added 🙄...</Text>
                    )}
                    {cars.map((car) => (
                        <Card
                            key={car.id}
                            style={[styles.card, { backgroundColor: theme.colors.surface }]}
                        >
                            <Card.Title
                                title={`${car.make} ${car.model}`}
                                titleStyle={[styles.cardTitle, { color: theme.colors.text }]}
                                subtitle={`Year: ${car.year}`}
                                subtitleStyle={{ color: theme.colors.text }}
                            />
                            <Card.Content>
                                <Text style={[styles.cardText, { color: theme.colors.text }]}>
                                    Color: {car.color}
                                </Text>
                                <Text style={[styles.cardText, { color: theme.colors.text }]}>
                                    Fuel Type: {car.fuel_type}
                                </Text>
                                <Text style={[styles.cardText, { color: theme.colors.text }]}>
                                    Tank Volume: {car.tank_volume}L
                                </Text>
                            </Card.Content>
                        </Card>
                    ))}
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => navigation.navigate("AddCarScreen")}
                    >
                        Add Car
                    </Button>
                </>
            ) : (
                <Text
                    variant="headlineLarge"
                    style={[styles.header, { color: theme.colors.text }]}
                >
                    Please log in to view your cars.
                </Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 95,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    header: {
        marginBottom: 20,
        fontWeight: "bold",
    },
    card: {
        width: "90%",
        marginBottom: 15,
        borderRadius: 10,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 14,
        marginVertical: 2,
    },
    button: {
        marginTop: 20,
        width: "90%",
    },
});
