import { Platform, Dimensions, Alert } from "react-native";
import _ from "ramda";
import axios from "axios";
import RNFS from "react-native-fs";
import Geolocation from "react-native-geolocation-service";

import Configs from "./../configs";
import IMAGE from "@core/resources/icon";

export const deleteFileUpload = (filepath) => {
  RNFS.exists(filepath)
    .then((result) => {
      // console.log("file exists: ", result);
      if (result) {
        return (
          RNFS.unlink(filepath)
            .then(() => {
              // console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
              // console.log(err.message);
            })
        );
      }
    })
    .catch((err) => {
      // console.log(err.message);
    });
};

export const deleteAllPhoto = (photos) => {
  // console.log('photos : ', photos);
  for (let i = 0; i < photos.length; i++) {
    deleteFileUpload(photos[i].uri);
  }
};

export const formatDate = (date) => {
  const temptDate = new Date(date);
  return `${temptDate.getHours()}:${temptDate.getMinutes()} - ${temptDate.getDate()}/${
    temptDate.getMonth() + 1
  }/${temptDate.getFullYear()}`;
};

export const formatDay = (date) => {
  const temptDate = new Date(date);
  return `${temptDate.getDate()}/${
    temptDate.getMonth() + 1
  }/${temptDate.getFullYear()}`;
};

export const timeOut = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("TIMED_OUT")), ms);
  });
};

export const formatTime = (date) => {
  const temptDate = new Date(date);
  return `${temptDate.getHours()}:${temptDate.getMinutes()}${
    temptDate.getHours() > 12 ? "pm" : "am"
  }`;
};

export const formatMoney = (money) => {
  return (parseInt(money) + "").replace(/(.)(?=(\d{3})+$)/g, "$1.");
};

export const hiddenTabbar = (stack) => {
  stack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
      tabBarVisible = false;
    }
    return {
      tabBarVisible,
    };
  };
};

export const validDateFormat = (str) => {
  var parts = str.split("-");
  var day = parseInt(parts[0]);
  var month = parseInt(parts[1]);
  var year = parseInt(parts[2]);
  // console.log("asdkjasdkajsdkjalkd", parts, day, month, year);
  if (parts.length != 3) {
    return false;
  }
  if (
    year < 2018 ||
    year > 2050 ||
    month == 0 ||
    month > 12 ||
    day == 0 ||
    day > 31
  )
    return false;
  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;
  return day > 0 && day <= monthLength[month - 1];
};

export const filterSymbol = (str) => {
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(
    /!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g,
    "-"
  );
  str = str.replace(/-+-/g, "-"); // thay th??? 2- th??nh 1-
  str = str.replace(/^\-+|\-+$/g, ""); // c???t b??? k?? t??? - ??? ?????u v?? cu???i chu???i
  return str;
};

export const isPlatformIOS = (_) => {
  return Platform.OS === "ios";
};

export const scaleSzie = (size) => {
  return (Configs.FULL_WIDTH * size) / Configs.DEFAULT_WIDTH;
};

export const scaleSzieHeight = (size) => {
  return (Configs.FULL_HEIGHT * size) / Configs.DEFAULT_HEIGHT;
};

export const checkAllArrayIsNotEmpty = (...values) => {
  return values.filter((value) => !_.isEmpty(value)).length === values.length;
};

