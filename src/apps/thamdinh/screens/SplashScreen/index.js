import React from 'react';
import { timer } from 'rxjs';
import _ from 'ramda';

import LayoutSplash from '@core/screens/LayoutSplash';
import { checkAllArrayIsNotEmpty } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class SplashScreen extends LayoutSplash {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      const { profile } = this.props;
      if (!_.isEmpty(profile)) {
        if (profile.require_password_change) {
          this.props.navigation.navigate('ChangePassword');
        } else {
          this.props.navigation.navigate('Main');
        }
      } else {
        this.props.navigation.navigate('Login');
      }
  }

}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, SplashScreen);
