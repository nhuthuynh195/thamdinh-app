import React from "react";
import { View, FlatList } from "react-native";
import { ItemListThuNo, EmptyList } from "../../../components";

import connectRedux from "../../../../apps/thuno/redux/connectRedux";
import { scaleSzie } from "@core/utils/func";

class ListLoansCollectionSearch extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { listLoansUnCollectedSearch } = this.props;
    return (
      <FlatList
        data={listLoansUnCollectedSearch}
        renderItem={({ item, index }) => (
          <ItemListThuNo
            item={item}
            index={index}
            onPress={() => this.props.gotoDetail(item.contract_id)}
            callPhone={phone => this.props.showPopupPhone(phone)}
            gotoMap={() => this.props.gotoMap(item)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        getItemLayout={(data, index) => ({
          length: scaleSzie(155),
          offset: scaleSzie(155) * index,
          index
        })}
        ListEmptyComponent={
          <EmptyList text={"Không có kết quả tìm kiếm ..."} />
        }
        initialNumToRender={5}
        ListFooterComponent={() => <View style={{ height: scaleSzie(40) }} />}
        ListHeaderComponent={() => <View style={{ height: scaleSzie(2) }} />}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    yourLocation: state.map.yourLocation,
    listLoansUnCollectedSearch: state.loans.listLoansUnCollectedSearch
  };
};

export default connectRedux(mapStateToProps, ListLoansCollectionSearch);
