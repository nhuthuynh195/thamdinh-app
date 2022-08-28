import React from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { PushNotificationIOS } from "react-native";

import Layout from "./layout";
import connectRedux from "../../redux/connectRedux";
import CallPhone from "@core/utils/callPhone";
import { getPosotion, showAlertTurnOnLocation } from "@core/utils/func";

class HomeScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visiblePopUpPhone: false,
      phone: "",
      currentTab: 0,
    };
    this.sortModalRef = React.createRef();
    this.props.actions.noti.getNumberNotiUnRead();
  }

  async componentDidMount() {
    this.pushNotification = this.setupPushNotification(
      this._handleNotificationOpen
    );
    this.getListBusinessEvaluateInHome();
  }

  getListBusinessEvaluateInHome = async () => {
    if (Platform.OS === "ios") {
      try {
        const position = await getPosotion();
        this.props.actions.app.getListBusinessEvaluate(
          position.coords.latitude,
          position.coords.longitude,
          this.props.sortBusinessEvaluate
        );
        this.props.actions.map.setYourLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        showAlertTurnOnLocation(this.ListBusinessEvaluateInHome);
      }
    } else {
      const chckLocationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Ứng dụng yêu cầu quyền truy cập vị trí",
              message:
                "Chúng tôi yêu cầu sự cho phép của Địa điểm để có được vị trí thiết bị " +
                "Vui lòng cấp quyền truy cập vị trí.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
              const position = await getPosotion();
              this.props.actions.app.getListBusinessEvaluate(
                position.coords.latitude,
                position.coords.longitude,
                this.props.sortBusinessEvaluate
              );
              this.props.actions.map.setYourLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            } catch (error) {
              showAlertTurnOnLocation(this.ListBusinessEvaluateInHome);
            }
          } else {
          }
        } catch (err) {}
      }
    }
  };

  ListBusinessEvaluateInHome = () => {
    this.getListBusinessEvaluateInHome();
  };

  setupPushNotification = async (handleNotification) => {
    await PushNotification.configure({
      onRegister: (token) => {
        let body = {
          app_type: "evaluates",
          os_platform: token.os,
          evaluates_push_token: token.token,
        };
        this.props.actions.auth.updateEndPointPushNoti(body);
      },
      onNotification: (notification) => {
        if (notification.foreground) {
          if (notification.userInteraction) {
            // console.log("NOTIFICATION touched:", notification);
          } else {
          }
        } else {
          if (notification.userInteraction) {
            // console.log("NOTIFICATION touched:", notification);
            handleNotification(notification);
          } else {
            // console.log(notification.userInteraction);
            handleNotification(notification);
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: "159933351089",
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    return PushNotification;
  };

  _handleNotificationOpen = (notification) => {
    let noti = null;
    if (notification.data) {
      noti = notification.data;
    } else {
      noti = notification;
    }
    const temptTypeClient =
      noti.evaluate_type === "property"
        ? "property_evaluate"
        : "business_evaluate";
    this.props.actions.noti.readNoti({ id: noti.id });
    if (temptTypeClient === "business_evaluate") {
      this.props.navigation.navigate("UserDetail", {
        typeUser: "Business",
        clientTitleHeader: "",
        clientId: noti.contract_id,
        clientype: temptTypeClient,
      });
    } else {
      this.props.navigation.navigate("UserDetail1", {
        typeUser: "Property",
        clientTitleHeader: "",
        clientId: noti.contract_id,
        clientype: temptTypeClient,
      });
    }
  };

  mapNavigateToScreen = (navigate, notification) => {
    let routeName = "";
    switch (parseInt(notification.type)) {
      case 1:
        routeName = "Detail";
        break;
      default:
        routeName = "Home";
    }
    navigate(routeName, {
      type: "Navigate",
      routeName: routeName,
      params: {
        itemtype: parseInt(notification.parentid),
      },
    });
  };

  selectCondiSort = (sort) => {
    this.setState({
      sort,
    });
  };

  gotoSearch = () => {
    this.props.navigation.navigate("Search");
  };

  gotoMap = () => {
    if (this.state.currentTab !== 2) {
      const typeUser = this.state.currentTab === 0 ? "Thẩm KD" : "Thẩm nhà";
      this.props.navigation.navigate("Map", {
        typeUser: typeUser,
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Chức năng này không có trong màn hình đã thẩm !",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }
  };

  gotoProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  gotoNoti = () => {
    this.props.navigation.navigate("Notification");
  };

  gotoSort = () => {
    if (this.state.currentTab !== 2) {
      if (this.state.currentTab === 0) {
        const { sortBusinessEvaluate } = this.props;
        this.sortModalRef.current.setConditionSortFromParent(
          { ...sortBusinessEvaluate },
          "Business"
        );
      } else {
        const { sortPropertyEvaluate } = this.props;
        this.sortModalRef.current.setConditionSortFromParent(
          { ...sortPropertyEvaluate },
          "Property"
        );
      }
      this.setState({
        visible: true,
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Chức năng này không có trong màn hình đã thẩm !",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    }
  };

  onRequestClose = () => {
    this.setState({
      visible: false,
    });
  };

  callPhone = () => {
    const args = {
      number: this.state.phone,
      prompt: false,
    };
    CallPhone(args).then(this.hidePopupCall).catch(console.error);
  };

  hidePopupCall = () => {
    this.setState({
      visiblePopUpPhone: false,
    });
  };

  showPopupPhone = async (phone) => {
    await this.setState({
      phone,
    });
    await this.setState({
      visiblePopUpPhone: true,
    });
  };

  sortUserByConditon() {
    const conditionSort = this.sortModalRef.current.state.sort;
    const typeUserSort = this.sortModalRef.current.state.typeUserSort;
    const { sortBusinessEvaluate, sortPropertyEvaluate } = this.props;
    const { latitude, longitude } = this.props.yourLocation;
    if (typeUserSort === "Business") {
      if (conditionSort.title !== sortBusinessEvaluate.title) {
        this.props.actions.app.getListBusinessEvaluate(
          latitude,
          longitude,
          conditionSort
        );
        this.props.actions.app.updateConditionSortBusinessEvalute(
          conditionSort
        );
      }
    } else {
      if (conditionSort.title !== sortPropertyEvaluate.title) {
        this.props.actions.app.getListPropertyEvaluate(
          latitude,
          longitude,
          conditionSort
        );
        this.props.actions.app.updateConditionSortPropertyEvalute(
          conditionSort
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoadingGetListBusinessEvaluate:
      state.app.isLoadingGetListBusinessEvaluate,
    listBusinessEvaluate: state.app.listBusinessEvaluate,
    sortBusinessEvaluate: state.app.sortBusinessEvaluate,
    sortPropertyEvaluate: state.app.sortPropertyEvaluate,
    yourLocation: state.map.yourLocation,
    unread_notifications: state.app.unread_notifications,
  };
};

export default connectRedux(mapStateToProps, HomeScreen);
