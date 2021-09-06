import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

import Profil from "../components/Profil";
import Map from "../components/Map";

export default function RoomScreen({ route }) {
  const id = route.params.id;
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionVisible, setDescriptionVisible] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airbnb-api-nicolas-riera.herokuapp.com/rooms/${id}`
        );
        setData(response.data);
        console.log(response.data.location[0]);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
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
        <Map data={data} />
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
});