export const requestAPI = async (action, header = {}) => {
  console.log("action", action);
  let method = action.method || "GET";
  let baseURL = action.api;
  let headers = Object.assign(
    { Accept: "application/json", "Content-Type": "application/json" },
    header
  );
  if (action.token) {
    headers = Object.assign(headers, action.headers);
  }
  const configs = {
    method: `${method}`.toLowerCase(),
    baseURL: baseURL,
    url: "",
    headers: headers,
    timeout: 60000,
    validateStatus: (status) => status >= 200 && status < 600,
  };
  if (
    (method == "POST" || method == "DELETE" || method == "PUT") &&
    action.body
  ) {
    configs["data"] = JSON.stringify(action.body);
  }
  try {
    console.log("configs", configs);
    let response = await axios(configs);
    console.log("response", response);
    const data = response.data;
    // console.log('data : ' + JSON.stringify(data));

    if (action.type === "LOGIN_APP" && response.status === 200) {
      const temptHeaders = _.pick(
        ["access-token", "uid", "client", "token-type", "expiry"],
        response.headers
      );
      return { ...data, headers: temptHeaders };
    }
    const codeNumber = response.status ? response.status : 0;
    // console.log("response : ",response);
    if (codeNumber === 401) {
      throw "UNAUTHORIZED_OR_TOKEN_EXPIRED";
    }
    return {
      ...data,
      statusCode: codeNumber,
    };
  } catch (error) {
    if (error === "UNAUTHORIZED_OR_TOKEN_EXPIRED") {
      throw error;
    }
    console.log("error UNAUTHORIZED_OR_TOKEN_EXPIRED", error);
    if (error.request) {
      if (error.message.includes("timeout")) {
        throw "TIME_OUT";
      } else if (error.message.includes("Network Error")) {
        throw "NET_WORK_REQUEST_FAIL";
      } else {
        throw error;
      }
    }
  }
};

export const uploadMultiImage = async (action, header = {}) => {
  let method = action.method || "GET";
  let baseURL = action.api;
  let headers = Object.assign(
    { Accept: "application/json", "Content-Type": "multipart/form-data" },
    header
  );
  if (action.token) {
    headers = Object.assign(headers, action.headers);
  }
  const configs = {
    method: `${method}`.toLowerCase(),
    baseURL: baseURL,
    url: "",
    headers: headers,
    timeout: 60000,
    validateStatus: (status) => status >= 200 && status < 600,
  };
  if (
    (method == "POST" || method == "DELETE" || method == "PUT") &&
    action.body
  ) {
    configs["data"] = createFormData(action.media, action.body);
  }
  try {
    let response = await axios(configs);
    const data = response.data;
    const codeNumber = response.status ? response.status : 0;
    if (codeNumber === 401) {
      throw "UNAUTHORIZED_OR_TOKEN_EXPIRED";
    }
    return {
      ...data,
      statusCode: codeNumber,
    };
  } catch (error) {
    if (error === "UNAUTHORIZED_OR_TOKEN_EXPIRED") {
      throw error;
    }
    if (error.request) {
      if (error.message.includes("timeout")) {
        throw "TIME_OUT";
      } else if (error.message.includes("Network Error")) {
        throw "NET_WORK_REQUEST_FAIL";
      } else {
        throw error;
      }
    }
  }
};

createFormData = (media, body) => {
  const data = new FormData();
  for (let i = 0; i < media.length; i++) {
    data.append("files[]", {
      uri:
        Platform.OS === "android"
          ? media[i].uri
          : media[i].uri.replace("file://", ""),
      name: media[i].fileName ? media[i].fileName : "phi.jpg",
      type: media[i].type ? media[i].type : "image/jpeg",
    });
  }
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

export const uploadAudios = async (action, header = {}) => {
  let method = action.method || "GET";
  let baseURL = action.api;
  let headers = Object.assign(
    { Accept: "application/json", "Content-Type": "application/json" },
    header
  );
  if (action.token) {
    headers = Object.assign(headers, action.headers);
  }
  const configs = {
    method: `${method}`.toLowerCase(),
    baseURL: baseURL,
    url: "",
    headers: headers,
    timeout: 60000,
    validateStatus: (status) => status >= 200 && status < 600,
  };
  if (
    (method == "POST" || method == "DELETE" || method == "PUT") &&
    action.body
  ) {
    configs["data"] = createFormData2(action.media, action.body);
  }
  try {
    let response = await axios(configs);
    console.log("response uploadAudios", response);

    const data = response.data;
    const codeNumber = response.status ? response.status : 0;
    if (codeNumber === 401) {
      throw "UNAUTHORIZED_OR_TOKEN_EXPIRED";
    }
    return {
      ...data,
      statusCode: codeNumber,
    };
  } catch (error) {
    console.log("UNAUTHORIZED_OR_TOKEN_EXPIRED audio", error);
    // console.log("error : ",error);
    if (error === "UNAUTHORIZED_OR_TOKEN_EXPIRED") {
      throw error;
    }
    if (error.request) {
      if (error.message.includes("timeout")) {
        throw "TIME_OUT";
      } else if (error.message.includes("Network Error")) {
        throw "NET_WORK_REQUEST_FAIL";
      } else {
        throw error;
      }
    }
  }
};

const createFormData2 = (media, body) => {
  const data = new FormData();
  data.append("files[]", {
    uri: "file://" + media,
    // uri:
    // Platform.OS === "android"
    //     ? media
    //     : media.replace("file://", ""),
    name: "test.aac",
    type: "audio/aac",
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

export const isIphoneX = () => {
  // const { height, width } = Dimensions.get("window");
  // return Platform.OS === "ios" && (height === 812 || width === 812);
  const dimen = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
};

export const getPosotion = (options = {}) => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 10000,
    });
  });
  // return new Promise((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //   Geolocation.getCurrentPosition(resolve, reject, {
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //     maximumAge: 10000,
  //   });
  // });
};

