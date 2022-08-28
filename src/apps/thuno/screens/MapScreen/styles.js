import { StyleSheet, Platform } from "react-native";

import styleConfig from "@configs/style";
import Configs from "@configs";
import { scaleSzie } from "@utils/func";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConfig.BACKGROUND_COLOR_CONTAINER
  },
  containerFooter: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(143.5),
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0
  },
  containerSnapUser: {
    width: scaleSzie(290),
    height: scaleSzie(107),
    backgroundColor: "#ffffff",
    borderRadius: scaleSzie(4),
    paddingLeft: scaleSzie(16),
    paddingRight: scaleSzie(5),
    paddingTop: scaleSzie(12),
    paddingBottom: scaleSzie(12)
    // borderWidth: 0.5,
    // borderColor: 'rgba(66,66,66,0.3)',
  },
  containerChildrendSnapUser: {
    flex: 1,
    flexDirection: "row"
  },
  containerInfoUser: {
    flex: 1
  },
  containerAvatar: {
    width: scaleSzie(80),
    alignItems: "center"
  },
  usernameText: {
    color: "#4F4F4F",
    fontSize: scaleSzie(15)
  },
  storeText: {
    fontSize: scaleSzie(14),
    color: "#4F4F4F",
    marginTop: scaleSzie(2)
  },
  containerButtonBack: {
    width: scaleSzie(50),
    height: scaleSzie(50),
    position: "absolute",
    ...Platform.select({
      ios: {
        top: scaleSzie(40)
      },
      android: {
        top: scaleSzie(20)
      }
    }),
    left: scaleSzie(12),
    justifyContent: "center"
  },
  iconBack: {
    width: scaleSzie(12),
    height: scaleSzie(22)
  }
});
