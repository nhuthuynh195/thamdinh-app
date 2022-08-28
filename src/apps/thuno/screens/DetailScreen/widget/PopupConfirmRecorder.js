import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

import { Text, Button, ModalCustom, ButtonSubmit } from "@core/components";
import styleConfigs from "@configs/style";
import Configs from "@configs";
import { scaleSzie } from "@core/utils/func";

const PopupConfirmRecorder = props => {
  const { visible } = props;
  return (
    <ModalCustom transparent={true} visible={visible} onRequestClose={() => {}}>
      <View style={styles.containerPopup}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            borderRadius: scaleSzie(4)
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#424242",
                fontSize: scaleSzie(16),
                fontWeight: "600"
              }}
            >
              Bạn muốn gửi đoạn ghi âm?
            </Text>
          </View>
          <View style={styles.containerButtonPopup}>
            <ButtonSubmit
              title="Huỷ"
              backgroundButton="#ffffff"
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={styleConfigs.PURPLE_COLOR}
              onPress={() => props.cancelAudio()}
            />
            <View style={{ width: scaleSzie(12) }} />
            <ButtonSubmit
              title="Nghe Lại"
              backgroundButton={styleConfigs.PURPLE_COLOR}
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={"#ffffff"}
              onPress={() => props.reListen()}
            />
            <View style={{ width: scaleSzie(12) }} />
            <ButtonSubmit
              title="Gửi"
              backgroundButton={styleConfigs.PURPLE_COLOR}
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={"#ffffff"}
              onPress={() => props.submitAudio()}
            />
          </View>
        </View>
      </View>
    </ModalCustom>
  );
};

export default PopupConfirmRecorder;

const styles = StyleSheet.create({
  containerPopup: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(156),
    paddingHorizontal: scaleSzie(20)
  },
  containerButtonPopup: {
    height: scaleSzie(64),
    paddingHorizontal: scaleSzie(16),
    flexDirection: "row"
  }
});
