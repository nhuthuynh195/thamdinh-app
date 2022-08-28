import React from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";

import PropTypes from "prop-types";
import Modal from "react-native-modal";

import IMAGE from "@resources/icon";
import { scaleSzie, formatMoney } from "@utils/func";
import { ButtonSubmit, Text, Picker, ModalCustom } from "@core/components";
import styleConfigs from "@configs/style";
import commonStyles from "@core/commonStyles";
const { width } = Dimensions.get("window");

export default class Layout extends React.Component {
  render() {
    const readLimitList = this.props.readLimitList;
    const { uploadSuccess } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: styleConfigs.BACKGROUND_COLOR_CONTAINER
        }}
      >
        {uploadSuccess == false ? (
          <View style={{ flex: 1 }}>
            <ViewTop money={`${formatMoney(readLimitList.collected_amount)}`} />
            {this.renderContent()}
            <ButtonSubmit
              styleButton={{
                alignSelf: "center",
                marginTop: scaleSzie(70),
                marginBottom: scaleSzie(24)
              }}
              width={scaleSzie(172)}
              title="Đăng biên nhận"
              onPress={this.UploadReceipt}
            />
            {this.renderModalError()}
          </View>
        ) : (
          this.renderUploadSuccess()
        )}
        {this.renderModalSelectOrg()}
      </View>
    );
  }

  renderModalSelectOrg = () => {
    return (
      <Modal
        isVisible={this.state.visiblePickerOrg}
        onBackButtonPress={() => this.setState({ visiblePickerOrg: false })}
      >
        <View
          style={{
            flex: 2,
            marginVertical: 100,
            backgroundColor: "#FFF",
            borderRadius: 5
          }}
        >
          <TextInput
            placeholder={"Nhập tên chi nhánh ..."}
            onChangeText={e => this.search(e)}
            style={{
              paddingHorizontal: 10,
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              height: 50,
              marginTop: 10,
              marginHorizontal: 10
            }}
          />
          <View style={{ flex: 8 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.listOrg}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.selectItemOrg(item)}
                  style={{
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: "#f0f0f0",
                    flexDirection: "row"
                  }}
                >
                  <Text style={{ flex: 1 }} bold>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

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
          >{`Đăng biên nhận thành công`}</Text>
          <Text
            bold
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

  renderContent() {
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "#FFF",
            borderRadius: scaleSzie(5),
            margin: scaleSzie(20),
            padding: scaleSzie(20),
            justifyContent: "center"
          },
          commonStyles.shadowApp
        ]}
      >
        <Text bold style={{ color: "#5F5EA3" }}>
          Chi nhánh
        </Text>
        <TouchableOpacity
          onPress={() => this.setState({ visiblePickerOrg: true })}
          style={{
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#868686", fontSize: scaleSzie(14) }}>
            {this.state.OrgSelect && this.state.OrgSelect.name
              ? this.state.OrgSelect.name
              : "Chọn chi nhánh"}
          </Text>
          <Image
            source={IMAGE.dropdownBrown}
            style={{ width: scaleSzie(13), height: scaleSzie(7), margin: 5 }}
          />
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.arrayImage}
          renderItem={({ item, index }) => (
            <ItemImage
              onPress={() => this.deleteImage(index)}
              key={index}
              item={item}
              // onPress={this.changeStatusModalError}
            />
          )}
        />
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={this.selectImage}
        >
          <Image style={{ marginRight: 5 }} source={IMAGE.camera2} />
          <Text bold style={{ color: "#a0a0a0" }}>
            Chụp ảnh
          </Text>
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
              onPress={this.changeStatusCallManger}
            />
          </View>
        </View>
      </ModalCustom>
    );
  }
}

const ViewTop = function({ money }) {
  return (
    <View style={{ marginTop: scaleSzie(80), alignItems: "center" }}>
      <Text>
        Tổng tiền hiện đã thu được:{" "}
        <Text bold style={{ color: "#55529E" }}>
          {" "}
          {money} vnđ
        </Text>
      </Text>
      <Text
        style={{ marginTop: scaleSzie(20), textAlign: "center" }}
      >{`Bạn vui lòng đến nộp tiền \n tại ngân hàng gần nhất và đăng biên nhận.`}</Text>
    </View>
  );
};

const ItemImage = function(params) {
  // console.log("asdkashjdkashdjkahsdjkasd", params.item);
  let itemSize = scaleSzie((width - 70) / 2 - 10);
  return (
    <TouchableOpacity
      // onPress={() => params.onPress()}
      style={{
        borderRadius: 5,
        width: itemSize,
        height: itemSize,
        padding: 10,
        marginRight: scaleSzie(10),
        marginTop: scaleSzie(10)
      }}
    >
      <TouchableOpacity
        onPress={() => params.onPress()}
        style={{
          position: "absolute",
          top: scaleSzie(0),
          right: scaleSzie(5),
          zIndex: 1
        }}
      >
        <Image source={IMAGE.close} resizeMode={"cover"} />
      </TouchableOpacity>
      <Image
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "#f0f0f0",
          borderRadius: 5
        }}
        source={{ uri: params.item.uri }}
      />
    </TouchableOpacity>
  );
};

const FieldRow = React.memo(props => {
  let isBold = props.Bold ? true : false;
  let isItalic = props.Italic ? "NunitoSans-Light" : null;
  return (
    <View
      style={[
        {
          height: scaleSzie(40),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        },
        props.style
      ]}
    >
      <Text style={{ fontFamily: isItalic }}>{props.title}</Text>
      <Text style={{ fontFamily: isItalic }} bold={isBold}>
        {props.content}
      </Text>
    </View>
  );
});

FieldRow.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

FieldRow.defaultProps = {
  title: "Empty",
  content: "Empty"
};
