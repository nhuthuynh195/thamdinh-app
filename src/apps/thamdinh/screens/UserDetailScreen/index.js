import React from "react";
import { Keyboard, Platform, PixelRatio, Alert } from "react-native";
import { Subject } from "rxjs";
import { map, distinctUntilChanged, finalize } from "rxjs/operators";
import _ from "ramda";
import ImagePicker from "react-native-image-picker";

import AudioManager from "@core/lib/AudioManager";
import Layout from "./layout";
import {
  scaleSzie,
  getKeyOfObject,
  getPosotion,
  showAlertTurnOnLocation,
} from "@core/utils/func";
import CallPhone from "@core/utils/callPhone";
import connectRedux from "../../redux/connectRedux";

const initialState = {
  heightMoreProfile: 0,
  keyboardHeight: 0,
  notes: [],
  visiblePickerStatus: false,
  visiblePickerIsBoss: false,
  visiblePickerDues: false,
  visiblePopupConfrim: false,
  visiblePopupConfrimRecorder: false,
  visiblePopUpPhone: false,
  status: [],
  indexStatusSelect: 0,
  indexIsBoss: 0,
  arrIsBoss: [],
  arrDues: [],
  indexDues: 0,
  path: "",
  initState: true,
  visibleModalTakePhoto: false,
  visibleModalUpload: false,
  phi: false,
  photos: [],
  // ----- state hide/show table -----
  isShowTableCurrentBusinessIncome: true,
  isShowTableCostOfGoodsSold: true,
  isShowTableBusinessExpenses: true,
  isShowTableFamilyExpenses: true,
  isShowTableExpenses: true,

  isShowPopupEditBusiness: false,
  scrollOffset: scaleSzie(72),
  visibleModalTabbar: false,
  // initialPage: 0,
  disableEditBusinessInfo: true,
  // ------- table thu_nhap_kd -------
  thu_nhap_kd: {},
  dataEditBusiness: {},
  statusTableBusinessInfo: {
    title: "Kinh doanh 1",
    key: "thu_nhap_kd_1",
  },
  // ----- table gia_von_kd ----
  gia_von_kd: {},
  dataEditBusinessCapital: {},
  statusTableBusinessCapitalInfo: {
    title: "Kinh doanh 1",
    key: "gia_von_kd_1",
  },
  isShowPopupEditBusinessCapital: false,
  // ----- table chi_phi_thuoc_ve_kd ----
  chi_phi_kd_thue_nha: {},
  chi_phi_kd_dien_nuoc: {},
  chi_phi_kd_thue_nv: {},
  chi_phi_kd_van_hanh: {},
  // ----- table chi_phi_thuoc_ve_gd ----
  chi_phi_gia_dinh_an_uong: {},
  chi_phi_gia_dinh_xang_dt_internet: {},
  chi_phi_gia_dinh_hoc_phi_cho_con: {},
  chi_phi_gia_dinh_chi_phi_khac: {},
  chi_phi_gia_dinh_chi_phi_du_phong: {},
  chi_phi_gia_dinh_tro_cap: {},
  chi_phi_vay_ngoai: {},

  // ----- popup edit remaining infomation ----
  isShowPopupEditRemainingInfomation: false,
  dataEditRemainingInfomation: {},
  keyEditRemainingInfomation: "",
  titlePopupRemaining: "",
  titleHeaderPopupRemaining: "",
  avatar: "",
  visibleModalReviewPhotos: false,
  photosReview: [],

  // --------- Reject Reason ------
  arrRejectReason: [],
  indexRejectReason: 0,
  visibleRejectReason: false,

  visibleReviewAvatar: false,
  swipeDirection: "down",

  rejectReason: {
    code: "",
    title: "",
  },
  // --------- Note  ------

  note_numberPeoplesRequest: "",
  note_client: "",
  note_satellite_1: "",
  note_satellite_2: "",
  note_satellite_3: "",
};

class UserDetailScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      countRecoder: false,
      isShowAlertUploadAudio: true,
      updateAudio: true,
      initialPage: 0,
    };

    this.recorderRef = React.createRef();
    this.scrollTab1Ref = React.createRef();
    this.tableCurrentBusinessIncomeRef = React.createRef();
    this.countRecoderStream = new Subject();

    this.so_luong_nguoi_hoi_Ref = React.createRef();
    this.ghi_chu_Ref = React.createRef();
    this.ve_tinh_1_Ref = React.createRef();
    this.ve_tinh_2_Ref = React.createRef();
    this.ve_tinh_3_Ref = React.createRef();
    // ----- Review Photos -----
    this.reviewPhotoRef = React.createRef();
    this.modal_reject_reason_Ref = React.createRef();
    this.modalRejectReasonRef = React.createRef();

    this.edtiNotesRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { clientDetail } = nextProps;
    if (!_.isEmpty(clientDetail) && prevState.initState) {
      const {
        business_evaluate_field_options,
        status,
        business_evaluation_data,
        evaluation_board_data,
      } = clientDetail;
      const {
        chi_phi_kd_thue_nha,
        chi_phi_kd_dien_nuoc,
        chi_phi_kd_thue_nv,
        chi_phi_kd_van_hanh,
      } = evaluation_board_data.chi_phi_thuoc_ve_kd;

      const {
        chi_phi_gia_dinh_an_uong,
        chi_phi_gia_dinh_xang_dt_internet,
        chi_phi_gia_dinh_hoc_phi_cho_con,
        chi_phi_gia_dinh_chi_phi_khac,
        chi_phi_gia_dinh_chi_phi_du_phong,
        chi_phi_gia_dinh_tro_cap,
      } = evaluation_board_data.chi_phi_thuoc_ve_gd;

      const temptArrayStatus = Object.keys(
        business_evaluate_field_options.evaluate_statuses
      );
      const temptArrayIsBoss = Object.keys(
        business_evaluate_field_options.tham_kd_tai_kh_la_chu_kd
      );
      const temptArrayDues = Object.keys(
        business_evaluate_field_options.tham_kd_tung_bi_doi_no_tai_cho
      );
      const temptArrayRejectReason = Object.keys(
        business_evaluate_field_options.tham_kd_ly_do_tu_choi
      );

      temptArrayStatus.unshift("");
      temptArrayIsBoss.unshift("");
      temptArrayDues.unshift("");
      temptArrayRejectReason.unshift("");

      const indexStatusSelect = !status
        ? 0
        : business_evaluate_field_options.evaluate_statuses[status];
      const indexIsBoss = !business_evaluation_data.tham_kd_tai_kh_la_chu_kd
        ? 0
        : parseInt(
            business_evaluate_field_options.tham_kd_tai_kh_la_chu_kd[
              business_evaluation_data.tham_kd_tai_kh_la_chu_kd
            ]
          );
      const indexDues = !business_evaluation_data.tham_kd_tung_bi_doi_no_tai_cho
        ? 0
        : parseInt(
            business_evaluate_field_options.tham_kd_tung_bi_doi_no_tai_cho[
              business_evaluation_data.tham_kd_tung_bi_doi_no_tai_cho
            ]
          );
      let indexRejectReason = 0;

      for (let i = 0; i < temptArrayRejectReason.length; i++) {
        if (
          temptArrayRejectReason[i] ==
          business_evaluation_data.tham_kd_ly_do_tu_choi
        ) {
          indexRejectReason = i;
          break;
        }
      }

      const title_rejectReason = business_evaluation_data.tham_kd_ly_do_tu_choi
        ? business_evaluation_data.tham_kd_ly_do_tu_choi
        : "";
      const tempt_rejectReason = {
        title: title_rejectReason,
        code:
          business_evaluate_field_options.tham_kd_ly_do_tu_choi[
            title_rejectReason
          ],
      };

      const temptNumberPeoplesRequest = business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
        ? business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
        : "";
      const temptNote = business_evaluation_data.tham_kd_tai_ghi_chu
        ? business_evaluation_data.tham_kd_tai_ghi_chu
        : "";
      const temptSatellite1 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1
        ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1
        : "";
      const temptSatellite2 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2
        ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2
        : "";
      const temptSatellite3 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3
        ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3
        : "";

      return {
        ...initialState,
        avatar:
          clientDetail.avatar_url === null
            ? prevState.avatar
            : clientDetail.avatar_url,
        visibleModalTabbar: prevState.visibleModalTabbar,
        status: temptArrayStatus,
        arrIsBoss: temptArrayIsBoss,
        arrDues: temptArrayDues,
        indexStatusSelect,
        indexIsBoss,
        indexDues,
        initState: false,
        thu_nhap_kd: evaluation_board_data.thu_nhap_kd,
        gia_von_kd: evaluation_board_data.gia_von_kd,
        // ---------- Business ---------
        chi_phi_kd_thue_nha,
        chi_phi_kd_dien_nuoc,
        chi_phi_kd_thue_nv,
        chi_phi_kd_van_hanh,
        // ---------- Family ---------
        chi_phi_gia_dinh_an_uong,
        chi_phi_gia_dinh_xang_dt_internet,
        chi_phi_gia_dinh_hoc_phi_cho_con,
        chi_phi_gia_dinh_chi_phi_khac,
        chi_phi_gia_dinh_chi_phi_du_phong,
        chi_phi_gia_dinh_tro_cap,
        chi_phi_vay_ngoai: evaluation_board_data.chi_phi.chi_phi_vay_ngoai,
        // -------- Reject Reason ------
        arrRejectReason: temptArrayRejectReason,
        indexRejectReason: indexRejectReason,
        rejectReason: tempt_rejectReason,

        // -------- Note ------
        note_numberPeoplesRequest: temptNumberPeoplesRequest,
        note_client: temptNote,
        note_satellite_1: temptSatellite1,
        note_satellite_2: temptSatellite2,
        note_satellite_3: temptSatellite3,
      };
    }
    return null;
  }

  componentDidMount() {
    const clientId = this.props.navigation.getParam("clientId", "");
    const clientype = this.props.navigation.getParam("clientype", "");
    this.props.actions.client.getDetailClient(clientId, clientype);
    this.props.actions.client.getClientDocumentInfo(clientId);

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    AudioManager.getInstance()
      .checkPermission()
      .then((hasPermission) => {
        AudioManager.getInstance().setOnProgressListener(
          this.onProgressRecorder
        );
        AudioManager.getInstance().setOnFinishListener(this.onFinishRecorder);
      });

    this.initCountRecorderStream();
  }

  changeAvatar = async () => {
    try {
      const { clientDetail } = this.props;
      const { id, person_id } = clientDetail;
      const position = await getPosotion();
      const clientId = this.props.navigation.getParam("clientId", "");
      const clientype = this.props.navigation.getParam("clientype", "");
      ImagePicker.showImagePicker(
        {
          maxWidth: PixelRatio.getPixelSizeForLayoutSize(600), // photos only
          maxHeight: PixelRatio.getPixelSizeForLayoutSize(400), // photos only
        },
        (response) => {
          if (response.uri) {
            let fileName = response.fileName;
            if (fileName) {
              if (
                Platform.OS === "ios" &&
                (fileName.endsWith(".heic") || fileName.endsWith(".HEIC"))
              ) {
                fileName = `${fileName.split(".")[0]}.JPG`;
              }
            }
            const data = {
              uri: response.uri,
              fileName: fileName,
              type: response.type,
            };
            this.props.actions.upload.uploadPhoto(
              [data],
              "anh_dai_dien",
              person_id,
              null,
              position.coords.longitude,
              position.coords.latitude,
              false,
              clientId,
              clientype
            );
            this.setState({
              avatar: response.uri,
            });
          }
        }
      );
    } catch (error) {
      showAlertTurnOnLocation();
    }
  };

  tab1Scroll(number) {
    this.scrollTab1Ref.current.scrollTo({
      x: 0,
      y: scaleSzie(number),
      animated: true,
    });
  }

  keyboardDidShow = (e) => {
    const keyboardHeight = e.endCoordinates.height;
    this.setState({
      keyboardHeight,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  };

  submitAudio = () => {
    console.log("submitAudio");
    this.setState({
      visiblePopupConfrimRecorder: false,
      countRecoder: false,
    });
  };

  playAudio = () => {
    const { path } = this.state;
    AudioManager.play(path);
  };

  stopPlayAudio = () => {
    const { path } = this.state;
    AudioManager.pause(path);
  };

  cancelAudio = () => {
    console.log("cancelAudio");

    this.setState({
      visiblePopupConfrimRecorder: false,
      countRecoder: false,
    });
    AudioManager.getInstance().pause();
  };

  callPhone(phone) {
    const args = {
      number: phone,
      prompt: false,
    };
    CallPhone(args).then(this.hidePopupCall).catch(console.error);
  }

  showPopupCall = () => {
    this.setState({
      visiblePopUpPhone: true,
    });
  };

  hidePopupCall = () => {
    this.setState({
      visiblePopUpPhone: false,
    });
  };

  addNotes = () => {
    const { notes } = this.state;
    if (notes.length === 0) {
      this.setState({
        notes: [2],
      });
    } else {
      const temptNotes = [...notes];
      const lastItem = _.last(temptNotes);
      temptNotes.push(lastItem + 1);
      this.setState({
        notes: temptNotes,
      });
    }
  };

  async showDropdownStatus(isShow) {
    await this.setState({
      visiblePickerStatus: isShow,
    });
  }

  async showdropdownIsBoss(isShow) {
    await this.setState({
      visiblePickerIsBoss: isShow,
    });
  }

  async showdropdownDues(isShow) {
    await this.setState({
      visiblePickerDues: isShow,
    });
  }

  // --------- Reject Reason ------
  async showDrodownRejectReason(isShow) {
    await this.setState({
      visibleRejectReason: isShow,
    });
  }

  closePopupConfirm = () => {
    this.setState({
      visiblePopupConfrim: false,
    });
  };

  confirmAssesment = async () => {
    const {
      status,
      indexStatusSelect,
      arrIsBoss,
      indexIsBoss,
      arrDues,
      indexDues,
      arrRejectReason,
      indexRejectReason,
      rejectReason,
      note_numberPeoplesRequest,
      note_client,
      note_satellite_1,
      note_satellite_2,
      note_satellite_3,
      countRecoder,
    } = this.state;
    const { clientDetail } = this.props;
    const { business_evaluate_field_options } = clientDetail;
    const {
      evaluate_statuses,
      tham_kd_tai_kh_la_chu_kd,
      tham_kd_tung_bi_doi_no_tai_cho,
    } = business_evaluate_field_options;
    if (status[indexStatusSelect] == "Từ chối" && rejectReason.title === "") {
      alert("Vui lòng chọn lý do từ chối thẩm định !");
    } else {
      await this.setState({
        visiblePopupConfrim: false,
      });
      if(countRecoder) {
        this.setState({isShowAlertUploadAudio: false});
        await this.stopRecord();
      }
      // edit here
      this.props.actions.client.updateBusinessInfo(clientDetail.id, {
        status: evaluate_statuses[status[indexStatusSelect]],
        tham_kd_tai_kh_la_chu_kd:
          tham_kd_tai_kh_la_chu_kd[arrIsBoss[indexIsBoss]],
        tham_kd_tung_bi_doi_no_tai_cho:
          tham_kd_tung_bi_doi_no_tai_cho[arrDues[indexDues]],
        // tham_kd_tai_so_luong_nguoi_hoi: note_numberPeoplesRequest,
        tham_kd_tai_so_luong_nguoi_hoi: this.so_luong_nguoi_hoi_Ref.current
          .state.text,
        tham_kd_tai_ghi_chu: note_client,
        tham_kd_tai_cho_ghi_chu_ve_tinh_1: note_satellite_1,
        tham_kd_tai_cho_ghi_chu_ve_tinh_2: note_satellite_2,
        tham_kd_tai_cho_ghi_chu_ve_tinh_3: note_satellite_3,
        // tham_kd_ly_do_tu_choi: indexRejectReason !== 0 ? `${arrRejectReason[indexRejectReason]}`.split(' - ')[0] : '',
        tham_kd_ly_do_tu_choi: rejectReason.code ? rejectReason.code : "",
      });
    }
  };

  cancelltionConfirm = () => {
    this.setState({
      visiblePopupConfrim: false,
    });
  };

  showPopupConfirm = () => {
    const {
      status,
      indexStatusSelect,
      arrIsBoss,
      indexIsBoss,
      arrDues,
      indexDues,
    } = this.state;
    const { clientDetail } = this.props;
    const { business_info, evaluation_board_data } = clientDetail;
    if (status[indexStatusSelect] === "Duyệt") {
      if (arrIsBoss[indexIsBoss] == "") {
        alert("Vui lòng điền thông tin khách hàng là chủ kinh doanh !");
      } else if (arrDues[indexDues] == "") {
        alert("Vui lòng điền thông tin từng bị đòi nợ tại chỗ !");
      } else if (_.isEmpty(evaluation_board_data.gia_von_kd)) {
        alert("Vui lòng điền thông tin giá vốn kinh doanh !");
      } else if (_.isEmpty(evaluation_board_data.thu_nhap_kd)) {
        alert("Vui lòng điền thông tin thu nhập kinh doanh !");
      } else if (_.isEmpty(evaluation_board_data.gia_von_kd)) {
        alert("Vui lòng điền thông tin giá vốn kinh doanh !");
      } else if (_.isEmpty(clientDetail.location)) {
        alert("Vui lòng bấm cập nhật vị trí cửa hàng !");
      } else {
        const arrayKeycheck = getKeyOfObject(business_info);
        let isUpdate = true;
        for (let i = 0; i < arrayKeycheck.length; i++) {
          if (
            arrayKeycheck[i] == "ma_so_thue" ||
            arrayKeycheck[i] == "ma_so_doanh_nghiep"
          ) {
            continue;
          }
          if (
            arrayKeycheck[i] !== "dia_chi_kd" &&
            arrayKeycheck[i] !== "" &&
            arrayKeycheck[i] != undefined &&
            (business_info[arrayKeycheck[i]] == null ||
              business_info[arrayKeycheck[i]] == "" ||
              business_info[arrayKeycheck[i]] == undefined)
          ) {
            if (arrayKeycheck[i] === "thoi_gian_thue_con_lai") {
            } else {
              isUpdate = false;
              break;
            }
          }
        }
        if (isUpdate) {
          this.setState({
            visiblePopupConfrim: true,
          });
        } else {
          alert(
            "Vui lòng nhập đầy đủ thông tin trong phần Thông tin kinh doanh!"
          );
        }
      }
    } else {
      this.setState({
        visiblePopupConfrim: true,
      });
    }
  };

  showMoreProfile = () => {
    this.setState((prevState) => ({
      heightMoreProfile: prevState.heightMoreProfile === 0 ? scaleSzie(66) : 0,
    }));
  };

  backHome = () => {
    this.state.countRecoder
      ? Alert.alert(
          "Thông báo",
          "Bạn có muốn lưu ghi âm?",
          [
            {
              text: "No",
              style: "cancel",
              onPress: async () => {
                this.setState({ updateAudio: false });
                await this.stopRecord();
                this.props.navigation.goBack();
              },
            },
            {
              text: "Yes",
              onPress: async () => {
                await this.stopRecord();
              },
            },
          ],
          {
            cancelable: false,
          }
        )
      : this.props.navigation.goBack();
  };

  record = () => {
    this.setState({ countRecoder: true, updateAudio: true }, () =>
      AudioManager.getInstance()
        .start()
        .then(() => {})
    );
  };

  onFinishRecorder = async (didSucceed, name, path) => {
    console.log("didSucceed, name, path", didSucceed, name, path);
    if (this.state.updateAudio) {
      try {
        const position = await getPosotion();
        const { clientDetail } = this.props;
        const { id, person_id } = clientDetail;
        const showAlert = this.state.isShowAlertUploadAudio;
        if (path !== undefined) {
          this.props.actions.upload.uploadAudio(
            {
              document_kind: "business_evaluate_audio",
              person_id: person_id,
              contract_id: id,
              current_longitude: position.coords.longitude,
              current_latitude: position.coords.latitude,
            },
            path,
            showAlert,
          );
          await this.setState({
            path,
          });
          this.setState({
            isShowAlertUploadAudio: true,
          });
        }
      } catch (error) {
        showAlertTurnOnLocation();
      }
    }
  };

  stopRecord = async () => {
    AudioManager.getInstance()
      .stop()
      .then(() => {
        this.setState({
          countRecoder: false,
        });
      })
      .catch((error) => console.log("error : ", error));
  };

  showMenu = () => {
    const { path } = this.state;
  };

  initCountRecorderStream = () => {
    this.countRecoderStream
      .pipe(
        map((value) => Math.floor(value)),
        distinctUntilChanged()
      )
      .subscribe((time) => {
        this.recorderRef.current?.onProgressRecorder(time);
      });
  };

  onProgressRecorder = (data) => {
    this.countRecoderStream.next(data.currentTime);
  };

  toggleTableCurrentBusinessIncome = () => {
    this.setState((prevState) => ({
      isShowTableCurrentBusinessIncome: !prevState.isShowTableCurrentBusinessIncome,
    }));
  };

  toggleTableCostOfGoodsSold = () => {
    this.setState((prevState) => ({
      isShowTableCostOfGoodsSold: !prevState.isShowTableCostOfGoodsSold,
    }));
  };

  toggleTableBusinessExpenses = () => {
    this.setState((prevState) => ({
      isShowTableBusinessExpenses: !prevState.isShowTableBusinessExpenses,
    }));
  };

  toggleTableFamilyExpenses = () => {
    this.setState((prevState) => ({
      isShowTableFamilyExpenses: !prevState.isShowTableFamilyExpenses,
    }));
  };

  toggleTableExpenses = () => {
    this.setState((prevState) => ({
      isShowTableExpenses: !prevState.isShowTableExpenses,
    }));
  };

  async showpopupEditInfoBusiness(dataEdit = {}) {
    await this.setState({
      dataEditBusiness: dataEdit,
    });
    await this.setState({
      isShowPopupEditBusiness: true,
    });
  }

  getTitleTableBusinessInfo(key) {
    let temptTitle = "";
    switch (key) {
      case "thu_nhap_kd_1":
        temptTitle = "Kinh doanh 1";
        break;
      case "thu_nhap_kd_2":
        temptTitle = "Kinh doanh 2";
        break;
      case "thu_nhap_kd_3":
        temptTitle = "Kinh doanh 3";
        break;
      case "gia_von_kd_1":
        temptTitle = "Kinh doanh 1";
        break;
      case "gia_von_kd_2":
        temptTitle = "Kinh doanh 2";
        break;
      case "gia_von_kd_3":
        temptTitle = "Kinh doanh 3";
        break;
    }
    return temptTitle;
  }

  async updateTableBusiness(dataEdit = {}, key) {
    await this.setState({
      statusTableBusinessInfo: {
        title: this.getTitleTableBusinessInfo(key),
        key,
      },
      dataEditBusiness: dataEdit,
    });
    await this.setState({
      isShowPopupEditBusiness: true,
    });
  }

  async updateTableBusinessCapital(dataEdit = {}, key) {
    await this.setState({
      statusTableBusinessCapitalInfo: {
        title: "Hello",
        key,
      },
      dataEditBusinessCapital: dataEdit,
    });
    await this.setState({
      isShowPopupEditBusinessCapital: true,
    });
  }

  async createTableBusinessInfo(codeBusiness) {
    if (codeBusiness === "thu_nhap_kd_1") {
      await this.setState({
        statusTableBusinessInfo: {
          title: "Kinh doanh 1",
          key: "thu_nhap_kd_1",
        },
      });
    } else if (codeBusiness === "thu_nhap_kd_2") {
      await this.setState({
        statusTableBusinessInfo: {
          title: "Kinh doanh 2",
          key: "thu_nhap_kd_2",
        },
      });
    } else if (codeBusiness === "thu_nhap_kd_3") {
      await this.setState({
        statusTableBusinessInfo: {
          title: "Kinh doanh 3",
          key: "thu_nhap_kd_3",
        },
      });
    }
    await this.setState({
      dataEditBusiness: {},
      isShowPopupEditBusiness: true,
    });
  }

  async createTableBusinessCapitalInfo(codeCapital) {
    if (codeCapital === "gia_von_kd_1") {
      await this.setState({
        statusTableBusinessCapitalInfo: {
          title: "Kinh doanh 1",
          key: "gia_von_kd_1",
        },
      });
    } else if (codeCapital === "gia_von_kd_2") {
      await this.setState({
        statusTableBusinessCapitalInfo: {
          title: "Kinh doanh 2",
          key: "gia_von_kd_2",
        },
      });
    } else if (codeCapital === "gia_von_kd_3") {
      await this.setState({
        statusTableBusinessCapitalInfo: {
          title: "Kinh doanh 3",
          key: "gia_von_kd_3",
        },
      });
    }
    await this.setState({
      dataEditBusinessCapital: {},
      isShowPopupEditBusinessCapital: true,
    });
  }

  updateNoteWhenUpdateTable = () => {
    const {
      note_client,
      note_satellite_1,
      note_satellite_2,
      note_satellite_3,
    } = this.state;

    return {
      // tham_kd_tai_so_luong_nguoi_hoi: this.so_luong_nguoi_hoi_Ref.current.state.text,
      tham_kd_tai_ghi_chu: note_client,
      tham_kd_tai_cho_ghi_chu_ve_tinh_1: note_satellite_1,
      tham_kd_tai_cho_ghi_chu_ve_tinh_2: note_satellite_2,
      tham_kd_tai_cho_ghi_chu_ve_tinh_3: note_satellite_3,
    };
  };

  saveChangeInfoBusiness = async (table) => {
    const { statusTableBusinessInfo } = this.state;
    const { clientDetail } = this.props;
    await this.setState({
      isShowPopupEditBusiness: false,
    });

    // const data = this.updateNoteWhenUpdateTable();
    // edit here
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
      // ...data,
      [statusTableBusinessInfo.key]: table,
    });
  };

  saveChangeInfoBusinessCapital = async (table) => {
    const { statusTableBusinessCapitalInfo } = this.state;
    const { clientDetail } = this.props;
    await this.setState({
      isShowPopupEditBusinessCapital: false,
    });
    // const data = this.updateNoteWhenUpdateTable();
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
      // ...data,
      [statusTableBusinessCapitalInfo.key]: table,
    });
  };

  async editRemainingInfo(dataEdit, keyEdit, titlePopup, titleHeader) {
    await this.setState({
      dataEditRemainingInfomation: dataEdit,
      keyEditRemainingInfomation: keyEdit,
      titlePopupRemaining: titlePopup,
      titleHeaderPopupRemaining: titleHeader,
    });
    await this.setState({
      isShowPopupEditRemainingInfomation: true,
    });
  }

  saveRemainingInfo = async (dataEdit) => {
    const { keyEditRemainingInfomation } = this.state;
    const { clientDetail } = this.props;
    await this.setState({
      isShowPopupEditRemainingInfomation: false,
    });
    // const data = this.updateNoteWhenUpdateTable();
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
      // ...data,
      [keyEditRemainingInfomation]: dataEdit,
    });
  };

  gotoMenuScreen = (name) => {
    this.setState(
      {
        initialPage: parseInt(name),
      },
      () => this.setState({ visibleModalTabbar: true })
    );
  };

  handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  handleOnScroll = (event) => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  editBusinessInfo = () => {
    this.setState({
      disableEditBusinessInfo: false,
    });
  };

  saveBusinessInfo = () => {};

  gotoCamera = () => {
    this.setState(
      {
        visibleModalTabbar: false,
      },
      () => this.props.navigation.navigate("Camera")
    );
  };

  checkEmptyFiled = (arrayData) => {
    const isEleEmpty = arrayData.filter((el) => _.isEmpty(el));
    return isEleEmpty.length === 0 ? false : true;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.isUpdateClient &&
      this.props.isUpdateClient !== prevProps.isUpdateClient
    ) {
      this.setState({
        initState: true,
      });
    }
  }

  checkIsNumber(number) {
    const temptNumber = parseFloat(number);
    // console.log('---- isNaN(temptNumber) : ',isNaN(temptNumber));
    // console.log('---- number : ',number);

    if (isNaN(temptNumber)) {
      return 0;
    } else {
      return parseFloat(number.split(".").join(""));
    }
  }

  formatNumberDot(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  calculatorCost(chi_phi) {
    if (!_.isEmpty(chi_phi)) {
      if (chi_phi.thanh_tien_thang) {
        // console.log('calculatorCost : ',this.checkIsNumber(chi_phi.thanh_tien_thang));
        return this.checkIsNumber(chi_phi.thanh_tien_thang);
      }
    } else {
      return 0;
    }
  }

  getAddressString(address) {
    return `${address.so_nha}, ${address.phuong_xa_readable}, ${address.quan_huyen_readable}, ${address.tinh_tp_readable}`;
  }

  calculatorIntoMoneyDay() {
    const {
      thu_nhap_kd,
      gia_von_kd,
      chi_phi_kd_thue_nha,
      chi_phi_kd_dien_nuoc,
      chi_phi_kd_thue_nv,
      chi_phi_kd_van_hanh,
      chi_phi_gia_dinh_an_uong,
      chi_phi_gia_dinh_xang_dt_internet,
      chi_phi_gia_dinh_hoc_phi_cho_con,
      chi_phi_gia_dinh_chi_phi_khac,
      chi_phi_gia_dinh_chi_phi_du_phong,
      chi_phi_gia_dinh_tro_cap,
      chi_phi_vay_ngoai,
    } = this.state;
    let total = 0;
    if (!_.isEmpty(thu_nhap_kd)) {
      const arrKey_thu_nhap_kd = getKeyOfObject(thu_nhap_kd);
      arrKey_thu_nhap_kd.map((key) => {
        if (!_.isEmpty(thu_nhap_kd[key])) {
          // console.log('----- thu_nhap_kd[key].thanh_tien_thang : ',this.checkIsNumber(thu_nhap_kd[key].thanh_tien_thang));
          total += this.checkIsNumber(thu_nhap_kd[key].thanh_tien_thang);
        }
      });
    }
    if (!_.isEmpty(gia_von_kd)) {
      const arrKey_gia_von_kd = getKeyOfObject(gia_von_kd);
      arrKey_gia_von_kd.map((key) => {
        if (!_.isEmpty(gia_von_kd[key])) {
          // console.log('----- gia_von_kd[key].thanh_tien_thang : ',this.checkIsNumber(gia_von_kd[key].thanh_tien_thang));
          total -= this.checkIsNumber(gia_von_kd[key].thanh_tien_thang);
        }
      });
    }
    total -= this.calculatorCost(chi_phi_kd_thue_nha);
    total -= this.calculatorCost(chi_phi_kd_dien_nuoc);
    total -= this.calculatorCost(chi_phi_kd_thue_nv);
    total -= this.calculatorCost(chi_phi_kd_van_hanh);
    total -= this.calculatorCost(chi_phi_gia_dinh_an_uong);
    total -= this.calculatorCost(chi_phi_gia_dinh_xang_dt_internet);
    total -= this.calculatorCost(chi_phi_gia_dinh_hoc_phi_cho_con);
    total -= this.calculatorCost(chi_phi_gia_dinh_chi_phi_khac);
    total -= this.calculatorCost(chi_phi_gia_dinh_chi_phi_du_phong);
    total -= this.calculatorCost(chi_phi_gia_dinh_tro_cap);
    total -= this.calculatorCost(chi_phi_vay_ngoai);

    return {
      day: this.formatNumberDot(parseInt((total * 0.8) / 30)),
      month: this.formatNumberDot(total),
    };
  }

  cancelEditBusinessAll = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn hủy lưu?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const { business_evaluation_data } = this.props.clientDetail;

            const temptNumberPeoplesRequest = business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
              ? business_evaluation_data.tham_kd_tai_so_luong_nguoi_hoi
              : "";
            const temptNote = business_evaluation_data.tham_kd_tai_ghi_chu
              ? business_evaluation_data.tham_kd_tai_ghi_chu
              : "";
            const temptSatellite1 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1
              ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_1
              : "";
            const temptSatellite2 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2
              ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_2
              : "";
            const temptSatellite3 = business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3
              ? business_evaluation_data.tham_kd_tai_cho_ghi_chu_ve_tinh_3
              : "";

            this.setState({
              initState: true,
              updateAudio: false,
            });
            await this.stopRecord();
            this.so_luong_nguoi_hoi_Ref.current?.setText(
              temptNumberPeoplesRequest
            );
            this.ghi_chu_Ref.current?.setText(temptNote);
            this.ve_tinh_1_Ref.current?.setText(temptSatellite1);
            this.ve_tinh_2_Ref.current?.setText(temptSatellite2);
            this.ve_tinh_3_Ref.current?.setText(temptSatellite3);

            this.props.navigation.goBack();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  selectShowImage = async (id, key1, key2, key3) => {
    const { documentInfo } = this.props;
    const data =
      key2 === "" ? documentInfo[key3][key1] : documentInfo[key3][key2][key1];
    let indexSelectImage = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        indexSelectImage = i;
      }
    }
    await this.setState({
      visibleModalReviewPhotos: true,
      photosReview: data,
    });
    this.reviewPhotoRef.current.setStateFromParent(indexSelectImage);
  };

  reviewAvatar = async () => {
    await this.setState({
      visibleReviewAvatar: true,
    });
  };

  updateStoreLocation = async () => {
    const { clientDetail } = this.props;
    try {
      const position = await getPosotion();
      // console.log("position : ", position);

      let longitude = position.coords.longitude
        ? position.coords.longitude
        : "";
      let latitude = position.coords.latitude ? position.coords.latitude : "";
      let person_id = clientDetail.person_id ? clientDetail.person_id : "";

      this.props.actions.client.updateStoreLocation(
        person_id,
        longitude,
        latitude
      );
    } catch (error) {
      showAlertTurnOnLocation();
    }
  };

  showModalRejectReason = () => {
    this.modalRejectReasonRef.current.displayModalAddress(true);
  };

  updateRejectReason = async (data) => {
    await this.setState({
      rejectReason: data,
    });
  };

  editNotes = (keyNote, valueNote, titleNote) => {
    this.edtiNotesRef.current.setStateFromParent(keyNote, valueNote, titleNote);
  };

  saveNote = async (keyNote, valueNote) => {
    try {
      const { clientDetail } = this.props;
      let key_update = "";

      if (keyNote === "so_luong_nguoi_hoi") {
        await this.setState({
          note_numberPeoplesRequest: valueNote,
        });
        key_update = "tham_kd_tai_ghi_chu";
      } else if (keyNote === "ghi_chu_khach_hang") {
        await this.setState({
          note_client: valueNote,
        });
        key_update = "tham_kd_tai_ghi_chu";
      } else if (keyNote === "ghi_chu_ve_tinh_1") {
        await this.setState({
          note_satellite_1: valueNote,
        });
        key_update = "tham_kd_tai_cho_ghi_chu_ve_tinh_1";
      } else if (keyNote === "ghi_chu_ve_tinh_2") {
        await this.setState({
          note_satellite_2: valueNote,
        });
        key_update = "tham_kd_tai_cho_ghi_chu_ve_tinh_2";
      } else if (keyNote === "ghi_chu_ve_tinh_3") {
        await this.setState({
          note_satellite_3: valueNote,
        });
        key_update = "tham_kd_tai_cho_ghi_chu_ve_tinh_3";
      }

      this.props.actions.client.updateBusinessInfo(clientDetail.id, {
        [key_update]: valueNote,
      });
    } catch (error) {}
  };

  componentWillUnmount() {
    this.countRecoderStream.pipe(finalize(() => {}));
    this.props.actions.client.resetStateGetDetailClient();
    this.keyboardDidShowListener = Keyboard.removeListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.removeListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingGetDetailClient: state.client.isLoadingGetDetailClient,
  clientDetail: state.client.clientDetail,
  isUpdateClient: state.client.isUpdateClient,
  documentInfo: state.client.documentInfo,
  loading: state.app.loading,
});

export default connectRedux(mapStateToProps, UserDetailScreen);