export const formatTimeRecorder = (secondsRecoder) => {
  let sec_num = parseInt(secondsRecoder);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

export const iconsFloatButton = [
  {
    text: "T??i li???u",
    icon: IMAGE.docs,
    name: 4,
    position: 5,
  },
  {
    text: "T??i ch??nh",
    icon: IMAGE.title,
    name: 3,
    position: 4,
  },
  {
    text: "Y??u c???u vay",
    icon: IMAGE.loanRequest,
    name: 2,
    position: 3,
  },
  {
    text: "Tham chi???u",
    icon: IMAGE.reference,
    name: 1,
    position: 2,
  },
  {
    text: "Th??ng tin KD",
    icon: IMAGE.infoActive,
    name: 0,
    position: 1,
  },
];

export const iconsFloatButtonProperty = [
  {
    text: "T??i li???u",
    icon: IMAGE.docs,
    name: 4,
    position: 5,
  },
  {
    text: "T??i ch??nh",
    icon: IMAGE.title,
    name: 3,
    position: 4,
  },
  {
    text: "Y??u c???u vay",
    icon: IMAGE.loanRequest,
    name: 2,
    position: 3,
  },
  {
    text: "Tham chi???u",
    icon: IMAGE.reference,
    name: 1,
    position: 2,
  },
  {
    text: "Th??ng tin n??i ???",
    icon: IMAGE.infoActive,
    name: 0,
    position: 1,
  },
];

export const iconsTab = [
  {
    active: IMAGE.infoActive,
    inActive: IMAGE.infoInActive,
  },
  {
    active: IMAGE.reference,
    inActive: IMAGE.referenceInActive,
  },
  {
    active: IMAGE.loanRequestActive,
    inActive: IMAGE.loanRequestInactive,
  },
  {
    active: IMAGE.financeActive,
    inActive: IMAGE.financeInactive,
  },
  {
    active: IMAGE.docs,
    inActive: IMAGE.docsInactive,
  },
];

export const SECTIONS = [
  {
    title: "X??c minh kh??ch h??ng",
    key: "xac_minh_khach_hang",
    children: [
      {
        content: "Ch???ng minh nh??n d??n",
        type: "identityCard",
        children: [
          {
            key: "cmnd",
            title: "Ch???ng minh nh??n d??n",
            children: [
              {
                key: "cmnd_truoc",
                title: "M???t tr?????c",
              },
              {
                key: "cmnd_sau",
                title: "M???t sau",
              },
            ],
          },
        ],
      },
      {
        content: "C??n c?????c c??ng d??n",
        type: "citizenship",
        children: [
          {
            key: "cccd",
            title: "C??n c?????c c??ng d??n",
            children: [
              {
                key: "cccd_truoc",
                title: "M???t tr?????c",
              },
              {
                key: "cccd_sau",
                title: "M???t sau",
              },
            ],
          },
        ],
      },
      {
        key: "ho_khau",
        content: "H??? kh???u",
        children: [],
      },
      {
        key: "chan_dung_kh",
        content: "Ch??n dung KH",
        children: [],
      },
      {
        key: "thong_tin_viec_lam",
        content: "Th??ng tin vi???c l??m",
        children: [],
      },
    ],
  },
  {
    title: "X??c minh ?????a ch??? KD",
    key: "xac_minh_dia_chi_kd",
    children: [
      {
        content: "H??nh ???nh KD",
        key: "hinh_anh_kinh_doanh",
        children: [],
      },
      {
        content: "?????nh v??? KD theo kinh ?????/v?? ?????",
        key: "dinh_vi_kd",
        children: [],
      },
    ],
  },
  {
    title: "X??c minh n??i c?? tr??",
    key: "xac_minh_noi_cu_tru",
    children: [
      {
        content: "H??nh ???nh ?????a ch??? hi???n t???i",
        key: "hinh_anh_nha_o",
        children: [],
      },
      {
        content: "?????nh v??? nh?? theo kinh ?????/v?? ?????",
        key: "dinh_vi_nha_o",
        children: [],
      },
    ],
  },
  {
    title: "T??i li???u h???p ?????ng",
    key: "tai_lieu_hop_dong",
    children: [
      {
        content: "????n ????? ngh??? vay v???n",
        key: "don_de_nghi_vay_von",
        children: [],
      },
      {
        content: "Ch???ng t??? th??? ch???p",
        key: "chung_tu_the_chap",
        children: [],
      },
      {
        content: "????nh gi?? kh??? n??ng thanh to??n",
        key: "danh_gia_kha_nang_thanh_toan",
        children: [],
      },
      {
        content: "H??nh ???nh v??? tinh kinh doanh",
        key: "hinh_anh_ve_tinh_kd",
        children: [],
      },
      {
        content: "H??nh ???nh v??? tinh nh??",
        key: "hinh_anh_ve_tinh_nha",
        children: [],
      },
    ],
  },
  {
    title: "Kh??c",
    key: "khac",
    children: [
      {
        content: "B???ng k?? thu nh???p chi ph??",
        key: "bang_ke_thu_nhap_chi_phi",
        children: [],
      },
      {
        content: "H???p ?????ng u??? quy???n",
        key: "hd_uy_quyen",
        children: [],
      },
      {
        content: "Gi???y t??? KD",
        key: "giay_to_kinh_doanh",
        children: [],
      },
      {
        content: "Gi???y t??? l??i su???t",
        key: "giay_to_lai_suat",
        children: [],
      },
      {
        content: "Gi???y t??? kh??c",
        key: "giay_to_khac",
        children: [],
      },
      {
        content: "Kh??c",
        key: "khac",
        children: [],
      },
    ],
  },
];

export const getRowData = (data, itemsPerRow = 4) => {
  const rowCount = Math.ceil(data.length / itemsPerRow);
  const rowData = [];

  for (let i = 0; i < rowCount; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = startIndex + itemsPerRow;
    const items = data.slice(startIndex, endIndex);
    if (items.length < itemsPerRow) {
      const diff = itemsPerRow - items.length;
      items.push(...Array(diff).fill(null));
    }
    rowData.push(items);
  }
  return rowData;
};

export const CONDITION_SORT = [
  {
    title: "S???m nh???t",
    sort: "created_at",
    direction: "asc",
  },
  {
    title: "Tr??? nh???t",
    sort: "created_at",
    direction: "desc",
  },
  {
    title: "G???n nh???t",
    sort: "distance",
    direction: "asc",
  },
  {
    title: "Xa nh???t",
    sort: "distance",
    direction: "desc",
  },
];

export const CONDITION_SORT_TN = [
  {
    title: "S???m nh???t",
    sort: "average_pay_time",
    direction: "asc",
  },
  {
    title: "Tr??? nh???t",
    sort: "average_pay_time",
    direction: "desc",
  },
  {
    title: "G???n nh???t",
    sort: "distance",
    direction: "asc",
  },
  {
    title: "Xa nh???t",
    sort: "distance",
    direction: "desc",
  },
];

export const getValueOfObject = (obj) => {
  return Object.values(obj);
};

export const getKeyOfObject = (obj) => {
  return Object.keys(obj);
};

export const removeAccent = (str) => {
  str = str.toLowerCase();
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/ |/g, "");
  return str;
};

export const showAlertTurnOnLocation = (
  callback = () => {},
  message = "Vui l??ng b???t location trong ??i???n tho???i c???a b???n !"
) => {
  Alert.alert("Th??ng b??o", `${message}`, [
    { text: "OK", onPress: () => callback() },
  ]);
};
