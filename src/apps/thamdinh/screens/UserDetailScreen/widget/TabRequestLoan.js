import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import {
  Text,
  AutoGrowingTextInput,
  ButtonSubmit,
  Button,
} from "@core/components";
import Configs from "@configs";
import { scaleSzie, formatMoney } from "@core/utils/func";
import connectRedux from "../../../redux/connectRedux";

class TabRequestLoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditNoteLoan: false,
      ghi_chu: this.props.clientDetail.loan_request.ghi_chu
        ? this.props.clientDetail.loan_request.ghi_chu
        : "",
    };
    this.noteRef = React.createRef();
  }

  cancelEditNote = () => {
    const temptNote = this.props.clientDetail.loan_request.ghi_chu
      ? this.props.clientDetail.loan_request.ghi_chu
      : "";
    this.noteRef.current.setStateFromParent(temptNote);
    this.setState({
      isEditNoteLoan: false,
    });
    this.props.changeSwipeDirection("down");
  };

  submitNote = async () => {
    const { clientDetail, isProperty } = this.props;
    await this.setState({
      isEditNoteLoan: false,
    });
    if (isProperty) {
      this.props.actions.client.updateBusinessInfo(
        clientDetail.id,
        {
          ghi_chu: this.noteRef.current.state.text,
        },
        "property_info"
      );
    } else {
      this.props.actions.client.updateBusinessInfo(clientDetail.id, {
        ghi_chu: this.noteRef.current.state.text,
      });
    }
    this.props.changeSwipeDirection("down");
  };

  renderButtonEdit() {
    const { isEditNoteLoan } = this.state;
    return (
      <View
        style={{
          width: scaleSzie(80 + 40),
          position: "absolute",
          top: 0,
          right: scaleSzie(20),
        }}
      >
        {!isEditNoteLoan ? (
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <ButtonSubmit
              width={80}
              height={30}
              title="Sửa"
              onPress={() => {
                this.setState({
                  isEditNoteLoan: true,
                });
                this.props.changeSwipeDirection("notDown");
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={this.cancelEditNote}
              style={{ marginTop: scaleSzie(6) }}
            >
              <Text
                style={{
                  color: "#A2A2A2",
                  fontWeight: "600",
                  fontSize: scaleSzie(15),
                }}
              >
                Huỷ
              </Text>
            </Button>
            <ButtonSubmit
              width={80}
              height={30}
              title="Lưu"
              onPress={this.submitNote}
            />
          </View>
        )}
      </View>
    );
  }

  render() {
    const { isEditNoteLoan, ghi_chu } = this.state;
    const { loan_request } = this.props.clientDetail;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24) }}
        >
          <Text
            style={{
              color: "#424242",
              fontSize: scaleSzie(18),
              fontWeight: "800",
            }}
          >
            Yêu cầu vay
          </Text>
          {this.renderButtonEdit()}
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View
              style={[
                {
                  width: Configs.FULL_WIDTH,
                  paddingTop: scaleSzie(17),
                  paddingHorizontal: scaleSzie(24),
                  paddingBottom: scaleSzie(12),
                },
              ]}
            >
              <AutoGrowingTextInput
                placeholder={"Số tiền vay đề nghị"}
                value={`${formatMoney(loan_request.so_tien_de_nghi)} VND`}
                styleContainer={{}}
                styleTextInput={{ color: "#424242", fontSize: scaleSzie(16) }}
                disable={true}
              />
              <AutoGrowingTextInput
                placeholder={"Kỳ hạn đề nghị"}
                value={`${loan_request.ky_han_de_nghi}`}
                styleContainer={{ marginTop: scaleSzie(16) }}
                styleTextInput={{ color: "#424242", fontSize: scaleSzie(16) }}
                disable={true}
              />
              <AutoGrowingTextInput
                placeholder={"Lãi suất"}
                value={`${loan_request.lai_suat} %`}
                styleContainer={{ marginTop: scaleSzie(16) }}
                styleTextInput={{ color: "#424242", fontSize: scaleSzie(16) }}
                disable={true}
              />
              <AutoGrowingTextInput
                placeholder={"Mục đích vay đề nghị"}
                value={`${loan_request.muc_dich}`}
                styleContainer={{ marginTop: scaleSzie(16) }}
                styleTextInput={{ color: "#424242", fontSize: scaleSzie(16) }}
                disable={true}
              />
              <AutoGrowingTextInput
                ref={this.noteRef}
                placeholder={"Ghi chú"}
                // value={`${loan_request.ghi_chu}`}
                value={ghi_chu}
                styleContainer={{ marginTop: scaleSzie(16) }}
                styleTextInput={{ color: "#424242", fontSize: scaleSzie(16) }}
                disable={!isEditNoteLoan}
              />
            </View>
            <View style={{ height: scaleSzie(500) }} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  clientDetail: state.client.clientDetail,
});

export default connectRedux(mapStateToProps, TabRequestLoan);
