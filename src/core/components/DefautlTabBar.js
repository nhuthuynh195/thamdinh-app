const React = require('react');
const { ViewPropTypes } = (ReactNative = require('react-native'));
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const { StyleSheet, View, Animated, TouchableOpacity } = ReactNative;
import Text from './Text';
const TAB_WIDHT = 80;

import { scaleSzie } from '@utils/func';

const DefaultTabBar = createReactClass({
  renderTab(name, page, isTabActive, onPressHandler) {
    const { textStyle } = this.props;
    const textColor = isTabActive ? '#55529E' : '#B2B2B2';
    const textBold = isTabActive? 'bold': '600'
    return (
      <TouchableOpacity
        style={{ width: this.props.tabWidth }}
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, { width: this.props.tabWidth }]}>
          <Text  style={[{ color: textColor, fontSize:  scaleSzie(16),fontWeight: textBold, }, textStyle]}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    const { left } = this.props;
    const tabUnderlineStyle = {
      position: 'absolute',
      marginLeft: left,
      width: this.props.tabWidth,
      height: 2,
      backgroundColor: 'navy',
      bottom: 0
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.tabWidth]
    });
    return (
      <View style={[styles.tabs, { paddingLeft: left }, { ...this.props.style }]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }]
            },
            this.props.underlineStyle
          ]}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5
  },
  tabs: {
    height: 25,
    marginBottom: 10,
    flexDirection: 'row'
  }
});

module.exports = DefaultTabBar;
