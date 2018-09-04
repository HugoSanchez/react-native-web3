//Packages
import React from 'react';
import { Text } from 'react-native';

//Files
import { createRootNavigator } from './router';
import { isSignedIn } from './auth';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      isSignedInToPlaid: false,
      bananarama: 'Bananarama'
    };
  }

  componentDidMount(){
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert('An error ocurred'))
  }

  render(){
    const { checkedSignIn, signedIn, isSignedInToPlaid } = this.state;

    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn, isSignedInToPlaid);
    return <Layout
              screenProps={{
                bananarama: this.state.bananarama,
                handleChange: this.handleChange
              }}/>;
  }

  // Handling state Methods

  // handleChange = (name, value) => {
  //   this.setState({
  //     session: {
  //       ...this.state.session,
  //       [name]: value
  //     }
  //   });
  // }

}//
