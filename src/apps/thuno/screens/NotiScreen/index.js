import NotiLayout from "@core/screens/LayoutNoti";
import connectRedux from "../../redux/connectRedux";

class LayoutNoti extends NotiLayout {
  constructor(props) {
    super(props);

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

  componentDidMount() {
    this._getList();
  }

  backHome = () => {
    this.props.navigation.goBack();
  };

  gotoDetail(id) {
    let body = {
      id: id.id
    };
    this.props.actions.noti.readNoti(body);
    this.props.navigation.navigate("Detail", { id: id.link_contract_id });
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
    this.props.actions.noti.getNotificationHistory(this.state.page);
  }

  refreshList() {
    this.setState({ isRefresh: true, page: 1, showLoad: true });
    this.props.actions.noti.getNotificationHistory(1);
  }
}

const mapStateToProps = state => ({
  listNotifications: state.noti.listNotifications
});

export default connectRedux(mapStateToProps, LayoutNoti);
