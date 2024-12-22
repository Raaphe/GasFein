import { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { GasApiApi } from "../api/generated-client/src";
import { ActivityIndicator } from "react-native-paper";
import { GasStationsContext } from "../Providers/GasStationProvider";
import { config } from "../util/Config/general.config";

export const MapScreen = () => {
  const gasApi = new GasApiApi();

  const [location, setLocation] = useState(null);
  const [tempGasStations, setTempGasStations] = useState([]);
  const [gasStations, setGasStations] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [destination, setDestination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setnearByStations, nearByStations } = useContext(GasStationsContext);


  const getUserPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        setIsLoading(false);
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      const geocode = await Location.reverseGeocodeAsync({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      if (geocode.length > 0) {
        let { city, region } = geocode[0];

        console.log(`${city}, ${region}`);

        const provinceMapping = {
          QC: "quebec",
          ON: "ontario",
          BC: "british columbia",
          AB: "alberta",
          MB: "manitoba",
          SK: "saskatchewan",
          NB: "new brunswick",
          NS: "nova scotia",
          PE: "prince edward island",
          NL: "newfoundland and labrador",
          NT: "northwest territories",
          NU: "nunavut",
          YT: "yukon",
        };

        const removeAccents = (str) => {
          return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        };

        const provinceName = provinceMapping[region]
          ? provinceMapping[region]
          : removeAccents(region);

        setLocation({
          city: removeAccents(city),
          province: provinceName,
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      }
    } catch (err) {
      setError("Error fetching location");
      console.error(err);
      setIsLoading(false);
    }
  };


  const getGasStations = async () => {
    console.log(location)
    if (location) {
      try {
        gasApi.gasPricesProvinceCityGet(location.province, location.city, (err, data, response) => {
          if (response) {
            setTempGasStations(response.body);
          }
        });
      } catch (err) {
        console.error("Error fetching gas stations:", err);
      }
    }
  };

  const getCoordinates = async () => {
    let tempListStations = [];
    const geocodePromises = tempGasStations.map((tempStation) => {
      const address = tempStation.address;

      return Location.geocodeAsync(address).then((response) => {
        if (response.length > 0) {
          tempStation["coordinates"] = {
            latitude: response[0].latitude,
            longitude: response[0].longitude,
          };
        } else {
          tempStation["coordinates"] = null;
        }

        tempListStations.push(tempStation);
      });
    });

    await Promise.all(geocodePromises);

    setGasStations(tempListStations);
    setIsLoading(false);
  };

  const fetchingRoute = async () => {
    try {
      if (destination) {
        const res = await axios.post(
          `${config.BACKEND_IP}/api/v1/directions/coordinates`,
          [location, destination]
        );
        setRouteCoordinates(res.data);
      }
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };

  const handleGasStationPress = (station) => {
    setDestination({
      latitude: station.coordinates.latitude,
      longitude: station.coordinates.longitude,
      address: station.address,
      station_name: station.station_name,
      price: station.price,
    });
  };

  const openGoogleMaps = () => {
    if (destination) {
      const { latitude, longitude } = destination;
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`).
        catch((err) => console.error("Error opening Google Maps:", err));
    }
  };

  const viewDetails = () => {
    console.log("View Details pressed");
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    if (location) {
      getGasStations();
    }
  }, [location]);

  useEffect(() => {
    if (tempGasStations.length > 0) {
      getCoordinates();
    }
  }, [tempGasStations]);

  useEffect(() => {
    if (destination) {
      fetchingRoute();
    }
  }, [destination]);

  useEffect(() => {
    if (gasStations.length > 0) {
      setnearByStations(gasStations);
    }
  }, [gasStations]);  

  if (isLoading || !location || gasStations.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ActivityIndicator animating={true} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >

        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
          />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates.map((coord) => ({
              latitude: coord[1],
              longitude: coord[0],
            }))}
            strokeColor="red"
            strokeWidth={3}
          />
        )}

        {gasStations.map((station, index) =>
          station.coordinates ? (
            <Marker
              key={index}
              coordinate={station.coordinates}
              title={station.station_name || "Gas Station"}
              description={station.address}
              onPress={() => handleGasStationPress(station)}
            />
          ) : null
        )}
      </MapView>

      {destination && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{destination.station_name}</Text>
          <Text style={styles.cardText}>Address: {destination.address}</Text>
          {destination.price && <Text style={styles.cardText}>Price: ${destination.price}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cardButton} onPress={openGoogleMaps}>
              <Text style={styles.cardButtonText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton} onPress={viewDetails}>
              <Text style={styles.cardButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  card: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    marginVertical: 5,
  },
  cardButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    flex: 1,
  },
  cardButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
