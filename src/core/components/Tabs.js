import React, { Component, memo } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefautlTab from './DefautlTabBar';
import { View, Text } from 'react-native';
export class Tabs extends Component {
  render() {
    const { tabWidth, style, itemRight, itemLeft, left } = this.props;
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {itemLeft ? <View style={{ position: 'absolute', left: 12, zIndex: 1, alignItems: 'center' }}>{itemLeft}</View> : null}
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <DefautlTab tabWidth={tabWidth} style={style} left={left}/>} 
         onChangeTab={(index) => this.props.onChangeTab && this.props.onChangeTab(index)}
        >
          {this.props.children}
        </ScrollableTabView>
        {itemRight ? <View style={{ position: 'absolute', right: 12, zIndex: 1, alignItems: 'center' }}>{itemRight}</View> : null}

      </View>
    );
  }
}

export default memo(Tabs);
