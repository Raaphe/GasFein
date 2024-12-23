import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {config} from "../util/Config/general.config";
import Dropdown from "../Components/Dropdown";

const provinces = [
    { label: "Ontario", value: "Ontario" },
    { label: "Quebec", value: "Quebec" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Alberta", value: "Alberta" },
];

const citiesByProvince = {
    Ontario: ["Toronto", "Ottawa", "Hamilton"],
    Quebec: ["Montreal", "Quebec City", "Gatineau"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey"],
    Alberta: ["Calgary", "Edmonton", "Red Deer"],
};

export const Gas = ({ navigation }) => {
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [stations, setStations] = useState([]);
    const { nearByStations } = useContext(GasStationsContext);
    const [otherPlace, setOtherPlace] = useState(false);
    const [text, setText] = useState("Nearby Gas Stations");

    const handleProvinceSelect = (selectedProvince) => {
        setProvince(selectedProvince);
        setCity(null);
    };

    const fetchStations = async () => {
        try {
            const res = await axios.get(`${config.BACKEND_IP}/api/v1/gas-prices/${province}/${city}`);
            setStations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setStations(nearByStations);
        }, [otherPlace])
      );
    useEffect(() => {
        fetchStations();
    }, [city]);

    const handleStationClick = (station) => {
        navigation.navigate("StationDetails", { station })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setOtherPlace(!otherPlace)}
            >
                <Text style={styles.toggleButtonText}>
                    {otherPlace ? "Hide Other Places" : "Show Other Places"}
                </Text>
            </TouchableOpacity>

            {otherPlace && (
                <>
                    <Dropdown
                        label="Province"
                        data={provinces.map((prov) => prov.label)}
                        onSelect={handleProvinceSelect}
                        selectedValue={province}
                    />

                    {province && (
                        <Dropdown
                            label="City"
                            data={citiesByProvince[province] || []}
                            onSelect={setCity}
                            selectedValue={city}
                        />
                    )}
                </>
            )}

            <ScrollView style={styles.scrollView}>
                {stations.length > 0 ? (
                    stations.map((station) => (
                        <TouchableOpacity
                            style={styles.stationCard}
                            onPress={() => handleStationClick(station)}
                        >
                            <Image
                                source={{ uri: station.image }}
                                style={styles.stationImage}
                                resizeMode="contain"
                            />
                            <View style={styles.stationInfo}>
                                <Text style={styles.stationName}>{station.station_name}</Text>
                                <Text style={styles.stationPrice}>{station.price}¢/L</Text>
                                <Text style={styles.stationLastUpdate}>
                                    Updated {station.last_update} ago
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noStationsText}>No Gas Stations available</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    toggleButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    },
    toggleButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    scrollView: {
        marginTop: 20,
    },
    stationCard: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stationImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    stationInfo: {
        flex: 1,
    },
    stationName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    stationPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#007BFF",
        marginBottom: 5,
    },
    stationLastUpdate: {
        fontSize: 12,
        color: "#888",
    },
    noStationsText: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
    },
});
