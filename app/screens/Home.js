import React from "react";
import { View, Text } from "react-native";

export default class Home extends React.Component{
  render(){
    return(
      <View style={{ paddingVertical: 100 }}>
        <Text> Plaid Login {this.props.screenProps.bananarama}</Text>
      </View>
    )
  }
};


// case 'GET_ACC':
//   if (this.state.accounts.length == 0) {
//     getUserAccounts(this.state.access_token)
//       .then(res => this.setState({ accounts: res.accounts, total_balance: res.total_balance }))
//   }
//   return this.renderAcc();
