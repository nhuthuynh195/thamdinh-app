import {
    createStackNavigator,
} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
    LoginScreen,
    ChangePasswordScreen
} from '../screens';

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    ChangePassword: ChangePasswordScreen
}, {
        initialRouteName: "Login",
        transitionConfig: getSlideFromRightTransition,
        headerMode: 'none',
    }
);

export default AuthStack;