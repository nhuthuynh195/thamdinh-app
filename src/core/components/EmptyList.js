import React from "react";

import { View, Image, Text, Dimensions } from "react-native";
import IMAGE from "@resources/icon";

const { width } = Dimensions.get("window");

const EmptyListLoans = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: (width - 120) / 2
      }}
    >
      <Image source={IMAGE.emptyListLoans} />
      <Text bold style={{ fontSize: 20, color: "#9d9d9d", marginTop: 10 }}>
        {props.text ? props.text : "Danh sách thu nợ trống"}
      </Text>
    </View>
  );
};

export default EmptyListLoans;
