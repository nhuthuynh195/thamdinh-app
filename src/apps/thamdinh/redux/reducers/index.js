import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import app from './app';
import dataLocal from './dataLocal';
import client from './client';
import upload from './upload';

import auth from '@core/redux/reducers/auth';
import map from '@core/redux/reducers/map';
import noti from '@core/redux/reducers/noti';

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['dataLocal']
};

const authPersistConfig = {
    key: 'dataLocal',
    storage: storage,
};

const rootReducer = combineReducers({
    dataLocal: persistReducer(authPersistConfig, dataLocal),
    app,
    auth,
    map,
    client,
    noti,
    upload
});


export default persistReducer(rootPersistConfig, rootReducer);