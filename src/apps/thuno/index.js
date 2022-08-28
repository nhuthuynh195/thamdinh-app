import React from "react";
import { AppRegistry, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { AlertProvider } from "../../core/components/Alert";
import { NotiProvider } from "../../core/components/NotificationError";
import AppNavigators from "./navigators/AppNavigator";
import configureStore from "./redux/store";
import Load from "../../core/components/Load";
import NavigatorServices from "../thuno/navigators/NavigationServices";
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
    return (
      <Provider store={this.state.store}>
        <AlertProvider>
          <NotiProvider>
            <PersistGate loading={<View />} persistor={this.state.persistor}>
              <AppNavigators
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

AppRegistry.registerComponent("com.kiman.thunoappdinovative", () => App);
