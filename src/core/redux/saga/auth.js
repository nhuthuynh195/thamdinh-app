import { put, takeLatest, all } from "redux-saga/effects";

import { requestAPI } from "../../utils/func";

function* login(action) {
  try {
    yield put({ ...action, type: 'LOADING_ROOT' });
    const response = yield requestAPI(action);
    //  console.log("response : " + JSON.stringify(response));
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
    if (response.success) {
      yield put({
        type: "SAVE_PROFILE_LOCAL",
        payload: {
          profile: response.data,
          headers: response.headers
        }
      });
      yield put({ ...action, type: "LOGIN_APP_SUCCESS", payload: response });
    } else {
      yield put({ ...action, type: "LOGIN_APP_FAIL", payload: response });
    }
   
  } catch (error) {
    // console.log("error : ",error);
    if(error === "UNAUTHORIZED_OR_TOKEN_EXPIRED"){
      yield put({ ...action, type: "LOGIN_APP_FAIL", 
      payload: "Thông tin đăng nhập không hợp lệ. Xin thử lại."
     });
    }else{
      yield put({ type: error });
    }
   
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

function* changePassword(action) {
  try {
    yield put({ ...action, type: 'LOADING_ROOT' });
    const response = yield requestAPI(action);
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
    if (response.success) {
      yield put({
        ...action,
        type: "CHANGE_PASSWORD_SUCCESS",
        payload: response
      });
    } else {
      yield put({ ...action, type: "CHANGE_PASSWORD_FAIL", payload: response });
    }
  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

function* logout(action) {
  try {
    yield put({
      type: "APP_LOGOUT",
      payload: {}
    });
    const response = yield requestAPI(action);
    if (response.success) {
      yield put({ ...action, type: "LOGOUT_APP_SUCCESS" });
    } else {
      yield put({ ...action, type: "LOGOUT_APP_FAIL" });
    }
  } catch (error) {
    // yield put({type : error});
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

function* updateEndPoint(action) {
  try {
    const response = yield requestAPI(action);
    // console.log("asdkajsdaksldjaklsdjka", response);
    if (response.data.status === 200) {
      yield put({ ...action, type: "UPDATE_ENDPOINT_NOTIFICAITON_SUCCESS" });
    } else {
      yield put({ ...action, type: "UPDATE_ENDPOINT_NOTIFICAITON_FAIL" });
    }
  } catch (error) {
    yield put({ type: error });
  } finally {
    yield put({ ...action, type: 'STOP_LOADING_ROOT' });
  }
}

export default function* saga() {
  yield all([
    takeLatest("LOGIN_APP", login),
    takeLatest("CHANGE_PASSWORD", changePassword),
    takeLatest("LOGOUT_APP", logout),
    takeLatest("UPDATE_ENDPOINT_NOTIFICAITON", updateEndPoint)
  ]);
}
