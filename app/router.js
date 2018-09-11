// Packages
import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import Icon from 'react-native-ionicons'

//Files
import Home from "./screens/Home";
import HomeSplit from "./screens/HomeSplit";
import Profile from "./screens/Profile";
import PlaidLogin from "./screens/PlaidLogin";
import WelcomeScreen from "./screens/WelcomeScreen";
import EthereumScreen from "./screens/Ethereum";
import TransactionList from "./screens/TransactionList";
import CustomHeader from './components/customHeader';
import LogoTile from './components/LogoTile';
import EthLogo from './components/EthereumLogo';


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({

  SignedOut: {
    screen: WelcomeScreen,
    navigationOptions: {
      header:null
    }
  }
});

export const SignedIn =  createBottomTabNavigator(
    {
      Transactions: {
        screen: TransactionList,
        navigationOptions: {
          tabBarLabel: "Txs",
          tabBarIcon: ({ tintColor }) => (
            <LogoTile color={tintColor}/>
          )
        }
      },
      Home: {
        screen: HomeSplit,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={30} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="user" size={30} color={tintColor} />
          )
        }
      },
      Ethereum: {
        screen: EthereumScreen,
        navigationOptions: {
          tabBarLabel: "Eth",
          tabBarIcon: ({ tintColor }) => (
            <EthLogo color={tintColor} />
          )
        }
      }
    },
    {
      initialRouteName: "Home",
      order: ["Transactions", "Home", "Profile", 'Ethereum'],
      tabBarOptions: {
        style: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10
        }
      }
    }
  );


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
