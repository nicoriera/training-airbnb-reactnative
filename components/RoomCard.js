import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Profil from "../components/Profil";

const RoomCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Room", { id: item._id })}
    >
      <View>
        <View style={styles.container_photo}>
          <Image
            style={styles.photo}
            source={{
              uri: item.photos[0].url,
            }}
          />
          <Text style={styles.container_photo_price}>{item.price} €</Text>
        </View>
        <Profil item={item} />
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
