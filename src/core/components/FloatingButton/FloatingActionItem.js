import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, Animated } from 'react-native';
import { scaleSzie } from '@utils/func';
import { getTouchableComponent } from './utils/touchable';

class FloatingActionItem extends Component {
  constructor(props) {
    super(props);

    this.animation = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      Animated.spring(this.animation, { toValue: nextProps.active ? 1 : 0 }).start();
    }
  }

  handleOnPress = () => {
    const { name, onPress } = this.props;

    onPress(name);
  };

  renderText() {
    const {
      elevation,
      text,
      position,
      textElevation,
      textBackground,
      textColor,
      textStyle,
      textProps,
      textContainerStyle
    } = this.props;

    if (elevation !== undefined) {
      console.warn('FloatingActionItem: "elevation" property was deprecated. Please use "textElevation"');
    }

    if (text) {
      return (
        <View
          key="text"
          style={[
            styles.textContainer,
            styles[`${position}TextContainer`],
            {
              backgroundColor: textBackground,
              elevation: textElevation || elevation
            },
            textContainerStyle
          ]}
        >
          <Text
            style={[
              styles.text,
              {
                fontWeight: 'bold',
                color: textColor
              },
              textStyle
            ]}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      );
    }

    return null;
  }

  renderButton() {
    const { icon, color } = this.props;

    let iconStyle;

    if (icon && icon.uri) {
      iconStyle = styles.iconLogo;
    } else {
      iconStyle = styles.icon;
    }

    return (
      <View key="button" style={[styles.button, { backgroundColor: color }]}>
        {React.isValidElement(icon) ? icon : <Image style={iconStyle} source={icon} />}
      </View>
    );
  }

  render() {
    const { position, distanceToEdge, paddingTopBottom, render, margin, name } = this.props;
    const Touchable = getTouchableComponent(false);

    const animatedActionContainerStyle = {
      marginBottom: this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 10]
      })
    };

    const components = [];
    const distanceToEdgeActionContainer = {};

    if (position === 'left') {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderButton());
        components.push(this.renderText());
      }
      distanceToEdgeActionContainer.paddingLeft = distanceToEdge + margin;
    } else if (position === 'right') {
      if (render) {
        components.push(render({ key: name }));
      } else {
        components.push(this.renderText());
        components.push(this.renderButton());
      }
      distanceToEdgeActionContainer.paddingRight = distanceToEdge + margin;
    } else if (render) {
      components.push(render({ key: name }));
    } else {
      components.push(this.renderButton());
    }

    return (
      <Touchable activeOpacity={0.4} style={styles.container} onPress={this.handleOnPress}>
        <Animated.View
          style={[
            styles.actionContainer,
            animatedActionContainerStyle,
            styles[`${position}ActionContainer`],
            distanceToEdgeActionContainer
          ]}
        >
          {components}
        </Animated.View>
      </Touchable>
    );
  }
}

FloatingActionItem.defaultProps = {
  color: '#FFF',
  textColor: '#FFF',
  margin: 8
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    flex: 1,
    flexDirection: 'column'
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  centerActionContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  textContainer: {
    paddingHorizontal: 8,
    shadowOpacity: 0.35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 4,
    height: 22,
    marginTop: 8
  },
  leftTextContainer: {
    marginLeft: 14
  },
  rightTextContainer: {
    marginRight: 14
  },
  text: {
    fontSize: 14,
    lineHeight: 20
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: scaleSzie(35),
    height: scaleSzie(35)
  },
  iconLogo: {
    resizeMode: 'cover',
    width: scaleSzie(50),
    height: scaleSzie(50),
    borderRadius: scaleSzie(25)
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20
  }
});

export default FloatingActionItem;
