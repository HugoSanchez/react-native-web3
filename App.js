// Libraries
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';

// Files
import './global';
import { getUserAccounts, getPlaidAccessToken } from './adapter/api';

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class App extends Component {
  state = {
    data: {},
    accounts: [],
    total_balance: null,
    access_token: null,
    status: 'LOGIN_BUTTON'
  };

  render() {
    console.log(this.state.status)
    // web3.eth.getBlock('latest').then(console.log);

    switch(this.state.status) {
      case 'CONNECTED':
        if (!this.state.access_token) {
          getPlaidAccessToken(this.state.data.metadata.public_token)
          .then(res => this.setState({access_token: res.access_token}))
        }
        return this.renderDetails()
      case 'LOGIN_BUTTON':
        return this.renderButton();
      case 'GET_ACC':
        if (this.state.accounts.length == 0) {
          getUserAccounts(this.state.access_token)
            .then(res => this.setState({accounts: res.accounts, total_balance: res.total_balance}))
        }
        return this.renderAcc();
      case 'EXIT':
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderButton = () => {
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => this.setState({status: ''})}>
        <Text style={styles.paragraph}>Login with Plaid</Text>
      </TouchableOpacity>
    </View>
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

  renderDetails() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Institution</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.name}
        </Text>
        <Text style={styles.paragraph}>Institution ID</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.institution_id}
        </Text>
        <Text style={styles.paragraph}>Token</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.public_token}
        </Text>
        <TouchableOpacity onPress={() => this.setState({status: 'GET_ACC'})}>
          <Text style={styles.paragraph}>GET ACCOUNTS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderAcc() {
    return (
      <View style={styles.container}>
      <Text style={styles.value}> Total Balance:</Text>
        <Text style={styles.paragraph}>${this.state.total_balance}</Text>
      </View>
    )
  }

  onMessage = data => {
    console.log(data)
    this.setState({ data, status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase() });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
});
