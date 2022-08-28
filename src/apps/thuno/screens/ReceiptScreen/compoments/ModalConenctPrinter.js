import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Dimensions,
  ActivityIndicator
} from "react-native";
const { width } = Dimensions.get("window");
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { filterSymbol, formatMoney } from "@utils/func";
import { xml } from "./TemplatePrinter";
import Button from "./Button";
import DeviceList from "./DeviceList";
const iconv = require("iconv-lite");
import { EscPos } from "escpos-xml";

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.events = null;
    this.state = {
      isEnabled: false,
      device: null,
      devices: [],
      scanning: false,
      processing: false
    };
  }

  async componentDidMount() {
    this.events = this.props.events;

    try {
      const [isEnabled, devices] = await Promise.all([
        BluetoothSerial.isEnabled(),
        BluetoothSerial.list()
      ]);

      this.setState({
        isEnabled,
        devices: devices.map(device => ({
          ...device,
          connected: false
        }))
      });
    } catch (e) {
      alert(e.message);
    }
  }

  listDevices = async () => {
    try {
      const list = await BluetoothSerial.list();

      this.setState(({ devices }) => ({
        devices: devices.map(device => {
          const found = list.find(v => v.id === device.id);

          if (found) {
            return {
              ...found,
              connected: false
            };
          }
          return device;
        })
      }));
    } catch (e) {
      alert(e.message);
    }
  };

  toggleDeviceConnection = async ({ id, connected }) => {
    if (connected) {
      await this.disconnect(id);
    } else {
      await this.connect(id);
    }
  };

  connect = async id => {
    this.setState({ processing: true });
    try {
      const connected = await BluetoothSerial.device(id).connect();
      if (connected) {
        this.props.connectSuccess(connected);
      } else {
        alert(`Failed to connect to device <${id}>`);
        this.setState({ processing: false });
      }
    } catch (e) {
      alert(e.message);
      this.setState({ processing: false });
    }
  };

  disconnect = async id => {
    this.setState({ processing: true });
    try {
      await BluetoothSerial.device(id).disconnect();
      this.setState(({ devices, device }) => ({
        processing: false,
        device: {
          ...device,
          connected: false
        },
        devices: devices.map(v => {
          if (v.id === id) {
            return {
              ...v,
              connected: false
            };
          }
          return v;
        })
      }));
    } catch (e) {
      alert(e.message);
      this.setState({ processing: false });
    }
  };

  write = async (id, message) => {
    try {
      await BluetoothSerial.device(id).write(message);
    } catch (e) {}
  };

  renderSpace = (dataPrinter, nameThuNo) => {
    let idCharacter = (dataPrinter.id + "").length;
    let nameCharacter = filterSymbol(dataPrinter.person_full_name).length;
    let spaceLine1 = "";
    for (let i = 0; i <= 41 - idCharacter - nameCharacter; i++) {
      spaceLine1 += " ";
    }
    let moneyCharacter = `${formatMoney(dataPrinter.moneyInput)} vnd`.length;
    let spaceLine2 = "";
    for (let i = 0; i <= 42 - 8 - moneyCharacter; i++) {
      spaceLine2 += " ";
    }
    let paid_period = `${dataPrinter.num_of_paid_term + 1}/${
      dataPrinter.loan_term
    }`;
    let CharacterLine3 = `${formatMoney(
      dataPrinter.moneyInput
    )} vnd CL: ${paid_period}`.length;
    let spaceLine3 = "";
    for (let i = 0; i <= 42 - 2 - CharacterLine3; i++) {
      spaceLine3 += " ";
    }
    let nameThuNoChar = 13 + nameThuNo.length;
    let trasactionChar = (dataPrinter.transaction_id + "").length;
    let spaceLine4 = "";
    for (let i = 0; i <= 42 - trasactionChar - nameThuNoChar; i++) {
      spaceLine4 += " ";
    }
    return {
      spaceLine1,
      spaceLine2,
      spaceLine3,
      spaceLine4
    };
  };

  renderModal = (device, processing) => {
    let dataPrinter = this.props.dataPrinter;
    let nameThuNo = this.props.nameThuNo;
    let space = this.renderSpace(dataPrinter, nameThuNo);
    const data = {
      name: filterSymbol(dataPrinter.person_full_name),
      line1: space.spaceLine1,
      line2: space.spaceLine2,
      line3: space.spaceLine3,
      line4: space.spaceLine4,
      id: dataPrinter.id,
      contractCode: dataPrinter.p_id,
      moneyPay: `${formatMoney(dataPrinter.moneyInput)}`,
      paid_period: `${dataPrinter.num_of_paid_term + 1}/${
        dataPrinter.loan_term
      }`,
      userName: filterSymbol(nameThuNo),
      trasaction_id: dataPrinter.transaction_id
    };
    this.renderSpace(dataPrinter, nameThuNo);
    let message = EscPos.getBufferFromTemplate(xml, data);
    if (!device) return null;
    const { id, connected } = device;
    return (
      <View style={{ width: width - 40, alignItems: "center" }}>
        {device ? (
          <View>
            {processing && (
              <ActivityIndicator
                style={{ marginTop: 15 }}
                size={Platform.OS === "ios" ? 1 : 60}
              />
            )}
            {!processing && (
              <View style={{ marginTop: 20, width: "50%" }}>
                <Button
                  title={connected ? "Ngắt kết nối" : "Kết Nối"}
                  style={{
                    backgroundColor: "#22509d"
                  }}
                  textStyle={{ color: "#fff" }}
                  onPress={() => this.toggleDeviceConnection(device)}
                />
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  };

  render() {
    const { device, devices, processing } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.openModal}
        style={{ flex: 1 }}
        onRequestClose={() => this.props.closeModal()}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 20,
            paddingVertical: 200
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              borderRadius: 5
            }}
          >
            <React.Fragment>
              <DeviceList
                devices={devices}
                onDevicePressed={device => this.setState({ device })}
                onRefresh={this.listDevices}
              />
              {this.renderModal(device, processing)}
            </React.Fragment>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalExample;
