import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <SafeAreaView>
      <ActivityIndicator size="small" color="#0000ff" />
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
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.container_photo}>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: `${item.photos[0].url}`,
                    }}
                  />
                  <Text style={styles.container_photo_price}>{item.price}</Text>
                </View>

                <Text>{item.title}</Text>
                <Text>{item.ratingValue}</Text>
                <Text>{item.reviews}</Text>
              </View>
            );
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
  container_photo: {},
  container_photo_price: { position: "absolute" },
  photo: {
    height: 200,
    width: 400,
  },
});
