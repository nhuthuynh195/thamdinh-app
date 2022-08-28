import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import app from "./app";
import loans from "./loans";

import dataLocal from "./dataLocal";
import client from "./client";
import auth from "@core/redux/reducers/auth";
import map from "@core/redux/reducers/map";
import noti from "@core/redux/reducers/noti";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["dataLocal"]
};

const authPersistConfig = {
  key: "dataLocal",
  storage: storage
};

// const rootReducer = combineReducers({
//   dataLocal: persistReducer(authPersistConfig, dataLocal),
//   app,
//   map,
//   auth,
//   client,
//   noti,
//   loans
// });

const appReducer = combineReducers({
  dataLocal: persistReducer(authPersistConfig, dataLocal),
  app,
  map,
  auth,
  client,
  noti,
  loans
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "APP_LOGOUT") {
    state = initialState;
  }

  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
