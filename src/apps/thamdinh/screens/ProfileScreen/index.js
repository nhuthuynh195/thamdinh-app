import LayoutProfile from '@core/screens/LayoutProfile';
import connectRedux from '../../redux/connectRedux';

import { DeviceEventEmitter } from "react-native";
const eventTypeLogout = "LOGOUT";

class ProfileScreen extends LayoutProfile {
  constructor(props) {
    super(props);
    this.state = {};
    this.changePassword = this.changePassword.bind(this);
    this.backHome = this.backHome.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.actionTypeAlert();
  }

  actionTypeAlert = () => {
    DeviceEventEmitter.addListener(eventTypeLogout, e => {
      this.props.actions.auth.logout();
      this.props.navigation.navigate('Login');
    });
  };

  logout() {
    this.props.openAlert(` Bạn có chắc muốn đăng xuất ?`, eventTypeLogout);

  }

  changePassword = () => {
    this.props.navigation.navigate('ChangePassword');
  };

  backHome() {
    this.props.navigation.goBack()
  }

}

const mapStateToProps = state => ({
  profile: state.dataLocal.profile
})

export default connectRedux(mapStateToProps, ProfileScreen);

