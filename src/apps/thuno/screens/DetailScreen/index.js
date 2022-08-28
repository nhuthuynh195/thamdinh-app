import React from "react";
import Layout from "./layout";
import connectRedux from "../../redux/connectRedux";
import { Animated, Linking, Platform, BackHandler } from "react-native";
import { DeviceEventEmitter } from "react-native";
import { Subject, from, Observable } from "rxjs";
import {
  getPosotion,
  validDateFormat,
  showAlertTurnOnLocation,
} from "@core/utils/func";
import {
  makeSelectDetailLoans,
  makeRepayment,
  makeCollectLoanFailed,
  makeUploadAudio,
  makeReadLimitList,
} from "./selectors";
import { map, distinctUntilChanged, filter, finalize } from "rxjs/operators";
import { createStructuredSelector } from "reselect";
import AudioManager from "@core/lib/AudioManager";
import ImagePicker from "react-native-image-picker";
const eventType = "CLOSE_MODAL";
const eventCollectionFail = "COLLECTION_FAIL_SUCCESS";

class DetailScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      expandViewAnimation: new Animated.Value(0),
      inputMoney: "",
      noteRepayment: "",
      photo: null,
      initState: true,
      arrayImage: [],
      periodMoney: "",
      dateAppointment: "",
      moneyAppointment: "",
      path: "",
      noteAppointment: "",
      countRecoder: false,
      isFetching: false,
      visiblePopupConfrimRecorder: false,
    };
    this.backHome = this.backHome.bind(this);
    this.changeText = this.changeText.bind(this);
    this.recorderRef = React.createRef();
    this.countRecoderStream = new Subject();
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      (payload) =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  callPhone = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  backHome = () => {
    this.state.countRecoder
      ? this.stopRecord()
      : this.props.navigation.goBack();
  };

  record = () => {
    this.setState({ countRecoder: true }, () =>
      AudioManager.getInstance()
        .start()
        .then(() => {
          // console.log("recording ...");
        })
    );
  };

  stopRecord = async () => {
    try {
      const position = await getPosotion();
      AudioManager.getInstance()
        .stop()
        .then(() => {
          this.setState(
            {
              countRecoder: false,
            },
            () => {
              let detailLoans = this.props.detailLoans;
              let body = {
                document_kind: "loan_collection_audio",
                person_id: detailLoans.p_id,
                current_longitude: position.coords.longitude,
                current_latitude: position.coords.latitude,
              };
              this.props.actions.loans.uploadAudio(body, this.state.path);
            }
          );
        });
    } catch (error) {
      showAlertTurnOnLocation();
    }
  };

  onRefresh() {
    this.setState({ isFetching: true }, async () => {
      let id = this.props.navigation.getParam("id", 0);
      this.props.actions.loans.getDetailLoans(id);
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.detailLoans && prevState.isFetching) {
      return {
        isFetching: false,
      };
    }
  }

  deleteImage(index) {
    let arr = [...this.state.arrayImage];
    arr.splice(index, 1);
    this.setState({ arrayImage: arr });
  }

  handleChoosePhoto = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      quality: 1,
      maxWidth: 720, // photos only
      maxHeight: 1280, // photos only
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        let arrTemp = [...this.state.arrayImage];
        arrTemp.push(response);
        this.setState({ arrayImage: arrTemp });
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { makeRepayment, collectLoanFailed, uploadAudio } = this.props;
    if (
      collectLoanFailed &&
      collectLoanFailed.status == 201 &&
      collectLoanFailed !== prevProps.collectLoanFailed
    ) {
      this.props.openAlert(
        `Hệ thống đã ghi nhận bạn chưa thu được \n Vui lòng quay lại list để tiếp tục`,
        eventCollectionFail
      );
    }
  }

  async gotoReceipt() {
    if (this.props.readLimitList.receipt_code === 2004) {
      this.props.navigation.navigate("UploadComplete");
    } else {
      const periodMoney = this.periodMoney.getRawValue();
      if (periodMoney > 0) {
        const position = await getPosotion();
        let id = this.props.navigation.getParam("id", 0);
        let body = {
          payment_amount: periodMoney,
          note: this.state.noteRepayment,
          current_longitude: position.coords.longitude,
          current_latitude: position.coords.latitude,
        };
        this.props.actions.loans.makeRepayment(id, body, periodMoney);
        this.state.countRecoder ? this.stopRecord() : null;
      } else {
        const { alertWithType } = this.props;
        alertWithType("warn", "Xin lỗi!", "Vui lòng điền số tiền thu được");
      }
    }
  }

  async collectLoanFailed() {
    const { alertWithType } = this.props;
    let { dateAppointment, noteAppointment } = this.state;
    if (noteAppointment.trim() === "") {
      alertWithType("warn", "Xin lỗi!", "Bạn phải nhập ghi chú");
    } else if (!validDateFormat(dateAppointment)) {
      alertWithType(
        "warn",
        "Xin lỗi!",
        "Định dạng ngày không đúng .. Bạn phải nhập ngày chính xác DD/MM/YYYY"
      );
    } else {
      const position = await getPosotion();
      let id = this.props.navigation.getParam("id", 0);
      const moneyAppointment = this.moneyAppointment.getRawValue();
      let body = {
        note: noteAppointment,
        promised_date: dateAppointment,
        promised_amount: moneyAppointment,
        current_longitude: position.coords.longitude,
        current_latitude: position.coords.latitude,
      };
      this.state.countRecoder ? this.stopRecord() : null;
      this.props.actions.loans.collectLoanFailed(
        id,
        body,
        this.state.arrayImage
      );
    }
  }

  componentDidMount() {
    let id = this.props.navigation.getParam("id", 0);
    this.props.actions.loans.getDetailLoans(id);
    this.actionTypeAlert();
    AudioManager.getInstance()
      .checkPermission()
      .then((hasPermission) => {
        AudioManager.getInstance().setOnProgressListener(
          this.onProgressRecorder
        );
        AudioManager.getInstance().setOnFinishListener(this.onFinishRecorder);
      });
    this.initCountRecorderStream();
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  onBackButtonPressAndroid = () => {
    this.state.countRecoder
      ? this.stopRecord()
      : this.props.navigation.goBack();
    return true;
  };

  playAudio = () => {
    const { path } = this.state;
    AudioManager.play(path);
  };

  cancelAudio = () => {
    this.setState({
      visiblePopupConfrimRecorder: false,
      countRecoder: false,
    });
  };

  onFinishRecorder = (didSucceed, name, path) => {
    this.setState({
      path,
    });
  };

  componentWillUnmount() {
    this.props.actions.loans.clearDetailLoans();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.countRecoderStream.pipe(
      finalize(() => {
        // console.log("unsubscribe")
      })
    );
  }

  actionTypeAlert = () => {
    DeviceEventEmitter.addListener(eventType, (e) => {
      alert("Thu thất bại rồi");
    });
    DeviceEventEmitter.addListener(eventCollectionFail, (e) => {
      this.props.navigation.replace("Home");
    });
  };

  initCountRecorderStream = () => {
    this.countRecoderStream
      .pipe(
        map((value) => Math.floor(value)),
        distinctUntilChanged()
      )
      .subscribe((time) => {
        this.recorderRef.current.onProgressRecorder(time);
      });
  };

  onProgressRecorder = (data) => {
    this.countRecoderStream.next(data.currentTime);
  };
}

const mapStateToProps = createStructuredSelector({
  detailLoans: makeSelectDetailLoans(),
  makeRepayment: makeRepayment(),
  collectLoanFailed: makeCollectLoanFailed(),
  uploadAudio: makeUploadAudio(),
  readLimitList: makeReadLimitList(),
});

export default connectRedux(mapStateToProps, DetailScreen);
