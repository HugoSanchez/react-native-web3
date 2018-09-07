import React from 'react';

import Home from './Home';
import PlaidLogin from './PlaidLogin';

export default class Beef extends React.Component {

  render(){
    return(
      this.props.screenProps.isSignedInToPlaid ? <Home {...this.props}/> : <PlaidLogin {...this.props}/> 
    )
  }
}
