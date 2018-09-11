//Packages
import React from 'react';
import { View, Text, Image, AsyncStorage, YellowBox } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const EthCrypto = require('eth-crypto')

//Files
import '../../global';
import styles from '../../styles';
import { getEthPrice, getBitcoinAddressBalance, getBtcPrice, getNewEthId } from '../adapter/crypto_api';
import Qrcode from '../components/QRCode'

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/3c5dadf1faa1494692407d18a5a94ccf'),
);

const qr = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=0x8CCF9C4a7674D5784831b5E1237d9eC9Dddf9d7F&choe=UTF-8'

export default class EthereumScreen extends React.Component {

  state = {
    hasEthIdentity: false,
    estature: '',
    ethAdd: '',
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
  }

  render(){
    const { navigation } = this.props
    switch(this.state.estature) {
      case 'NO ETH ADD':
        return this.renderWelcome();
      case 'GET':
        this.getEthAddress().then(res => {
          this.setState({ ethAdd: res })
        })
        return this.renderGet();
      case 'TX FORM':
        this.getEthAddress().then(res => {
          this.setState({ ethAdd: res })
        })
        this.getEthAddress()
        return this.renderGet();
      case 'RECEIVE':
        return this.renderReceive();
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
        <Text style={styles.value}> {this.state.ethAdd} </Text>
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

  renderReceive(){
    return(
      <View style={styles.container}>
        <Qrcode address={this.state.ethAdd} />
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
      AsyncStorage.getItem('eth_priv')
        .then(res => {
          if(res !== null) {
            console.log('PRIVATE KEY: ', res.substring(2))
            resolve(true);
          }
          else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
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
}//
