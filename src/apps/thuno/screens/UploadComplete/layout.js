import React from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";
import styleConfigs from "@configs/style";
import { scaleSzie } from "@utils/func";
import Modal from "react-native-modal";
import { ButtonSubmit, Text, ModalCustom } from "@core/components";
const { width } = Dimensions.get("window");
import IMAGE from "@resources/icon";

export default class Layout extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: styleConfigs.BACKGROUND_COLOR_CONTAINER
        }}
      >
        {this.renderUploadSuccess()}
      </View>
    );
  }

  renderUploadSuccess() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderModalCallManager()}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={IMAGE.updateSuccess} />
          <Text
            bold
            style={{ marginVertical: scaleSzie(20) }}
          >{`Biên nhận của bạn đã được đăng`}</Text>
          <Text
            bold
            style={{ textAlign: "center" }}
          >{`Vui lòng liên hệ quản lý trực tiếp \n của bạn để xác nhận và phê duyệt`}</Text>
        </View>
        <ButtonSubmit
          styleButton={{
            alignSelf: "center",
            marginTop: scaleSzie(70),
            marginBottom: scaleSzie(24)
          }}
          width={scaleSzie(172)}
          title="Gọi quản lý"
          onPress={this.changeStatusCallManger}
        />
        <TouchableOpacity onPress={this.backToRoot}>
          <Text
            style={{
              alignSelf: "center",
              marginBottom: scaleSzie(24),
              color: "#55529E"
            }}
            bold
          >{`Tải lại`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderModalError() {
    const { isModalError } = this.state;
    return (
      <ModalCustom
        transparent={true}
        visible={isModalError}
        onRequestClose={() => {}}
      >
        <View
          style={{
            height: scaleSzie(158),
            width: scaleSzie(width - 40),
            marginHorizontal: scaleSzie(20),
            backgroundColor: "#FFF",
            padding: scaleSzie(20),
            borderRadius: scaleSzie(5)
          }}
        >
          <Text
            style={{
              color: "#424242",
              fontSize: scaleSzie(16),
              fontWeight: "600",
              flex: 1,
              textAlign: "center"
            }}
          >
            {`Đăng biên nhận không thành công do \n lỗi mạng. Xin hãy đăng lại.`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <ButtonSubmit
              title="Huỷ"
              backgroundButton="#ffffff"
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={styleConfigs.PURPLE_COLOR}
              onPress={this.changeStatusModalError}
            />
            <View style={{ width: scaleSzie(12) }} />
            <ButtonSubmit
              title="Lưu"
              backgroundButton={styleConfigs.PURPLE_COLOR}
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={"#ffffff"}
              onPress={this.changeStatusModalError}
            />
          </View>
        </View>
      </ModalCustom>
    );
  }

  renderModalCallManager() {
    const { isModalCallManger } = this.state;
    return (
      <ModalCustom
        transparent={true}
        visible={isModalCallManger}
        onRequestClose={() => {}}
      >
        {this.renderModalPhone()}
        <View
          style={{
            height: scaleSzie(138),
            width: scaleSzie(width - 40),
            marginHorizontal: scaleSzie(20),
            backgroundColor: "#FFF",
            padding: scaleSzie(20),
            borderRadius: scaleSzie(5)
          }}
        >
          <Text
            style={{
              color: "#424242",
              fontSize: scaleSzie(16),
              fontWeight: "600",
              flex: 1,
              textAlign: "center"
            }}
          >
            {`Bạn đã được xác nhận từ quản lý chưa ?`}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <ButtonSubmit
              title="Huỷ"
              backgroundButton="#ffffff"
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={styleConfigs.PURPLE_COLOR}
              onPress={this.changeStatusCallManger}
            />
            <View style={{ width: scaleSzie(12) }} />
            <ButtonSubmit
              title="Gọi quản lý"
              backgroundButton={styleConfigs.PURPLE_COLOR}
              styleButton={{ flex: 1 }}
              borderButtonColor={styleConfigs.PURPLE_COLOR}
              titleColor={"#ffffff"}
              onPress={() => this.setState({ isModalPhone: true })}
            />
          </View>
        </View>
      </ModalCustom>
    );
  }

  renderModalPhone() {
    const { isModalPhone } = this.state;
    let profile = this.props.profile;
    return (
      <Modal
        onBackdropPress={() => this.setState({ isModalPhone: false })}
        isVisible={isModalPhone}
      >
        <View
          style={{
            width: width - 40,
            marginVertical: 20,
            padding: 20,
            alignItems: "center",
            backgroundColor: "#FFF",
            borderRadius: 5
          }}
        >
          {profile.leaders.length > 0 ? (
            profile.leaders.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.callManager(item.mobile_phone)}
                style={{ flexDirection: "row" }}
              >
                <Text bold style={{ flex: 1 }}>
                  {item.name}
                </Text>
                <Text bold>{item.mobile_phone}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text bold>Bạn không có quản lý</Text>
          )}
        </View>
      </Modal>
    );
  }
}
