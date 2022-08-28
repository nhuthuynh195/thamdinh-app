import React from "react";
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import MainStack from "./MainStack";

import {
  LoginScreen,
  ChangePasswordScreenInit,
  SplashScreen
} from "../screens";

export default createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginScreen,
      ChangePassword: ChangePasswordScreenInit,
      Main: MainStack,
      Splash: SplashScreen
    },
    {
      initialRouteName: "Splash"
    }
  )
);
