import React from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ScrollView
} from "react-native";

import {
  HeaderScreen,
  Tabs,
  Text,
  BottomTab,
  PlaceHolderDetail
} from "@core/components";
import PopupConfirmRecorder from "./widget/PopupConfirmRecorder";
import { ExpandViewInfo, ExpandView } from "../../components";
import IMAGE from "@resources/icon";
import { scaleSzie, formatMoney } from "@utils/func";
import styleConfigs from "@configs/style";
import commonStyles from "@core/commonStyles";
import { TextInputMask } from "react-native-masked-text";
const { width, height } = Dimensions.get("window");
import moment from "moment";
let IMAGETAB = [
  {
    active: IMAGE.detailTab1Active,
    inActive: IMAGE.detailTab1UnActive
  },
  {
    active: IMAGE.detailTab2Active,
    inActive: IMAGE.detailTab2UnActive
  },
  {
    active: IMAGE.detailTab3Active,
    inActive: IMAGE.detailTab3UnActive
  }
];

export default class Layout extends React.Component {
  render() {
    let detailLoans = this.props.detailLoans;
    if (detailLoans) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: styleConfigs.BACKGROUND_COLOR_CONTAINER
          }}
        >
          <HeaderScreen
            ref={this.recorderRef}
            title={detailLoans.person_full_name}
            leftIcon={IMAGE.back}
            rightIcon={IMAGE.record}
            onPressLeft={this.backHome}
            onPressRight={this.record}
            countRecoder={this.state.countRecoder}
            stopRecorder={this.stopRecord}
            styleLeftIcon={{
              width: scaleSzie(12),
              height: scaleSzie(22)
            }}
            styleRightIcon={{
              width: scaleSzie(16),
              height: scaleSzie(22)
            }}
          />
          <View style={{ flex: 1 }}>
            <BottomTab
              tabWidth={width / 3}
              flexIcon={"row"}
              arrayImage={IMAGETAB}
            >
              <View style={{ flex: 1 }} tabLabel={"Thu nợ"}>
                {this.renderViewInfo(detailLoans)}
                <Tabs tabWidth={120}>
                  {this.renderTabRevenue(detailLoans)}
                  {this.renderTabRevenue2(detailLoans)}
                </Tabs>
              </View>
              <View style={{ flex: 1 }} tabLabel={"Lịch sử ghi chú"}>
                {this.renderHistory(detailLoans)}
              </View>
              <View style={{ flex: 1 }} tabLabel={"Lịch thu"}>
                {this.renderCollectionSchedule(detailLoans.payment_schedules)}
              </View>
            </BottomTab>
          </View>
          <PopupConfirmRecorder
            visible={this.state.visiblePopupConfrimRecorder}
            cancelAudio={this.cancelAudio}
            submitAudio={this.submitAudio}
            reListen={this.playAudio}
          />
        </View>
      );
    }
    return (
      <PlaceHolderDetail
        onReady={false}
        animate="fade"
        backHolder={() => alert("ss")}
      />
    );
  }

  renderCollectionSchedule = listPage => {
    return (
      <View style={{ flex: 1, marginHorizontal: scaleSzie(20) }}>
        <View
          style={{
            height: scaleSzie(52),
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#f0f0f0",
            borderBottomWidth: 1
          }}
        >
          <Text bold style={{ flex: 0.5 }}>
            Kỳ
          </Text>
          <View style={{ flex: 2 }}>
            <Text bold>Ngày</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text bold>Ngày thu</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text bold>Đã trả</Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listPage}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ItemCollestionSchedule item={item} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  };

  renderHistory = detailLoans => {
    let list = detailLoans.loan_notes;
    return (
      <View style={{ flex: 1, marginHorizontal: scaleSzie(20) }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          ListEmptyComponent={() => (
            <View
              style={{
                width: width,
                height: height - 80,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text bold>Chưa có lịch sử</Text>
            </View>
          )}
          ListHeaderComponent={() => <View style={{ height: 10 }} />}
          ListFooterComponent={() => <View style={{ height: 10 }} />}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ItemHistory item={item} key={index} />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  };

  renderTabRevenue = detailLoans => {
    let loansNote = detailLoans.loan_notes[0] || null;
    return (
      <View tabLabel={"Nhập tiền thu"} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              height: scaleSzie(40),
              paddingHorizontal: scaleSzie(20),
              justifyContent: "center",
              alignItems: "flex-end",
              backgroundColor: "#f5f5f5"
            }}
          >
            <Text bold style={{ color: "#E89F3C" }}>
              {detailLoans.num_of_late_date <= 0
                ? ""
                : `Đã trễ ${detailLoans.num_of_late_date} ngày`}
            </Text>
          </View>
          {loansNote && (
            <View
              style={{
                flex: 1,
                height: scaleSzie(74),
                padding: scaleSzie(12),
                backgroundColor: "#FFF",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: scaleSzie(15), flex: 1 }}>CRM</Text>
                <Text style={{ color: "#424242", fontSize: scaleSzie(12) }}>
                  {moment(loansNote.created_at).format("DD/MM/YYYY - HH:mm")}
                </Text>
              </View>
              <Text
                style={{
                  color: "#424242",
                  fontWeight: "600",
                  fontSize: scaleSzie(16)
                }}
              >
                {loansNote.note}
              </Text>
            </View>
          )}
          <View
            style={{
              flex: 1,
              height: null,
              flexDirection: "row",
              padding: scaleSzie(20),
              alignItems: "center"
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#828282", fontSize: 14 }}>
                  Tiền thu kỳ này
                </Text>
                <Text
                  bold
                  style={{
                    color: "#424242",
                    fontSize: scaleSzie(20),
                    marginTop: scaleSzie(5)
                  }}
                >
                  {formatMoney(detailLoans.this_term_amount)}đ
                </Text>
              </View>
              <TextInputMask
                type={"money"}
                placeholder={"Tiền thu"}
                style={{
                  height: scaleSzie(50),
                  width: scaleSzie(100),
                  borderRadius: scaleSzie(25),
                  backgroundColor: "#FFF",
                  flex: 1.5,
                  textAlign: "right",
                  borderWidth: 1,
                  borderColor: "#55549c",
                  marginRight: scaleSzie(10),
                  paddingHorizontal: scaleSzie(20),
                  color: "#55549c",
                  fontSize: scaleSzie(20)
                }}
                ref={ref => (this.periodMoney = ref)}
                options={{ unit: "", precision: 0 }}
                value={this.state.periodMoney}
                onChangeText={text => {
                  this.setState({
                    periodMoney: text
                  });
                }}
              />
              <Text bold style={{ alignSelf: "center" }}>
                đ
              </Text>
            </View>
          </View>
          <TextInput
            style={{
              flex: 1,
              height: scaleSzie(50),
              marginHorizontal: scaleSzie(12),
              backgroundColor: "#FFF",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#F0f0f0",
              paddingHorizontal: scaleSzie(12)
            }}
            placeholder={"Nội dung ghi chú"}
            onChangeText={e => this.setState({ noteRepayment: e })}
          />
          <TouchableOpacity
            onPress={() => this.gotoReceipt()}
            style={{
              margin: scaleSzie(20),
              flex: 1,
              marginHorizontal: scaleSzie(12),
              borderRadius: scaleSzie(20),
              backgroundColor: "#55529E",
              height: scaleSzie(40),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text bold style={{ color: "#FFFFFF" }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
          <ToTheMoonComponent
            text={"Kỳ đã trả"}
            number={`${detailLoans.num_of_paid_term}/${detailLoans.loan_term}`}
          />
          <ToTheMoonComponent
            text={"Đã trả"}
            number={formatMoney(detailLoans.total_paid_amount)}
          />
          <ToTheMoonComponent
            text={"Tiền thu kỳ"}
            number={formatMoney(detailLoans.this_term_amount)}
          />
          <ToTheMoonComponent
            text={"Còn lại tổng"}
            number={formatMoney(detailLoans.total_remaining_amount)}
          />
          <ToTheMoonComponent
            text={"Tiền gốc còn lại"}
            number={formatMoney(detailLoans.total_remaining_original_amount)}
          />
        </ScrollView>
      </View>
    );
  };

  changeText = e => {
    let moneyFormat = parseFloat(e)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,");
    this.setState({ inputMoney: moneyFormat });
  };

  renderViewFooter = detailLoans => {
    return (
      <View style={{ flex: 1 }}>
        <ToTheMoonComponent
          text={"Kỳ đã trả"}
          number={`${detailLoans.num_of_paid_term}/${detailLoans.loan_term}`}
        />
        <ToTheMoonComponent
          text={"Đã trả"}
          number={formatMoney(detailLoans.total_paid_amount)}
        />
      </View>
    );
  };

  renderTabRevenue2 = detailLoans => {
    return (
      <View
        tabLabel={"Không thu được"}
        style={{ flex: 1, padding: scaleSzie(12) }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text>Ngày Hẹn</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Số tiền hẹn</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: scaleSzie(50),
            marginVertical: scaleSzie(12)
          }}
        >
          <TextInputMask
            type={"datetime"}
            style={{
              paddingLeft: 10,
              flex: 1,
              backgroundColor: "#FFF",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#f0f0f0",
              paddingHorizontal: 5
            }}
            placeholder={"DD-MM-YYYY"}
            options={{
              format: "DD-MM-YYYY"
            }}
            value={this.state.dateAppointment}
            onChangeText={text => {
              this.setState({
                dateAppointment: text
              });
            }}
          />
          <TextInputMask
            type={"money"}
            style={{
              paddingLeft: 10,
              flex: 1,
              backgroundColor: "#FFF",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "#f0f0f0",
              paddingHorizontal: 5
            }}
            placeholder={"Tiền thu.."}
            options={{ unit: "", precision: 0 }}
            ref={ref => (this.moneyAppointment = ref)}
            value={this.state.moneyAppointment}
            onChangeText={text => {
              this.setState({
                moneyAppointment: text
              });
            }}
          />
          <Text style={{ alignSelf: "center" }}>đ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: scaleSzie(50),
            backgroundColor: "#FFF",
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "#f0f0f0",
            paddingHorizontal: scaleSzie(20)
          }}
        >
          <TextInput
            placeholder={"Nội dung ghi chú .."}
            style={{
              flex: 1,
              paddingHorizontal: 5
            }}
            value={this.state.noteAppointment}
            onChangeText={text => {
              this.setState({
                noteAppointment: text
              });
            }}
          />
          <TouchableOpacity onPress={this.handleChoosePhoto}>
            <Image
              style={{ marginTop: scaleSzie(15) }}
              source={IMAGE.camera2}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: scaleSzie(140) }}>
          <ScrollView
            style={{
              paddingTop: 20,
              flex: 1
            }}
            horizontal
          >
            {this.state.arrayImage.length > 0 &&
              this.state.arrayImage.map((item, index) => (
                <ItemImage
                  deleteImage={index => this.deleteImage(index)}
                  item={item}
                  index={index}
                />
              ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          disabled={
            this.state.dateAppointment === "" ||
            this.state.moneyAppointment == 0
              ? true
              : false
          }
          style={{
            marginTop: scaleSzie(12),
            borderRadius: scaleSzie(20),
            backgroundColor:
              this.state.dateAppointment === "" ||
              this.state.moneyAppointment == 0
                ? "#DADADA"
                : "#55529E",
            height: scaleSzie(40),
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.collectLoanFailed()}
        >
          <Text bold style={{ color: "#FFFFFF" }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderViewInfo = detailLoans => {
    return (
      <View style={{ width: width, backgroundColor: "#FFF" }}>
        <ExpandViewInfo viewHeader={this.renderViewTop(detailLoans)}>
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 3 }}>
              <Text>Đ/c Nhà: {detailLoans.person_home_address}</Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </ExpandViewInfo>
      </View>
    );
  };

  renderViewTop = detailLoans => {
    let image = detailLoans.avatar_url
      ? { uri: detailLoans.avatar_url }
      : { uri: "https://www.fancyhands.com/images/default-avatar-250x250.png" };
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          style={{
            width: scaleSzie(60),
            height: scaleSzie(60),
            borderRadius: scaleSzie(30),
            marginRight: scaleSzie(10)
          }}
          source={image}
        />
        <View style={{ flex: 3 }}>
          <Text numberOfLines={2} style={{ fontSize: scaleSzie(16) }}>
            {detailLoans.person_address}
          </Text>
          <Text style={{ fontSize: scaleSzie(16) }}>
            {detailLoans.person_business}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.callPhone(detailLoans.person_phone)}
          style={{ flex: 1, alignItems: "flex-end" }}
        >
          <Image source={IMAGE.phone} />
        </TouchableOpacity>
      </View>
    );
  };
}

const ItemImage = React.memo(props => {
  return (
    <View
      key={props.index}
      style={{
        overflow: "hidden",
        borderRadius: 5,
        width: scaleSzie(100),
        height: scaleSzie(100),
        marginRight: scaleSzie(20)
      }}
    >
      <Image
        style={{ flex: 1 }}
        source={{
          uri: props.item.uri
        }}
      />
      <TouchableOpacity
        style={{ position: "absolute", right: 5, top: 5 }}
        onPress={() => props.deleteImage(props.index)}
      >
        <Image source={IMAGE.close} />
      </TouchableOpacity>
    </View>
  );
});

const ToTheMoonComponent = React.memo(props => {
  return (
    <View
      style={{
        flex: 1,
        height: scaleSzie(46),
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        marginHorizontal: scaleSzie(20),
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: scaleSzie(7),
        justifyContent: "space-between"
      }}
    >
      <Text>{props.text}</Text>
      <Text bold>{props.number}</Text>
    </View>
  );
});

const ItemCollestionSchedule = React.memo(props => {
  let item = props.item;
  return (
    <View
      style={{
        height: scaleSzie(46),
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#f0f0f0",
        borderBottomWidth: 1
      }}
    >
      <Text style={{ flex: 0.5 }}>{item.period_id}</Text>
      <Text style={{ flex: 2 }}>{item.general_date}</Text>
      <Text style={{ flex: 2 }}>{item.pay_date}</Text>
      <Text style={{ flex: 2 }}> {formatMoney(item.paid_amount)} đ</Text>
    </View>
  );
});

const ItemHistory = React.memo(props => {
  let item = props.item;
  return (
    <View
      style={[
        {
          backgroundColor: "#FFF",
          borderBottomColor: "#f0f0f0",
          paddingVertical: scaleSzie(10),
          paddingHorizontal: scaleSzie(20),
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "#f0f0f0"
        }
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text bold style={{ fontSize: scaleSzie(15) }}>
          {item.staff_name}
        </Text>
        <Text style={{ fontSize: scaleSzie(12) }}>
          {moment(item.created_at).format("DD/MM/YYYY - HH:mm")}
        </Text>
      </View>
      <View style={{ marginTop: scaleSzie(10) }}>
        <Text>{item.note}</Text>
      </View>
      {props.item.images.length > 0 ? (
        <ScrollView
          style={{ marginTop: scaleSzie(10) }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {item.images.map((item, index) => (
            <Image
              key={index}
              style={{
                width: scaleSzie(110),
                height: scaleSzie(110),
                borderRadius: scaleSzie(5),
                marginRight: scaleSzie(10)
              }}
              source={{
                uri: item.url
              }}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
});
