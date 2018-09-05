//Packages
import React from 'react';
import { Text } from 'react-native';
const Web3 = require('web3');

//Files
import '../global';
import { createRootNavigator } from './router';
import { isSignedIn } from './auth';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      isSignedInToPlaid: false,
      total_balance: null,
      accounts: [],
      access_token: null,
      username: ''
    };
  }

  componentDidMount(){
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert('An error ocurred'))
      // Web3.js TEST
      web3.eth.getBlock('latest').then(console.log);
  }

  render(){
    const { checkedSignIn, signedIn, isSignedInToPlaid } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    console.log(createRootNavigator)
    const Layout = createRootNavigator(signedIn, isSignedInToPlaid);
    return <Layout
              screenProps={{
                username: this.state.username,
                handleSignUp: this.handleSignUp
              }}/>;
  }

  // Handling state Methods

  handlePlaidSingUp = () => {
    this.setState({ isSignedInToPlaid: !this.state.isSignedInToPlaid });
  }

  handleSingUp = (username) => {
    this.setState({ username: username });
  }

}//
