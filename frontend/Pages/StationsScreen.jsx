import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { GasStationsContext } from "../Providers/GasStationProvider";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal } from "react-native";
import { config } from "../util/Config/general.config";
import Dropdown from "../Components/Dropdown";
import { Warning } from "../Components/Warning";
import { GasApiApi } from "../api/generated-client/src";

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
    const gasApi = new GasApiApi();
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [stations, setStations] = useState([]);
    const { nearByStations } = useContext(GasStationsContext);
    const [otherPlace, setOtherPlace] = useState(false);
    const [text, setText] = useState("Nearby Gas Stations");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalWarning, setModalWarning] = useState(false);
    const [sortOption, setSortOption] = useState({ type: 'name', order: 'desc' });

    const handleProvinceSelect = (selectedProvince) => {
        setProvince(selectedProvince);
        setCity(null);
    };

    const fetchStations = async () => {
        try {
            gasApi.gasPricesProvinceCityGet(province, city, (err, data, response) => {
                if (response) {
                    setStations(response.body);
                }
            });
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
        if (city && province) {
            fetchStations();
        }
    }, [city, province]);
    

    const handleStationClick = (station) => {
        navigation.navigate("StationDetails", { station });
    };

    const handleOtherPlace = () => {
        setModalWarning(true);
        setOtherPlace(!otherPlace);
    };

    const filterStations = () => {
        let filtered = [...stations];
        filtered.sort((a, b) => {
            if (sortOption.type === 'name') {
                return sortOption.order === 'asc'
                    ? a.station_name.localeCompare(b.station_name)
                    : b.station_name.localeCompare(a.station_name);
            } else if (sortOption.type === 'price') {
                return sortOption.order === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });
        return filtered;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>

            <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => handleOtherPlace()}
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
                    {modalWarning ? (
                        <Warning
                            visible={modalWarning}
                            onDismiss={() => setModalWarning(false)}
                        />
                    ) : (
                        <>
                            <Dropdown
                                label="Province"
                                data={provinces.map((prov, key) => prov.label)}
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
                                onPress={() => setSortOption({ type: 'name', order: sortOption.order === 'desc' ? 'asc' : 'desc' })}
                            >
                                <Text style={styles.filterOptionText}>{`Sort by Name (${sortOption.order === 'desc' ? 'asc' : 'desc'})`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.filterOption}
                                onPress={() => setSortOption({ type: 'price', order: sortOption.order === 'desc' ? 'asc' : 'desc' })}
                            >
                                <Text style={styles.filterOptionText}>{`Sort by Price (${sortOption.order === 'desc' ? 'asc' : 'desc'})`}</Text>
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
                    filterStations().map((station, index) => (
                        <TouchableOpacity
                            style={styles.stationCard}
                            onPress={() => handleStationClick(station)}
                            key={index}
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
        margin: 10,
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
