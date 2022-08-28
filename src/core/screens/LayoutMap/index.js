import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import _ from "ramda";
import FastImage from 'react-native-fast-image';

import CommonStyles from "@core/commonStyles";
import styles from "./styles";
import { Text, Button, PopupPhone } from "../../components";
import styleConfigs from "@configs/style";
import Configs from "../../configs";
import { scaleSzie, formatDay, formatTime } from "@utils/func";
import IMAGE from "@resources/icon";

export default class LayoutMap extends React.Component {
  renderFooter() {
    const {
      listBusinessEvaluate,
      navigation,
      listPropertyEvaluate
    } = this.props;
    const singleUser = navigation.getParam("singleUser", {});
    const typeUser = this.props.navigation.getParam("typeUser", "");
    const temptData = !_.isEmpty(singleUser)
      ? [singleUser]
      : typeUser === "Thẩm KD"
        ? listBusinessEvaluate
        : listPropertyEvaluate;
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
          onEndReached={() => { }}
        />
      </View>
    );
  }

  renderItemSnapUser = ({ item, index }) => {
    const {callableBusiness,callabProperty} =  this.props;
    const typeUser = this.props.navigation.getParam("typeUser", "");
    const callable =  typeUser === "Thẩm KD" ? callableBusiness : callabProperty;
    return (
      <Button
        onPress={() => this.gotoClientDetail(item, typeUser)}
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
              <Text bold={true} style={styles.usernameText}>
                {typeUser}
              </Text>
              <Text style={styles.storeText}>
                {formatDay(item.evaluate_time)} -{" "}
                <Text bold style={styles.storeText}>
                  {formatTime(item.evaluate_time)}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.containerAvatar}>
            {
              item.avatar_url !== null ? this.renderAvartarUser(item.avatar_url) : <Image
                source={IMAGE.famaleAvatar}
                style={{ width: scaleSzie(60), height: scaleSzie(60) }}
              />
            }
            {
              callable ?  <Button onPress={() => this.showPopupPhone(item.person_phone)}>
              <Image
                source={IMAGE.phone}
                style={{
                  width: scaleSzie(22),
                  height: scaleSzie(22),
                  marginTop: scaleSzie(17)
                }}
              />
            </Button> : <View />
            }
           
          </View>
        </View>
      </Button>
    );
  };

  renderAvartarUser(url) {
    return (
      <View style={{
        width: scaleSzie(60), height: scaleSzie(60), borderRadius: scaleSzie(35),
        overflow: 'hidden'
      }} >
        <FastImage
          source={{ uri: url, priority: FastImage.priority.low, }}
          style={{ width: scaleSzie(60), height: scaleSzie(60) }}
        />
      </View>

    );
  }

  renderMarker() {
    const {
      listBusinessEvaluate,
      navigation,
      listPropertyEvaluate
    } = this.props;
    const singleUser = navigation.getParam("singleUser", {});
    const typeUser = this.props.navigation.getParam("typeUser", "");
    const temptData = !_.isEmpty(singleUser)
      ? [singleUser]
      : typeUser === "Thẩm KD"
        ? this.filterLocationNotNull(listBusinessEvaluate)
        : this.filterLocationNotNull(listPropertyEvaluate);
    return temptData.map((coor, index) => {
      const temptIconMarker =
        temptData[this.state.currentClientLocation].id !== coor.id
          ? IMAGE.markerUnActive
          : IMAGE.markerActive;
      return (
        <MapView.Marker
          key={index}
          onPress={() => this.onPressMarker(index)}
          coordinate={{ latitude:  typeUser === "Thẩm KD" ? coor.latitude : coor.home_latitude, longitude: typeUser === "Thẩm KD" ?  coor.longitude  : coor.home_longitude}}
          // coordinate={{latitude: coor.latitude,longitude:coor.longitude}}
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
        onRegionChangeComplete={(region) => {
          setTimeout(() => {
            this.onRegionChangeComplete(region)
          }, 100)
        }}
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
    const { isLoadingMap, visiblePopUpPhone, phone } = this.state;
    return (
      <View style={styles.container}>
        {isLoadingMap ? this.renderMapView() : this.renderLoadingMap()}
        <Button onPress={this.backHome} style={styles.containerButtonBack}>
          <Image source={IMAGE.back} style={styles.iconBack} />
        </Button>
        {this.renderFooter()}
        <PopupPhone
          visible={visiblePopUpPhone}
          callPhone={() => this.callPhone()}
          hidePopupCall={this.hidePopupCall}
          phone={phone}
        />
      </View>
    );
  }
}
