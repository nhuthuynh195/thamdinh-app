import * as app from './app';
import * as dataLocal from './dataLocal';
import * as auth from '@core/redux/actions/auth';
import * as map from '@core/redux/actions/map';
import * as noti from '@core/redux/actions/noti';
import * as loans from './loans';
export default {
  loans,
  app,
  dataLocal,
  auth,
  map,
  noti
};
