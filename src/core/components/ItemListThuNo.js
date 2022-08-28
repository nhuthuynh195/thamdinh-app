import React, { Component } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
const { width, height } = Dimensions.get("window");
import commonStyles from "@core/commonStyles";
import { scaleSzie } from "@utils/func";
import IMAGE from "@resources/icon";

export class ItemListThuNo extends Component {
  render() {
    let {
      person_full_name = "",
      person_address = "",
      person_business = " ",
      avatar_url = "",
      average_pay_time = "",
      num_of_late_date,
      is_bad_loan,
      distance_measured,
      person_phone,
      p_id
    } = this.props.item;
    let index = this.props.index;
    let repay = this.props.repay;
    let linkImage =
      avatar_url == null ? IMAGE.famaleAvatar : { uri: avatar_url };
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        key={index}
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
            style={{
              flex: 2,
              justifyContent: "space-between",
              marginRight: 10
            }}
          >
            <Text bold style={{ color: "#4F4F4F", fontSize: scaleSzie(16) }}>
              {`${person_full_name} - ${p_id}`}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                color: "rgba(66, 66, 66, 0.7)",
                fontSize: scaleSzie(14)
              }}
            >
              {person_address}
            </Text>
            <Text
              style={{
                color: "rgba(66, 66, 66, 0.7)",
                fontSize: scaleSzie(14)
              }}
            >
              {person_business}
            </Text>
          </View>
          <Image
            style={{
              width: scaleSzie(80),
              height: scaleSzie(80),
              borderRadius: scaleSzie(40)
            }}
            source={linkImage}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: scaleSzie(10),
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#424242", fontSize: scaleSzie(14) }}>
            {average_pay_time}
          </Text>
          <Text
            style={{
              color: "#E89F3C",
              fontSize: scaleSzie(14),
              marginHorizontal: 5
            }}
          >
            {num_of_late_date <= 0 ? "" : `Trễ ${num_of_late_date} ngày`}
          </Text>
          {is_bad_loan && (
            <Text
              style={{
                color: "#7b7b7b",
                fontSize: scaleSzie(14),
                flex: 1,
                color: "#E23838"
              }}
            >
              Nợ xấu{" "}
            </Text>
          )}
          {repay ? (
            <TouchableOpacity
              onPress={() => this.props.repay()}
              style={{
                flex: 1,
                marginLeft: 10,
                width: 50,
                height: 20,
                alignContent: "center",
                justifyContent: "center"
              }}
            >
              <Text>In lại</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {distance_measured > 0 && (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => this.props.gotoMap()}
            >
              <Image
                style={{ width: scaleSzie(17), height: scaleSzie(24) }}
                source={IMAGE.location}
              />
              <Text
                style={{
                  fontSize: scaleSzie(12),
                  color: "#55529E",
                  marginRight: scaleSzie(10),
                  marginLeft: scaleSzie(3),
                  marginTop: scaleSzie(10)
                }}
              >
                {distance_measured}Km
              </Text>
            </TouchableOpacity>
          )}
          <Button onPress={() => this.props.callPhone(person_phone)}>
            <Image
              style={{ width: scaleSzie(21), height: scaleSzie(21) }}
              source={IMAGE.phone}
            />
          </Button>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ItemListThuNo;
