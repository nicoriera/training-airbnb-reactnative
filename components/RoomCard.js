import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const RoomCard = ({ item }) => {
  const navigation = useNavigation();
  const displayStars = (ratingValue) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        tab.push(<Ionicons key={i} name="ios-star" size={20} color="gold" />);
      } else {
        tab.push(<Ionicons key={i} name="ios-star" size={20} color="grey" />);
      }
    }
    return tab;
  };
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
        <View style={styles.container_profil}>
          <View style={styles.container_title}>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <View style={styles.container_rating}>
              <View style={styles.stars}>{displayStars(item.ratingValue)}</View>
              <Text style={styles.reviews}>{item.reviews} reviews</Text>
            </View>
          </View>
          <View style={styles.container_photo_profil}>
            <Image
              style={styles.photo_profil}
              source={{
                uri: item.user.account.photo.url,
              }}
            />
          </View>
        </View>
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
  container_profil: {
    flexDirection: "row",
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 2,
  },
  container_title: {
    width: "80%",
  },

  title: {
    fontSize: 18,
  },
  photo_profil: {
    height: 65,
    width: 65,
    borderRadius: 50,
    backgroundColor: "black",
  },
  container_rating: {
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  reviews: {
    color: "lightgrey",
    fontSize: 15,
  },
});
