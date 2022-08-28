import React, { Component, memo } from 'react';
import { View, Dimensions, Image, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
import Text from './Text';
const { width, height } = Dimensions.get('window');
import IMAGE from '@resources/icon';
import { scaleSzie } from '@core/utils/func';
import CommonStyle from '../commonStyles';
import Button from './Button';

export class HeaderSearch extends Component {
  render() {
    return (
      <View style={Style.Contain}>
        <TouchableOpacity onPress={() => this.props.goBack()} style={{ flex: 1, justifyContent: 'center' }}>
          <Image source={IMAGE.back} style={{ width: scaleSzie(12), height: scaleSzie(22) }} />
        </TouchableOpacity>
        <View
          style={[
            {
              height: scaleSzie(40),
              flex: 9,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              borderRadius: scaleSzie(4),
              alignSelf: 'center',
              paddingHorizontal: scaleSzie(12)
            },
            CommonStyle.shadowApp
          ]}
        >
          <Button onPress={() => this.props.search()} style={{ width: scaleSzie(40), justifyContent: 'center' }} >
            <Image source={IMAGE.searchBox} style={{ width: scaleSzie(20), height: scaleSzie(20) }} />
          </Button>
          <TextInput
            ref={ref => {
              this.InputSearch = ref;
            }}
            onChangeText={e => this.props.onChangeText(e)}
            style={{
              flex: 1, fontFamily: 'NunitoSans-Regular',
              ...Platform.select({
                android: {
                  padding: 0,
                  margin: 0,
                }
              })
            }}
            placeholderTextColor={'rgba(66,66,66,0.5)'}
            placeholder={'Tên khách hàng'}
            onSubmitEditing={() => this.props.onSubmitEditing()}
          />
          {
            this.props.showIconClearText ? <TouchableOpacity
              onPress={this.clearText}
              style={{ height: scaleSzie(40), width: scaleSzie(40), justifyContent: 'center', alignItems: 'flex-end' }}
            >
              <Image style={{}} source={require('@resources/icon/clearText.png')} />
            </TouchableOpacity> : null
          }

        </View>
      </View>
    );
  }

  clearText = () => {
    this.InputSearch.clear();
    this.props.clearText()
  };
}

const Style = StyleSheet.create({
  Contain: {
    flexDirection: 'row',
    width: width,
    height: scaleSzie(100),
    paddingTop: scaleSzie(Platform.OS === 'ios' ? 40 : 0),
    paddingHorizontal: scaleSzie(12)
  }
});

export default memo(HeaderSearch);
