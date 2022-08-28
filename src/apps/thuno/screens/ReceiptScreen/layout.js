import React from "react";
import { View, Dimensions, Button, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import IMAGE from "@resources/icon";
import ModalPrinter from "./compoments/ModalConenctPrinter";
import { scaleSzie, formatMoney, filterSymbol } from "@utils/func";
import { ButtonSubmit, Text } from "@core/components";
import styleConfigs from "@configs/style";
import commonStyles from "@core/commonStyles";
const { width } = Dimensions.get("window");

import { StackActions, NavigationActions } from "react-navigation";

export default class Layout extends React.Component {
  render() {
    let userDetail = this.props.navigation.getParam("detailLoans", {});
    let isToList = this.props.navigation.getParam("isList", false);
    let profile = this.props.profile;
    let moneyRS = parseInt(userDetail.prepaid_amount);
    let getObject = isToList
      ? {
          name: filterSymbol(userDetail.person_full_name),
          date: moment(userDetail.transaction_date).format("DD/MM/YYYY"),
          id: userDetail.person_id,
          moneyPay: formatMoney(userDetail.amount),
          Rspay: formatMoney(moneyRS),
          paid_period: `${userDetail.remaining_term}/${userDetail.total_term}`,
          lateDate:
            userDetail.num_of_late_date > 0 ? userDetail.num_of_late_date : 0,
          phone: profile.mobile_phone,
          trasaction_id: userDetail.transaction_id
        }
      : {
          name: filterSymbol(userDetail.person_full_name),
          id: userDetail.p_id,
          date: moment(new Date()).format("DD/MM/YYYY"),
          Rspay: formatMoney(moneyRS),
          lateDate:
            userDetail.num_of_late_date > 0 ? userDetail.num_of_late_date : 0,
          moneyPay: formatMoney(userDetail.moneyInput),
          paid_period: `${userDetail.remaining_term}/${userDetail.loan_term}`,
          phone: profile.mobile_phone,
          trasaction_id: userDetail.transaction_id
        };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: styleConfigs.BACKGROUND_COLOR_CONTAINER
        }}
      >
        <ModalPrinter
          nameThuNo={profile.name}
          dataPrinter={userDetail}
          closeModal={() => this.setState({ modalConnectPrinter: false })}
          openModal={this.state.modalConnectPrinter}
          userDetail={userDetail}
          connectSuccess={connected => this.connectPrinterSuccess(connected)}
        />
        <View
          style={[
            {
              width: width - scaleSzie(44),
              height: scaleSzie(370),
              marginHorizontal: scaleSzie(22),
              marginTop: scaleSzie(47),
              backgroundColor: "#FFF",
              borderRadius: scaleSzie(5),
              paddingHorizontal: scaleSzie(20),
              paddingTop: scaleSzie(24)
            },
            commonStyles.shadowApp
          ]}
        >
          <View
            style={{
              width: width - scaleSzie(80),
              height: 2,
              borderColor: "#000",
              borderStyle: "dotted",
              borderWidth: 1,
              borderRadius: 1
            }}
          />
          <FieldRow contentOne={"BIEN NHAN"} contentTwo={getObject.date} />

          <FieldRow contentOne={getObject.id} contentTwo={getObject.name} />

          <Text bold style={{ alignSelf: "center", fontSize: 40 }}>
            {getObject.moneyPay}
          </Text>

          <View
            style={{
              width: width - scaleSzie(80),
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 25 }}>{`CL : ${getObject.paid_period}`}</Text>
            <Text style={{ fontSize: 25 }}>{`Tre : ${
              getObject.lateDate
            }`}</Text>
          </View>

          <FieldRow contentOne={"Du :"} contentTwo={`${getObject.Rspay}`} />

          <FieldRow
            contentOne={`Ma GD :`}
            contentTwo={`${getObject.trasaction_id}`}
          />

          <View
            style={{
              width: width - scaleSzie(80),
              marginTop: 20,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                height: 2,
                alignSelf: "center",
                borderColor: "#000",
                borderStyle: "dotted",
                borderWidth: 1,
                borderRadius: 1
              }}
            />
            <Text>{profile.mobile_phone}</Text>
            <View
              style={{
                flex: 1,
                height: 2,
                alignSelf: "center",
                borderColor: "#000",
                borderStyle: "dotted",
                borderWidth: 1,
                borderRadius: 1
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <ButtonSubmit
          styleButton={{ alignSelf: "center", marginTop: scaleSzie(24) }}
          width={scaleSzie(172)}
          title="In biên nhận"
          onPress={() => this.gotoUploadReceipt(getObject)}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.actions.loans.clearDetailLoans();
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Home" })]
            });
            this.props.navigation.dispatch(resetAction);
          }}
        >
          <Text
            bold
            style={{
              color: "#55529E",
              fontSize: scaleSzie(15),
              alignSelf: "center",
              marginBottom: scaleSzie(24),
              marginTop: scaleSzie(15)
            }}
          >
            Về Danh Sách
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
      <Text bold style={{ fontFamily: isItalic, fontSize: 14 }}>
        {props.contentOne}
      </Text>
      <Text style={{ fontFamily: isItalic, fontSize: 14 }} bold>
        {props.contentTwo}
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
