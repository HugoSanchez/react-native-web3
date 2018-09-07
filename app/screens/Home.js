//Packages
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
const Web3 = require('web3');

//Files
import '../../global';
import styles from '../../styles';
import { getUserAccounts } from '../adapter/plaid_api';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  // componentDidMount(){
  //   // AsyncStorage.getItem('plaid_token')
  //   //   .then(res => getUserAccounts(res))
  //     // .then(res => this.props.screenProps.setAccountsBalance(res)))
  //   // Web3.js test
  //     // web3.eth.getBlock('latest').then(console.log);
  // }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.paragraph}> This is Home Baby </Text>
        <Text style={styles.paragraph}> {this.props.screenProps.total_balance} </Text>
      </View>
    )
  }

  componentWillUnmount(){
    console.log('UN-MOUNTING')
  }

}; //

// case 'GET_ACC':
//   if (this.state.accounts.length == 0) {
//     getUserAccounts(this.state.access_token)
//       .then(res => this.setState({ accounts: res.accounts, total_balance: res.total_balance }))
//   }
//   return this.renderAcc();
