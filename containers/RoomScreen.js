import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";

import {
  ActivityIndicator,
  Dimensions,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

import Profil from "../components/Profil";

export default function RoomScreen({ route }) {
  const id = route.params.id;
  console.log(id);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionVisible, setDescriptionVisible] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.photo}
          source={{
            uri: data.photos[0].url,
          }}
        >
          <View style={styles.container_photo}>
            <Text style={styles.container_photo_price}>{data.price} €</Text>
          </View>
        </ImageBackground>
        <View style={styles.container_info}>
          <Profil item={data} />

          <TouchableOpacity
            onPress={() => {
              setDescriptionVisible(null);
            }}
          >
            <Text style={styles.description} numberOfLines={descriptionVisible}>
              {data.description}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_map}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container_photo: {
    height: 40,
    width: 80,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  photo: {
    height: 250,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  container_photo_price: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
  },
  container_info: {
    marginHorizontal: 15,
  },
  description: {
    fontSize: 13,
  },
  container_map: {
    flex: 1,
    marginTop: 25,
  },
  map: {
    width: "100%",
    height: 300,
  },
});
