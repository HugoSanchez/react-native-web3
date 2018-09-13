import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';

const ROW_HEIGHT = 70;

class ListRow extends Component {
  onRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  };

  render() {
    const { amount, name, category } = this.props;

    const rowStyles = [
      styles.row,
    ];

    return (
      <TouchableOpacity onPress={this.onRemove}>
        <View style={rowStyles}>
        <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 10,
            }}
            source={require('../resources/background.jpeg')}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.amount}>{amount}</Text>
            <Text style={styles.email}>{category}</Text>
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
    fontWeight: '500',
    marginLeft: 0,
  },
  email: {
    fontSize: 14,
  },
});

export default ListRow;
