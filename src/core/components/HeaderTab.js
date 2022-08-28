import React, { Component } from 'react';
import { Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import IMAGE from '@resources/icon';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefautlTab from './DefautlTabBar';
import { scaleSzie } from '@utils/func';
export class HeaderTab extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#000', borderBottomWidth: 1 }}>
        <TouchableOpacity style={{ position: 'absolute', left: scaleSzie(12), zIndex: 1 }} onPress={() => this.props.gotoSort()}>
          <Image style={{ width: scaleSzie(20), height: scaleSzie(20) }} source={IMAGE.sort} />
        </TouchableOpacity>
        <ScrollableTabView
          renderTabBar={() => <DefautlTab tabWidth={scaleSzie(100)} style={{ marginLeft: scaleSzie(40) }} />}
          onChangeTab={(index) => this.props.onChangeTab && this.props.onChangeTab(index)}
        >
          {this.props.children}
        </ScrollableTabView>
        {
          this.props.isHideMap ? <View /> : <TouchableOpacity style={{ position: 'absolute', right: scaleSzie(12), zIndex: 1 }} onPress={() => this.props.gotoMap()}>
            <Image style={{ width: scaleSzie(29), height: scaleSzie(29), bottom: 10 }} source={IMAGE.map} />
          </TouchableOpacity>
        }

      </View>
    );
  }
}

export default HeaderTab;
