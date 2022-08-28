import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Placeholder from "rn-placeholder";

import IMAGE from "@resources/icon";
const { width, height } = Dimensions.get("window");
import commonStyles from "@core/commonStyles";
import { scaleSzie } from "@utils/func";

const PlaceHolderDetail = props => {
  return (
    <View style={{ width: width, height: height }}>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View
          style={{
            flex: 3,
            backgroundColor: "#DEDEDE",
            marginTop: 30,
            marginBottom: 10,
            borderRadius: 10
          }}
        />
        <View style={{ flex: 1 }} />
      </View>

      {/* // default */}
      <View style={styles.viewInfoWithImage}>
        <View style={styles.imageInfo} />
        <View style={styles.viewInfo}>
          <View style={styles.viewAddress} />
          <View style={styles.viewNameOne} />
          <View style={styles.viewNameTwo} />
          <View style={styles.viewAddressTwo} />
        </View>
      </View>

      {/* ===== ======= */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#fafafa",
          flexDirection: "row",
          marginHorizontal: 20,
          paddingRight: 50
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.viewTab} />
          <View style={styles.viewBottomTab} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={[styles.viewTab, { marginLeft: 10 }]} />
          <View style={[styles.viewBottomTab, { marginLeft: 10 }]} />
        </View>
      </View>
      <View style={styles.viewLated}>
        <View style={styles.textLated} />
      </View>
      <View style={{ flex: 1.5, backgroundColor: "#FFF", padding: 10 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{ flex: 1, backgroundColor: "#DEDEDE", borderRadius: 5 }}
          />
          <View style={{ flex: 3, backgroundColor: "#FFF" }} />
          <View
            style={{ flex: 1.5, backgroundColor: "#DEDEDE", borderRadius: 5 }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#DEDEDE",
            marginTop: 5,
            borderRadius: 5
          }}
        />
      </View>

      <View
        style={{
          flex: 1.5,
          padding: 5,
          paddingHorizontal: 20,
          flexDirection: "row"
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#DEDEDE"
          }}
        />
        <View
          style={{
            flex: 1,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#DEDEDE",
            marginHorizontal: 10
          }}
        />
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignSelf: "center",
            borderWidth: 1,
            borderColor: "#DEDEDE"
          }}
        />
      </View>
      <View style={{ flex: 1.5 }}>
        <View style={styles.buttonAccept}>
          <Text style={{ color: "#FFF" }}>Xác nhận</Text>
        </View>
      </View>
      <View style={{ flex: 3, padding: 10 }}>
        <View style={styles.itemPeriod}>
          <View style={styles.itemPeriodDetail} />
          <View style={{ flex: 1 }} />
          <View style={styles.itemPeriodDetail} />
        </View>
        <View style={styles.itemPeriod}>
          <View style={styles.itemPeriodDetail} />
          <View style={{ flex: 1 }} />
          <View style={styles.itemPeriodDetail} />
        </View>
        <View style={styles.itemPeriod}>
          <View style={styles.itemPeriodDetail} />
          <View style={{ flex: 1 }} />
          <View style={styles.itemPeriodDetail} />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", padding: 5 }}>
        <View style={styles.viewTabButton} />
        <View
          style={[
            styles.viewTabButton,
            {
              marginHorizontal: 20
            }
          ]}
        />
        <View style={styles.viewTabButton} />
      </View>
    </View>
  );
};

// DEDEDE

export default Placeholder.connect(PlaceHolderDetail);

const styles = StyleSheet.create({
  itemPeriodDetail: { flex: 1, backgroundColor: "#DEDEDE", borderRadius: 5 },
  itemPeriod: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    paddingVertical: 10
  },
  viewTabButton: { flex: 1, backgroundColor: "#DEDEDE", borderRadius: 5 },
  buttonAccept: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  textLated: {
    width: 100,
    height: 20,
    borderRadius: 5,
    backgroundColor: "#DEDEDE"
  },
  viewLated: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20
  },
  viewBottomTab: { flex: 0.2, backgroundColor: "#DEDEDE", marginTop: 5 },
  viewTab: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    borderRadius: 5,
    marginTop: 10
  },
  viewInfoWithImage: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderColor: "#9d9d9d"
  },
  imageInfo: {
    height: scaleSzie(80),
    width: scaleSzie(80),
    borderRadius: scaleSzie(80 / 2),
    backgroundColor: "#DEDEDE"
  },
  viewInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "space-between"
  },
  viewAddressTwo: {
    flex: 1,
    marginRight: 20,
    backgroundColor: "#DEDEDE",
    borderRadius: 10,
    marginBottom: 20
  },
  viewNameTwo: {
    flex: 1,
    marginVertical: 10,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderRadius: 10
  },
  viewNameOne: {
    flex: 1,
    backgroundColor: "#DEDEDE",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: 50
  },
  viewAddress: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#DEDEDE",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignSelf: "stretch",
  }
});
