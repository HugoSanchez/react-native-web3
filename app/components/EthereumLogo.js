import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

export default class EthLogo extends React.Component {
  render() {
    return (
      <Image
        source={require('../resources/eth.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
