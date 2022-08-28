import React from 'react';
import { createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
  HomeScreen,
  ProfileScreen,
  UserDetailScreen,
  NotificationScreen,
  ChangePasswordScreen,
  MapScreen,
  SearchScreen,
  CameraScreen,
  SortModal,
  PhotoScreen,
  UserDetailScreen1
} from '../screens';

const SortStack = createStackNavigator(
  {
    Sort: SortModal
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'red'
      }
    })
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    UserDetail: UserDetailScreen,
    Notification: NotificationScreen,
    ChangePassword: ChangePasswordScreen,
    Map: MapScreen,
    Search: SearchScreen,
    Camera: CameraScreen,
    Photo: PhotoScreen,
    UserDetail1: UserDetailScreen1
  },
  {
    initialRouteName: 'Home',
    transitionConfig: getSlideFromRightTransition,
    headerMode: 'none',
    gesturesEnabled: false,
  }
);

const MainStack = createStackNavigator(
  {
    HomePage: HomeStack,
    Sort: SortStack
  },
  {
    initialRouteName: 'HomePage',
    headerMode: 'none',
    mode: 'modal',
    gesturesEnabled: false,
  }
);

export default MainStack;
