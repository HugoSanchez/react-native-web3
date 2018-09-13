import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ROW_HEIGHT = 70;

class HomeRow extends Component {
  onRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  };

  render() {
    const { amount, category, onTrack } = this.props;

    const rowStyles = [
      styles.row,
    ];

    return (
      <TouchableOpacity onPress={this.onRemove}>
        <View style={rowStyles}>
        <Image
            style={styles.image}
            source={require('../resources/background.jpeg')}/>
          <View>
          <View style={rowStyles}>
            <Text style={styles.name}>{category}</Text>
            <Text style={styles.amount}> $ {amount}</Text>
          </View>
          <Text style={styles.category}>{onTrack ? "On track" : "Overspent" }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    height: ROW_HEIGHT,
    borderWidth: 0,
    margin: 5,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '300',
  },
  amount: {
    fontSize: 18,
    fontWeight: '200',
    marginLeft: 0,
  },
  category: {
    fontSize: 12,
    fontWeight: '200',
    marginLeft: 0,
  },
  email: {
    fontSize: 14,
  },
});

export default HomeRow;
