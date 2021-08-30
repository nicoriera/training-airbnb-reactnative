import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import axios from "axios";

const AroundMe = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around`
        );
        setData(response.data);
        // console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log("Location =>", location);
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        setError(true);

        setIsLoading(false);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : error ? (
    <Text>Permission denied</Text>
  ) : (
    <View style={styles.container_map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      ></MapView>
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
});
