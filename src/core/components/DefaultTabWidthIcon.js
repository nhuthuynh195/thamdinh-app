import Text from './Text';
import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { scaleSzie } from '@utils/func';
const { width } = Dimensions.get('window');
export default class DefaultTabBar extends Component {
  renderTab(name, page, isTabActive, onPressHandler, props) {
    const { textStyle, arrayImage, disableLineCenter, flexIcon } = props;
    const textColor = isTabActive ? '#424242' : 'rgba(106, 106, 106, 0.5)';
    const Size = isTabActive ? scaleSzie(13) : scaleSzie(13);
    let active = isTabActive ? 'active' : 'inActive';

    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row' }}
        key={name}
        accessible={true}
        activeOpacity={0.9}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, { flex: 1, flexDirection: flexIcon ? flexIcon : 'row' }]}>
          <Image style={{ marginRight: scaleSzie(5) }} source={arrayImage[page][active]} />
          <Text style={[{ color: textColor, fontSize: Size }, textStyle]}>{name}</Text>
        </View>
        {disableLineCenter == true ? null : <View style={{ width: 1, height: scaleSzie(40), backgroundColor: '#f0f0f0' }} />}
      </TouchableOpacity>
    );
  }

  render() {
    const { tabHeight } = this.props;
    return (
      <View style={[styles.tabs, { ...this.props.style }, { height: tabHeight ? tabHeight : scaleSzie(50) }]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage, { ...this.props });
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row'
  }
});

module.exports = DefaultTabBar;
