import { put, takeLatest, all, call } from "redux-saga/effects";
import { delay } from "redux-saga";
import Polyline from "@mapbox/polyline";
import Configs from "@core/configs";
import { Platform } from "react-native";

import { requestAPI } from "../../utils/func";

function* getNotificationHistory(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200) {
      yield put({
        ...action,
        type: "GET_NOTIFICATION_HISTORY_SUCCESS",
        payload: response
      });
    }
   
  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

function* readNoti(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200) {
    }
  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

function* getNumberNotiNotRead(action) {
  try {
    const response = yield requestAPI(action);
    // console.log('----getNumberNotiNotRead : ', response);
    if (response.statusCode === 200) {
      yield put({ ...action, type: "GET_NUMBER_NOTI_UNREAD_SUCCESS", payload: response.data });
    }

  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

export default function* saga() {
  yield all([
    takeLatest("GET_NOTIFICATION_HISTORY", getNotificationHistory),
    takeLatest("READ_NOTI", readNoti),
    takeLatest("GET_NUMBER_NOTI_UNREAD", getNumberNotiNotRead),
  ]);
}
