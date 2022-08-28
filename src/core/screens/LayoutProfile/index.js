import React, { Component, memo } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";

import IMAGE from "@resources/icon";
import styleConfig from "@configs/style";
import Configs from "@configs";

import styles from "./styles";
import { HeaderScreen, Text } from "../../components";
import { scaleSzie, isIphoneX } from "../../utils/func";
class ProfilePage extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: styleConfig.BACKGROUND_COLOR_LIGHT }}
      >
        <HeaderScreen
          title="Tài khoản"
          leftIcon={IMAGE.back}
          onPressLeft={this.backHome}
          styleLeftIcon={{
            width: scaleSzie(12),
            height: scaleSzie(22)
          }}
        />
        {this.renderViewInfor()}
        <View style={{ flexDirection: 'row' }} >
          <View style={{ flex: 1 }} >
            <TouchableOpacity onPress={this.changePassword}>
              <Text
                bold
                style={[
                  styles.TextView,
                  {
                    marginTop: styleConfig.VERTICLE,
                    marginLeft: styleConfig.VERTICLE_20
                  }
                ]}
              >
                Đổi mật khẩu
          </Text>
            </TouchableOpacity>
          </View>
          {/* ------- Version ------ */}
          <View style={{ flex: 1, justifyContent:'flex-end',alignItems:'flex-end',
        paddingRight:scaleSzie(22)
        }} >
            <Text>
              {`Version : ${Configs.VERSION}`}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.logout} style={styles.ViewLogot}>
          <Image source={IMAGE.signout} />
          <Text style={styles.TextView}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderViewInfor = () => {
    const { profile } = this.props;
    return (
      <View
        style={[
          styles.ViewProfile,
          {
            elevation: 2,
            shadowColor: "rgb(95, 94, 163)",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25
          }
        ]}
      >
        <Text style={[styles.TextName]}>{profile.name}</Text>
        <Text style={styles.TextCode}>{`Mã nhân viên: ${
          profile.identity
          }`}</Text>
        <Row image={IMAGE.title} text={`${profile.roles}`} />
        {profile.leaders.length === 0
          ? [
            <Row key={1} image={IMAGE.leader} text={`${profile.leaders}`} />,
            <Row
              key={2}
              image={IMAGE.phone}
              text={`${profile.mobile_phone}`}
            />
          ]
          : profile.leaders.length === 1
            ? [
              <Row
                key={1}
                image={IMAGE.leader}
                text={`${profile.leaders[0].name}`}
              />,
              <Row
                key={2}
                image={IMAGE.phone}
                text={`${profile.leaders[0].mobile_phone}`}
              />
            ]
            : profile.leaders.map((item, index) => (
              <Row
                key={index}
                image={IMAGE.leader}
                text={`${item.name}`}
                phone={item.mobile_phone}
              />
            ))}
      </View>
    );
  };
}

const Row = React.memo(function Row(props) {
  return (
    <View style={styles.RowItem}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={props.image} />
      </View>
      <Text style={{ flex: 5, fontSize: 14 }}>{props.text}</Text>
      {props.phone ? (
        <Text style={{ fontSize: 14 }}>{`${props.phone}`}</Text>
      ) : null}
    </View>
  );
});

export default ProfilePage;
