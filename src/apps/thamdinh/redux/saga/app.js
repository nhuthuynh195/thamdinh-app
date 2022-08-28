import { put, takeLatest, all, call } from "redux-saga/effects";
import { delay } from "redux-saga";
import Polyline from "@mapbox/polyline";

import { requestAPI, showAlertTurnOnLocation } from "@core/utils/func";
import NavigationServices from "../../navigators/NavigationServices";

function* getListBusinessEvaluate(action) {
  try {
    const response = yield requestAPI(action);
    // console.log('getListBusinessEvaluate :  ', response);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_BUSINESS_EVALUATE_SUCCESS",
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

function* getListPropertyEvaluate(action) {
  try {
    const response = yield requestAPI(action);
    // console.log('response : ', response);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_PROPERTY_EVALUATE_SUCCESS",
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

function* getListBusinessHasEvaluated(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_BUSINESS_HAS_EVALUATED_SUCCESS",
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

function* getListPropertyHasEvaluated(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_PROPERTY_HAS_EVALUATED_SUCCESS",
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

function* getListBusinessEvaluateSearch(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_BUSINESS_EVALUATE_SEARCH_SUCCESS",
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

function* getListPropertyEvaluateSearch(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      yield put({
        ...action,
        type: "GET_LIST_PROPERTY_EVALUATE_SEARCH_SUCCESS",
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

function* handleUnAuthorized(action) {
  try {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    NavigationServices.navigate("Login");
    yield put({ ...action, type: "APP_LOGOUT" });
  } catch (error) {
    yield put({ type: error });
  }
}

function* handleTimeOut(action) {
  try {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    if (action.isGetDetail) {
      showAlertTurnOnLocation(() => {
        NavigationServices.navigate("Home");
      }, "Mạng chậm hoặc server không trả lời .Vui lòng thử lại!");
    } else {
      if (!action.isGetDocumentInfo) {
        setTimeout(() => {
          alert("Mạng chậm hoặc server không trả lời .Vui lòng thử lại!");
        }, 500);
      }
    }
  } catch (error) {
    yield put({ type: error });
  }
}

function* handleNetWorkError(action) {
  console.log("handleNetWorkError", action);
  try {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    if (action.isGetDetail) {
      showAlertTurnOnLocation(() => {
        NavigationServices.navigate("Home");
      }, "Vui lòng kiểm tra lại kết nối Internet!");
    } else {
      if (!action.isGetDocumentInfo) {
        setTimeout(() => {
          alert("Vui lòng kiểm tra lại kết nối Internet!");
        }, 500);
      }
    }
  } catch (error) {
    yield put({ type: error });
  }
}

function* handleSomethingWentWrong(action) {
  try {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    setTimeout(() => {
      alert("Lỗi từ hệ thống!");
    }, 500);
  } catch (error) {
    yield put({ type: error });
  }
}

function* handleErrorFromServer(action) {
  try {
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    setTimeout(() => {
      alert(action.message);
    }, 500);
  } catch (error) {
    yield put({ type: error });
  }
}

export default function* saga() {
  yield all([
    takeLatest("GET_LIST_BUSINESS_EVALUATE", getListBusinessEvaluate),
    takeLatest("GET_LIST_PROPERTY_EVALUATE", getListPropertyEvaluate),
    takeLatest("GET_LIST_BUSINESS_HAS_EVALUATED", getListBusinessHasEvaluated),
    takeLatest("GET_LIST_PROPERTY_HAS_EVALUATED", getListPropertyHasEvaluated),
    takeLatest(
      "GET_LIST_BUSINESS_EVALUATE_SEARCH",
      getListBusinessEvaluateSearch
    ),
    takeLatest(
      "GET_LIST_PROPERTY_EVALUATE_SEARCH",
      getListPropertyEvaluateSearch
    ),

    takeLatest("UNAUTHORIZED_OR_TOKEN_EXPIRED", handleUnAuthorized),
    takeLatest("TIME_OUT", handleTimeOut),
    takeLatest("NET_WORK_REQUEST_FAIL", handleNetWorkError),
    takeLatest("SOMETHING_WENT_WRONG", handleSomethingWentWrong),
    takeLatest("ERROR_FROM_SERVER", handleErrorFromServer),
  ]);
}
