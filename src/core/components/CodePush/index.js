import React from "react";
import CodePush, {
  RemotePackage,
  DownloadProgress,
  CodePushOptions
} from "react-native-code-push";
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
  Text,
  Button
} from "react-native";

const { width } = Dimensions.get("window");
const dialogWidth = width - 20;
const progressBarWidth = dialogWidth - 40;
const isIOS = Platform.OS === "ios";

class CodePushUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.titles = {
      None: "Update Available !",
      Syncing: "Update In Progress !",
      Update: "Update Available !",
      Updated: "Update Installed !"
    };
    this.state = {
      updateInfo: null,
      isMandatory: false,
      currentProgress: 0,
      syncMessage: "",
      state: "None",
      animatedProgressValue: new Animated.Value(0),
      animatedOpacityValue: new Animated.Value(0),
      animatedScaleValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    CodePush.disallowRestart();
    CodePush.getUpdateMetadata().then(packageInfo => {
      if (packageInfo) {
        const { label, appVersion } = packageInfo;
      }
    });
  }

  componentDidMount() {
    CodePush.allowRestart();
    this.syncImmediate();
  }

  syncImmediate() {
    CodePush.checkForUpdate(
      "B9KRDEly901vyr_85npM_1KjodSqe7882160-45f7-4651-8864-db31202018f6"
    ).then(update => {
      if (update) {
        const isMandatory = update.isMandatory;
        this.setState(
          { isMandatory, updateInfo: update, state: "Updated" },
          this.show
        );
      }
    });
  }

  show = () => {
    const { animatedOpacityValue, animatedScaleValue } = this.state;
    Animated.sequence([
      Animated.timing(animatedOpacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(animatedScaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  hide = () => {
    this.close();
  };

  restartNow = () => {
    this.close(() => CodePush.restartApp());
  };

  close = close => {
    const { animatedOpacityValue, animatedScaleValue } = this.state;
    Animated.sequence([
      Animated.timing(animatedScaleValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(animatedOpacityValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ]).start(() => this.setState({ state: "None" }, close));
  };

  getVersion = () => {
    const { updateInfo } = this.state;
    if (updateInfo) {
      const { label, appVersion } = updateInfo;
      const buildNumber = label.substring(1);
      const version = `Version: ${appVersion} (${buildNumber})`;
      return version;
    }
    return null;
  };

  immediateUpdate = () => {
    const { state } = this.state;
    if (state !== "Syncing") {
      this.setState({ state: "Syncing" }, () => {
        let codePushOptions = {
          installMode: CodePush.InstallMode.ON_NEXT_RESTART,
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          deploymentKey: this.props.deploymentKey
        };
        CodePush.sync(
          codePushOptions,
          this.codePushStatusDidChange.bind(this),
          this.codePushDownloadDidProgress.bind(this)
        );
      });
    }
  };

  codePushStatusDidChange(syncStatus) {
    let syncMessage = "";
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        syncMessage = "Checking for update";
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        syncMessage = "Downloading package";
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        syncMessage = "Awaiting user action";
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        syncMessage = "Installing update";
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        syncMessage = "App up to date.";
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        syncMessage = "Update cancelled by user";
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        syncMessage = "Update installed and will be applied on restart.";
        CodePush.notifyAppReady();
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        syncMessage = "An unknown error occurred";
        this.hide();
        return;
    }
    // console.log(syncMessage);
  }

  codePushDownloadDidProgress(progress) {
    // console.log(progress);
    const { state, animatedProgressValue, isMandatory } = this.state;
    if (state === "Syncing") {
      const { receivedBytes, totalBytes } = progress;
      let temp = receivedBytes / totalBytes;
      this.setState({ currentProgress: temp }, () => {
        if (temp >= 1) {
          if (isMandatory) {
            this.hide();
          } else {
            this.setState({ state: "Updated" });
          }
        } else {
          animatedProgressValue.setValue(temp);
        }
      });
    }
  }

  renderDescription = () => {
    const { updateInfo } = this.state;
    if (updateInfo && updateInfo.description) {
      return (
        <Text style={styles.description}>{`${updateInfo.description}`}</Text>
      );
    }

    return null;
  };

  renderBottom = () => {
    const { state, isMandatory } = this.state;
    if (state === "Updated") {
      return (
        <View style={styles.row}>
          {!isMandatory && (
            <Button
              style={styles.deactiveButton}
              buttonStyle={{ padding: 0, height: "100%" }}
              textStyle={styles.deactiveButtonText}
              title={"Bấm"}
              onPress={this.hide}
            />
          )}
          <Button
            style={styles.activeButton}
            buttonStyle={{ padding: 0, height: "100%" }}
            textStyle={styles.activeButtonText}
            title={"Restast"}
            onPress={this.restartNow}
          />
        </View>
      );
    }

    if (state === "Syncing") {
      const {
        animatedProgressValue,
        syncMessage,
        currentProgress
      } = this.state;

      const translateX = animatedProgressValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-progressBarWidth, 0]
      });
      const animationStyle = {
        transform: [{ translateX }]
      };
      const color = animatedProgressValue.interpolate({
        inputRange: [0, 0.3, 0.4, 0.5, 0.6],
        outputRange: ["white", "#474f61", "#474f61", "#474f61", "white"]
      });

      const roundedValue = (currentProgress * 100).toFixed(2);
      const progress = `${roundedValue}%`;
      return (
        <View style={{ alignItems: "center" }}>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.track, animationStyle]} />
            <Animated.Text style={[styles.progress, { color }]}>
              {progress}
            </Animated.Text>
          </View>
          <Text style={styles.msg}>{syncMessage}</Text>
        </View>
      );
    }

    return (
      <View style={styles.row}>
        {!isMandatory && (
          <Button
            style={styles.deactiveButton}
            buttonStyle={{ padding: 0, height: "100%" }}
            textStyle={styles.deactiveButtonText}
            title={"Update later"}
            onPress={this.hide}
          />
        )}
        <Button
          style={styles.activeButton}
          buttonStyle={{ padding: 0, height: "100%" }}
          textStyle={styles.activeButtonText}
          title={"Update Now"}
          onPress={this.immediateUpdate}
        />
      </View>
    );
  };

  renderContent = () => {
    const { state, isMandatory } = this.state;
    if (state === "Updated") {
      return (
        <View style={styles.content}>
          <Text style={styles.header}>The newest version is installed.</Text>
          <Text style={styles.confirmText}>Do you want to restart now ?.</Text>
        </View>
      );
    }
    return (
      <View style={styles.content}>
        <Text style={styles.header}>A newer version is avaible.</Text>
        {this.renderDescription()}
        <Text style={styles.confirmText}>
          {isMandatory
            ? "Please update to new version."
            : "Do you want to upgrade?."}
        </Text>
      </View>
    );
  };

  render() {
    const visible = this.state.state !== "None";
    const { animatedOpacityValue, animatedScaleValue, state } = this.state;
    const version = this.getVersion();

    const opacity = animatedOpacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 1]
    });

    const opacityStyle = {
      opacity
    };

    const scale = animatedScaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const scaleStyle = {
      transform: [{ scale }]
    };

    const title = this.titles[state];
    return (
      <Modal transparent visible={visible}>
        <Animated.View style={[styles.modal, opacityStyle]}>
          <Animated.View style={[styles.container, scaleStyle]}>
            <Text style={styles.title}>{title}</Text>
            {version && <Text style={styles.version}>{version}</Text>}
            {this.renderContent()}
            <View style={styles.bottom}>{this.renderBottom()}</View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(35,36,38,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    width: dialogWidth,
    overflow: "hidden",
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6
      }
    }),
    borderRadius: 14
  },
  bottom: {
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 20,
    color: "red"
  },
  header: {
    fontSize: 18,
    color: "red"
  },
  content: {
    alignSelf: "flex-start",
    marginHorizontal: 20,
    marginTop: 10
  },
  description: {
    fontSize: 18,
    color: "red"
  },
  activeButton: {
    marginHorizontal: 15,
    backgroundColor: "yellow",
    height: 46,
    borderRadius: 23
  },
  activeButtonText: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 20,
    padding: 0
  },
  deactiveButton: {
    marginHorizontal: 15,
    backgroundColor: "blue",
    height: 46,
    borderRadius: 23
  },
  deactiveButtonText: {
    fontSize: 18,
    color: "red",
    marginHorizontal: 20,
    padding: 0
  },
  progressBar: {
    width: progressBarWidth,
    height: 16,
    borderRadius: 8,
    backgroundColor: "red",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "yellow"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  msg: {
    marginTop: 8,
    fontSize: 16,
    color: "red"
  },
  progress: {
    fontSize: 12,
    color: "red"
  },
  version: {
    marginTop: 4,
    fontSize: 14,
    color: "yellow"
  },
  confirmText: {
    fontSize: 18,
    color: "green",
    marginTop: 10,
    marginBottom: 20
  }
});

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  updateDialog: undefined
};

export default CodePush(codePushOptions)(CodePushUpdate);
