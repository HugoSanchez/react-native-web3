import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./screens/Signup";
import SignIn from "./screens/Signin";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import PlaidLogin from "./screens/PlaidLogin";


const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header:null
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header:null
    }
  }
});

export const SignedIn = (isSignedInToPlaid) => createBottomTabNavigator(
  {
    Home: {
      screen: isSignedInToPlaid ? Home : PlaidLogin,
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

export const createRootNavigator = (signedIn = false, isSignedInToPlaid) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn(isSignedInToPlaid)
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
