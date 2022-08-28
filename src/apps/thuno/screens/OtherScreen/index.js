import { AsyncStorage } from 'react-native';

import Layout from './layout';

class OtherScreen extends Layout {

    constructor(props) {
        super(props);
    }

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

}

export default (OtherScreen);