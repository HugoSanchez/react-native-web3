// Packages
import { AsyncStorage } from 'react-native';
//Files
import { signUserUp, signUserIn } from './adapter/sessions_api'

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
