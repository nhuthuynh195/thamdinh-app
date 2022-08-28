import { Platform, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const configs = {
  VERSION: "1.2.0",
  DEFAULT_WIDTH: Platform.OS === "ios" ? 414 : 420,
  DEFAULT_HEIGHT: Platform.OS === "ios" ? 736 : 736,
  FULL_WIDTH: width,
  FULL_HEIGHT: height,
  KEY_GOOGLE_MAP: {
    ios: "AIzaSyDF_WBwK321bxZfZJRgnZAla3tF8I5-GMY",
    android: "AIzaSyDF_WBwK321bxZfZJRgnZAla3tF8I5-GMY",
  },
  VERSION_APP: "1.0.0",
};

// ./gradlew :newapp:assembleRelease   Build realese android

export default configs;
