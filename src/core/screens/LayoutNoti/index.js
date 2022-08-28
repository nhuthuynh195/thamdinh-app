import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Dimensions } from "react-native";
import {
  ItemNoti,
  HeaderScreen,
  Loading,
  PlaceHolderList,
  EmptyList
} from "../../components";
import { scaleSzie } from "@core/utils/func";
import IMAGE from "../../resources/icon";
const { width, height } = Dimensions.get("window");

export class index extends Component {
  render() {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#FAFAFA", alignItems: "center" }}
      >
        <HeaderScreen
          title="Thông báo"
          leftIcon={IMAGE.back}
          onPressLeft={this.backHome}
          styleLeftIcon={{
            width: scaleSzie(12),
            height: scaleSzie(22)
          }}
        />
        {this.props.isLoadingGetListNoti ? (
          <PlaceHolderList />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.listNotifications.data}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => (
              <ItemNoti
                gotoDetail={() => this.gotoDetail(item)}
                dataNoti={item}
              />
            )}
            onRefresh={this.refreshList}
            refreshing={this.state.isRefresh}
            ListEmptyComponent={() => (
              <EmptyList text={"Không có thông báo nào"} />
            )}
            ListFooterComponent={() =>
              this.state.showLoad && (
                <View
                  style={{
                    width: width - 40,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )
            }
            initialNumToRender={5}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.01}
          />
        )}
      </View>
    );
  }
}

export default index;
