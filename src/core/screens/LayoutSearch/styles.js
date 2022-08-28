import { StyleSheet, Dimensions, Platform } from 'react-native';

import styleConfig from '@configs/style';
import { scaleSzie } from '@utils/func';
const { width } = Dimensions.get('window');
const {
  CENTER,
  VERTICLE,
  BORDER_WIDTH,
  BORDER_COLOR,
  COLOR_WHITE,
  VIEW_ROW,
  VIEW_ABSOLUTE,
  PURPLE_COLOR,
  FONT_SIZE_MEDIUM,
  FONT_WEIGHT_BOLD,
  VERTICLE_20,
  SHADOW_VIEW
} = styleConfig;

export default StyleSheet.create({
  TextCode: {
    textAlign: CENTER,
    fontSize: 14,
    marginTop: scaleSzie(10),
    marginBottom: scaleSzie(40)
  },
  TextName: {
    textAlign: CENTER,
    fontSize: 20,
    fontWeight: '500'
  },
  ViewProfile: {
    padding: VERTICLE,
    paddingTop: scaleSzie(35),
    width: width - scaleSzie(40),
    height: scaleSzie(288),
    marginTop: scaleSzie(78),
    borderRadius: scaleSzie(4),
    // borderWidth: BORDER_WIDTH,
    // borderColor: BORDER_COLOR,
    backgroundColor: COLOR_WHITE,
    marginHorizontal: VERTICLE_20
  },
  ViewLogot: {
    flexDirection: VIEW_ROW,
    alignItems: CENTER,
    position: VIEW_ABSOLUTE,
    bottom: scaleSzie(50),
    right: scaleSzie(20)
  },
  TextView: {
    color: PURPLE_COLOR,
    fontSize: FONT_SIZE_MEDIUM
  },
  RowItem: {
    flex: 1,
    borderTopWidth: BORDER_WIDTH,
    borderTopColor: BORDER_COLOR,
    alignItems: CENTER,
    padding: VERTICLE,
    flexDirection: VIEW_ROW
  }
});
