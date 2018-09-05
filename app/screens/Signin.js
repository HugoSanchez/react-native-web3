import React from "react";
import { AsyncStorage, View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";


export default class Signin extends React.Component{

  state = {
    error: "",
    username: "",
    password: ""
  }

  signIn = () => {
    const { navigation } = this.props
    onSignIn({
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      if (res.success){
        AsyncStorage.setItem('user_token', res.token)
        navigation.navigate("SignedIn")
      } else {
        this.setState({ error: 'Unable to set user_token' })
      }
    });
  }

  render(){
    return(
      <View style={{ paddingVertical: 20 }}>
          <FormLabel>Username</FormLabel>
          <FormInput placeholder="Username..."
                     value={this.state.username}
                     onChangeText={(text) => this.setState({ username: text })}
                    />

          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry
                     placeholder="Password..."
                     value={this.state.password}
                     onChangeText={(text) => this.setState({ password: text })}
                    />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={() => { this.signIn() }}
          />
      </View>
    )
  }
}
