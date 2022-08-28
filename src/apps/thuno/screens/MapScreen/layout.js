import React from "react";
import { View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import _ from "ramda";

import CommonStyles from "@core/commonStyles";
import styles from "./styles";
import { Text, Button, PopupPhone } from "../../../../core/components";
import styleConfigs from "@configs/style";
import Configs from "@configs";
import { scaleSzie, formatDay, formatTime, formatMoney } from "@utils/func";
import IMAGE from "@resources/icon";

export default class LayoutMap extends React.Component {
  renderFooter() {
    const { navigation, listLoansUnCollected } = this.props;
    const singleUser = navigation.getParam("singleUser", {});
    const temptData = !_.isEmpty(singleUser)
      ? [singleUser]
      : listLoansUnCollected.data;
    return (
      <View style={styles.containerFooter}>
        <Carousel
          ref={this.carouselRef}
          data={this.filterLocationNotNull(temptData)}
          renderItem={this.renderItemSnapUser}
          sliderWidth={Configs.FULL_WIDTH}
          initialNumToRender={100}
          itemWidth={scaleSzie(290)}
          initialNumToRender={5}
          inactiveSlideOpacity={1}
          firstItem={this.state.currentClientLocation}
          onSnapToItem={this.onSnapToItem}
          onEndReached={() => {}}
        />
      </View>
    );
  }

  filterLocationNotNull(data) {
    return data.filter(item => item.distance_measured !== 0);
  }

  renderItemSnapUser = ({ item, index }) => {
    let image = item.avatar_url
      ? { uri: item.avatar_url }
      : IMAGE.usernameUnActive;
    return (
      <TouchableOpacity
        onPress={() => this.gotoClientDetail(item.contract_id)}
        style={[styles.containerSnapUser, CommonStyles.shadowApp]}
      >
        <View style={styles.containerChildrendSnapUser}>
          <View style={styles.containerInfoUser}>
            <View style={{ flex: 1 }}>
              <Text bold={true} style={styles.usernameText}>
                {`${item.person_full_name}`}
              </Text>
              <Text style={styles.storeText}>{item.person_business}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <Text style={styles.storeText}>
                {item.average_pay_time}
                {item.is_bad_loan && (
                  <Text style={styles.storeText}>Nợ xấu </Text>
                )}
              </Text>
            </View>
          </View>
          <View style={styles.containerAvatar}>
            <Image
              source={image}
              style={{
                width: scaleSzie(46),
                height: scaleSzie(46),
                borderRadius: scaleSzie(23)
              }}
            />
            <Button onPress={() => this.showPopupPhone(item.person_phone)}>
              <Image
                source={IMAGE.phone}
                style={{
                  width: scaleSzie(22),
                  height: scaleSzie(22),
                  marginTop: scaleSzie(17)
                }}
              />
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderMarker() {
    const { navigation, listLoansUnCollected } = this.props;
    const singleUser = navigation.getParam("singleUser", {});
    const temptData = !_.isEmpty(singleUser)
      ? [singleUser]
      : listLoansUnCollected.data;

    return this.filterLocationNotNull(temptData).map((coor, index) => {
      const temptIconMarker =
        temptData[this.state.currentClientLocation].id !== coor.id
          ? IMAGE.markerUnActive
          : IMAGE.markerActive;
      return (
        <MapView.Marker
          key={index}
          onPress={() => this.onPressMarker(index)}
          coordinate={{ latitude: coor.latitude, longitude: coor.longitude }}
          title={coor.person_address}
        >
          <Image
            source={temptIconMarker}
            style={{ width: scaleSzie(21), height: scaleSzie(29) }}
          />
        </MapView.Marker>
      );
    });
  }

  renderMapView() {
    const { zoomMapView } = this.state;
    return (
      <MapView
        ref={this.mapRef}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={{ flex: 1, marginBottom: 1 }}
        region={zoomMapView}
        onMapReady={this.onMapReady}
        onRegionChangeComplete={this.onRegionChangeComplete}
      >
        {this.renderMarker()}
        {this.renderDirections()}
      </MapView>
    );
  }

  renderDirections() {
    const { coords } = this.props;
    if (coords.length > 0) {
      return (
        <Polyline coordinates={coords} strokeWidth={4} strokeColor="#53BEEA" />
      );
    }
    return <View />;
  }

  renderLoadingMap() {
    return (
      <View style={[{ flex: 1 }, CommonStyles.centerHorVer]}>
        <ActivityIndicator size="large" color={styleConfigs.PURPLE_COLOR} />
      </View>
    );
  }

  render() {
    const { isLoadingMap, visiblePopUpPhone } = this.state;
    let readLimitList = this.props.readLimitList;
    return (
      <View style={styles.container}>
        {isLoadingMap ? this.renderMapView() : this.renderLoadingMap()}
        <View
          style={{
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#FFF",
            position: "absolute",
            top: 40,
            right: 20
          }}
        >
          <Text style={{ fontSize: scaleSzie(14) }}>Tiền mặt đang giữ</Text>
          <Text bold style={{ fontSize: scaleSzie(20) }}>
            {formatMoney(readLimitList.collected_amount)} đ
          </Text>
        </View>
        <Button onPress={this.backHome} style={styles.containerButtonBack}>
          <Image source={IMAGE.back} style={styles.iconBack} />
        </Button>
        {this.renderFooter()}
        <PopupPhone
          phone={this.state.phonePopUp}
          visible={this.state.visiblePopUpPhone}
          hidePopupCall={this.hidePopupCall}
          callPhone={this.callPhone}
        />
      </View>
    );
  }
}
