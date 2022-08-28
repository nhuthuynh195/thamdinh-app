import Layout from "./layout";
import connectRedux from "../../redux/connectRedux";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { EscPos } from "escpos-xml";
import { filterSymbol, formatMoney } from "@utils/func";
import { xml } from "./compoments/TemplatePrinter";

class ReceiptScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      modalConnectPrinter: false
    };
    this.gotoUploadReceipt = this.gotoUploadReceipt.bind(this);
  }

  async componentDidMount() {
    if (
      this.props.idPrinter &&
      this.props.idPrinter.length > 3 &&
      this.props.isConnectPrinter === false
    ) {
      let connected = await BluetoothSerial.device(
        this.props.idPrinter
      ).connect();
      if (connected) {
        this.props.actions.app.SetPrinterConnect(true);
      }
    }
  }

  gotoUploadReceipt = getObject => {
    if (this.props.isConnectPrinter === false) {
      this.setState({ modalConnectPrinter: true });
    } else {
      if (this.props.idPrinter && this.props.idPrinter.length > 3) {
        this.printer(getObject);
      } else {
        this.setState({ modalConnectPrinter: true });
      }
    }
  };

  connectPrinterSuccess = connected => {
    this.setState({ modalConnectPrinter: false });
    this.props.actions.dataLocal.printerId(connected.id);
    this.props.actions.app.SetPrinterConnect(true);
  };

  printer = async getObject => {
    let space = this.renderSpace(getObject);
    const data = {
      date: getObject.date,
      name: getObject.name,
      line1: space.spaceLine1,
      line2: space.spaceLine2,
      line3: space.spaceLine3,
      line4: space.spaceLine4,
      line5: space.spaceLine5,
      id: getObject.id,
      Rspay: getObject.Rspay,
      lateDate: getObject.lateDate,
      moneyPay: getObject.moneyPay,
      paid_period: getObject.paid_period,
      phone: getObject.phone,
      trasaction_id: getObject.trasaction_id
    };
    let message = EscPos.getBufferFromTemplate(xml, data);
    await BluetoothSerial.device(this.props.idPrinter).write(message);
  };

  renderSpace = dataPrinter => {
    let idCharacter = (dataPrinter.id + "").length;
    let nameCharacter = filterSymbol(dataPrinter.name).length;
    let spaceLine1 = "";
    for (let i = 0; i <= 31 - idCharacter - nameCharacter; i++) {
      spaceLine1 += " ";
    }
    let moneyCharacter = dataPrinter.moneyPay.length;
    let spaceLine2 = "";
    for (let i = 0; i <= 32 - 8 - moneyCharacter; i++) {
      spaceLine2 += " ";
    }
    let CharacterLine3 = `${dataPrinter.Rspay}`.length;
    let spaceLine3 = "";
    for (let i = 0; i <= 30 - CharacterLine3 - 3; i++) {
      spaceLine3 += " ";
    }
    let trasactionChar = (dataPrinter.trasaction_id + "").length;
    let spaceLine4 = "";
    for (let i = 0; i <= 30 - trasactionChar - 8; i++) {
      spaceLine4 += " ";
    }
    let CharacterLine5 =
      (dataPrinter.paid_period + "").length +
      (dataPrinter.lateDate + "").length;
    let spaceLine5 = "";
    for (let i = 0; i <= 8 - CharacterLine5; i++) {
      spaceLine5 += " ";
    }
    return {
      spaceLine1,
      spaceLine2,
      spaceLine3,
      spaceLine4,
      spaceLine5
    };
  };
}

const mapStateToProps = state => {
  return {
    idPrinter: state.dataLocal.idPrinter,
    profile: state.dataLocal.profile,
    isConnectPrinter: state.app.isConnectPrinter
  };
};

export default connectRedux(mapStateToProps, ReceiptScreen);
