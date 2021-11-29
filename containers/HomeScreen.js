import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
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
    <SafeAreaView>
      <ActivityIndicator size="small" color="red" />
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View style={styles.container_logo}>
        <Image
          style={styles.logo}
          source={require("../assets/logo_airbnb.png")}
        />
      </View>

      <View style={styles.container_rooms}>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return <RoomCard item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_logo: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 40,
    width: 40,
  },
  container_rooms: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  container_photo: {
    marginBottom: 20,
  },
  container_photo_price: {
    position: "absolute",

    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    bottom: 10,
    padding: 10,
  },
  photo: {
    height: 200,
    width: 400,
  },
  container_rating: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
});
