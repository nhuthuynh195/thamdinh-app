import React, { Component, memo } from 'react';
import ScrollableTabView from './TabContainer';
import DefaultTabWidthIcon from './DefaultTabWidthIcon';
import { View, Text } from 'react-native';
export class BottomTab extends Component {
  render() {
    const {
      tabWidth,
      style,
      itemRight,
      itemLeft,
      left,
      arrayImage,
      tabHeight,
      disableLineCenter,
      flexIcon,
      textStyle,
      initialPage
    } = this.props;
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <ScrollableTabView
          tabBarPosition={'bottom'}
          locked
          style={{ flex: 1 }}
          initialPage={initialPage}
          renderTabBar={() => (
            <DefaultTabWidthIcon
              textStyle={textStyle}
              tabWidth={tabWidth}
              flexIcon={flexIcon}
              disableLineCenter={disableLineCenter}
              tabHeight={tabHeight}
              arrayImage={arrayImage}
              style={style}
              left={left}
            />
          )}
        >
          {this.props.children}
        </ScrollableTabView>
      </View>
    );
  }
}

export default memo(BottomTab);
