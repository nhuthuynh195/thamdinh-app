import React from "react";

import SearchPage from "@core/screens/LayoutSearch";
import connectRedux from "../../redux/connectRedux";
import { getPosotion } from "@core/utils/func";
import { createStructuredSelector } from "reselect";
import CallPhone from "@core/utils/callPhone";
import _ from "ramda";

import {
  makeSortListLoansSearch,
  makeSortListLoansCollectionSearch,
  makeGetLocation,
  makeListLoansUnCollectedSearch
} from "./selectors";

class SearchScreen extends SearchPage {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
      visible: false,
      currentTab: 0,
      phonePopUp: "",
      visiblePopUpPhone: false
    };
    this.clickChangePass = this.clickChangePass.bind(this);
    this.backHome = this.backHome.bind(this);
    this.sortModalRef = React.createRef();
  }

  clickChangePass = () => {
    this.props.navigation.navigate("Home");
  };

  backHome() {
    this.props.navigation.goBack();
  }

  onRequestClose = () => {
    this.setState({
      visible: false
    });
  };

  selectCondiSort = sort => {
    this.setState({
      sort
    });
  };

  onChangeTab = currentTab => {
    if (currentTab.i === 0) {
      const { listLoansCollectionSearch } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...listLoansCollectionSearch },
        "ListLoansCollectionSearch"
      );
    } else {
      const { listLoansSearch } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...listLoansSearch },
        "ListLoansSearch"
      );
    }
    this.setState({ currentTab: currentTab.i });
  };

  showModalSort = () => {
    if (this.state.currentTab === 0) {
      const { listLoansSearch } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...listLoansSearch },
        "ListLoansSearch"
      );
    } else {
      const { listLoansCollectionSearch } = this.props;
      this.sortModalRef.current.setConditionSortFromParent(
        { ...listLoansCollectionSearch },
        "ListLoansCollectionSearch"
      );
    }
    this.setState({
      visible: true
    });
  };

  gotoDetail = id => {
    this.props.navigation.navigate("Detail", { id: id });
  };

  sortUserByConditon = () => {
    const conditionSort = this.sortModalRef.current.state.sort;
    const typeUserSort = this.sortModalRef.current.state.typeUserSort;
    const { listLoansSearch, listLoansCollectionSearch } = this.props;
    const { latitude, longitude } = this.props.yourLocation;
    const { textSearch } = this.state;
    if (textSearch.length > 0) {
      if (typeUserSort === "ListLoansCollectionSearch") {
        this.props.actions.loans.getListLoansUnCollectedSearch(
          latitude,
          longitude,
          conditionSort,
          textSearch
        );
        if (conditionSort.title !== listLoansCollectionSearch.title) {
          this.props.actions.loans.updateConditionSortListLoansCollectionSearch(
            conditionSort
          );
        }
      } else {
        this.props.actions.loans.getListLoansSearch(
          latitude,
          longitude,
          conditionSort,
          textSearch
        );
        if (conditionSort.title !== listLoansSearch.title) {
          this.props.actions.loans.updateConditionSortListLoansSearch(
            conditionSort
          );
        }
      }
    } else {
      alert("Vui lòng nhập tên khách hàng cần tìm kiếm !");
    }
  };

  gotoMapItem = user => {
    if (this.state.currentTab == 1) {
      Alert.alert(
        "Thông báo",
        "Chức năng này không có trong màn hình đã thu !",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate("Map", {
        indexClientLocation: _.findIndex(
          _.propEq("contract_id", user.contract_id)
        )(this.filterLocationNotNull(this.props.listLoansUnCollectedSearch))
      });
    }
  };

  filterLocationNotNull(data) {
    return data.filter(item => item.distance_measured !== 0);
  }

  showPopupPhone = phone => {
    this.setState({
      phonePopUp: phone,
      visiblePopUpPhone: !this.state.visiblePopUpPhone
    });
  };

  callPhone = () => {
    const args = {
      number: this.state.phonePopUp,
      prompt: false
    };
    CallPhone(args)
      .then(this.hidePopupCall)
      .catch(console.error);
  };

  componentWillUnmount() {
    this.props.actions.loans.clearSearch();
  }
}

const mapStateToProps = createStructuredSelector({
  yourLocation: makeGetLocation(),
  listLoansSearch: makeSortListLoansSearch(),
  listLoansCollectionSearch: makeSortListLoansCollectionSearch(),
  listLoansUnCollectedSearch: makeListLoansUnCollectedSearch()
});

export default connectRedux(mapStateToProps, SearchScreen);
