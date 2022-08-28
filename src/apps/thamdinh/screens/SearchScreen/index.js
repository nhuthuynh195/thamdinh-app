import React from 'react';

import Layout from './layout';
import connectRedux from '../../redux/connectRedux';
import CallPhone from '@core/utils/callPhone';

class SearchScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      visibleSort: false,
      currentTab: 0,
      visiblePopUpPhone: false,
      phone: ""
    };

    this.sortModalRef = React.createRef();

  }

  componentDidMount() {
  }

  callPhone() {
    const args = {
      number: this.state.phone,
      prompt: false
    }
    CallPhone(args)
      .then(this.hidePopupCall)
      .catch(console.error)
  }

  hidePopupCall = () => {
    this.setState({
      visiblePopUpPhone: false
    })
  }

  showModalSort = () => {
    // console.log(this.state.currentTab)
    // if (this.state.currentTab === 0) {
    //   const { sortBusinessEvaluateSearch } = this.props;
    //   this.sortModalRef.current.setConditionSortFromParent({ ...sortBusinessEvaluateSearch }, 'Business');
    // } else {
    //   const { sortPropertyEvaluateSearch } = this.props;
    //   this.sortModalRef.current.setConditionSortFromParent({ ...sortPropertyEvaluateSearch }, 'Property');
    // }
    this.setState({
      visibleSort: true
    });
  }

  clickChangePass = () => {
    this.props.navigation.navigate('Home');
  };

  backHome = () => {
    this.props.navigation.goBack();
  }

  selectCondiSort = (sort) => {
    this.setState({
      sort
    });
  }

  onChangeTab = (currentTab) => {
    // console.log(currentTab.i)
    if (currentTab.i === 0) {
      const { sortBusinessEvaluateSearch } = this.props;
      // console.log(JSON.stringify(sortBusinessEvaluateSearch))
      this.sortModalRef.current.setConditionSortFromParent({ ...sortBusinessEvaluateSearch }, 'Business');
    } else {
      const { sortPropertyEvaluateSearch } = this.props;
      // console.log(JSON.stringify(sortPropertyEvaluateSearch))
      this.sortModalRef.current.setConditionSortFromParent({ ...sortPropertyEvaluateSearch }, 'Property');
    }
    this.setState({ currentTab: currentTab.i })
  }

  onRequestClose = () => {
    this.setState({
      visibleSort: false
    });
  }

  sortUserByConditon = () => {
    const conditionSort = this.sortModalRef.current.state.sort;
    const typeUserSort = this.sortModalRef.current.state.typeUserSort;
    const { sortBusinessEvaluateSearch, sortPropertyEvaluateSearch } = this.props;
    const { latitude, longitude } = this.props.yourLocation;
    const { textSearch } = this.state;
    if (textSearch.length > 0) {
      if (typeUserSort === 'Business') {
        this.props.actions.app.getListBusinessEvaluateSearch(latitude, longitude, conditionSort, textSearch);
        if (conditionSort.title !== sortBusinessEvaluateSearch.title) {
          this.props.actions.app.updateConditionSortBusinessEvaluteSearch(conditionSort);
        }
      } else {
        this.props.actions.app.getListPropertyEvaluateSearch(latitude, longitude, conditionSort, textSearch);
        if (conditionSort.title !== sortPropertyEvaluateSearch.title) {
          this.props.actions.app.updateConditionSortPropertyEvaluteSearch(conditionSort);

        }
      }
    } else {
      alert('Vui lòng nhập tên nhân viên cần tìm kiếm !')
    }

  }

  componentWillUnmount() {
    this.props.actions.app.resetStateSearch();
  }


}

const mapStateToProps = state => {
  return {
    sortBusinessEvaluateSearch: state.app.sortBusinessEvaluateSearch,
    sortPropertyEvaluateSearch: state.app.sortPropertyEvaluateSearch,
    yourLocation: state.map.yourLocation,
    listBusinessEvaluateSearch: state.app.listBusinessEvaluateSearch,
    isLoadingGetListBusinessEvaluateSearch: state.app.isLoadingGetListBusinessEvaluateSearch,
    isLoadingGetListPropertyEvaluateSearch: state.app.isLoadingGetListPropertyEvaluateSearch,
    listPropertyEvaluateSearch: state.app.listPropertyEvaluateSearch
  };
};

export default connectRedux(mapStateToProps, SearchScreen);

