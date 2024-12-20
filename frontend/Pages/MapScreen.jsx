import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { config } from "../util/Config/general.config";


export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const destination = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  const getUserPosition = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const route = [
        { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
        { latitude: (userLocation.coords.latitude + destination.latitude) / 2, longitude: (userLocation.coords.longitude + destination.longitude) / 2 },
        destination,
      ];
      setRouteCoordinates(route);
    } catch (err) {
      setError("Error fetching location");
      console.error(err);
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  if (!location) {
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
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Your Location"
        />
        <Marker coordinate={destination} title="Destination" />
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="#FF0000"
          strokeWidth={3}
        />
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
