//Packages
import React from 'react';
import { View, Text, Image, AsyncStorage, YellowBox } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
const Web3 = require('web3');
const BN = require('bn.js');
const EthereumTx = require('ethereumjs-tx');
const EthCrypto = require('eth-crypto')

//Files
import '../../global';
import styles from '../../styles';
import { getEthPrice, getNewEthId, getCurrentGasPrices } from '../adapter/crypto_api';
import Qrcode from '../components/QRCode';
import ScanScreen from '../components/QRCodeScanner'

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/3c5dadf1faa1494692407d18a5a94ccf'),
);

export default class EthereumScreen extends React.Component {

  state = {
    hasEthIdentity: false,
    estature: '',
    mainEthAddress: '',
    ETHbalance: 0,
    sendToAddress: '0xcc74308838bbaceec226611a0c2b3fd5f4a7d8a2',
    amount: 0,
    gasPrice: {},
    error: '',
  }

  componentDidMount(){
    this.checkEthIdentity().then(res => {
      if (res){
        this.setState({ hasEthIdentity: res, estature: 'TX FORM' })
      } else {
        this.setState({ estature: 'NO ETH ADD' })
      }
    });
    getCurrentGasPrices().then(res => {
      this.setState({
        ...this.state,
        gasPrice: {
          low: res.safeLow / 10,
          medium: res.average / 10,
          high: res.fast / 10
        }
      })
    })
  }

  render(){
    const { navigation } = this.props
    switch(this.state.estature) {
      case 'NO ETH ADD':
        return this.renderWelcome();
      case 'GET':
        this.getEthAddress().then(res => {
          this.setState({ mainEthAddress: res })
        })
        return this.renderGet();
      case 'TX FORM':
        this.setEthereumBalance()
        return this.renderTxHome();
      case 'RECEIVE':
        return this.renderReceive();
      case 'SEND':
        return this.renderSend();
      case 'QR':
        return this.renderQR();
      default:
        return this.renderWelcome();
    }
  }

  renderWelcome(){
    return(
      <View style={styles.container}>
        <Image
            source={require('../resources/eth.png')}
            style={{ width: 100, height: 100 }}
          />
        <Text></Text>
        <Text></Text>
        <Text> Welcome to the Ethereum Network! </Text>
        <View style={{ top:60 }}>
          <Button
          buttonStyle={{ marginTop: 20, borderRadius: 30, borderWidth: 2, borderColor: '#00002D' }}
          backgroundColor="#00002D"
          textStyle={{ color: "#fff" }}
          title="Get Ethereum Identity"
          onPress={() => { this.fetchAndSaveNewEthId() }}
          />
          <Text></Text>
          <Button
          backgroundColor="transparent"
          textStyle={{ color: "#00002D" }}
          title="I already have one"
          onPress={() => { this.setState({ estature: 'SIGN UP' }) }}
          />
        </View>
      </View>
    )
  }

  renderGet(){
    return(
      <View style={styles.container}>
        <Image
            source={require('../resources/eth.png')}
            style={{ width: 50, height: 50 }}
          />
        <Text></Text>
        <Text></Text>
        <Text style={styles.value}> Here's your new Eth Address: </Text>
        <Text></Text>
        <Text style={styles.value}> Your private keys are securely stored
         in your phone's memory.
         You can access it from your profile </Text>
        <Text></Text>
        <Text style={styles.value}> {this.state.mainEthAddress} </Text>
        <Text></Text>
        <Button
        buttonStyle={{ marginTop: 20, borderRadius: 30, borderWidth: 2, borderColor: '#00002D' }}
        backgroundColor="#00002D"
        textStyle={{ color: "#fff" }}
        title="Recive"
        onPress={() => this.setState({ estature: 'RECEIVE' }) }
        />
        <Button
        buttonStyle={{ marginTop: 20, borderRadius: 30, borderWidth: 2, borderColor: '#00002D' }}
        backgroundColor="transparent"
        textStyle={{ color: "#00002D" }}
        title="Send"
        onPress={() => { console.log('Send!!') }}
        />
      </View>
    )
  }

  renderTxHome(){
    return(
      <View style={styles.container}>
        <View style={styles.container, styles.ETHcontainer}>
        <Image
            source={require('../resources/eth.png')}
            style={{ width: 50, height: 50 }}
          />
        <Text style={styles.paragraph}> $ {this.parseAmounts(this.state.ETHbalance)} <Text style={styles.crypto}>ETH</Text></Text>
        <Text style={styles.value}> {this.state.mainEthAddress}</Text>
        <Text style={styles.crypto}>Your ETH Address</Text>
        <Text style={styles.crypto}>{this.state.gasPrice.low}</Text>
        </View>
        <View style={styles.container, styles.boxTwo}>
          <Button
          buttonStyle={{ marginTop: 20, borderRadius: 0, borderWidth: 2, borderColor: '#00002D' }}
          backgroundColor="#00002D"
          textStyle={{ color: "#fff" }}
          title="Recive"
          onPress={() => this.setState({ estature: 'RECEIVE' }) }
          />
          <Button
          buttonStyle={{ marginTop: 20, borderRadius: 0, borderWidth: 2, borderColor: '#00002D' }}
          backgroundColor="transparent"
          textStyle={{ color: "#00002D" }}
          title=" Send "
          onPress={() => this.setState({ estature: 'SEND'}) }
          />
        </View>
      </View>
    )
  }

