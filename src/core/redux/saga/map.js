import { put, takeLatest, all, call } from "redux-saga/effects";
import { delay } from "redux-saga";
import Polyline from "@mapbox/polyline";
import Configs from "@core/configs";
import { Platform } from "react-native";
// AIzaSyAsnYOZcTw7eQtDjhAsn4ZkQ27_F3lzPn0  android
//  AIzaSyAA0MDeUI3BjeFkwfTU7vnloCEtqF6NSdI ios

function* getMapDirections(action) {
  try {
    // if (!payload.delay) {
    //     yield call(delay, 1000)
    // }
    const { payload } = action;

    let responses = yield fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${
        payload.start
      }&destination=${payload.destination}&key=${
        Configs.KEY_GOOGLE_MAP[Platform.OS]
      }`
    );
    let respJson = yield responses.json();
    let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1]
      };
    });
    yield put({
      ...action,
      type: "GET_MAP_DIRECTIONS_SUCCESS",
      payload: coords
    });
  } catch (error) {
    yield put({type : error});
  }
}

function* setYourLocation(action) {
  try {
    yield put({ ...action, type: "SET_YOUR_LOCATION_SUCCESS" });
    const { payload } = action;
    const start = `${payload.yourLocation.latitude},${
      payload.yourLocation.longitude
    }`;
    const destination = `${action.destination.latitude},${
      action.destination.longitude
    }`;
    yield put({
      type: "GET_MAP_DIRECTIONS",
      payload: {
        start,
        destination,
        dalay: true
      }
    });
  } catch (error) {
    yield put({type : error});
  }
}

export default function* saga() {
  yield all([
    takeLatest("GET_MAP_DIRECTIONS", getMapDirections),
    takeLatest("SET_YOUR_LOCATION_MIDDLEWARE", setYourLocation)
  ]);
}
