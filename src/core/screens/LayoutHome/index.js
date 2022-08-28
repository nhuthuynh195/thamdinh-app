import React, { Component } from "react";
import {
  View,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  Header,
  HeaderTab,
  Text,
  Button,
  PopupPhone,
  PlaceHolderList,
  ItemListThuNo
} from "../../components";
const { width, height } = Dimensions.get("window");
import SortModal from "../../../apps/thamdinh/screens/SortModal";
import styleConfigs from "@configs/style";
import { scaleSzie, formatMoney } from "@utils/func";
import IMAGE from "@resources/icon";
export class index extends Component {
  render() {
    let loans = this.props.listLoans.data ? this.props.listLoans.data : false;
    let listLoansUnCollected = this.props.listLoansUnCollected.data
      ? this.props.listLoansUnCollected.data
      : false;
    let listLimitMoney = this.props.readLimitList;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: styleConfigs.BACKGROUND_COLOR_CONTAINER
        }}
      >
        <Header
          moneyLimit={formatMoney(listLimitMoney.collected_amount || 0)}
          gotoProfile={() => this.gotoProfile()}
          gotoNoti={() => this.gotoNoti()}
          gotoSearch={() => this.gotoSearch()}
          payment={() => this.UploadReceipt()}
          unreadNoti={listLimitMoney.unread_notifications}
        />
        <HeaderTab
          gotoSort={() => this.gotoSort()}
          gotoMap={() => this.gotoMap()}
          onChangeTab={currentTab =>
            this.setState({ currentTab: currentTab.i })
          }
        >
          {this.renderTabCanThu(listLoansUnCollected)}
          {this.renderTabDathu(loans)}
        </HeaderTab>
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

  renderTabDathu = () => {
    let loans = this.state.dataLoans;
    return (
      <View
        tabLabel={`Đã thu (${
          this.props.listLoans ? this.props.listLoans.total_count : 0
        })`}
        style={{ flex: 1, alignItems: "center" }}
      >
        {loans ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={loans}
            keyExtractor={item => item.contract_id.toString()}
            renderItem={({ item, index }) => (
              <ItemListThuNo
                gotoMap={() =>
                  alert("Chức năng này không có trong màn hình đã thu")
                }
                item={item}
                repay={true}
                index={index}
                onPress={() => this.gotoDetail(item.contract_id)}
                repay={() => this.repay(item.contract_id)}
                callPhone={phone => this.showPopupPhone(phone)}
              />
            )}
            getItemLayout={(data, index) => ({
              length: scaleSzie(140),
              offset: scaleSzie(140) * index,
              index
            })}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListEmptyComponent={<EmptyListLoans />}
            onEndReached={this.loadMoreLoans}
            onEndReachedThreshold={0.01}
            initialNumToRender={5}
            ListFooterComponent={() =>
              this.state.showLoadLoans && (
                <View
                  style={{
                    width: width - 40,
                    marginHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )
            }
          />
        ) : (
          <PlaceHolderList />
        )}
      </View>
    );
  };

  renderTabCanThu = () => {
    let loans = this.state.dataCollection;
    return (
      <View
        tabLabel={`Cần thu (${
          this.props.listLoansUnCollected
            ? this.props.listLoansUnCollected.total_count
            : 0
        })`}
        style={{ flex: 1 }}
      >
        {loans ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={loans}
            keyExtractor={item => item.contract_id.toString()}
            ListEmptyComponent={<EmptyListLoans />}
            renderItem={({ item, index }) => (
              <ItemListThuNo
                gotoMap={() => this.gotoMapItem(item)}
                item={item}
                index={index}
                callPhone={phone => this.showPopupPhone(phone)}
                onPress={() => this.gotoDetail(item.contract_id)}
              />
            )}
            getItemLayout={(data, index) => ({
              length: scaleSzie(140),
              offset: scaleSzie(140) * index,
              index
            })}
            initialNumToRender={5}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            onEndReached={this.loadMoreUnCollection}
            onEndReachedThreshold={0.01}
            ListFooterComponent={() =>
              this.state.showLoadCollectionLoans && (
                <View
                  style={{
                    width: width - 40,
                    alignItems: "center",
                    marginHorizontal: 20,
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )
            }
          />
        ) : (
          <PlaceHolderList />
        )}
      </View>
    );
  };
}

const EmptyListLoans = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: (width - 120) / 2
      }}
    >
      <Image source={IMAGE.emptyListLoans} />
      <Text bold style={{ fontSize: 20, color: "#9d9d9d", marginTop: 10 }}>
        Danh sách thu nợ trống
      </Text>
    </View>
  );
};

export default index;
