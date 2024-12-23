import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card, Menu, Button, Divider } from "react-native-paper";
import { useDarkMode } from "../Providers/DarkModeProvider";
import { lightTheme, darkTheme } from "../App";
import axios from "axios";

export const AddCarScreen = () => {
    const { isDarkTheme } = useDarkMode();
    const [theme, setTheme] = useState(lightTheme);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedTrim, setSelectedTrim] = useState(null);

    const [years, setYears] = useState([...Array(30)].map((_, i) => 2024 - i));
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [colors, setColors] = useState([]);
    const [carResponse, setCarResponse] = useState(null);

    const [makeMenuVisible, setMakeMenuVisible] = useState(false);
    const [modelMenuVisible, setModelMenuVisible] = useState(false);
    const [trimMenuVisible, setTrimMenuVisible] = useState(false);

    useEffect(() => {
        setTheme(isDarkTheme ? darkTheme : lightTheme);
    }, [isDarkTheme]);

    const fetchMakes = async (year) => {
        try {
            const response = await axios.get(
                `https://api.vehicledatabases.com/ymm-specs/options/v2/make/${year}`,
                {
                    headers: {
                        'x-AuthKey': '6442738e4090497388e9076dbb3508af',
                    },
                }
            );

            setMakes(response.data.makes);
        } catch (error) {
            console.error("Error fetching makes:", error);
        }
    };

    const fetchModels = async (make) => {
        try {
            const response = await axios.get(
                `https://api.vehicledatabases.com/ymm-specs/options/v2/model/${selectedYear}/${make}`,
                {
                    headers: {
                        'x-AuthKey': '6442738e4090497388e9076dbb3508af',
                    },
                }
            );
            setModels(response.data.models || []);
        } catch (error) {
            console.error("Error fetching models:", error);
        }
    };

    const fetchTrims = async (model) => {
        try {
            const response = await axios.get(
                `https://api.vehicledatabases.com/ymm-specs/options/v2/trim/${selectedYear}/${selectedMake}/${model}`,
                {
                    headers: {
                        'x-AuthKey': '6442738e4090497388e9076dbb3508af',
                    },
                }
            );
            setTrims(response.data.trims || []);
        } catch (error) {
            console.error("Error fetching trims:", error);
        }
    };

    const fetchColors = async (trim) => {
        try {
            console.log("fetch colors")
            const response = await axios.get(
                `https://api.vehicledatabases.com/ymm-specs/${selectedYear}/${selectedMake}/${selectedModel}/${trim}`,
                {
                    headers: {
                        "Content-Encoding": "gzip",
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-AuthKey': 'e3518f4c3c5746b08b72229a0c077772',
                    },
                }
            );

            setCarResponse(response.data)
            setColors(getColors(response.data));
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
    };

    const addCar = async () => {
        try {
            console.log("add car")
            console.log(carResponse.data);
            console.log(carResponse.data.feature.colors);
        } catch (error) {
            console.error("Error fetching trims:", error);
        }
    };

    const getColors = (data) => {
        console.log("get Color")
        console.log(data);
        const result = [];

        // Function to process color strings and push RGB values
        const processColors = (colors) => {
            colors.forEach(colorObj => {
                console.log("INDIVIDUAL COLOR", colorObj);
                const [r, g, b] = colorObj.split(',').map(Number);
                result.push([r, g, b]);
            });
        };

        result.push([191, 191, 191]);

        // Check both feature.colors.exterior and basic.colors.exterior
        const featureColors = data?.data.feature?.colors?.exterior || [];
        const basicColors = data?.basic?.colors?.exterior || [];

        // Process both feature and basic colors
        processColors(featureColors);
        processColors(basicColors);

        console.log("color result", result)
        return result;
    };

    const onYearSelect = async (year) => {
        setSelectedYear(year);
        setMakes([]);
        setModels([]);
        setTrims([]);
        setColors([]);
        await fetchMakes(year);
    };

    const onMakeSelect = async (make) => {
        setSelectedMake(make);
        setModels([]);
        setTrims([]);
        setColors([]);
        await fetchModels(make);
    };

    const onModelSelect = async (model) => {
        setSelectedModel(model);
        setTrims([]);
        setColors([]);
        await fetchTrims(model);
    };

    const onTrimSelect = (trim) => {
        setSelectedTrim(trim);
        setColors([]);
        fetchColors(trim);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.header, { color: theme.colors.primary }]}>Select Your Vehicle</Text>

            {/* Year Dropdown */}
            <Card style={styles.card}>
                <Text style={styles.sectionHeader}>Select Year</Text>
                <FlatList
                    data={years}
                    keyExtractor={(item) => item.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                    renderItem={({ item }) => (
                        <Button
                            mode={selectedYear === item ? "contained" : "outlined"}
                            style={styles.button}
                            onPress={async () => await onYearSelect(item)}
                        >
                            {item}
                        </Button>
                    )}
                />
            </Card>

            {/* Make Dropdown */}
            {selectedYear && (
                <Card style={styles.card}>
                    <Text style={styles.sectionHeader}>Select Make</Text>
                    <Menu
                        visible={makeMenuVisible}
                        onDismiss={() => setMakeMenuVisible(false)}
                        anchor={
                            <Button
                                mode="outlined"
                                style={styles.dropdownButton}
                                onPress={() => setMakeMenuVisible(true)}
                            >
                                {selectedMake || "Choose Make"}
                            </Button>
                        }
                    >
                        {makes.map((make, index) => (
                            <Menu.Item
                                key={index}
                                onPress={async () => {
                                    await onMakeSelect(make);
                                    setMakeMenuVisible(false);
                                }}
                                title={make}
                            />
                        ))}
                    </Menu>
                </Card>
            )}

            {/* Model Dropdown */}
            {selectedMake && (
                <Card style={styles.card}>
                    <Text style={styles.sectionHeader}>Select Model</Text>
                    <Menu
                        visible={modelMenuVisible}
                        onDismiss={() => setModelMenuVisible(false)}
                        anchor={
                            <Button
                                mode="outlined"
                                style={styles.dropdownButton}
                                onPress={() => setModelMenuVisible(true)}
                            >
                                {selectedModel || "Choose Model"}
                            </Button>
                        }
                    >
                        {models.map((model, index) => (
                            <Menu.Item
                                key={index}
                                onPress={async () => {
                                    await onModelSelect(model);
                                    setModelMenuVisible(false);
                                }}
                                title={model}
                            />
                        ))}
                    </Menu>
                </Card>
            )}

            {/* Trim Dropdown */}
            {selectedModel && (
                <Card style={styles.card}>
                    <Text style={styles.sectionHeader}>Select Trim</Text>
                    <Menu
                        visible={trimMenuVisible}
                        onDismiss={() => setTrimMenuVisible(false)}
                        anchor={
                            <Button
                                mode="outlined"
                                style={styles.dropdownButton}
                                onPress={() => setTrimMenuVisible(true)}
                            >
                                {selectedTrim || "Choose Trim"}
                            </Button>
                        }
                    >
                        {trims.map((trim, index) => (
                            <Menu.Item
                                key={index}
                                onPress={() => {
                                    onTrimSelect(trim);
                                    setTrimMenuVisible(false);
                                }}
                                title={trim}
                            />
                        ))}
                    </Menu>
                </Card>
            )}

            {/* Colors */}
            {colors.length > 0 && (
                <Card style={styles.card}>
                    <Text style={styles.sectionHeader}>Select Color</Text>
                    <FlatList
                        data={[...colors, { color: "Other", rgb: [255, 255, 255] }]} // Add "Other" option
                        keyExtractor={(item) => item.color}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.colorBox, { backgroundColor: `rgb(${item.rgb.join(",")})` }]}
                                onPress={() => setSelectedColor(item.color === "Other" ? null : item.color)}
                            >
                                {item.color === "Other" && (
                                    <Text style={{ color: theme.colors.text }}>Other</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    />
                </Card>
            )}

            {/* Divider */}
            <Divider style={styles.divider} />

            {selectedTrim && (
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() => addCar()}
                >
                    Add Car
                </Button>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        marginVertical: 10,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    flatListContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        marginTop: 20,
        marginHorizontal: 8,
    },
    dropdownButton: {
        alignSelf: "center",
        width: "100%",
    },
    divider: {
        marginTop: 20,
    },
    colorBox: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});
