import React from "react";
import { View, Image, Dimensions } from "react-native";
import Placeholder from "rn-placeholder";

import IMAGE from "@resources/icon";
const { width } = Dimensions.get("window");
import commonStyles from "@core/commonStyles";
import { scaleSzie } from "@utils/func";

const ItemHorizontal = props => {
  const style = { backgroundColor: props.bgColor };
  return (
    <View
      key={props.key}
      style={[
        {
          width: width - scaleSzie(24),
          height: scaleSzie(140),
          marginVertical: scaleSzie(5),
          backgroundColor: "#FFF",
          padding: scaleSzie(12),
          borderRadius: scaleSzie(4),
          marginHorizontal: scaleSzie(12)
        },
        commonStyles.shadowApp
      ]}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ flex: 2, justifyContent: "space-between", marginRight: 10 }}
        >
          <View
            style={{
              width: scaleSzie(128),
              height: scaleSzie(22),
              backgroundColor: "#DEDEDE",
              borderRadius: 2
            }}
          />
          <View
            style={{
              width: scaleSzie(280),
              height: scaleSzie(30),
              backgroundColor: "#DEDEDE",
              borderRadius: 2
            }}
          />
          <View
            style={{
              width: scaleSzie(180),
              height: scaleSzie(20),
              backgroundColor: "#DEDEDE",
              borderRadius: 2
            }}
          />
        </View>
        <View
          style={{
            width: scaleSzie(80),
            height: scaleSzie(80),
            borderRadius: scaleSzie(40),
            backgroundColor: "#DEDEDE"
          }}
        />
      </View>
      <View style={{ flexDirection: "row", marginTop: scaleSzie(10) }}>
        <View
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: 2,
            flex: 1,
            margin: 5
          }}
        />
        <View
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: 2,
            flex: 1,
            margin: 5
          }}
        />
        <View
          style={{
            backgroundColor: "#DEDEDE",
            borderRadius: 2,
            flex: 1,
            margin: 5
          }}
        />
        <View
          style={{
            backgroundColor: "#55529E",
            marginRight: scaleSzie(10),
            marginLeft: scaleSzie(3),
            marginTop: scaleSzie(10)
          }}
        />
        <View
          style={{
            width: scaleSzie(17),
            height: scaleSzie(24),
            backgroundColor: "#DEDEDE",
            borderRadius: 5
          }}
        />
      </View>
    </View>
  );
};

export default Placeholder.connect(ItemHorizontal);
