// Libraries
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';

// Files
import '../../global';
import { getPlaidAccessToken } from '../adapter/plaid_api';
import { handlePlaidAuthentication } from '../auth';
import styles from '../../styles';

class PlaidLogin extends Component {

  state = {
    data: {},
    status: 'LOGIN_BUTTON'
  };

  componentDidMount(){
    console.log('MOUNTING')
  }

  render() {
    // console.log(this.state.status)
    const { navigation } = this.props
    switch(this.state.status) {
      case 'CONNECTED':
        handlePlaidAuthentication(this.state.data.metadata.public_token)
          .then(res => {
            this.props.screenProps.handlePlaidSignUp(res)
            this.props.screenProps.setMainState()
          }).then(() => navigation.navigate("Home"))
        return this.renderConnected();
      case 'LOGIN_BUTTON':
        return this.renderButton();
      case 'EXIT':
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderButton = () => {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {this.props.screenProps.username},</Text>
      <Text style={styles.title}>Welcome to Korona</Text>
      <Text></Text>
      <Text> </Text>
      <Text></Text>
      <TouchableOpacity onPress={() => this.setState({ status: '' })}>
        <Text style={styles.plaidConnect}>START BY CONNECTING TO YOUR BANK</Text>
      </TouchableOpacity>
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      <Text style={styles.value}>
      Note: We do not access, store or share
      any of your personal information.
      Everything you need to access
      that information is stored on your device
      and only you have control over it.
      </Text>
      <Text style={styles.paragraph}>
      YOUR MONEY, YOUR RULES.
      </Text>
    </View>
    )
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="cbc3786c0826ebad66f33cecc745dc"
        env="sandbox"
        product="auth,transactions"
      />
    );
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="cbc3786c0826ebad66f33cecc745dc"
        env="sandbox"
        product="auth,transactions"
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    );
  }

  renderConnected() {
    return(
      <Text></Text>
    )
  }

  onMessage = data => {
    console.log(data)
    this.setState({ data, status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
  };
} //


export default PlaidLogin;
