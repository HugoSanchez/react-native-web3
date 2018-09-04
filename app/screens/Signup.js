import React from "react";
import { View, Text } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignUp } from "../auth";

export default class Signup extends React.Component{
  state = {
    error: "",
    username: "",
    password: "",
    confirmPass: ""
  }

  signUp = () => {
    const { navigation } = this.props
    if (this.state.password == this.state.confirmPass){
      onSignUp({
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        if (res.success) {
          navigation.navigate('SignIn')
        } else {
          null
        }
      });
    } else {
      this.setState({ error: 'Passwords should be the same!'})
    }
  }

  render(){
    const { navigation } = this.props
    return(
      <View style={{ paddingVertical: 70 }}>
          <FormLabel>Username</FormLabel>
          <FormInput
                     placeholder="Username..."
                     name='username'
                     onChangeText={(text) => this.setState({ username: text })}
                  />
          <FormLabel>Password</FormLabel>
          <FormInput
                     secureTextEntry
                     placeholder="Password..."
                     name='password'
                     onChangeText={(text) => this.setState({ password: text })}
                  />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
                     secureTextEntry
                     placeholder="Confirm Password..."
                     name='confirmPass'
                     onChangeText={(text) => this.setState({ confirmPass: text })}
                  />

          <Button
            buttonStyle={{ marginTop: 20, borderRadius: 30, borderWidth: 2, borderColor: '#a94e4c' }}
            backgroundColor="transparent"
            textStyle={{ color: "#a94e4c" }}
            title="SIGN UP"
            onPress={() => { this.signUp() }}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
          />
      </View>
    )
  }
}; //
