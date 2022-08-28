import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';

import styles from './styles';
import {
    ButtonSubmit,
    TextInput,
    Loading
} from '../../components';
import styleConfigs from '@configs/style';
import { scaleSzie,checkAllArrayIsNotEmpty } from '@utils/func';
import IMAGE from '@resources/icon';


export default class LayoutChangePassword extends React.Component {

    render() {
        const {
            passwordConfirm,
            password,
            messageError
        } = this.state;
        const {errorChangePassword} = this.props;
        const disableChangePassword = !checkAllArrayIsNotEmpty(password,passwordConfirm);
        const temptError = errorChangePassword === '' ? messageError : errorChangePassword;
        return (
            <View style={styles.container}>
                <View style={{ height: scaleSzie(85) }} />
                <Image
                    source={IMAGE.logoKimAn}
                    style={styles.logo}
                />
                <View style={{ height: scaleSzie(60) }} />
                <Text style={styles.textLogin} >
                Đổi mật khẩu 
                </Text>
                <View style={{ height: scaleSzie(30) }} />
                <TextInput
                    ref={this.passwordRef}
                    placeholder="Mật khẩu mới"
                    borderColorActive={styleConfigs.PURPLE_COLOR}
                    borderColorUnActive="rgb(220,220,220)"
                    iconActive={IMAGE.passwordActive}
                    iconUnActive={IMAGE.passwordUnActive}
                    value={password}
                    onChangeText={this.changePassword}
                    onSubmitEditing={this.onFocusPasswordConfirm}
                    secureTextEntry={true}
                />
                <View style={{ height: scaleSzie(30) }} />
                <TextInput
                    ref={this.passwordConfirmRef}
                    placeholder="Xác nhận mật khẩu mới"
                    borderColorActive={styleConfigs.PURPLE_COLOR}
                    borderColorUnActive="rgb(220,220,220)"
                    iconActive={IMAGE.passwordActive}
                    iconUnActive={IMAGE.passwordUnActive}
                    secureTextEntry={true}
                    value={passwordConfirm}
                    onChangeText={this.changePasswordConfirm}
                    onSubmitEditing={this.updatePassword}
                />
                <View style={{
                    height: scaleSzie(60),
                    justifyContent: 'center'
                }} >
                    <Text style={styles.textError} >
                        {temptError}
                    </Text>
                </View>
                <ButtonSubmit
                    width={150}
                    title="Lưu"
                    onPress={this.updatePassword}
                    backgroundButton={disableChangePassword ? '#C8C8C8' : null}
                    disabled={disableChangePassword}
                />
                <Loading visible={this.props.loadingChangePassword} />
            </View>
        );
    }
}