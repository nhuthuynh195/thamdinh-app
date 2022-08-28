import React, { memo } from "react";
import { Text, StyleSheet } from "react-native";

const TextCustom = React.memo(function Row(props) {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[
        DefaultStyle.defaul,
        props.style,
        { fontFamily: props.bold ? "NunitoSans-Bold" : "NunitoSans-Regular" }
      ]}
    >
      {props.children}
    </Text>
  );
});

const DefaultStyle = StyleSheet.create({
  text: {
    color: "#4F4F4F"
  }
});

export default TextCustom;
