import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PlaidAuthenticator from 'react-native-plaid-link';


import styles from '../../styles';

export default class PlaidLogin extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      isSignedInToPlaid: false,
      username: '',
      status: '',
      data: {}
    };
  }

  render(){
    console.log(this.state.status)
    switch(this.state.status) {
      case 'CONNECTED':
      //   // if (!this.state.access_token) {
      //   //   getPlaidAccessToken(this.state.data.metadata.public_token)
      //   //     .then(res => this.setState({ access_token: res.access_token }))
      //   // }
        return this.renderDetails()
      case 'LOGIN_BUTTON':
        return this.renderLogin();
      // case 'GET_ACC':
      //   // if (this.state.accounts.length == 0) {
      //   //   getUserAccounts(this.state.access_token)
      //   //     .then(res => this.setState({ accounts: res.accounts, total_balance: res.total_balance }))
      //   // }
      //   return this.renderButton();
      default:
        return this.renderButton();
    }
  }


  renderButton = () => {
    return (
    <View style={styles.container}>
      <Text style={styles.paragraph}> Hi </Text>
      <Text style={styles.value}> You haven't connected your Bank account yet. </Text>
      <TouchableOpacity onPress={() => this.setState({status: 'LOGIN_BUTTON'})}>
        <Text style={styles.paragraph}>Connect Bank</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Note:</Text>
      <Text style={styles.value}>
      We do not access, store or share
      any of your personal information.
      Everything you need to access
      that information is stored on your device
      and only you have control over it.
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
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    );
  }

  renderDetails(){
    return(
      <Text>Success!</Text>
    )
  }

  onLoadStart = props => {
    console.log('onLoadStart', props);
  };

  onLoad = props => {
    console.log('onLoad', props);
  };

  onLoadEnd = props => {
    console.log('onLoadEnd', props);
  };

  onMessage = data => {
    console.log(data)
    this.setState({ data, status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
  };
}; //
