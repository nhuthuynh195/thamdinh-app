import React from 'react';
import _ from 'ramda';

import LayoutChangePassword from '@core/screens/LayoutChangePassword';
import { checkAllArrayIsNotEmpty } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class ChangePasswordScreen extends LayoutChangePassword {

    constructor(props) {
        super(props);
        this.state = {
            passwordConfirm: '',
            password: '',
            currentPassword: '',
            messageError: ''
        }
        this.updatePassword = this.updatePassword.bind(this);
        this.changePasswordConfirm = this.changePasswordConfirm.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onFocusPasswordConfirm = this.onFocusPasswordConfirm.bind(this);
        this.onFocusPassword = this.onFocusPassword.bind(this);
        this.backProfile = this.backProfile.bind(this);
        this.changeCurrentPassword = this.changeCurrentPassword.bind(this);

        this.currentPasswordRef = React.createRef();
        this.passwordRef = React.createRef();
        this.passwordConfirmRef = React.createRef();

    }

    onFocusPasswordConfirm() {
        this.passwordConfirmRef.current.onFocusTextInput();
    }

    async changeCurrentPassword(currentPassword) {
        await this.setState({
            currentPassword
        })
    }

    backProfile() {
        this.props.navigation.goBack();
    }

    onFocusPassword() {
        this.passwordRef.current.onFocusTextInput();
    }

    async  changePassword(password) {
        await this.setState({
            password
        })
    }

    async  changePasswordConfirm(passwordConfirm) {
        await this.setState({
            passwordConfirm
        })
    }

    checkStack() {
        const { password, passwordConfirm, currentPassword } = this.state;
        this.props.actions.auth.changePassword({
            current_password: currentPassword,
            password: password,
            password_confirmation: passwordConfirm
        })
    }

    updatePassword() {
        const { password, passwordConfirm } = this.state;
        let isNotEmpty = checkAllArrayIsNotEmpty(password, passwordConfirm);
        let isValidPass = password === passwordConfirm;
        if (isNotEmpty) {
            if (isValidPass) {
                this.setState({
                    messageError: ''
                });
                this.checkStack()
            } else {
                this.props.actions.auth.resetStateChangePassword();
                this.setState({
                    messageError: 'Mật khẩu xác nhận không trùng khớp!'
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { changePasswordSuccess, profile } = this.props;
        if (changePasswordSuccess && changePasswordSuccess !== prevProps.changePasswordSuccess) {
            this.props.navigation.goBack();
            this.props.actions.auth.resetStateChangePassword()
        }
    }


}

const mapStateToProps = state => ({
    loadingChangePassword: state.auth.loadingChangePassword,
    errorChangePassword: state.auth.errorChangePassword,
    changePasswordSuccess: state.auth.changePasswordSuccess,
    profile: state.dataLocal.profile
})

export default connectRedux(mapStateToProps, ChangePasswordScreen);
