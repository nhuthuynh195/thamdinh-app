import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { Text, Button, ModalCustom, ButtonSubmit } from "@core/components";
import styleConfigs from "@configs/style";
import Configs from "@configs";
import { scaleSzie } from "@core/utils/func";

export const PopupConfirmReivew = (props) => {
  console.log("props", props);
  const { visible, nameClient } = props;
  return (
    <ModalCustom
      transparent={true}
      visible={visible}
      onRequestClose={() => props.closePopupConfirm()}
    >
      <View style={styles.containerPopup}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: scaleSzie(4),
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#424242",
                fontSize: scaleSzie(16),
                fontWeight: "600",
              }}
            >
              Bạn xác nhận muốn lưu thẩm định
            </Text>
            <Text
              style={{
                color: "#424242",
                fontSize: scaleSzie(16),
                fontWeight: "600",
              }}
            >
              KD của khách hàng {nameClient}
            </Text>
          </View>
          <View style={styles.containerButtonPopup}>
            <ButtonSubmit
              title="Huỷ"
              backgroundButton="#ffffff"
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={styleConfigs.PURPLE_COLOR}
              onPress={() => props.closePopupConfirm()}
            />
            <View style={{ width: scaleSzie(12) }} />
            <ButtonSubmit
              title="Xác nhận"
              backgroundButton={styleConfigs.PURPLE_COLOR}
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={"#ffffff"}
              onPress={() => props.confirmAssesment()}
            />
          </View>
        </View>
      </View>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  containerPopup: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(156),
    paddingHorizontal: scaleSzie(20),
  },
  containerButtonPopup: {
    height: scaleSzie(64),
    paddingHorizontal: scaleSzie(16),
    flexDirection: "row",
  },
});
