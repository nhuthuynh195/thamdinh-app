import React from "react";
import { AppRegistry, Platform, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import { AlertProvider } from "../../core/components/Alert";
import { NotiProvider } from "../../core/components/NotificationError";
import AppNavigator from "./navigators/AppNavigator";
import configureStore from "./redux/store";
import Load from "../../core/components/Load";
import NavigatorServices from "../thamdinh/navigators/NavigationServices";
import HotUpdate from "../../core/components/react-native-code-push-dialog/index";
console.disableYellowBox = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    const { persistor, store } = configureStore();
    this.state = {
      persistor,
      store,
    };
  }

  render() {
    const deploymentKey = "1JtZ8mGE4VNUt51o68UVZVCOJvPdE97Ho4oJC";
    return (
      <Provider store={this.state.store}>
        <AlertProvider>
          <NotiProvider>
            <PersistGate loading={<View />} persistor={this.state.persistor}>
              <HotUpdate deploymentKey={deploymentKey} isActiveCheck={false} />
              <AppNavigator
                ref={(navigatorRef) => {
                  NavigatorServices.setContainer(navigatorRef);
                }}
              />
              <Load />
            </PersistGate>
          </NotiProvider>
        </AlertProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("com.kiman.thamdinh", () => App);

// 6b904950ef6d7e7065cbc779d0cda3d97adae629 : Register code push

// thamdinh-ios
// {
//     production : H5bcUx139Q9U2ioaO3y4b_xlThjD8ed003ce-e621-4347-babf-de7857b9c737
//     staging: cnDIMhc5iYJljt4Sw8kSM-hhYh6A8ed003ce-e621-4347-babf-de7857b9c737
// }

// thamdinh-android
// {
//     production : 1JtZ8mGE4VNUt51o68UVZVCOJvPdE97Ho4oJC
//     staging: 2KnUSUQXhkCVBstpnmNDfN71HYhwhX-TGZ278
// }
