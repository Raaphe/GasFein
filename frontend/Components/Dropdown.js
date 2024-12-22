import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

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

const styles = StyleSheet.create({
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
});

export default Dropdown;
