import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated, Dimensions, TouchableOpacity } from 'react-native';
import IMAGE from '@resources/icon';
const { width, height } = Dimensions.get('window');
import { scaleSzie } from '@utils/func';
export class expandViewInfo extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: IMAGE.dropupCircle,
      down: IMAGE.dropdownCircle
    };

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value()
    };
  }

  toggle() {
    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue
    }).start();
  }

  _setMaxHeight(event) {
    if (!this.state.maxHeight) {
      this.setState({
        maxHeight: event.nativeEvent.layout.height
      });
    }
  }

  _setMinHeight(event) {
    if (!this.state.minHeight) {
      this.setState({
        minHeight: event.nativeEvent.layout.height,
        animation: new Animated.Value(event.nativeEvent.layout.height)
      });
    }
  }

  render() {
    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up'];
    }

    let borderButton = '#f0f0f0';

    return (
      <Animated.View style={[{ backgroundColor: '#fafafa', overflow: 'hidden' }, { height: this.state.animation }]}>
        <View style={{ width: width }} onLayout={this._setMinHeight.bind(this)}>
          <View
            style={{
              width: width,
              height: scaleSzie(120),
              padding: scaleSzie(20),
              backgroundColor: '#FFF'
            }}
          >
          {this.props.viewHeader}
          </View>
        </View>
        <View style={{backgroundColor:'#FFF'}} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
        <View
          style={{
            width: width,
            height: scaleSzie(32),
            position: 'absolute',
            bottom: 0,
            backgroundColor: '#fafafa',
            zIndex: 1
          }}
        >
          <View style={{ flex: 1, backgroundColor: '#FFF', borderBottomColor: borderButton, borderBottomWidth: 1 }} />
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ position: 'absolute', right: 12, top: 4 }}
            onPress={this.toggle.bind(this)}
            underlayColor="#f1f1f1"
          >
            <Image style={{ width: scaleSzie(32), height: scaleSzie(32), resizeMode: 'cover' }} source={icon} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

export default expandViewInfo;
