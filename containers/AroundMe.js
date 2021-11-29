import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import axios from "axios";

const AroundMe = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [coords, setCoords] = useState("");

  useEffect(() => {
    const askPermission = async () => {
      try {
        // Request permission to access GPS coordinates
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          // If authorized access
          // Retrieve GPS data (store this data in a state)
          const location = await Location.getCurrentPositionAsync({accuracy: 6,});
          console.log("Location =>", location);
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          // Request to retrieve ads
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);

          setIsLoading(false);
        } else {
          // Otherwise
          // Query to get all ads
          // Request to retrieve ads
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );

          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator style={styles.activity} size="large" color="red"/>
  ) : (
    <View style={styles.container_map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude || 48.856614,
        longitude: coords.longitude || 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation
      >
        {data.map((room, index) => {
          return (
            <MapView.Marker
              onPress={() => navigation.navigate("Room", { id: room._id })}
              key={room._id}
              coordinate={{
                latitude: room.location[0],
                longitude: room.location[1],
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default AroundMe;

const styles = StyleSheet.create({
  container_map: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  activity: {
      position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
