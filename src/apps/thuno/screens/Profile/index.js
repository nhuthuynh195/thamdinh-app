import ProfilePage from "@core/screens/LayoutProfile";
import connectRedux from "../../redux/connectRedux";
import { DeviceEventEmitter } from "react-native";
import { persistReducer, persistStore } from "redux-persist";
const eventTypeLogout = "LOGOUT";
class ProfileScreen extends ProfilePage {
  constructor(props) {
    super(props);
    this.state = {};
    this.backHome = this.backHome.bind(this);
    this.logout = this.logout.bind(this);
  }

  backHome() {
    this.props.navigation.goBack();
  }

  changePassword = () => {
    this.props.navigation.navigate("ChangePassword");
  };

  logout = () => {
    this.props.openAlert(` Bạn có chắc muốn đăng xuất ?`, eventTypeLogout);
  };

  actionTypeAlert = () => {
    DeviceEventEmitter.addListener(eventTypeLogout, e => {
      this.props.actions.app.Logout();
      persistStore(this.props).purge();
      this.props.navigation.navigate("Login");
    });
  };

  componentDidMount() {
    this.actionTypeAlert();
  }
}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile
});

export default connectRedux(mapStateToProps, ProfileScreen);
