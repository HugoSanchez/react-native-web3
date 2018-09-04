import React from "react";
import { View, Text } from "react-native";

export default class PlaidLogin extends React.Component{
  render(){
    return(
      <View style={{ paddingVertical: 100 }}>
        <Text> Plaid Login {this.props.screenProps.bananarama}</Text>
      </View>
    )
  }
};
