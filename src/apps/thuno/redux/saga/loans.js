import { put, takeLatest, all, call, select } from "redux-saga/effects";
import NavigationServices from "../../navigators/NavigationServices";

import { requestAPI, uploadMultiImage, uploadAudios } from "@utils/func";

const getDetails = state => state.loans.detailLoans;
const readLimitList = state => state.loans.readLimitList;
const getUserDetail = state => state.loans.detailLoans;

function* getListLoans(action) {
  try {
    const response = yield requestAPI(action);
    yield put({ ...action, type: "GET_LIST_LOANS_SUCCESS", payload: response });
  } catch (error) {}
}

function* getListLoansUnCollected(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: "GET_LIST_LOANS_UNCOLLECTED_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* requestLocationBackground(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: "REQUEST_LOCATION_BACKGROUND_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* getListLoansSearch(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: "GET_LIST_LOANS_SEARCH_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* uploadAudio(action) {
  try {
    const response = yield uploadAudios(action);
    // console.log('response : ',response);
    yield put({
      ...action,
      type: "UPLOAD_AUDIO_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* getListLoansUnCollectedSearch(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: "GET_LIST_LOANS_UNCOLLECTED_SEARCH_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* getReachLimitData(action) {
  try {
    const response = yield requestAPI(action);
    if (response.data.collected_amount) {
      yield put({
        ...action,
        type: "GET_REACH_LIMIT_DATA_SUCCESS",
        payload: response
      });
    }
  } catch (error) {}
}

function* getDetailLoans(action) {
  try {
    const response = yield requestAPI(action);
    yield put({
      ...action,
      type: "GET_DETAIL_LOANS_SUCCESS",
      payload: response
    });
  } catch (error) {}
}

function* getLastTransaction(action) {
  try {
    const response = yield requestAPI(action);
    if (response.statusCode === 200) {
      NavigationServices.navigate("Receipt", {
        detailLoans: response.data,
        isList: true
      });
    }
  } catch (error) {}
}

function* uploadBacnkReceipt(action) {
  try {
    yield put({
      type: "SHOW_LOADING"
    });
    const response = yield uploadMultiImage(action);
    if (response.data.status === 201) {
      NavigationServices.navigate("UploadComplete");
    } else {
      alert(response.error.message);
    }
    {
      yield put({
        type: "HIDE_LOADING"
      });
    }
  } catch (error) {}
}

function* makeRepayment(action) {
  try {
    yield put({
      type: "SHOW_LOADING"
    });
    const response = yield requestAPI(action);
    // console.log("asdkljasdklsajdlasda", response);
    if (response.data) {
      let detail = yield select(getDetails);
      NavigationServices.navigate("Receipt", {
        detailLoans: {
          ...detail,
          ...response.data,
          moneyInput: action.inputMoney
        }
      });
    } else if (response.error && response.error.code === 2001) {
      NavigationServices.navigate("UploadReceipt");
    } else if (response.error && response.error.code === 2004) {
      NavigationServices.navigate("UploadComplete");
    } else {
      alert(response.error.message);
    }
  } catch (error) {
    // console.log(error);
  } finally {
    yield put({
      type: "HIDE_LOADING"
    });
  }
}

function* collectLoanFailed(action) {
  try {
    yield put({
      type: "SHOW_LOADING"
    });
    const response = yield uploadMultiImage(action);
    yield put({
      ...action,
      type: "COLLECT_LOAN_FAILED_SUCCESS",
      payload: response
    });
  } catch (error) {
  } finally {
    yield put({
      type: "HIDE_LOADING"
    });
  }
}

export default function* saga() {
  yield all([
    takeLatest("GET_LAST_TRANSACTION", getLastTransaction),
    takeLatest("REQUEST_LOCATION_BACKGROUND", requestLocationBackground),
    takeLatest("UPLOAD_AUDIO", uploadAudio),
    takeLatest("COLLECT_LOAN_FAILED", collectLoanFailed),
    takeLatest("MAKE_REPAYMENT", makeRepayment),
    takeLatest("UPLOAD_BANK_RECEIPT", uploadBacnkReceipt),
    takeLatest("GET_REACH_LIMIT_DATA", getReachLimitData),
    takeLatest("GET_LIST_LOANS_UNCOLLECTED", getListLoansUnCollected),
    takeLatest("GET_LIST_LOANS", getListLoans),
    takeLatest("GET_DETAIL_LOANS", getDetailLoans),
    takeLatest("GET_LIST_LOANS_SEARCH", getListLoansSearch),
    takeLatest(
      "GET_LIST_LOANS_UNCOLLECTED_SEARCH",
      getListLoansUnCollectedSearch
    )
  ]);
}
