import React from "react";
import { Modal, ActivityIndicator, View } from "react-native";

export default class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onRequestClose = this.onRequestClose.bind(this);
  }

  onRequestClose() {}

  render() {
    return (
      <Modal
        animationType={this.props.animationType || "none"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.onRequestClose}
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
          <ActivityIndicator color="#fff" size="large" />
        </View>
      </Modal>
    );
  }
}
