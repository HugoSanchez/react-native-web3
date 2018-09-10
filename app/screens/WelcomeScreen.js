// Packages
import React from "react";
import { AsyncStorage, View, Text, ImageBackground, StyleSheet } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";

// Files
import { onSignIn, onSignUp } from "../auth";
// import Signup from './Signup';
// import Signin from './Signin';



export default class WelcomeScreen extends React.Component {

  state = {
    state: '',
    error: "",
    username: "",
    password: "",
    confirmPass: ""
  }

  render(){
    const { navigation } = this.props
    switch(this.state.status) {
      case '':
        return this.renderWelcome();
      case 'SIGN UP':
        return this.renderSignup();
      case 'SIGN IN':
        return this.renderSignin();
      case 'CONNECTED':
        return this.renderSignin();
      default:
        return this.renderWelcome();
    }
  }

  renderWelcome = () => {
    return(
      <ImageBackground source={require("../resources/backgroundLogo.jpeg")}
                       style={styles.backgroundImage} >
        {this.props.children}
        <View style={{ top:600 }}>
          <Button
          buttonStyle={{ marginTop: 20, borderRadius: 30, borderWidth: 2, borderColor: '#fff' }}
          backgroundColor="transparent"
          textStyle={{ color: "#fff" }}
          title="SIGN IN"
          onPress={() => { this.setState({ status: 'SIGN IN' }) }}
          />
          <Text></Text>
          <Button
          backgroundColor="transparent"
          textStyle={{ color: "#fff" }}
          title="Sign up"
          onPress={() => { this.setState({ status: 'SIGN UP' }) }}
          />
        </View>
      </ImageBackground>
    )
  }

  renderSignup = () => {
    return(
      <ImageBackground source={require("../resources/background.jpeg")}
                       style={styles.backgroundImage} >
        <View style={{ paddingVertical: 120 }}>
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
              buttonStyle={{ marginTop: 20, borderRadius: 30 }}
              backgroundColor="#03A9F4"
              title="SIGN UP"
              onPress={() => { this.setState({ status: 'SIGN IN' }) }}
            />
            <Button
              backgroundColor="transparent"
              textStyle={{ color: "#fff" }}
              title="Sign in"
              onPress={() => { this.setState({ status: 'SIGN IN' }) }}
            />
        </View>
      </ImageBackground>
    )
  }

  renderSignin = () => {
    return(
      <ImageBackground source={require("../resources/background.jpeg")}
                       style={styles.backgroundImage} >
        <View style={{ paddingVertical: 120 }}>
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
              buttonStyle={{ marginTop: 20, borderRadius: 30 }}
              backgroundColor="#03A9F4"
              title="SIGN IN"
              onPress={() => { this.signIn() }}
            />
            <Button
            backgroundColor="transparent"
            textStyle={{ color: "#fff" }}
            title="Sign up"
            onPress={() => { this.setState({ status: 'SIGN UP' }) }}
            />
        </View>
      </ImageBackground>
    )
  }

  signUp = () => {
    const { navigation } = this.props
    if (this.state.password == this.state.confirmPass){
      onSignUp({
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        if (res.success) {
          navigation.navigate('SignedIn')
        } else {
          null
        }
      });
    } else {
      this.setState({ error: 'Passwords should be the same!'})
    }
  }

  signIn = () => {
    const { navigation } = this.props
    onSignIn({
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      if (res.success){
        this.props.screenProps.handleSignUp(this.state.username, res.token, navigation)
      } else {
        this.setState({ error: 'Unable to set user_token' })
      }
    });
  }

}; // Class


const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  }
});
