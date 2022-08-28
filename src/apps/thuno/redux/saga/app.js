import { put, takeLatest, all } from "redux-saga/effects";

function* testApp(action) {
    try {
        yield put({ ...action, type: "APP_GET_LINKS_WEBVIEW_SUCCESS" });
    } catch (error) {

    }
}

export default function* saga() {
    yield all([
        takeLatest('TEST_APP', testApp)
    ])
}