'use strict';

import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';

import PlaceHolderItem from './PlaceHolderItem';

export default class extends Component {
  render() {
    return (
      <View style={{}}>
        {['1', '2', '3', '4', '5'].map(item => (
          <PlaceHolderItem key={'H_' + item} onReady={false} bgColor={'#FFF'} animate="fade" />
        ))}
      </View>
    );
  }
}
