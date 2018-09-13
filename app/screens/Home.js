//Packages
import React from 'react';
import { View, Text, Image, AsyncStorage, YellowBox } from 'react-native';
const Web3 = require('web3');
import { StackNavigator } from 'react-navigation';

//Files
import '../../global';
import styles from '../../styles';
import HomeRow from '../components/homeItem';
import LogoTile from '../components/LogoTile';
import { getEthPrice, getBitcoinAddressBalance, getBtcPrice } from '../adapter/crypto_api';

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/'),
);

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

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
      BTCbalance: 0,
      BTCtransactions: [],
    };
    console.log("CONSTRUCTING HOME")
  }

  componentDidMount(){
    setTimeout(() => {
      this.setMonthlyExpenditureAndIncome(this.props.screenProps.transactions)
      this.FoodAndDrinksExpenses(this.props.screenProps.transactions)
      this.travelAndTransportExpenses(this.props.screenProps.transactions)
      this.setEthereumBalance()
      this.setBitcoinBalance()
    }, 1500)
    // console.log(this.props.screenProps.transactions)
  }

  render(){
    return(
      <View style={styles.container}>
      <Image
          source={require('../resources/bird.png')}
          style={{ width: 120, height: 120, top: 100 }}
        />
        <View style={styles.container, styles.boxOne}>
          <Text style={styles.value}> Total Savings </Text>
          <Text style={styles.savingsHeader}> $ {this.parseAmounts(this.props.screenProps.total_balance)} </Text>
        </View>
        <View style={styles.container, styles.boxTwo}>
          <Text style={styles.paragraph}> $ {this.state.BTCbalance} <Text style={styles.crypto}>BTC</Text></Text>
          <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.ETHbalance)} <Text style={styles.crypto}>ETH</Text></Text>
        </View>
        <HomeRow category={"Monthly Expenses"} amount={this.state.totalMonthlyExpenditure} onTrack={true} />
        <View style={styles.container, styles.boxFour}>
          <Text style={styles.paragraph}> $ {this.state.totalMonthlyIncome} </Text>
          <Text style={styles.value2}>Monthly Income </Text>
        </View>
        <View style={styles.container, styles.boxFive}>
          <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.FoodAndDrinksExpenses)} </Text>
          <Text style={styles.value2}> Food and Drinks </Text>
        </View>
        <View style={styles.container, styles.boxSix}>
          <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.travelAndTransportExpenses)} </Text>
          <Text style={styles.value2}> Travel </Text>
        </View>
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

  setBitcoinBalance = () => {
    var bitcoinBalance
    var BTCtransactions = []
    var currentExRate
    address = '18vPrXytWtRhSrNDmuJMKREY9mS9kUsqLk'
    getBitcoinAddressBalance(address).then(res => {
      bitcoinBalance = res.final_balance/(10**8) + 1
      console.log('BTC: ', res.txs.length)
    }).then(() => getBtcPrice().then(res => {
      currentExRate = res.USD
      bitcoinBalance = bitcoinBalance * currentExRate
      BTCtransactions = res.txs
      this.setState({ BTCbalance: this.parseAmounts(bitcoinBalance), BTCtransactions: BTCtransactions})
    }))
  }

  // Helper Methods

  parseAmounts = (amount) => {
    return amount ? (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0
  }

}; //
