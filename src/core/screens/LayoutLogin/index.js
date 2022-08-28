import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import styles from './styles';
import { ButtonSubmit, TextInput } from '../../components';
import styleConfigs from '@configs/style';
import { scaleSzie, checkAllArrayIsNotEmpty } from '@utils/func';
import IMAGE from '@resources/icon';

export default class LayoutLogin extends React.Component {
  render() {
    const { userName, password, messageError } = this.state;
    const disableButtonLogin = !checkAllArrayIsNotEmpty(userName, password);
    return (
      <View style={[styles.container]}>
        <View style={{ height: scaleSzie(85) }} />
        <Image source={IMAGE.logoKimAn} style={styles.logo} />
        <View style={{ height: scaleSzie(60) }} />
        <Text style={styles.textLogin}>Đăng nhập</Text>
        <View style={{ height: scaleSzie(30) }} />
        <TextInput
          ref={this.usernameRef}
          placeholder="Mã nhân viên"
          borderColorActive={styleConfigs.PURPLE_COLOR}
          borderColorUnActive="rgb(220,220,220)"
          iconActive={IMAGE.usernameActive}
          iconUnActive={IMAGE.usernameUnActive}
          value={userName}
          onChangeText={this.changeUserName}
          onSubmitEditing={this.onFocusPassword}
        />
        <View style={{ height: scaleSzie(30) }} />
        <TextInput
          ref={this.passwordRef}
          placeholder="Mật khẩu"
          borderColorActive={styleConfigs.PURPLE_COLOR}
          borderColorUnActive="rgb(220,220,220)"
          iconActive={IMAGE.passwordActive}
          iconUnActive={IMAGE.passwordUnActive}
          secureTextEntry={true}
          value={password}
          onChangeText={this.changePassword}
          onSubmitEditing={this.login}
        />
        <View style={{ height: scaleSzie(40), justifyContent: 'center' }}>
          <Text style={styles.textError}>{this.props.errorLogin}</Text>
        </View>
        <ButtonSubmit
          width={150}
          title="Đăng nhập"
          onPress={this.login}
          backgroundButton={disableButtonLogin ? '#C8C8C8' : null}
          disabled={disableButtonLogin}
        />
        {/* <Loading visible={this.props.loadingLogin} /> */}
      </View>
    );
  }
}
