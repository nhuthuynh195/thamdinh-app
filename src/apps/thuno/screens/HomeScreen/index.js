import React from "react";

import HomeLayout from "@core/screens/LayoutHome";
import PushNotification from "react-native-push-notification";
import connectRedux from "../../redux/connectRedux";
import { getPosotion } from "@core/utils/func";
import { PushNotificationIOS } from "react-native";
import CallPhone from "@core/utils/callPhone";
import { Alert } from "react-native";
import _ from "ramda";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";

import { createStructuredSelector } from "reselect";
import {
  makeListLoansUnCollected,
  makeSelectListLoans,
  makeReadLimitList,
  makeGetLocation,
  makeSortListLoans,
  makeSortListLoansCollection,
  makeSelectStatusPrinter
} from "./selectors";

class LayoutHome extends HomeLayout {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      visible: false,
      currentTab: 0,
      sort: 0,
      visiblePopUpPhone: false,
      isFetching: false,
      phonePopUp: "",
      pageCollectionLoans: 1,
      showLoadCollectionLoans: true,

      dataCollection: false,
      dataLoans: false,

      pageLoans: 1,
      showLoadLoans: true
    };
    this.gotoProfile = this.gotoProfile.bind(this);
    this.gotoNoti = this.gotoNoti.bind(this);
    this.gotoMap = this.gotoMap.bind(this);
    this.gotoSearch = this.gotoSearch.bind(this);
    this.selectCondiSort = this.selectCondiSort.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.sortModalRef = React.createRef();
  }

  onRefresh() {
    this.setState({ isFetching: true }, async () => {
      const position = await getPosotion();
      if (this.state.currentTab === 1) {
        this.props.actions.loans.getListLoans(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({
          isFetching: true,
          pageLoans: 1,
          showLoadLoans: true,
          dataLoans: false
        });
      } else {
        this.props.actions.loans.getListLoansUnCollected(
          position.coords.latitude,
          position.coords.longitude
        );
        this.setState({
          isFetching: true,
          pageCollectionLoans: 1,
          showLoadCollectionLoans: true,
          dataCollection: false
        });
      }
      this.props.actions.loans.getReachLimitData();
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      (nextProps.listLoans || nextProps.listLoansUnCollected) &&
      prevState.isFetching
    ) {
      return {
        isFetching: false
      };
    }
    if (
      nextProps.listLoansUnCollected &&
      nextProps.listLoansUnCollected.data !== prevState.dataCollection
    ) {
      return {
        dataCollection: nextProps.listLoansUnCollected.data
      };
    }
    if (
      nextProps.listLoans &&
      nextProps.listLoans.data !== prevState.dataLoans
    ) {
      return {
        dataLoans: nextProps.listLoans.data
      };
    }
  }

  callPhone = () => {
    const args = {
      number: this.state.phonePopUp,
      prompt: false
    };
    CallPhone(args)
      .then(this.hidePopupCall)
      .catch(console.error);
  };

  gotoMap = () => {
    if (this.state.currentTab == 0) {
      this.props.navigation.navigate("Map");
    } else {
      Alert.alert(
        "Thông báo",
        "Chức năng này không có trong màn hình đã thu !",
        [{ text: "OK", onPress: () => { } }],
        { cancelable: false }
      );
    }
  };

  UploadReceipt = () => {
    let readLimitList = this.props.readLimitList;
    if (
      readLimitList.receipt_code === 200 ||
      readLimitList.receipt_code === 2001
    ) {
      this.props.navigation.navigate("UploadReceipt");
    } else {
      this.props.navigation.navigate("UploadComplete");
    }
  };

  gotoMapItem = user => {
    if (this.state.currentTab == 0) {
      this.props.navigation.navigate("Map", {
        indexClientLocation: _.findIndex(
          _.propEq("contract_id", user.contract_id)
        )(this.filterLocationNotNull(this.props.listLoansUnCollected.data))
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Chức năng này không có trong màn hình đã thu !",
        [{ text: "OK", onPress: () => { } }],
        { cancelable: false }
      );
    }
  };

  repay(id) {
    this.props.actions.loans.getLastTransaction(id);
  }

  filterLocationNotNull(data) {
    return data.filter(item => item.distance_measured !== 0);
  }

  gotoProfile = () => {
    this.props.navigation.navigate("Profile");
  };

  gotoNoti = () => {
    this.props.navigation.navigate("Noti");
  };

  gotoSearch = () => {
    this.props.navigation.navigate("Search");
  };

  gotoDetail = id => {
    this.props.navigation.navigate("Detail", { id: id });
  };

  gotoSort = () => {
    if (this.state.currentTab === 0) {
      const { sortListLoansCollection } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...sortListLoansCollection },
        "ListLoansUnCollected"
      );
    } else {
      const { sortListLoans } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...sortListLoans },
        "ListLoans"
      );
    }
    this.setState({
      visible: true
    });
  };

  showPopupPhone = phone => {
    this.setState({
      phonePopUp: phone,
      visiblePopUpPhone: !this.state.visiblePopUpPhone
    });
  };

  onRequestClose = () => {
    this.setState({
      visible: false
    });
  };

  selectCondiSort(sort) {
    this.setState({
      sort
    });
  }

  sortUserByConditon() {
    const conditionSort = this.sortModalRef.current.state.sort;
    const typeUserSort = this.sortModalRef.current.state.typeUserSort;
    const { sortListLoansCollection, sortListLoans } = this.props;
    const { latitude, longitude } = this.props.yourLocation;
    if (typeUserSort === "ListLoans") {
      if (conditionSort.title !== sortListLoans.title) {
        this.props.actions.loans.getListLoans(
          latitude,
          longitude,
          conditionSort
        );
        this.props.actions.loans.updateConditionSortListLoans(conditionSort);
      }
    } else {
      if (conditionSort.title !== sortListLoansCollection.title) {
        this.props.actions.loans.getListLoansUnCollected(
          latitude,
          longitude,
          conditionSort
        );
        this.props.actions.loans.updateConditionSortListLoansCollection(
          conditionSort
        );
      }
    }
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeAllListeners();
  }

  async componentDidMount() {
    this.pushNotification = this.setupPushNotification(
      this._handleNotificationOpen
    );
    this.props.actions.loans.getReachLimitData();
    this.requestLocationBackground();
    try {
      const position = await getPosotion();
      this.props.actions.loans.getListLoans(
        position.coords.latitude,
        position.coords.longitude
      );
      this.props.actions.loans.getListLoansUnCollected(
        position.coords.latitude,
        position.coords.longitude
      );
      this.props.actions.map.setYourLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    } catch (error) { }
  }

  setupPushNotification = async handleNotification => {
    await PushNotification.configure({
      onRegister: token => {
        let body = {
          app_type: "collect_loans",
          os_platform: token.os,
          collect_loans_push_token: token.token
        };
        this.props.actions.auth.updateEndPointPushNoti(body);
      },
      onNotification: notification => {
        // console.log("NOTIFICATION:", notification);

        if (notification.foreground) {
          if (notification.userInteraction) {
            // console.log("NOTIFICATION touched:", notification);
          } else {
            // console.log(
            //   "NOTIFICATION foreground userInteraction:",
            //   notification.userInteraction
            // );
          }
          handleNotification(notification);
        } else {
          if (notification.userInteraction) {
            // console.log("NOTIFICATION touched:", notification);
            handleNotification(notification);
          } else {
            // console.log(
            //   "NOTIFICATION userInteraction:",
            //   notification.userInteraction
            // );
            handleNotification(notification);
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: "829861433599",
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
    return PushNotification;
  };

  _handleNotificationOpen = notification => {
    let notis = null;
    if (notification.data) {
      notis = notification.data;
    } else {
      notis = notification;
    }
    const { navigate } = this.props.navigation;
    this.mapNavigateToScreen(navigate, notis);
  };

  mapNavigateToScreen = (navigate, notification) => {
    let routeName = "Noti";
    navigate(routeName, {
      type: "Navigate",
      routeName: routeName,
      params: {}
    });
  };

  requestLocationBackground = () => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 600000,
      fastestInterval: 600000,
      activitiesInterval: 600000,
      stopOnStillActivity: false
    });

    BackgroundGeolocation.on("location", location => {
      let body = {
        current_longitude: location.longitude,
        current_latitude: location.latitude
      };
      this.props.actions.loans.requestLocationBackground(body);
      BackgroundGeolocation.startTask(taskKey => {
        BackgroundGeolocation.endTask(taskKey);
      });
    });
    BackgroundGeolocation.on("authorization", status => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => BackgroundGeolocation.showAppSettings()
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel"
                }
              ]
            ),
          1000
        );
      }
    });
    BackgroundGeolocation.checkStatus(status => {
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  };

  loadMoreUnCollection = () => {
    if (
      this.props.listLoansUnCollected.current_page *
      this.props.listLoansUnCollected.per_page >
      this.props.listLoansUnCollected.total_count
    ) {
      this.setState({ showLoadCollectionLoans: false });
      return;
    } else {
      this.setState(
        { pageCollectionLoans: this.state.pageCollectionLoans + 1 },
        () => this._getList()
      );
    }
  };

  loadMoreLoans = () => {
    if (
      this.props.listLoans.current_page * this.props.listLoans.per_page >
      this.props.listLoans.total_count
    ) {
      this.setState({ showLoadLoans: false });
      return;
    } else {
      this.setState({ pageLoans: this.state.pageLoans + 1 }, () =>
        this._getListLoans()
      );
    }
  };

  async _getListLoans() {
    const position = await getPosotion();
    const conditionSort = this.sortModalRef.current.state.sort;
    this.props.actions.loans.getListLoans(
      position.coords.latitude,
      position.coords.longitude,
      conditionSort,
      this.state.pageLoans
    );
  }

  async _getList() {
    const position = await getPosotion();
    const conditionSort = this.sortModalRef.current.state.sort;
    this.props.actions.loans.getListLoansUnCollected(
      position.coords.latitude,
      position.coords.longitude,
      conditionSort,
      this.state.pageCollectionLoans
    );
  }
}

const mapStateToProps = createStructuredSelector({
  readLimitList: makeReadLimitList(),
  listLoans: makeSelectListLoans(),
  listLoansUnCollected: makeListLoansUnCollected(),
  yourLocation: makeGetLocation(),
  sortListLoans: makeSortListLoans(),
  sortListLoansCollection: makeSortListLoansCollection(),
  isPrinterConnect: makeSelectStatusPrinter()
});

export default connectRedux(mapStateToProps, LayoutHome);
