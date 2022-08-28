import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";

import { scaleSzie, isIphoneX, formatTimeRecorder } from "@core/utils/func";
import Configs from "@core/configs";
import Button from "./Button";
import Text from "./Text";
import IMAGE from "@core/resources/icon";

export default class HeaderScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeRecoder: 0,
    };
    this.onPressLeft = this.onPressLeft.bind(this);
    this.onPressRight = this.onPressRight.bind(this);
    this.stopRecorder = this.stopRecorder.bind(this);
  }

  onProgressRecorder(time) {
    this.setState({
      timeRecoder: time,
    });
  }

  stopRecorder() {
    this.props.stopRecorder();
  }

  onPressLeft() {
    this.props.onPressLeft();
  }

  onPressRight() {
    this.props.onPressRight();
  }

  renderLeftButton() {
    const { leftIcon, styleLeftIcon } = this.props;
    if (leftIcon) {
      return (
        <Button
          onPress={this.onPressLeft}
          style={{
            width: scaleSzie(40),
            padding: scaleSzie(12),
          }}
        >
          <Image source={leftIcon} style={styleLeftIcon} />
        </Button>
      );
    }
    return null;
  }

  renderRightButton() {
    const {
      rightIcon,
      styleRightIcon,
      countRecoder,
      // timeRecoder
    } = this.props;
    const { timeRecoder } = this.state;
    if (rightIcon && !countRecoder) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingBottom: scaleSzie(16),
          }}
        >
          <Button
            onPress={this.onPressRight}
            style={{
              width: scaleSzie(40),
              alignItems: "flex-end",
              padding: scaleSzie(12),
            }}
          >
            <Image source={rightIcon} style={styleRightIcon} />
          </Button>
        </View>
      );
    } else if (countRecoder) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            paddingBottom: scaleSzie(16),
          }}
        >
          <Button
            onPress={this.stopRecorder}
            style={{
              width: scaleSzie(85),
              height: scaleSzie(31),
              borderWidth: scaleSzie(1),
              borderColor: "#5F5EA3",
              borderRadius: scaleSzie(4),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: scaleSzie(12),
                fontWeight: "600",
                color: "#424242",
              }}
            >
              {`${formatTimeRecorder(timeRecoder)}`}
            </Text>
            <View style={{ width: scaleSzie(8) }} />
            <Image
              source={IMAGE.countRecord}
              style={{ width: scaleSzie(16), height: scaleSzie(16) }}
            />
          </Button>
        </View>
      );
    }
    return null;
  }

  renderTitle() {
    const { title } = this.props;
    if (title) {
      return <Text style={styles.usernameTitleText}>{title}</Text>;
    }
    return null;
  }

  render() {
    const styleHeaderIphoneX = isIphoneX() ? { height: scaleSzie(100) } : null;
    return (
      <View style={[styles.containerHeader, styleHeaderIphoneX]}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              paddingBottom: scaleSzie(16),
            }}
          >
            {this.renderLeftButton()}
          </View>
          <View style={styles.usernameTitle}>{this.renderTitle()}</View>
          <View
            style={{
              flex: 1,
            }}
          >
            {this.renderRightButton()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    height: scaleSzie(75),
    width: Configs.FULL_WIDTH,
    backgroundColor: "#ffffff",
    paddingHorizontal: scaleSzie(12),
    borderBottomColor: "#C8C8C8",
    ...Platform.select({
      ios: {
        borderBottomWidth: scaleSzie(0.5),
      },
      android: {
        borderBottomWidth: scaleSzie(1),
      },
    }),
  },
  header: {
    flex: 1,
    flexDirection: "row",
  },
  usernameTitle: {
    justifyContent: "flex-end",
    paddingBottom: scaleSzie(15),
  },
  usernameTitleText: {
    color: "#424242",
    fontSize: scaleSzie(18),
    fontWeight: "bold",
  },
  iconRecord: {
    width: scaleSzie(16),
    height: scaleSzie(22),
  },
  iconBack: {
    width: scaleSzie(12),
    height: scaleSzie(22),
  },
});
