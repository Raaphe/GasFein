import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";


// ---- Add your Ip buddy (Juste pour le dev tqt)
const Backend_IP ="192.168.2.0"

export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [destination, setDestination] = useState({ address: "8855 Ch de Chambly" });
  const [isLoading, setIsLoading] = useState(true);

  const getUserPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (err) {
      setError("Error fetching location");
      console.error(err);
    }
  };

  const fetchingRoute = async () => {
    try {
      const res = await axios.post(
        //------------------------ Must add your Backend ip -------------------
        `http://${Backend_IP}:3000/api/directions/coordinates`, [location, destination]
      );
      setRouteCoordinates(res.data);
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    if (location) {
      fetchingRoute();
    }
  }, [location]);

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      setIsLoading(false);
    }
  }, [routeCoordinates]);

  if (!location || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
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
        <Marker coordinate={location} title="Your Location" />
        {routeCoordinates.length > 0 && (
          <Marker
            coordinate={{
              latitude: routeCoordinates[routeCoordinates.length - 1][1],
              longitude: routeCoordinates[routeCoordinates.length - 1][0],
            }}
            title="Destination"
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates.map(coord => ({
              latitude: coord[1],
              longitude: coord[0],
            }))}
            strokeColor="#FF0000"
            strokeWidth={3}
          />
        )}
      </MapView>
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
});
