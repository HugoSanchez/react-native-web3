// Packages
import { AsyncStorage } from 'react-native';
//Files
import { signUserUp, signUserIn } from './adapter/sessions_api'
import { getPlaidAccessToken, getUserAccounts } from './adapter/plaid_api'


// Session Authentication Controllers
export const onSignUp = (user) => {
  return signUserUp(user)
}

export const onSignIn = (user) => {
  return signUserIn(user)
}

export const onSignOut = () => AsyncStorage.removeItem('user_token');

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user_token')
      .then(res => {
        if(res !== null) {
          console.log(res)
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

// Plaid API Authentication Controllers
//--> Need to add additional encryption HERE <--
export const handlePlaidAuthenticaton = (public_token) => {
  return getPlaidAccessToken(public_token)
    .then(res => {
      if (res.access_token){
        AsyncStorage.setItem('plaid_token', res.access_token)
      } else {
        this.setState({ error: 'Unable to set user_token' })
      }
    }
  )
}
