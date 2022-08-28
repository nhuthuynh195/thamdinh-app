import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import IMAGE from "@resources/icon";
const { width } = Dimensions.get("window");
import { scaleSzie } from "@core/utils/func";
import Text from "./Text";

class ItemNoti extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isRead != this.state.isRead;
  }

  constructor(props) {
    super(props);
    this.state = {
      isRead: this.props.dataNoti.is_seen
    };
  }

  render() {
    let dataNoti = this.props.dataNoti;
    let isRead = this.state.isRead;
    return (
      <TouchableOpacity
        disabled={!dataNoti.link_contract_id}
        onPress={() => {
          this.setState({ isRead: true });
          this.props.gotoDetail();
        }}
        style={Style.Contain}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={[
              Style.ViewText,
              {
                backgroundColor:
                  dataNoti.link_contract_id == null
                    ? "#FFF"
                    : isRead
                    ? "#D4D4D4"
                    : "#F4D11A"
              }
            ]}
          />
          <Text style={Style.ViewTitle}>{dataNoti.pusher_name}</Text>
          <Text style={Style.ViewTime}>{formatDate(dataNoti.created_at)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={Style.TextHeader}>{dataNoti.title}</Text>
            <Text style={Style.TextDescription}>{dataNoti.body}</Text>
          </View>
          {/* ------ Arrow ----- */}
          {dataNoti.link_contract_id && (
            <Image style={Style.ImageRight} source={IMAGE.arrowRight} />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

function formatDate(date) {
  const temptDate = new Date(date);
  return `${temptDate.getHours()}:${temptDate.getMinutes()} - ${temptDate.getDate()}/${temptDate.getMonth() +
    1}/${temptDate.getFullYear()}`;
}

const Style = StyleSheet.create({
  Contain: {
    width: width - scaleSzie(40),
    marginVertical: scaleSzie(10),
    backgroundColor: "#FFF",
    borderRadius: 2,
    padding: scaleSzie(12)
  },
  ViewText: {
    width: scaleSzie(8),
    height: scaleSzie(8),
    borderRadius: 4,
    marginRight: 10
  },
  ViewTitle: {
    flex: 1,
    color: "#424242",
    fontSize: scaleSzie(15)
  },
  ViewTime: {
    color: "#7b7b7b",
    fontSize: scaleSzie(12)
  },
  TextHeader: {
    color: "#424242",
    fontSize: scaleSzie(17),
    fontWeight: "bold",
    marginTop: scaleSzie(10),
    marginBottom: scaleSzie(5)
  },
  TextDescription: {
    color: "#424242",
    fontSize: scaleSzie(15),
    lineHeight: scaleSzie(20),
    flex: 1,
    marginRight: scaleSzie(5)
  },
  ImageRight: {
    marginTop: scaleSzie(10),
    width: scaleSzie(10),
    height: scaleSzie(18)
  }
});

export default ItemNoti;
