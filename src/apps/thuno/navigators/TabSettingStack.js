import React from 'react';
import { createStackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import {
    ProfileScreen,
    SettingsScreen
} from '../screens';

const TabSettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Profile: ProfileScreen,
}, {
        initialRouteName: "Settings",
        transitionConfig: getSlideFromRightTransition,
        headerMode: 'none',
        navigationOptions: {
            drawerLabel: '',
            // drawerIcon: ({ tintColor }) => (
            //     <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
            // ),
        },
    });

export default TabSettingsStack;