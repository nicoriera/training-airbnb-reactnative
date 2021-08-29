import React from "react";
import { Button, Text, View } from "react-native";

export default function AroundMe() {
  return (
    <View>
      <Text>Hello Around Me</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
