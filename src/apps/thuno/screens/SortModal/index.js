import { PanResponder } from "react-native";

import LayoutSortModal from "@core/screens/LayoutSortModal";

class SortModal extends LayoutSortModal {
  constructor(props) {
    super(props);

    this.state = {
      sort: {
        title: "Sớm nhất",
        sort: "average_pay_time",
        direction: "asc"
      },
      typeUserSort: "ListLoansCollectionSearch"
    };

    this.onRequestClose = this.onRequestClose.bind(this);
    this.sortUserByConditon = this.sortUserByConditon.bind(this);
  }
  componentDidMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (evt.nativeEvent.locationX === evt.nativeEvent.pageX) {
          this.props.onRequestClose();
        }
      }
    });
  }

  setConditionSortFromParent(sort, typeUserSort) {
    this.setState({
      sort,
      typeUserSort
    });
  }

  selectCondiSort(sort) {
    this.setState({
      sort
    });
  }

  onRequestClose() {
    this.props.onRequestClose();
  }

  sortUserByConditon() {
    this.onRequestClose();
    this.props.sortUserByConditon();
  }
}

export default SortModal;
