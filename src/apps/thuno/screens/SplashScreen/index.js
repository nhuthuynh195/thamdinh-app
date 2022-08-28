import React from "react";
import { timer } from "rxjs";
import _ from "ramda";

import LayoutSplash from "@core/screens/LayoutSplash";
import { checkAllArrayIsNotEmpty } from "@core/utils/func";
import connectRedux from "../../redux/connectRedux";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";

class SplashScreen extends LayoutSplash {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // BackgroundGeolocation.configure({
    //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //   stationaryRadius: 50,
    //   distanceFilter: 50,
    //   notificationTitle: "Background tracking",
    //   notificationsEnabled: true,
    //   notificationText: "enabled",
    //   debug: true,
    //   startOnBoot: false,
    //   stopOnTerminate: true,
    //   locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    //   interval: 1000,
    //   fastestInterval: 1000,
    //   activitiesInterval: 1000,
    //   stopOnStillActivity: false,
    //   url: "http://192.168.81.15:3000/location",
    //   httpHeaders: {
    //     "X-FOO": "bar"
    //   },
    //   // customize post properties
    //   postTemplate: {
    //     lat: "@latitude",
    //     lon: "@longitude",
    //     foo: "bar" // you can also add your own properties
    //   }
    // });
    // BackgroundGeolocation.on("location", location => {
    //   let body = {
    //     current_longitude: location.longitude,
    //     current_latitude: location.latitude
    //   };
    //   this.props.actions.loans.requestLocationBackground(body);
    //   // handle your locations here
    //   // to perform long running operation on iOS
    //   // you need to create background task
    //   BackgroundGeolocation.startTask(taskKey => {
    //     // execute long running task
    //     // eg. ajax post location
    //     // IMPORTANT: task has to be ended by endTask
    //     BackgroundGeolocation.endTask(taskKey);
    //   });
    // });
    // BackgroundGeolocation.on("stationary", stationaryLocation => {
    //   // handle stationary locations here
    //   Actions.sendLocation(stationaryLocation);
    // });
    // BackgroundGeolocation.on("error", error => {
    //   console.log("[ERROR] BackgroundGeolocation error:", error);
    // });
    // BackgroundGeolocation.on("start", () => {
    //   console.log("[INFO] BackgroundGeolocation service has been started");
    // });
    // BackgroundGeolocation.on("stop", () => {
    //   console.log("[INFO] BackgroundGeolocation service has been stopped");
    // });
    // BackgroundGeolocation.on("authorization", status => {
    //   console.log(
    //     "[INFO] BackgroundGeolocation authorization status: " + status
    //   );
    //   if (status !== BackgroundGeolocation.AUTHORIZED) {
    //     // we need to set delay or otherwise alert may not be shown
    //     setTimeout(
    //       () =>
    //         Alert.alert(
    //           "App requires location tracking permission",
    //           "Would you like to open app settings?",
    //           [
    //             {
    //               text: "Yes",
    //               onPress: () => BackgroundGeolocation.showAppSettings()
    //             },
    //             {
    //               text: "No",
    //               onPress: () => console.log("No Pressed"),
    //               style: "cancel"
    //             }
    //           ]
    //         ),
    //       1000
    //     );
    //   }
    // });
    // BackgroundGeolocation.on("background", () => {
    //   console.log("[INFO] App is in background");
    // });
    // BackgroundGeolocation.on("foreground", () => {
    //   console.log("[INFO] App is in foreground");
    // });
    // BackgroundGeolocation.on("abort_requested", () => {
    //   console.log("[INFO] Server responded with 285 Updates Not Required");
    // });
    // BackgroundGeolocation.on("http_authorization", () => {
    //   console.log("[INFO] App needs to authorize the http requests");
    // });
    // BackgroundGeolocation.checkStatus(status => {
    //   console.log(
    //     "[INFO] BackgroundGeolocation service is running",
    //     status.isRunning
    //   );
    //   console.log(
    //     "[INFO] BackgroundGeolocation services enabled",
    //     status.locationServicesEnabled
    //   );
    //   console.log(
    //     "[INFO] BackgroundGeolocation auth status: " + status.authorization
    //   );
    //   // you don't need to check status before start (this is just the example)
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start(); //triggers start on start event
    //   }
    // });
  }

  componentWillUnmount() {
    // BackgroundGeolocation.removeAllListeners();
  }

  componentDidMount() {
    const { profile } = this.props;
    if (!_.isEmpty(profile)) {
      if (profile.require_password_change) {
        this.props.navigation.navigate("ChangePassword");
      } else {
        this.props.navigation.navigate("Main");
      }
    } else {
      this.props.navigation.navigate("Login");
    }
  }
}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, SplashScreen);
