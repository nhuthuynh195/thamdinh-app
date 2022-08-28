import React from "react";
import { Keyboard, Platform, PixelRatio, Alert } from "react-native";
import { Subject, from, Observable } from "rxjs";
import { map, distinctUntilChanged, filter, finalize } from "rxjs/operators";
import _ from "ramda";
import ImagePicker from "react-native-image-picker";

import AudioManager from "@core/lib/AudioManager";
import Layout from "./layout";

import {
  scaleSzie,
  getPosotion,
  getKeyOfObject,
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

  // --------- New Client ------
  arr_tham_nha_khang_dinh_kh_o_day: [],
  arr_tham_nha_tung_bi_doi_no_tai_nha: [],
  indexSelect_tham_nha_khang_dinh_kh_o_day: 0,
  indexSelect_tham_nha_tung_bi_doi_no_tai_nha: 0,
  tham_nha_so_luong_hang_xom_hoi: "",
  tham_nha_ghi_chu: "",
  tham_nha_ghi_chu_ve_tinh_1: "",
  tham_nha_ghi_chu_ve_tinh_2: "",
  tham_nha_ghi_chu_ve_tinh_3: "",
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
    this.modalRejectReasonRef = React.createRef();

    this.edtiNotesRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { clientDetail } = nextProps;
    if (!_.isEmpty(clientDetail) && prevState.initState) {
      const {
        property_evaluate_field_options,
        status,
        property_evaluation_data,
      } = clientDetail;
      const {
        tham_nha_khang_dinh_kh_o_day,
        tham_nha_tung_bi_doi_no_tai_nha,
      } = property_evaluate_field_options;
      const {
        tham_nha_so_luong_hang_xom_hoi,
        tham_nha_ghi_chu,
        tham_nha_ghi_chu_ve_tinh_1,
        tham_nha_ghi_chu_ve_tinh_2,
        tham_nha_ghi_chu_ve_tinh_3,
      } = property_evaluation_data;

      const temptArrayStatus = Object.keys(
        property_evaluate_field_options.evaluate_statuses
      );
      const temptArr_tham_nha_khang_dinh_kh_o_day = Object.keys(
        tham_nha_khang_dinh_kh_o_day
      );
      const temptArr_tham_nha_tung_bi_doi_no_tai_nha = Object.keys(
        tham_nha_tung_bi_doi_no_tai_nha
      );
      const temptArrayRejectReason = Object.keys(
        property_evaluate_field_options.tham_nha_ly_do_tu_choi
      );

      temptArrayStatus.unshift("");
      temptArr_tham_nha_khang_dinh_kh_o_day.unshift("");
      temptArr_tham_nha_tung_bi_doi_no_tai_nha.unshift("");
      temptArrayRejectReason.unshift("");

      const indexStatusSelect = !status
        ? 0
        : property_evaluate_field_options.evaluate_statuses[status];
      const temptIndexSelect_tham_nha_khang_dinh_kh_o_day = !property_evaluation_data.tham_nha_khang_dinh_kh_o_day
        ? 0
        : tham_nha_khang_dinh_kh_o_day[
            property_evaluation_data.tham_nha_khang_dinh_kh_o_day
          ];
      const temptIndexSelect_tham_nha_tung_bi_doi_no_tai_nha = !property_evaluation_data.tham_nha_tung_bi_doi_no_tai_nha
        ? 0
        : tham_nha_tung_bi_doi_no_tai_nha[
            property_evaluation_data.tham_nha_tung_bi_doi_no_tai_nha
          ];
      let indexRejectReason = 0;

      for (let i = 0; i < temptArrayRejectReason.length; i++) {
        if (
          temptArrayRejectReason[i] ==
          property_evaluation_data.tham_nha_ly_do_tu_choi
        ) {
          indexRejectReason = i;
          break;
        }
      }

      const title_rejectReason = property_evaluation_data.tham_nha_ly_do_tu_choi
        ? property_evaluation_data.tham_nha_ly_do_tu_choi
        : "";
      const tempt_rejectReason = {
        title: title_rejectReason,
        code:
          property_evaluate_field_options.tham_nha_ly_do_tu_choi[
            title_rejectReason
          ],
      };

      return {
        ...initialState,
        initState: false,
        avatar:
          clientDetail.avatar_url === null
            ? prevState.avatar
            : clientDetail.avatar_url,
        visibleModalTabbar: prevState.visibleModalTabbar,
        status: temptArrayStatus,
        indexStatusSelect,
        arr_tham_nha_khang_dinh_kh_o_day: temptArr_tham_nha_khang_dinh_kh_o_day,
        arr_tham_nha_tung_bi_doi_no_tai_nha: temptArr_tham_nha_tung_bi_doi_no_tai_nha,
        indexSelect_tham_nha_khang_dinh_kh_o_day: temptIndexSelect_tham_nha_khang_dinh_kh_o_day,
        indexSelect_tham_nha_tung_bi_doi_no_tai_nha: temptIndexSelect_tham_nha_tung_bi_doi_no_tai_nha,
        tham_nha_so_luong_hang_xom_hoi: tham_nha_so_luong_hang_xom_hoi
          ? tham_nha_so_luong_hang_xom_hoi
          : "",
        tham_nha_ghi_chu: tham_nha_ghi_chu ? tham_nha_ghi_chu : "",
        tham_nha_ghi_chu_ve_tinh_1: tham_nha_ghi_chu_ve_tinh_1
          ? tham_nha_ghi_chu_ve_tinh_1
          : "",
        tham_nha_ghi_chu_ve_tinh_2: tham_nha_ghi_chu_ve_tinh_2
          ? tham_nha_ghi_chu_ve_tinh_2
          : "",
        tham_nha_ghi_chu_ve_tinh_3: tham_nha_ghi_chu_ve_tinh_3
          ? tham_nha_ghi_chu_ve_tinh_3
          : "",
        // -------- Reject Reason ------
        arrRejectReason: temptArrayRejectReason,
        indexRejectReason: indexRejectReason,

        rejectReason: tempt_rejectReason,
      };
    }
    return null;
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
          maxHeight: PixelRatio.getPixelSizeForLayoutSize(400),
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
        // this.setState({ hasPermission });
        // if (!hasPermission) {
        //     return;
        // }
        AudioManager.getInstance().setOnProgressListener(
          this.onProgressRecorder
        );
        AudioManager.getInstance().setOnFinishListener(this.onFinishRecorder);
      });

    this.initCountRecorderStream();
  }

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

  showDropdownStatus(isShow) {
    this.setState({
      visiblePickerStatus: isShow,
    });
  }

  showdropdownIsBoss(isShow) {
    this.setState({
      visiblePickerIsBoss: isShow,
    });
  }

  showdropdownDues(isShow) {
    this.setState({
      visiblePickerDues: isShow,
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
      arr_tham_nha_khang_dinh_kh_o_day,
      arr_tham_nha_tung_bi_doi_no_tai_nha,
      indexSelect_tham_nha_khang_dinh_kh_o_day,
      indexSelect_tham_nha_tung_bi_doi_no_tai_nha,
      arrRejectReason,
      indexRejectReason,
      rejectReason,
      tham_nha_so_luong_hang_xom_hoi,
      tham_nha_ghi_chu,
      tham_nha_ghi_chu_ve_tinh_1,
      tham_nha_ghi_chu_ve_tinh_2,
      tham_nha_ghi_chu_ve_tinh_3,
      countRecoder,
    } = this.state;
    const { clientDetail } = this.props;
    const { property_evaluate_field_options } = clientDetail;
    const {
      evaluate_statuses,
      tham_nha_khang_dinh_kh_o_day,
      tham_nha_tung_bi_doi_no_tai_nha,
    } = property_evaluate_field_options;

    if (status[indexStatusSelect] == "Từ chối" && rejectReason.title === "") {
      alert("Vui lòng chọn lý do từ chối thẩm định !");
    } else {
      await this.setState({
        visiblePopupConfrim: false,
      });
      if (countRecoder) {
        this.setState({isShowAlertUploadAudio: false});
        await this.stopRecord();
      }
      // edit here
      this.props.actions.client.updateBusinessInfo(
        clientDetail.id,
        {
          status: evaluate_statuses[status[indexStatusSelect]],
          tham_nha_khang_dinh_kh_o_day:
            indexSelect_tham_nha_khang_dinh_kh_o_day === 0
              ? 0
              : tham_nha_khang_dinh_kh_o_day[
                  arr_tham_nha_khang_dinh_kh_o_day[
                    indexSelect_tham_nha_khang_dinh_kh_o_day
                  ]
                ],
          tham_nha_tung_bi_doi_no_tai_nha:
            indexSelect_tham_nha_tung_bi_doi_no_tai_nha === 0
              ? 0
              : tham_nha_tung_bi_doi_no_tai_nha[
                  arr_tham_nha_tung_bi_doi_no_tai_nha[
                    indexSelect_tham_nha_tung_bi_doi_no_tai_nha
                  ]
                ],
          // tham_nha_so_luong_hang_xom_hoi: tham_nha_so_luong_hang_xom_hoi,
          tham_nha_so_luong_hang_xom_hoi: this.so_luong_nguoi_hoi_Ref.current
            .state.text,
          tham_nha_ghi_chu: tham_nha_ghi_chu,
          tham_nha_ghi_chu_ve_tinh_1: tham_nha_ghi_chu_ve_tinh_1,
          tham_nha_ghi_chu_ve_tinh_2: tham_nha_ghi_chu_ve_tinh_2,
          tham_nha_ghi_chu_ve_tinh_3: tham_nha_ghi_chu_ve_tinh_3,
          // tham_nha_ly_do_tu_choi: indexRejectReason !== 0 ? `${arrRejectReason[indexRejectReason]}`.split(' - ')[0] : '',
          tham_nha_ly_do_tu_choi: rejectReason.code ? rejectReason.code : "",
        },
        "property_info"
      );
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
      arr_tham_nha_khang_dinh_kh_o_day,
      indexSelect_tham_nha_khang_dinh_kh_o_day,
      arr_tham_nha_tung_bi_doi_no_tai_nha,
      indexSelect_tham_nha_tung_bi_doi_no_tai_nha,
    } = this.state;
    const { clientDetail } = this.props;
    const { living_info } = clientDetail;
    if (status[indexStatusSelect] === "Duyệt") {
      if (
        arr_tham_nha_khang_dinh_kh_o_day[
          indexSelect_tham_nha_khang_dinh_kh_o_day
        ] == ""
      ) {
        alert("Vui lòng điền thông tin khẳng định khách hàng ở đây!");
      } else if (
        arr_tham_nha_tung_bi_doi_no_tai_nha[
          indexSelect_tham_nha_tung_bi_doi_no_tai_nha
        ] == ""
      ) {
        alert("Vui lòng điền thông tin từng bị đòi nợ tại nhà !");
      } else {
        const arrayKeycheck = getKeyOfObject(living_info);
        let isUpdate = true;
        for (let i = 0; i < arrayKeycheck.length; i++) {
          if (arrayKeycheck[i] == "sdt_chu_nha") {
            continue;
          }
          // console.log(arrayKeycheck[i] + ' - ' + living_info[arrayKeycheck[i]]);
          if (
            arrayKeycheck[i] !== "dia_chi" &&
            arrayKeycheck[i] !== "ho_khau" &&
            arrayKeycheck[i] != undefined &&
            (living_info[arrayKeycheck[i]] == null ||
              living_info[arrayKeycheck[i]] == "" ||
              living_info[arrayKeycheck[i]] == undefined)
          ) {
            isUpdate = false;
            break;
          }
        }

        if (isUpdate) {
          this.setState({
            visiblePopupConfrim: true,
          });
        } else {
          alert("Vui lòng nhập đầy đủ thông tin trong phần Thông tin nơi ở!");
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
    if (this.state.updateAudio) {
      try {
        const position = await getPosotion();
        const showAlert = this.state.isShowAlertUploadAudio;
        const { clientDetail } = this.props;
        const { id, person_id } = clientDetail;
        if (path !== undefined) {
          await this.props.actions.upload.uploadAudio(
            {
              document_kind: "property_evaluate_audio",
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
      });
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

  saveChangeInfoBusiness = (table) => {
    const { statusTableBusinessInfo } = this.state;
    const { clientDetail } = this.props;
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
      [statusTableBusinessInfo.key]: table,
    });
  };

  saveChangeInfoBusinessCapital = (table) => {
    const { statusTableBusinessCapitalInfo } = this.state;
    const { clientDetail } = this.props;
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
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
    this.props.actions.client.updateBusinessInfo(clientDetail.id, {
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
    // console.log('------');
    //  console.log('chi_phi : ', JSON.stringify(chi_phi));
    if (!_.isEmpty(chi_phi)) {
      if (chi_phi.thanh_tien_thang) {
        return this.checkIsNumber(chi_phi.thanh_tien_thang);
      }
    } else {
      return 0;
    }
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
          total += this.checkIsNumber(thu_nhap_kd[key].thanh_tien_thang);
        }
      });
    }
    if (!_.isEmpty(gia_von_kd)) {
      const arrKey_gia_von_kd = getKeyOfObject(gia_von_kd);
      arrKey_gia_von_kd.map((key) => {
        if (!_.isEmpty(gia_von_kd[key])) {
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
      day: this.formatNumberDot((total * 0.8) / 30),
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
            const {
              tham_nha_so_luong_hang_xom_hoi,
              tham_nha_ghi_chu,
              tham_nha_ghi_chu_ve_tinh_1,
              tham_nha_ghi_chu_ve_tinh_2,
              tham_nha_ghi_chu_ve_tinh_3,
            } = this.state;
            this.setState({
              initState: true,
              updateAudio: false,
            });
            await this.stopRecord();

            this.so_luong_nguoi_hoi_Ref.current?.setText(
              tham_nha_so_luong_hang_xom_hoi
            );
            this.ghi_chu_Ref.current?.setText(tham_nha_ghi_chu);
            this.ve_tinh_1_Ref.current?.setText(tham_nha_ghi_chu_ve_tinh_1);
            this.ve_tinh_2_Ref.current?.setText(tham_nha_ghi_chu_ve_tinh_2);
            this.ve_tinh_3_Ref.current?.setText(tham_nha_ghi_chu_ve_tinh_3);
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

  // --------- Reject Reason ------
  async showDrodownRejectReason(isShow) {
    await this.setState({
      visibleRejectReason: isShow,
    });
  }

  reviewAvatar = async () => {
    await this.setState({
      visibleReviewAvatar: true,
    });
  };

  updateStoreLocation = async () => {
    const { clientDetail } = this.props;
    try {
      const position = await getPosotion();
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

      if (keyNote === "so_luong_hang_xom_hoi") {
        await this.setState({
          tham_nha_so_luong_hang_xom_hoi: valueNote,
        });
        key_update = "tham_nha_so_luong_hang_xom_hoi";
      } else if (keyNote === "ghi_chu_khach_hang") {
        await this.setState({
          tham_nha_ghi_chu: valueNote,
        });
        key_update = "tham_nha_ghi_chu";
      } else if (keyNote === "ghi_chu_ve_tinh_1") {
        await this.setState({
          tham_nha_ghi_chu_ve_tinh_1: valueNote,
        });
        key_update = "tham_nha_ghi_chu_ve_tinh_1";
      } else if (keyNote === "ghi_chu_ve_tinh_2") {
        await this.setState({
          tham_nha_ghi_chu_ve_tinh_2: valueNote,
        });
        key_update = "tham_nha_ghi_chu_ve_tinh_2";
      } else if (keyNote === "ghi_chu_ve_tinh_3") {
        await this.setState({
          tham_nha_ghi_chu_ve_tinh_3: valueNote,
        });
        key_update = "tham_nha_ghi_chu_ve_tinh_3";
      }
      this.props.actions.client.updateBusinessInfo(
        clientDetail.id,
        {
          [key_update]: valueNote,
        },
        "property_info"
      );
    } catch (error) {
      alert("error");
    }
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
