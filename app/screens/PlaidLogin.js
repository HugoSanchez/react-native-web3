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
      <Text style={styles.paragraph}>Hi @{this.props.screenProps.username}</Text>
      <Text> </Text>
      <Text style={styles.value}> You haven't connected your Bank account yet. </Text>
      <Text style={styles.value}> Please do so here: </Text>
      <Text> </Text>
      <TouchableOpacity onPress={() => this.setState({ status: '' })}>
        <Text style={styles.paragraph}>Login with Plaid</Text>
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
      <Text style={styles.value}>
      Your money, your rules.
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

  onMessage = data => {
    console.log(data)
    this.setState({ data, status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
  };
}


export default PlaidLogin;
