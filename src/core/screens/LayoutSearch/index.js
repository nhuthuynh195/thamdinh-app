import React, { Component, memo } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import IMAGE from "@resources/icon";
import styleConfig from "@configs/style";
import styles from "./styles";
import { HeaderSearch, Tabs, Text, PopupPhone } from "../../components";
import { scaleSzie } from "../../utils/func";
import SortModal from "../../../apps/thuno/screens/SortModal";
import ListLoansSeach from "./widget/ListLoansSearch";
import ListLoansCollectionSeach from "./widget/ListLoansCollectionSearch";

class ProfilePage extends Component {
  render() {
    const { textSearch } = this.state;
    return (
      <View
        style={{ flex: 1, backgroundColor: styleConfig.BACKGROUND_COLOR_LIGHT }}
      >
        <HeaderSearch
          goBack={this.backHome}
          onChangeText={e => this.setState({ textSearch: e })}
          showIconClearText={textSearch.length > 0}
          clearText={() => this.setState({ textSearch: "" })}
          search={this.sortUserByConditon}
          onSubmitEditing={this.sortUserByConditon}
        />
        <View style={{ height: scaleSzie(25) }} />
        <Tabs
          left={40}
          tabWidth={80}
          itemLeft={
            <TouchableOpacity onPress={this.showModalSort}>
              <Image
                style={{ width: scaleSzie(20), height: scaleSzie(20) }}
                source={IMAGE.sort}
              />
            </TouchableOpacity>
          }
          onChangeTab={this.onChangeTab}
        >
          <View
            tabLabel={"Cần thu"}
            style={{
              flex: 1
            }}
          >
            <ListLoansCollectionSeach
              gotoMap={item => this.gotoMapItem(item)}
              gotoDetail={id => this.gotoDetail(id)}
              showPopupPhone={phone => this.showPopupPhone(phone)}
            />
          </View>
          <View tabLabel={"Đã thu"} style={{ flex: 1 }}>
            <ListLoansSeach
              gotoMap={() => alert("map1")}
              showPopupPhone={phone => this.showPopupPhone(phone)}
              gotoDetail={id => this.gotoDetail(id)}
            />
          </View>
        </Tabs>

        {this.renderModalSort()}
        <PopupPhone
          phone={this.state.phonePopUp}
          visible={this.state.visiblePopUpPhone}
          hidePopupCall={this.showPopupPhone}
          callPhone={this.callPhone}
        />
      </View>
    );
  }

  renderModalSort() {
    const { visible } = this.state;
    return (
      <SortModal
        ref={this.sortModalRef}
        visible={visible}
        onRequestClose={this.onRequestClose}
        selectCondiSort={this.selectCondiSort}
        sortUserByConditon={() => this.sortUserByConditon()}
        typeSort={1}
      />
    );
  }

  renderViewEmpty() {
    return (
      <View style={{ marginTop: scaleSzie(60) }}>
        <Image
          style={{
            width: scaleSzie(60),
            height: scaleSzie(60),
            alignSelf: "center"
          }}
          source={IMAGE.searchEmpty}
        />
        <Text style={{ fontSize: scaleSzie(18), color: "#BBBBBB" }}>
          Không có kết quả tìm kiếm
        </Text>
      </View>
    );
  }
}

export default ProfilePage;
