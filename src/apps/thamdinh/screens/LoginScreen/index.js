import React from 'react';

import LayoutLogin from '@core/screens/LayoutLogin';
import { checkAllArrayIsNotEmpty } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class LoginScreen extends LayoutLogin {
  constructor(props) {
    super(props);
    this.state = {
      disableButtonLogin: true,
      userName: '',
      password: '',
      messageError: ''
    };

    this.login = this.login.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onFocusPassword = this.onFocusPassword.bind(this);

    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  onFocusPassword() {
    this.passwordRef.current.onFocusTextInput();
  }

  async changeUserName(userName) {
    await this.setState({
      userName
    });
  }

  async changePassword(password) {
    await this.setState({
      password
    });
  }

  login() {
    const { userName, password } = this.state;
    let isNotEmpty = checkAllArrayIsNotEmpty(password, userName);
    if (isNotEmpty) {
      this.props.actions.auth.login({
        // identity: 'ka873',
        // password: '123123'
        identity: userName,
        password: password
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { loginSuccess, profile } = this.props;
    if (loginSuccess && loginSuccess !== prevProps.loginSuccess) {
      this.props.actions.auth.resetStateLogin();
      if (profile.require_password_change) {
        this.props.navigation.navigate('ChangePassword');
      } else {
        this.props.navigation.navigate('Main');
      }
    }
  }
}

const mapStateToProps = state => ({
  loadingLogin: state.auth.loadingLogin,
  errorLogin: state.auth.errorLogin,
  loginSuccess: state.auth.loginSuccess,
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, LoginScreen);
