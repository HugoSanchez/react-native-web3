// Packages
import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

//Files
import Home from "./screens/Home";
import HomeSplit from "./screens/HomeSplit";
import Profile from "./screens/Profile";
import PlaidLogin from "./screens/PlaidLogin";
import WelcomeScreen from "./screens/WelcomeScreen";
import TransactionList from "./screens/TransactionList";
import CustomHeader from './components/customHeader';

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
      Home: {
        screen: HomeSplit,
        navigationOptions: {
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={30} color={tintColor} />
          )
        }
      },
      Transactions: {
        screen: TransactionList,
        navigationOptions: {
          tabBarLabel: "Txs",
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="user" size={30} color={tintColor} />
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
      }
    },
    {
      tabBarOptions: {
        style: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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
