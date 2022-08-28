import React from 'react';
import {
    createNavigationContainer,
    createBottomTabNavigator,
    createDrawerNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Feather';

import TabHomeStack from './TabHomeStack';
import TabSettingsStack from './TabSettingStack';
import { hiddenTabbar } from '../utils/func';
import {
    MyHomeScreen,
    MyNotificationsScreen
} from '../screens';

// hiddenTabbar(TabHomeStack);
// hiddenTabbar(TabSettingsStack);

const TabNavigator = createBottomTabNavigator({
    Home: TabHomeStack,
    Settings: TabSettingsStack,
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                } else if (routeName === 'Settings') {
                    iconName = `settings`;
                }

                return <Ionicons name={iconName} size={!focused ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            safeAreaInset: {
                bottom: 'always',
                top: 'never'
            },
            tabStyle: {
            },
            style: {
                height: 58
            },
            labelStyle: {
                fontSize: 12,
                marginTop: 0,
                marginBottom: 5
            },
        },
    }
)

const DrawerExample = createDrawerNavigator(
    {
        Home: {
            path: '/',
            screen: TabHomeStack,
        },
        Profile: {
            path: '/sent',
            screen: TabSettingsStack,
        },
    },

    {
        initialRouteName: 'Home',
        DrawerNavigatorConfig:{
            drawerPosition:'right'
        },
        contentOptions: {
            activeTintColor: 'red',
        },
    }
);


// import HomeStack from './HomeStack';

// const AppStack = createBottomTabNavigator({
//     Home: HomeStack,
//     Other: OtherScreen
// },
//     {
//         defaultNavigationOptions: ({ navigation }) => ({
//             tabBarIcon: ({ focused, horizontal, tintColor }) => {
//                 const { routeName } = navigation.state;
//                 let iconName;
//                 if (routeName === 'Home') {
//                     iconName = `home`;
//                 } else if (routeName === 'Other') {
//                     iconName = `settings`;
//                 }

//                 return <Ionicons name={iconName} size={!focused ? 20 : 25} color={tintColor} />;
//             },
//         }),
//         tabBarOptions: {
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'gray',
//             safeAreaInset: {
//                 bottom: 'always',
//                 top: 'never'
//             },
//             tabStyle: {
//             },
//             style: {
//                 height: 58
//             },
//             labelStyle: {
//                 fontSize: 12,
//                 marginTop: 0,
//                 marginBottom: 5
//             },
//         },
//     }
// );



export default createNavigationContainer(DrawerExample);