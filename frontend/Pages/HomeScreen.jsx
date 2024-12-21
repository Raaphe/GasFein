import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

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

// ---- Add your Ip buddy (Juste pour le dev tqt)
const Backend_IP = "192.168.0.0"
const Dropdown = ({ label, data, onSelect, selectedValue }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={styles.dropdownButtonText}>
                    {selectedValue || `Select ${label}`}
                </Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdownList}>
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.dropdownItem}
                                onPress={() => {
                                    onSelect(item);
                                    setIsOpen(false);
                                }}
                            >
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

export const HomeScreen = ({ navigation }) => {
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [stations, setStations] = useState([]);


    const handleProvinceSelect = (selectedProvince) => {
        setProvince(selectedProvince);
        setCity(null);
    };

    const fetchStations = async () => {
        try {
            //------------------------ Must add your Backend ip -------------------
            const res = await axios.get(`http://${Backend_IP}:3000/api/gas-prices/${province}/${city}`);
            setStations(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStations();
    }, [city]);

    const handleStationClick = (station) => {
        console.log('Station:', station);
        navigation.navigate("Station", { station })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Your Location</Text>

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
    dropdownContainer: {
        marginBottom: 15,
    },
    dropdownButton: {
        padding: 15,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: "#333",
    },
    dropdownList: {
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginTop: 5,
        maxHeight: 150,
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#333",
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
    stationAddress: {
        fontSize: 14,
        color: "#555",
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
