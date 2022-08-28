import React from "react";
import { createStackNavigator } from "react-navigation";
import getSlideFromRightTransition from "react-navigation-slide-from-right-transition";

import {
  HomeScreen,
  SearchScreen,
  DetailScreen,
  ProfileScreen,
  NotiScreen,
  MapScreen,
  SortModal,
  ReceiptScreen,
  UploadReceiptScreen,
  ChangePassword,
  UploadComplete
} from "../screens";

const SortStack = createStackNavigator(
  {
    Sort: SortModal
  },
  {
    headerMode: "none",
    mode: "modal",
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "red"
      }
    })
  }
);

const HomeStack = createStackNavigator(
  {
    UploadComplete: UploadComplete,
    UploadReceipt: UploadReceiptScreen,
    Home: HomeScreen,
    Receipt: ReceiptScreen,
    Detail: DetailScreen,
    Search: SearchScreen,
    ChangePassword: ChangePassword,
    Profile: ProfileScreen,
    Map: MapScreen,
    Noti: NotiScreen
  },
  {
    initialRouteName: "Home",
    transitionConfig: getSlideFromRightTransition,
    headerMode: "none"
  }
);

const MainStack = createStackNavigator(
  {
    Home: HomeStack,
    Sort: SortStack
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
    mode: "modal"
  }
);

export default MainStack;
