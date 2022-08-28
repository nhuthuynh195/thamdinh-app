import Layout from "./layout";
import connectRedux from "../../redux/connectRedux";
import { Animated, Linking, PixelRatio } from "react-native";
import CallPhone from "@core/utils/callPhone";

class UploadComplete extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      isModalError: false,
      uploadSuccess: false,
      isModalCallManger: false,
      isModalPhone: false
    };
  }

  componentDidMount() {}

  backToRoot = () => {
    this.props.navigation.replace("Home");
  };

  changeStatusModalError = () => {
    this.setState({ isModalError: !this.state.isModalError });
  };

  changeStatusCallManger = () => {
    this.setState({ isModalCallManger: !this.state.isModalCallManger });
  };

  callManager = phone => {
    const args = {
      number: phone,
      prompt: false
    };
    CallPhone(args);
  };
}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, UploadComplete);
