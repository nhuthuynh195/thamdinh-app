import { put, takeLatest, all, call } from "redux-saga/effects";
import { delay } from "redux-saga";

import { requestAPI } from "@core/utils/func";
import apiConfigs from "@core/configs/api";

function* getDetailClient(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_DETAIL_CLIENT_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
        isGetDetail: true,
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error, isGetDetail: true });
    }
  }
}

function* getClientDocumentInfo(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_CLIENT_DOCUMENT_INFO_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error, isGetDocumentInfo: true });
    }
  }
}

function* getDistrict(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({ ...action, type: "GET_DISTRICT_SUCCESS", payload: response });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getWard(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({ ...action, type: "GET_WARD_SUCCESS", payload: response });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getDistrictAndWard(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({ ...action, type: "GET_DISTRICT_SUCCESS", payload: response });
      yield put({
        type: "GET_WARD",
        method: "GET",
        api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=wards&district_id=${action.nameDistrict}`,
        token: true,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getSupportProfileInfo(action) {
  try {
    const response = yield requestAPI(action);
    // console.log('getSupportProfileInfo : ' + JSON.stringify(response));
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_SUPPORT_PROFILE_INFO_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getFinanceInfo(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_FINANCE_INFO_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* updateBusinessInfo(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    console.log("response :>> ", response);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_DETAIL_CLIENT_SUCCESS",
        payload: response,
      });
      yield put({ ...action, type: "STOP_LOADING_ROOT" });
      yield delay(5);
      alert("Cập nhật thành công!");
    } else {
      yield put({ ...action, type: "STOP_LOADING_ROOT" });
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    console.log("error updateBusinessInfo", error);
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getDistrictWardInit(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const temptActionDistric = {
      ...action,
      api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=districts&city_id=${action.payload.proviceId}`,
    };
    const temptActionWard = {
      ...action,
      api: `${apiConfigs.BASE_API}evaluations/fetch_venues?venue_type=districts&city_id=${action.payload.districtId}`,
    };
    const responseDistrict = yield requestAPI(temptActionDistric);
    const responseWard = yield requestAPI(temptActionWard);
    yield put({
      ...action,
      type: "GET_DISTRICT_SUCCESS",
      payload: responseDistrict,
    });
    yield put({ ...action, type: "GET_WARD_SUCCESS", payload: responseWard });
  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

function* updateSupporProfile(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      const temptAction = {
        ...action,
        method: "GET",
        api: `${apiConfigs.BASE_API}evaluations/${action.contactId}/evaluation_support_profile_info`,
      };
      const responseGetListSupportProfile = yield requestAPI(temptAction);
      if (responseGetListSupportProfile.statusCode === 200) {
        yield put({
          ...temptAction,
          type: "GET_SUPPORT_PROFILE_INFO_SUCCESS",
          payload: responseGetListSupportProfile,
        });
      }
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

function* createSupporProfile(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      const temptAction = {
        ...action,
        method: "GET",
        api: `${apiConfigs.BASE_API}evaluations/${action.contactId}/evaluation_support_profile_info`,
      };
      const responseGetListSupportProfile = yield requestAPI(temptAction);
      if (responseGetListSupportProfile.statusCode === 200) {
        yield put({
          ...temptAction,
          type: "GET_SUPPORT_PROFILE_INFO_SUCCESS",
          payload: responseGetListSupportProfile,
        });
      }
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

function* getCitiesBank(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_CITIES_BANK_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* getOpenBranchBank(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_OPEN_BRANCH_BANK_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  }
}

function* updateBankAccount(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "UPDATE_BANK_ACCOUNT_SUCCESS",
        payload: response,
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

function* removeSupportProfile(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    // console.log('response : ',response);
    if (response.statusCode === 200 || response.statusCode === 201) {
      const temptAction = {
        ...action,
        method: "GET",
        api: `${apiConfigs.BASE_API}evaluations/${action.contactId}/evaluation_support_profile_info`,
      };
      const responseGetListSupportProfile = yield requestAPI(temptAction);
      if (responseGetListSupportProfile.statusCode === 200) {
        yield put({
          ...temptAction,
          type: "GET_SUPPORT_PROFILE_INFO_SUCCESS",
          payload: responseGetListSupportProfile,
        });
      }
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

function* updateStoreLocation(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield requestAPI(action);
    // console.log('updateStoreLocation : ', response);
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        type: "UPDATE_STORE_LOCATION_SUCCESS",
        payload: {
          longitude: action.longitude,
          latitude: action.latitude,
        },
      });
    } else {
      throw {
        errorServer: true,
        message: response.error
          ? JSON.stringify(response.error)
          : "Lỗi từ server",
      };
    }
  } catch (error) {
    if (error.errorServer) {
      yield put({
        type: "ERROR_FROM_SERVER",
        message: error.message,
      });
    } else {
      yield put({ type: error });
    }
  } finally {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
  }
}

export default function* saga() {
  yield all([
    takeLatest("GET_DETAIL_CLIENT", getDetailClient),
    takeLatest("GET_CLIENT_DOCUMENT_INFO", getClientDocumentInfo),
    takeLatest("GET_DISTRICT", getDistrict),
    takeLatest("GET_WARD", getWard),
    takeLatest("GET_DISTRICT_AND_WARD", getDistrictAndWard),
    takeLatest("GET_SUPPORT_PROFILE_INFO", getSupportProfileInfo),
    takeLatest("GET_FINANCE_INFO", getFinanceInfo),
    takeLatest("UPDATE_BUSINESS_INFO", updateBusinessInfo),
    takeLatest("GET_DISTRICT_WARD_INIT", getDistrictWardInit),
    takeLatest("UPDATE_SUPPORT_PROFILE", updateSupporProfile),
    takeLatest("CREATE_SUPPORT_PROFILE", createSupporProfile),
    takeLatest("GET_CITIES_BANK", getCitiesBank),
    takeLatest("GET_OPEN_BRANCH_BANK", getOpenBranchBank),
    takeLatest("UPDATE_BANK_ACCOUNT", updateBankAccount),
    takeLatest("REMOVE_SUPPORT_PROFILE", removeSupportProfile),

    takeLatest("UPDATE_STORE_LOCATION", updateStoreLocation),
  ]);
}
