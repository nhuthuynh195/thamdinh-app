import { StyleSheet, Platform } from 'react-native';

import styleConfig from '../../configs/style';
import { scaleSzie } from '../../utils/func';
import Configs from '@configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: 'rgb(157,157,157)',
  },
  preview: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  containerTakePhoto: {
    width: scaleSzie(70),
    height: scaleSzie(70),
    marginBottom: scaleSzie(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSzie(35),
    borderWidth: 1,
    borderColor: '#616161',
    //  marginRight:scaleSzie(65)
  },
  containerTakePhoto1: {
    width: scaleSzie(100),
    height: scaleSzie(100),
    marginBottom: scaleSzie(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSzie(35),
    borderWidth: 1,
    borderColor: '#616161',
    backgroundColor:'red'
  },
  capture: {
    backgroundColor: '#fff',
    width: scaleSzie(58),
    height: scaleSzie(58),
    borderRadius: scaleSzie(29),
    borderWidth: 1,
    borderColor: '#616161',
  },
  containerButtonBack: {
    width: scaleSzie(50),
    height: scaleSzie(50),
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: scaleSzie(40),
      },
      android: {
        top: scaleSzie(20),
      }
    }),
    left: scaleSzie(12),
    justifyContent: 'center',
  },
  iconBack: {
    width: scaleSzie(12),
    height: scaleSzie(22)
  },
  containerPopup: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(156),
    paddingHorizontal: scaleSzie(20)
  },
  containerButtonPopup: {
    height: scaleSzie(64),
    paddingHorizontal: scaleSzie(16),
    flexDirection: 'row'
  },
});

