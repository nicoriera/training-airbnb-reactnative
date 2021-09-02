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
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({});
          console.log("Location =>", location);
          setCoords({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          setData(response.data);
          // console.log(response.data);
          setIsLoading(false);
        } else {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );

          setData(response.data);
          // console.log(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container_map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          // latitude: coords.latitude
          // longitude: coords.longitude
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
                latitude: room.location[1],
                longitude: room.location[0],
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
});
