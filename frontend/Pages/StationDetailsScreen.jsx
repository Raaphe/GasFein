import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import VerticalSlider from "rn-vertical-slider";
import Svg, { Path } from "react-native-svg";

export const StationDetailsScreen = ({ route, navigation }) => {
    const { station } = route.params;
    const [gasCost, setGasCost] = useState({});
    const [values, setValues] = useState({});
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setCars([ 
            { make: "Tesla", model: "Model 3", tankVolume: 60, year: 2020, color: "black" },
            { make: "Ford", model: "Mustang", tankVolume: 50, year: 2021, color: "red" },
            { make: "Chevrolet", model: "Camaro", tankVolume: 65, year: 2022, color: "blue" },
            { make: "BMW", model: "X5", tankVolume: 70, year: 2023, color: "white" },
            { make: "Audi", model: "Q7", tankVolume: 75, year: 2021, color: "gray" },
            { make: "Mercedes-Benz", model: "E-Class", tankVolume: 70, year: 2020, color: "silver" },
            { make: "Porsche", model: "911", tankVolume: 60, year: 2022, color: "yellow" },
            { make: "Honda", model: "Civic", tankVolume: 50, year: 2019, color: "green" },
            { make: "Toyota", model: "Corolla", tankVolume: 55, year: 2021, color: "blue" },
            { make: "Nissan", model: "Altima", tankVolume: 60, year: 2020, color: "orange" },
        ]);
    }, []);

    useEffect(() => {
        const updatedGasCost = {};
        cars.forEach((car, index) => {
            const tempCost = ((car.tankVolume * ((100 - (values[index] || 50)) / 100)) * station.price) / 100;
            updatedGasCost[index] = Math.round((tempCost + Number.EPSILON) * 100) / 100;
        });
        setGasCost(updatedGasCost);
    }, [values, cars, station.price]);

    const handleSliderChange = (index, newValue) => {
        setValues(prevValues => ({ ...prevValues, [index]: newValue }));
    };

    const goToMapScreen = () => {
        navigation.navigate("Map",{station});
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.stationCard}>
                    <Image
                        source={{ uri: station.image }}
                        style={styles.stationCardImage}
                    />
                    <View style={styles.overlay} />
                    <Text style={styles.stationName}>{station.station_name}</Text>
                    <Text style={styles.stationAddress}>{station.address}</Text>
                    <Text style={styles.stationPrice}>{station.price}¢/L</Text>
                    <Text style={styles.stationLastUpdate}>
                        Updated {station.lastUpdate} ago
                    </Text>
                </View>

                {cars.map((car, index) => (
                    <View style={styles.carAndSliderSection} key={index}>
                        <View style={styles.carSection}>
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="60"
                                fill={car.color}
                                viewBox="0 0 16 16"
                                style={styles.carIcon}
                            >
                                <Path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                            </Svg>

                            <View style={styles.carDetails}>
                                <Text style={styles.carText}>{car.make} {car.model}</Text>
                                <Text style={styles.carText}>Tank: {car.tankVolume}L</Text>
                            </View>
                        </View>

                        <View style={styles.sliderSection}>
                            <VerticalSlider
                                value={values[index] || 0}
                                onChange={(newValue) => handleSliderChange(index, newValue)}
                                height={120}
                                width={90}
                                step={1}
                                min={0}
                                max={100}
                                minimumTrackTintColor="#2979FF"
                                maximumTrackTintColor="#D1D1D6"
                                showIndicator
                                renderIndicator={() => (
                                    <View style={styles.indicator}>
                                        <Text style={styles.indicatorText}>{values[index] || 50}%</Text>
                                    </View>
                                )}
                            />
                            <Text style={styles.costText}>Cost: ${gasCost[index] || 0}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.goButton} onPress={goToMapScreen}>
                <Text style={styles.goButtonText}>Go to Map</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 125,
        paddingBottom: 10,
    },
    stationCard: {
        width: "auto",
        height: "10%",
        borderRadius: 20,
        marginBottom: 30,
        overflow: "hidden",
        position: "relative",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    stationCardImage: {
        width: "100%",
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
    },
    stationName: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        position: "absolute",
        top: 40,
        left: 20,
    },
    stationAddress: {
        fontSize: 18,
        color: "#fff",
        marginVertical: 6,
        position: "absolute",
        top: 80,
        left: 20,
    },
    stationPrice: {
        fontSize: 24,
        color: "white",
        fontWeight: "700",
        marginVertical: 10,
        position: "absolute",
        top: 120,
        left: 20,
    },
    stationLastUpdate: {
        fontSize: 16,
        color: "#fff",
        marginTop: 8,
        position: "absolute",
        top: 160,
        left: 20,
    },
    carAndSliderSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    carSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    carIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    carDetails: {
        justifyContent: "center",
    },
    carText: {
        fontSize: 16,
        fontWeight: "500",
    },
    sliderSection: {
        flex: 2,
        alignItems: "flex-end",
    },
    costText: {
        fontSize: 18,
        marginTop: 10,
    },
    goButton: {
        position: "absolute",
        bottom: 20,
        left: "40%",
        backgroundColor: "#28A745",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 30,
        elevation: 5,
    },
    goButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    indicator: {
        borderRadius: 12,
        backgroundColor: "#2979FF",
        padding: 6,
    },
    indicatorText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
