import { StyleSheet } from "react-native";

import styleConfig from "@core/configs/style";
import Configs from "@core/configs";
import { scaleSzie } from "@core/utils/func";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConfig.BACKGROUND_COLOR_CONTAINER,
  },
  containerProfile: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(104),
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  containerAvatar: {
    width: scaleSzie(94),
    alignItems: "center",
    paddingTop: scaleSzie(14),
  },
  containerUserInfo: {
    flex: 1,
    paddingTop: scaleSzie(16),
  },
  containerIconPhone: {
    width: scaleSzie(64),
    alignItems: "flex-end",
  },
  containerFooter: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: scaleSzie(12),
    right: scaleSzie(12),
    paddingBottom: scaleSzie(24),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerButtonMenu: {
    position: "absolute",
    bottom: scaleSzie(50),
    right: scaleSzie(0),
    justifyContent: "center",
    alignItems: "center",
  },
  containerTabNeedCollect: {
    paddingHorizontal: scaleSzie(12),
    flex: 1,
  },
  dropdownStatus: {
    width: scaleSzie(110),
    height: scaleSzie(25),
    borderBottomColor: "#C8C8C8",
    borderBottomWidth: 0.5,
    flexDirection: "row",
  },
  containerPopup: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(156),
    paddingHorizontal: scaleSzie(20),
  },
  containerButtonPopup: {
    height: scaleSzie(64),
    paddingHorizontal: scaleSzie(16),
    flexDirection: "row",
  },
  containerFooterTabReview: {
    width: Configs.FULL_WIDTH,
    height: scaleSzie(100),
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    paddingTop: scaleSzie(12),
    paddingLeft: scaleSzie(21),
  },
  textFooterReview: {
    color: "#424242",
    fontSize: scaleSzie(15),
  },
  containerTabView: {
    flex: 1,
  },
});
