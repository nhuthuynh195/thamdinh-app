import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  DeviceEventEmitter,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Text } from "@core/components";
const { width } = Dimensions.get("window");

class AlertProvider extends Component {
  static get childContextTypes() {
    return {
      openAlert: PropTypes.func
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any
    };
  }

  getChildContext() {
    return {
      openAlert: (...args) => this.dropdown.openAlert(...args)
    };
  }

  render() {
    const { children } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(children)}
        <Alert
          ref={ref => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

export class Alert extends Component {
  state = {
    openAlert: false,
    backgroundColor: "#FFF",
    eventType: "",
    content: ""
  };

  openAlert = (title, actionType) => {
    this.setState({
      openAlert: true,
      eventType: actionType,
      content: title
    });
  };

  closeAlert = () => {
    this.setState({ openAlert: false });
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.openAlert}
        onRequestClose={() => this.setState({ openAlert: false })}
        style={{ flex: 1 }}
      >
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.6)"
            }
          ]}
        >
          <View
            style={{
              width: width - 40,
              padding: 20,
              borderRadius: 5,
              backgroundColor: "#FFF",
              alignItems: "center"
            }}
          >
            <Text
              bold
              style={{ color: "#424242", fontSize: 16, textAlign: "center" }}
            >
              {this.state.content}
            </Text>
            <View style={{ flexDirection: "row", height: 40, marginTop: 26 }}>
              <TouchableOpacity
                style={styles.buttonAler}
                onPress={this.closeAlert}
              >
                <Text bold style={{ color: "#55529E" }}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonAler,
                  {
                    marginLeft: 15,
                    backgroundColor: "#55529E"
                  }
                ]}
                onPress={() => this.clickButton(this.state.eventType)}
              >
                <Text bold style={{ color: "#FFF" }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  clickButton = type => {
    this.setState({ openAlert: false });
    DeviceEventEmitter.emit(type);
  };
}

export default AlertProvider;

const styles = StyleSheet.create({
  buttonAler: {
    flex: 1,
    borderRadius: 20,
    borderColor: "#55529E",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
