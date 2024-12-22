import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from "react-native";

export const StationDetailsScreen = ({ route, navigation }) => {
    const { station } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.stationCard}>
                <Image
                    source={{ uri: station.image }}
                    style={styles.stationImage}
                    resizeMode="contain"
                />
                <View style={styles.stationInfo}>
                    <Text style={styles.stationName}>{station.station_name}</Text>
                    <Text style={styles.stationAddress}>{station.address}</Text>
                    <Text style={styles.stationPrice}>{station.price}¢/L</Text>
                    <Text style={styles.stationLastUpdate}>
                        Updated {station.last_update} ago
                    </Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
        marginTop: 70
    },
    stationCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 20,
        padding: 15,
    },
    stationImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    stationInfo: {
        marginTop: 15,
    },
    stationName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    stationAddress: {
        fontSize: 18,
        color: "#555",
        marginVertical: 5,
    },
    stationPrice: {
        fontSize: 20,
        color: "#e91e63",
        fontWeight: "bold",
    },
    stationLastUpdate: {
        fontSize: 16,
        color: "#888",
        marginTop: 10,
    },
    backButton: {
        marginTop: 30,
        backgroundColor: "#e91e63",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
})