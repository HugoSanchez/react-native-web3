//Packages
import React from 'react';
import { Text, AsyncStorage } from 'react-native';
const Web3 = require('web3');

//Files
import '../global';
import { createRootNavigator } from './router';
import { getUserAccounts, getUserTransactions } from './adapter/plaid_api'
import { isSignedIn, hasBankAccountLinked } from './auth';

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
      transactions: [],
      username: ''
    };
  }

  componentDidMount(){
    console.log('NEWLY MOUNTED COMPONENT')
    //Set INITIAL STATE
    this.setMainState()
    // Web3.js test
      // web3.eth.getBlock('latest').then(console.log);
  }

  render(){
    const { checkedSignIn, signedIn, isSignedInToPlaid } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout
              screenProps={{
                username: this.state.username,
                total_balance: this.state.total_balance,
                accounts: this.state.accounts,
                handleSignUp: this.handleSignUp,
                handleLogout: this.handleLogout,
                handlePlaidSignUp: this.handlePlaidSignUp,
                setAccountsBalance: this.setAccountsBalance,
                isSignedInToPlaid: this.state.isSignedInToPlaid,
                setMainState: this.setMainState
              }}/>;
  }

  componentWillUnmount() {
    console.log('UNMOUNTED AS FUCK')
  }

  // Handling state Methods

  handlePlaidSignUp = (bool) => {
    this.setState({ isSignedInToPlaid: bool });
  }

  handleSignUp = (username, token, navigation) => {
    this.setState({ username: username, signedIn: true }, () => {
      AsyncStorage.setItem('user_token', token)
        .then(() => navigation.navigate("SignedIn"))
    });
  }

  handleLogout = (navigation) => {
    this.setState({ username: '', signedIn: false }, () => {
      navigation.navigate("SignedOut")
    });
  }

  setAccountsBalance = (response) => {
    this.setState({ accounts: response.accounts, total_balance: response.total_balance })
  }

  setTransactions = (res) => {
    this.setState({ transactions: res.transactions})
  }

  setMainState = () => {
    isSignedIn()
      .then(this.updateSignInAndCheckPlaidToken)
        .then(res => { if (res) { AsyncStorage.getItem('plaid_token')
          .then(plaidToken => { getUserAccounts(plaidToken)
            .then(this.setStateBalanceAndAccounts)
          return plaidToken }).then(plaidToken => getUserTransactions(plaidToken)
              .then(this.setTransactions))
        }}
      ).catch(err => alert('An error ocurred'))
  }

  // Helper Methods
  updateSignInAndCheckPlaidToken = (res) => {
    this.setState({ signedIn: res, checkedSignIn: true })
    return hasBankAccountLinked()
  }

  setStateBalanceAndAccounts = (res) => {
    this.setState({
      ...this.state,
      isSignedInToPlaid: true,
      total_balance: res.total_balance,
      accounts: res.accounts
    })
  }


}//
