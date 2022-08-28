import LayoutNotification from "@core/screens/LayoutNoti";

import connectRedux from "../../redux/connectRedux";

class NotificationScreen extends LayoutNotification {
  constructor(props) {
    super(props);
    this.backHome = this.backHome.bind(this);
    this.state = {
      isRefresh: false,
      page: 1,
      showLoad: true
    };

    this.backHome = this.backHome.bind(this);
    this.gotoDetail = this.gotoDetail.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.listNotifications.data.length == 0 && state.showLoad == true) {
      return {
        showLoad: false
      };
    }
  }

  componentDidMount() {
    this._getList();
  }

  backHome() {
    this.props.navigation.goBack();
  }

  gotoDetail(noti) {
    const temptTypeClient = noti.evaluate_type === 'property' ? 'property_evaluate' : 'business_evaluate';
    this.props.actions.noti.readNoti({ id: noti.id });
    if (temptTypeClient === 'business_evaluate') {
      this.props.navigation.navigate('UserDetail', {
        typeUser: 'Business',
        clientTitleHeader: '',
        clientId: noti.link_contract_id,
        clientype: temptTypeClient
      });
    } else {
      this.props.navigation.navigate('UserDetail1', {
        typeUser: 'Property',
        clientTitleHeader: '',
        clientId: noti.link_contract_id,
        clientype: temptTypeClient
      });
    }
  }

  loadMore() {
    if (
      this.props.listNotifications.current_page >
      this.props.listNotifications.total_count /
      this.props.listNotifications.per_page
    ) {
      this.setState({ showLoad: false });
      return;
    } else {
      this.setState({ page: this.state.page + 1 }, () => this._getList());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.listNotifications !== prevProps.listNotifications) {
      this.setState({ isRefresh: false });
    }
  }

  async _getList() {
    this.props.actions.noti.getNotificationHistoryEvaluate(this.state.page);
  }

  refreshList() {
    this.setState({ isRefresh: true, page: 1, showLoad: true });
    this.props.actions.noti.getNotificationHistoryEvaluate(1);
  }

  componentWillUnmount() {
    this.props.actions.noti.getNumberNotiUnRead();
  }

}

const mapStateToProps = state => ({
  isLoadingGetListNoti: state.noti.isLoadingGetListNoti,
  listNotifications: state.noti.listNotifications
});

export default connectRedux(mapStateToProps, NotificationScreen);
