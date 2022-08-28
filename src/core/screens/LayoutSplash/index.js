import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import Shimmer from 'react-native-shimmer';

import styles from './styles';
import { ButtonSubmit, TextInput, FloatingButton, ModalContent, Text, BottomTab } from '../../components';
import styleConfigs from '@configs/style';
import { scaleSzie, checkAllArrayIsNotEmpty } from '@utils/func';
import IMAGE from '@resources/icon';


export default class LayoutLogin extends React.Component {

  render() {
    return (
      <View style={[styles.container]}>
        <Shimmer >
          <Image source={IMAGE.logoKimAn} style={{}} />
        </Shimmer>
        <Shimmer>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: scaleSzie(38), marginBottom: scaleSzie(20) }} >
            Kim An
        </Text>
        </Shimmer>
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
    );
  }
}
