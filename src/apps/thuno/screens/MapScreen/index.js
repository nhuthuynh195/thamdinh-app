import React from "react";
import { PermissionsAndroid, Platform } from "react-native";
import _ from "ramda";

import LayoutMap from "./layout";
import { getPosotion } from "@core/utils/func";
import connectRedux from "../../redux/connectRedux";
import CallPhone from "@core/utils/callPhone";

class MapScreen extends LayoutMap {
  constructor(props) {
    super(props);
    const indexClientLocation = this.props.navigation.getParam(
      "indexClientLocation",
      -1
    );
    this.timeOut;
    const { latitude, longitude } = this.props.yourLocation;
    this.state = {
      isLoadingMap: false,
      error: null,
      loadingReady: true,
      visiblePopUpPhone: false,
      currentClientLocation:
        indexClientLocation === -1 ? 0 : indexClientLocation,
      phonePopUp: "",
      zoomMapView: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922 * 5,
        longitudeDelta: 0.0421 * 5
      }
    };
    this.carouselRef = React.createRef();
    this.mapRef = React.createRef();

    this.loadingMapView = this.loadingMapView.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.onSnapToItem = this.onSnapToItem.bind(this);
    this.backHome = this.backHome.bind(this);
    this.showPopupPhone = this.showPopupPhone.bind(this);
    this.hidePopupCall = this.hidePopupCall.bind(this);
    this.callPhone = this.callPhone.bind(this);
  }

  async componentDidMount() {
    this.navListener = this.props.navigation.addListener(
      "didFocus",
      this.loadingMapView
    );
    this.getDirections();
  }

  backHome() {
    this.props.navigation.goBack();
  }

  async getDirections(index = 0) {
    const position = await getPosotion();
    const temptPosision = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    const { navigation, listLoansUnCollected } = this.props;
    const singleUser = navigation.getParam("singleUser", {});
    if (!_.isEmpty(singleUser)) {
      this.props.actions.map.getMapDirections(
        `${temptPosision.latitude},${temptPosision.longitude}`,
        `${singleUser.latitude},${singleUser.longitude}`
      );
    } else {
      const temptData = listLoansUnCollected.data;
      const temptCurrentUserLocation =
        temptData[this.state.currentClientLocation];
      this.props.actions.map.getMapDirections(
        `${temptPosision.latitude},${temptPosision.longitude}`,
        `${temptCurrentUserLocation.latitude},${
          temptCurrentUserLocation.longitude
        }`
      );
    }
  }

  async onSnapToItem(index) {
    await this.setState({
      currentClientLocation: index
    });
    this.getDirections();
  }

  onPressMarker(index) {
    this.carouselRef.current.snapToItem(index);
  }

  loadingMapView() {
    this.setState({
      isLoadingMap: true
    });
  }

  async onMapReady() {
    if (Platform.OS !== "ios") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    this.setState({
      isLoadingMap: true
    });
  }

  showPopupPhone(phone) {
    this.setState({
      phonePopUp: phone,
      visiblePopUpPhone: true
    });
  }

  gotoClientDetail(id) {
    this.props.navigation.navigate("Detail", { id: id });
  }

  hidePopupCall() {
    this.setState({
      visiblePopUpPhone: false
    });
  }

  callPhone() {
    const args = {
      number: this.state.phonePopUp,
      prompt: false
    };
    CallPhone(args)
      .then(this.hidePopupCall)
      .catch(console.error);
  }

  onRegionChangeComplete = region => {
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.setState({
        zoomMapView: region
      });
    }, 100);
  };

  componentWillUnmount() {
    this.navListener.remove();
    this.props.actions.map.clearMapDirections();
    navigator.geolocation.clearWatch();
  }
}

const mapStateTpProps = state => {
  return {
    readLimitList: state.loans.readLimitList,
    coords: state.map.coords,
    yourLocation: state.map.yourLocation,
    userLocation: state.map.userLocation,
    data: state.client.data,
    listLoans: state.loans.listLoans,
    listLoansUnCollected: state.loans.listLoansUnCollected
  };
};

export default connectRedux(mapStateTpProps, MapScreen);
