//Packages
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
const Web3 = require('web3');
const currency = require('currency.js')

//Files
import '../../global';
import styles from '../../styles';
import { getEthPrice } from '../adapter/eth_api';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      totalMonthlyExpenditure: 0,
      totalMonthlyIncome: 0,
      FoodAndDrinksExpenses: 0,
      travelAndTransportExpenses: 0,
      ETHbalance: 0,
    };
  }

  componentDidMount(){
    this.setMonthlyExpenditureAndIncome(this.props.screenProps.transactions)
    this.FoodAndDrinksExpenses(this.props.screenProps.transactions)
    this.travelAndTransportExpenses(this.props.screenProps.transactions)
    this.setEthereumBalance()
    // console.log(this.props.screenProps.transactions)
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.value}> Total Savings </Text>
        <Text style={styles.paragraph}> $ {this.parseAmounts(this.props.screenProps.total_balance)} </Text>
        <Text style={styles.value}> ETH Balance: </Text>
        <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.ETHbalance)} </Text>
        <Text style={styles.value}> Total monthly expenditures: </Text>
        <Text style={styles.paragraph}> $ {this.state.totalMonthlyExpenditure} </Text>
        <Text style={styles.value}> Total monthly Income: </Text>
        <Text style={styles.paragraph}> $ {this.state.totalMonthlyIncome} </Text>
        <Text style={styles.value}> Food and Drinks: </Text>
        <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.FoodAndDrinksExpenses)} </Text>
        <Text style={styles.value}> Travel: </Text>
        <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.travelAndTransportExpenses)} </Text>
      </View>
    )
  }

  componentWillUnmount(){
    console.log('UN-MOUNTING')
  }

  // Setstate Methods

  setMonthlyExpenditureAndIncome = (transactions) => {
    var totalExp = 0;
    var totalInc = 0;
    transactions.forEach(t => {
      if (t.amount < 2000) {
        totalExp = totalExp + t.amount
      } else {
        totalInc = totalInc + t.amount
      }
    })
    this.setState({ totalMonthlyExpenditure: this.parseAmounts(totalExp), totalMonthlyIncome: this.parseAmounts(totalInc) })
  }

  FoodAndDrinksExpenses = (transactions) => {
    var total = 0;
    transactions.forEach(t => {
      if (t.category.includes("Food and Drink")) {
        total = total + t.amount
      }
    })
    this.setState({ FoodAndDrinksExpenses: total })
  }

  travelAndTransportExpenses = (transactions) => {
    var total = 0;
    transactions.forEach(t => {
      if (t.category.includes("Travel")) {
        total = total - Math.abs(t.amount)
      }
    })
    this.setState({ travelAndTransportExpenses: total * -1 })
  }

  setEthereumBalance = () => {
    var currentExRate, balance, USDbalance
    walletAddress = '0xcc74308838bbaceec226611a0c2b3fd5f4a7d8a2';
    getEthPrice().then(res => {
      currentExRate = res.USD
    }).then(() => {
        web3.eth.getBalance(walletAddress).then(res => {
        balance = res/(10**18);
        this.setState({ ETHbalance: currentExRate * balance })
      })
    });
  }

  // Helper Methods

  parseAmounts = (amount) => {
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

}; //
