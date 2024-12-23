import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { GasStationsContext } from "../Providers/GasStationProvider";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView, Modal, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { config } from "../util/Config/general.config";
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

export const StationsScreen = ({ navigation }) => {
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [stations, setStations] = useState([]);
    const { nearByStations } = useContext(GasStationsContext);
    const [otherPlace, setOtherPlace] = useState(false);
    const [text, setText] = useState("Nearby Gas Stations");
    const [modalVisible, setModalVisible] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState("name");
    const [sortOptionName, setSortOptionName] = useState('desc');
    const [searchTerm, setSearchTerm] = useState("");

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
        navigation.navigate("StationDetails", { station });
    };

    const filterStations = () => {
        let filtered = [...stations];
            filtered.sort((a, b) =>
                sortOptionName === "asc"
                    ? a.station_name.localeCompare(b.station_name)
                    : b.station_name.localeCompare(a.station_name)
            );
        return filtered;
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

            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.filterButtonText}>Filters</Text>
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Filter Stations</Text>

                        <View style={styles.filterOptions}>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => setSortOptionName(sortOptionName=='desc'?'asc':'desc')}
                            >
                                <Text style={styles.filterOptionText}>{`Filter by Name (${sortOptionName=='desc'?'asc':'desc'})`}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView style={styles.scrollView}>
                {filterStations().length > 0 ? (
                    filterStations().map((station) => (
                        <TouchableOpacity
                            style={styles.stationCard}
                            onPress={() => handleStationClick(station)}
                            key={station.id}
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
        marginTop: 100,
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
    filterButton: {
        backgroundColor: "#28a745",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
    },
    filterButtonText: {
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
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    filterOptions: {
        padding: 10,
    },
    filterOption: {
        padding: 5,
        backgroundColor: "#f0f0f0",
        marginVertical: 5,
        margin:10,
        borderRadius: 10,
    },
    filterOptionText: {
        fontSize: 16,
    },
    applyButton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    applyButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default StationsScreen;
