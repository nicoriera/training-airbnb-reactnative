import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";

const Map = ({ data }) => {
  return (
    <View style={styles.container_map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
        ></MapView.Marker>
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container_map: {
    flex: 1,
    marginTop: 25,
  },
  map: {
    width: "100%",
    height: 300,
  },
});
