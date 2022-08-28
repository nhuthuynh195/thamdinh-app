import React from "react";
import { View, Image, Modal, Dimensions } from "react-native";

import styles from "./styles";
import { ButtonSubmit, TextInput, Text, Button } from "../../components";
import styleConfigs from "@configs/style";
import { scaleSzie, CONDITION_SORT, CONDITION_SORT_TN } from "@utils/func";
import IMAGE from "@resources/icon";

const { width, height } = Dimensions.get("window");

export default class LayoutSortModal extends React.Component {
  renderItemSort(sort, index) {
    const borderTop = index !== 0 ? styles.borderTopItem : null;
    // const iconRadioButton = index === this.props.sort ? IMAGE.radioButtonSe : IMAGE.radioButtonUnSe;
    const iconRadioButton =
      sort.title === this.state.sort.title
        ? IMAGE.radioButtonSe
        : IMAGE.radioButtonUnSe;

    return (
      <Button
        onPress={() => this.selectCondiSort(sort)}
        key={index}
        style={[styles.containerItemSort, borderTop]}
      >
        <Image
          source={iconRadioButton}
          style={{
            width: scaleSzie(17),
            height: scaleSzie(17),
            marginRight: scaleSzie(17),
            marginLeft: scaleSzie(25)
          }}
        />
        <Text style={{ fontSize: scaleSzie(16), color: "#424242" }}>
          {sort.title}
        </Text>
      </Button>
    );
  }

  render() {
    const { visible } = this.props;
    let listCondition =
      this.props.typeSort === 1 ? CONDITION_SORT_TN : CONDITION_SORT;
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={this.onRequestClose}
      >
        <View style={styles.container}>
          <View
            style={{
              width: scaleSzie(340),
              height: scaleSzie(350),
              backgroundColor: "#ffffff",
              borderRadius: scaleSzie(4)
            }}
          >
            <View style={styles.containerContent}>
              <View style={styles.content}>
                <Text style={{ color: "#424242", fontSize: scaleSzie(16) }}>
                  Sắp xếp danh sách theo:
                </Text>

                {/* ============================== */}
                <View
                  style={{
                    flex: 1,
                    paddingTop: scaleSzie(30),
                    paddingBottom: scaleSzie(42)
                  }}
                >
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: scaleSzie(120) }}>
                      <View style={{ flex: 1, marginTop: scaleSzie(5) }}>
                        <Text
                          bold
                          style={{ color: "#424242", fontSize: scaleSzie(16) }}
                        >
                          Thời gian
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          bold
                          style={{
                            color: "#424242",
                            fontSize: scaleSzie(16),
                            marginTop: scaleSzie(16)
                          }}
                        >
                          Khoảng cách
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      {listCondition.map((sort, index) =>
                        this.renderItemSort(sort, index)
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.constainerFooter}>
              <View style={styles.footer}>
                <ButtonSubmit
                  title="Huỷ"
                  backgroundButton="#ffffff"
                  styleButton={{ flex: 1 }}
                  borderButtonColor={styleConfigs.PURPLE_COLOR}
                  titleColor={styleConfigs.PURPLE_COLOR}
                  onPress={this.onRequestClose}
                />
                <View style={{ width: scaleSzie(12) }} />
                <ButtonSubmit
                  title="Lưu"
                  styleButton={{ flex: 1 }}
                  onPress={this.sortUserByConditon}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
