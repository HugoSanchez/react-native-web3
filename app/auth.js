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
export const handlePlaidAuthentication = (public_token) => {
  return getPlaidAccessToken(public_token)
    .then(res => {
      if (res.access_token){
        return AsyncStorage.setItem('plaid_token', res.access_token)
          .then(() => hasBankAccountLinked().then(res => {
            console.log('Inside Auth', res)
            return res
          }))
      } else {
        console.log('Unable to save Access Token after Fetch')
        return false
      }
    }
  )
}

export const hasBankAccountLinked = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('plaid_token')
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

export const deletePlaidToken = () => AsyncStorage.removeItem('plaid_token');
