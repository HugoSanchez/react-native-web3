import React from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut, deletePlaidToken } from "../auth";

export default ({ navigation, screenProps }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card title={"John Doe"}>
      <View
        style={{
          backgroundColor: "#bcbec1",
          alignItems: "center",
          justifyContent: "center",
          width: 80,
          height: 80,
          borderRadius: 40,
          alignSelf: "center",
          marginBottom: 20
        }}
      >
        <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
      </View>
      <Button
        backgroundColor="#00006A"
        title="DELETE ACCOUNT"
        onPress={() => deletePlaidToken().then(res => {
          screenProps.handlePlaidSignUp(!!res)
          navigation.navigate("Home")
        })}
      />
      <Text></Text>
      <Button
        backgroundColor="#03A9F4"
        title="SIGN OUT"
        onPress={() => onSignOut().then(() => {
          screenProps.handleLogout(navigation)
        })}
      />
    </Card>
  </View>
);
