import React from "react";
import { TouchableOpacity } from "react-native";

import Button from "./Button";
import Text from "./Text";
import commonStyles from "../commonStyles";
import { scaleSzie } from "../utils/func";
import styleConfigs from "../configs/style";

export default class ButtonSubmit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.onPress();
  }

  render() {
    const {
      width,
      title,
      titleColor,
      backgroundButton,
      borderButtonColor,
      disabled,
      styleButton,
      height,
    } = this.props;
    const temptHeight = height ? height : 40;
    return (
      <Button
        style={[
          {
            width: scaleSzie(width),
            height: scaleSzie(temptHeight),
            borderRadius: scaleSzie(40),
            backgroundColor: backgroundButton
              ? backgroundButton
              : styleConfigs.PURPLE_COLOR,
            borderWidth: scaleSzie(1),
            borderColor: borderButtonColor ? borderButtonColor : "transparent",
          },
          commonStyles.centerHorVer,
          styleButton,
        ]}
        onPress={this.onPress}
        disabled={disabled ? disabled : false}
        activeOpacity={disabled ? 1 : 0.5}
        {...this.props}
      >
        <Text
          style={{
            color: titleColor ? titleColor : "#ffffff",
            fontSize: scaleSzie(16),
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </Button>
    );
  }
}
