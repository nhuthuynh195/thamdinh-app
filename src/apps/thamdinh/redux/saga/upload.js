import { put, takeLatest, all, call } from "redux-saga/effects";
import { delay } from "redux-saga";
import Polyline from "@mapbox/polyline";

import {
  requestAPI,
  uploadMultiImage,
  uploadAudios,
  deleteFileUpload,
  deleteAllPhoto,
} from "@core/utils/func";
import apiConfigs from "@core/configs/api";

function* uploadPhoto(action) {
  try {
    yield put({ ...action, type: "LOADING_ROOT" });
    const response = yield uploadMultiImage(action);
    console.log("---- response : ", response);
    yield put({ ...action, type: "STOP_LOADING_ROOT" });
    if (response.statusCode === 200 || response.statusCode === 201) {
      setTimeout(() => {
        alert("Tải ảnh lên thành công");
      }, 300);
      action.isGetDocument
        ? yield put({
            type: "GET_CLIENT_DOCUMENT_INFO",
            method: "GET",
            api: `${apiConfigs.BASE_API}evaluations/${action.body.contract_id}/evaluation_document_info`,
            token: true,
          })
        : yield put({
            type: "GET_DETAIL_CLIENT",
            method: "GET",
            api: `${apiConfigs.BASE_API}evaluations/${action.clientId}/evaluation_detail_info?evaluate_type=${action.clientype}`,
            token: true,
            clientType: action.clientype,
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

function* uploadAudio(action) {
  console.log("action", action);
  const {showAlert} = action;
  try {
    if (showAlert) {
      yield put({ ...action, type: "LOADING_ROOT" });
    }
    const response = yield uploadAudios(action);
    if (response.statusCode === 200 || response.statusCode === 201) {
      deleteFileUpload(action.media);
      if (showAlert) {
        yield put({ ...action, type: "STOP_LOADING_ROOT" });
        yield delay(5);
        alert("Cập nhật thành công!");
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
  }
}

export default function* saga() {
  yield all([
    takeLatest("UPLOAD_PHOTO", uploadPhoto),
    takeLatest("UPLOAD_AUDIO", uploadAudio),
  ]);
}
