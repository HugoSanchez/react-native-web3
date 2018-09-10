import React from 'react';
import { View, Text, AsyncStorage, FlatList, Button } from 'react-native';

import styles from '../../styles';
import ListRow from '../components/listItem';

export default class TxList extends React.Component {
  // state = {
  //   transactions: [],
  // }

  // componentDidMount(){
  //   this.setState({ transactions: this.parseTransactions(this.props.screenProps.transactions)})
  // }

  render() {
    return (
      <FlatList
        style={{ marginTop: 20 }}
        data={this.props.screenProps.transactions}
        renderItem={({ item, index }) => (
          <ListRow
            {...item}
            index={index}
          />
        )}
        keyExtractor={(item) => item.transaction_id}
      />
    );
  }

  parseTransactions = (txs) => {
    newArr = txs.map(tx => {
      this.normalizeAmount(tx)
      if(tx.amount < 2000){
        tx.amount = "+" + tx.amount
      } else {
        tx.amount = '-' + tx.amount
      }
    })
    return newArr
  }


  normalizeAmount = (tx) => {
    if (tx.amount < 0) {
      return tx.amount = tx.amount * -1
    }
  }
}//
