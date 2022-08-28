import React, { Component, memo } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import Text from "./Text";
const { width, height } = Dimensions.get("window");
import IMAGE from "@resources/icon";
import { scaleSzie } from "@core/utils/func";
export class Header extends Component {
  render() {
    const {
      gotoProfile,
      gotoNoti,
      gotoSearch,
      moneyLimit,
      payment,
      unreadNoti
    } = this.props;

    return (
      <View style={Style.Contain}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={() => gotoProfile()}
        >
          <Image
            style={{ width: scaleSzie(37), height: scaleSzie(37) }}
            source={IMAGE.profile}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => payment()}
          style={{
            flex: 5,
            justifyContent: "center",
            marginLeft: scaleSzie(10)
          }}
        >
          <Text style={{ color: "#828282", fontSize: scaleSzie(12) }}>
            Tiền mặt đang giữ
          </Text>
          <Text bold style={{ color: "#424242", fontSize: scaleSzie(20) }}>
            {moneyLimit} vnđ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.ViewSmall} onPress={() => gotoNoti()}>
          <Image
            style={Style.ImageSmall}
            resizeMode={"contain"}
            source={IMAGE.notification}
          />
          {unreadNoti > 0 ? (
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor: "red",
                borderRadius: 15 / 2,
                position: "absolute",
                top: 28,
                right: 5,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text bold style={{ color: "#FFF", fontSize: 8 }}>
                {unreadNoti > 99 ? 99 : unreadNoti}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity style={Style.ViewSmall} onPress={() => gotoSearch()}>
          <Image
            style={Style.ImageSmall}
            resizeMode={"contain"}
            source={IMAGE.search}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Style = StyleSheet.create({
  Contain: {
    flexDirection: "row",
    width: width,
    height: scaleSzie(100),
    paddingTop: scaleSzie(Platform.OS === "ios" ? 20 : 0),
    paddingHorizontal: scaleSzie(12)
  },
  ViewSmall: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ImageSmall: {
    width: scaleSzie(20),
    height: scaleSzie(20)
  }
});

export default memo(Header);
