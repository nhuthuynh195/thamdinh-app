import React from "react";
import _ from "ramda";

import LayoutChangePasswordInit from "@core/screens/LayoutChangePasswordInit";
import { checkAllArrayIsNotEmpty } from "@core/utils/func";
import connectRedux from "../../redux/connectRedux";

class ChangePasswordScreen extends LayoutChangePasswordInit {
  constructor(props) {
    super(props);
    this.state = {
      passwordConfirm: "",
      password: "",
      messageError: ""
    };
    this.updatePassword = this.updatePassword.bind(this);
    this.changePasswordConfirm = this.changePasswordConfirm.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onFocusPasswordConfirm = this.onFocusPasswordConfirm.bind(this);

    this.passwordRef = React.createRef();
    this.passwordConfirmRef = React.createRef();
  }

  onFocusPasswordConfirm() {
    this.passwordConfirmRef.current.onFocusTextInput();
  }

  async changePassword(password) {
    await this.setState({
      password
    });
  }

  async changePasswordConfirm(passwordConfirm) {
    await this.setState({
      passwordConfirm
    });
  }

  async checkStack() {
    const { password, passwordConfirm } = this.state;
    this.props.actions.auth.changePassword({
      type: "new_staff",
      password: password,
      password_confirmation: passwordConfirm
    });
  }

  updatePassword() {
    const { password, passwordConfirm } = this.state;
    let isNotEmpty = checkAllArrayIsNotEmpty(password, passwordConfirm);
    let isValidPass = password === passwordConfirm;
    if (isNotEmpty) {
      if (isValidPass) {
        this.setState({
          messageError: ""
        });
        this.checkStack();
      } else {
        this.props.actions.auth.resetStateChangePassword();
        this.setState({
          messageError: "Mật khẩu mới không giống nhau"
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { changePasswordSuccess, profile } = this.props;
    if (
      changePasswordSuccess &&
      changePasswordSuccess !== prevProps.changePasswordSuccess
    ) {
      this.props.navigation.navigate("Main");
      const temptProfile = { ...profile, require_password_change: false };
      this.props.actions.dataLocal.updateProfileLocal(temptProfile);
      this.props.actions.auth.resetStateChangePassword();
    }
  }
}

const mapStateToProps = state => ({
  loadingChangePassword: state.auth.loadingChangePassword,
  errorChangePassword: state.auth.errorChangePassword,
  changePasswordSuccess: state.auth.changePasswordSuccess,
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, ChangePasswordScreen);
