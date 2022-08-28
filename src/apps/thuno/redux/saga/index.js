import { all } from 'redux-saga/effects';

import app from './app';
import loans from './loans';

import dataLocal from './dataLocal';
import auth from '@core/redux/saga/auth';
import map from '@core/redux/saga/map';
import noti from '@core/redux/saga/noti';

export default function* sagaRoot() {
  yield all([app(), dataLocal(), auth(), map(), noti(), loans()]);
}