  renderSend(){
    return(
      <View style={styles.container}>
        <View style={{ paddingVertical: 120 }}>
          <Text> {this.state.error} </Text>
              <FormLabel>To:</FormLabel>
              <FormInput placeholder="Username..."
                         value={this.state.sendToAddress}
                         onChangeText={(text) => this.setState({ sendToAddress: text })}
                        />

              <FormLabel>Amount</FormLabel>
              <FormInput placeholder="Amount"
                         value={this.state.amount}
                         onChangeText={(text) => this.setState({ amount: text })}
                        />
              <Button
                buttonStyle={{ marginTop: 20, borderRadius: 30 }}
                backgroundColor="#03A9F4"
                title="Send"
                onPress={() => { this.sendEthTransaction() }}
              />
              <Button
              buttonStyle={{ marginTop: 20, borderRadius: 30 }}
              backgroundColor="transparent"
              textStyle={{ color: "#03A9F4" }}
              title="Scan QR code"
              onPress={() => { this.setState({ estature: 'QR' }) }}
              />
              <Button
              backgroundColor="transparent"
              textStyle={{ color: "#00002D" }}
              title="Back"
              onPress={() => { this.setState({ estature: 'TX FORM' }) }}
              />
        </View>
      </View>
    )
  }

  renderQR(){
    return(
      <View style={styles.container}>
        <ScanScreen handleBack={this.handleBack}
                    setSendToAddress={this.setSendToAddress}
                    />
      </View>
    )
  }

  renderReceive(){
    return(
      <View style={styles.container}>
        <Qrcode address={this.state.mainEthAddress} />
        <Text></Text>
        <Text></Text>
          <Button
          backgroundColor="transparent"
          textStyle={{ color: "#00002D" }}
          title="Back"
          onPress={() => { this.setState({ estature: 'TX FORM' }) }}
          />
      </View>
    )
  }

  //Helper Methods

  sendEthTransaction = () => {
    const amountToSend = new BN(0.0100000)
    var details = {}
    web3.eth.defaultAccount = this.state.mainEthAddress
    console.log(typeof this.state.sendToAddress)
    console.log(amountToSend)
    details = {
        "to": this.state.sendToAddress,
        "value": web3.utils.toHex( web3.utils.toWei(amountToSend, 'ether') ),
        "gas": 21000,
        "gasPrice": this.state.gasPrice.low * 1000000000, // converts the gwei price to wei
        "nonce": web3.eth.getTransactionCount(web3.eth.defaultAccount),
        "chainId": 1 // EIP 155 chainId - mainnet: 1, rinkeby: 4
      }
    const transaction = new EthereumTx(details)
    // console.log(transaction)
  }

  getEthAddress = () => {
    return AsyncStorage.getItem('eth_address').then(res => {
      return res
    })
  }

  getEthPriv = () => {
    return AsyncStorage.getItem('eth_address').then(res => {
      console.log(res)
    })
  }

  checkEthIdentity = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('eth_address')
        .then(res => {
          if(res !== null) {
            this.setState({ mainEthAddress: res })
            console.log('Eth Address: ', res)
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  }

  parseAmounts = (amount) => {
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }

  // Set State Methods

  handleBack = (string) => {
    this.setState({ estature: string})
  }

  setSendToAddress = (add) => {
    this.setState({ sendToAddress: add })
  }

  fetchAndSaveNewEthId = () => {
    getNewEthId().then(res => {
      if (res.success) {
        AsyncStorage.setItem('eth_address', res.success.address)
        .then(() => AsyncStorage.setItem('eth_priv', res.success.privateKey)
        .then(this.setState({ estature: 'GET' })))
      } else {
        this.setState({ error: "Error ocurred generating your new keys"})
      }
    })
  }

  setEthereumBalance = () => {
    var currentExRate, balance, USDbalance
    walletAddress = '0xd3b781ee972128c2A2B7858A8984F440375Fb595'
    getEthPrice().then(res => {
      currentExRate = res.USD
    }).then(() => {
        web3.eth.getBalance(walletAddress).then(res => {
        balance = res/(10**18);
        this.setState({ ETHbalance: currentExRate * balance })
      })
    });
  }

}//
