import Layout from "./layout";
import connectRedux from "../../redux/connectRedux";
import { createStructuredSelector } from "reselect";
import { Animated, Linking, PixelRatio } from "react-native";
import ImagePicker from "react-native-image-picker";
import { makeReadLimitList } from "./selectors";
import { filterSymbol } from "@utils/func";
import _ from "lodash";

const options = {
  title: "Select Image",
  storageOptions: {
    skipBackup: true,
    path: "images"
  },
  quality: 1,
  maxWidth: PixelRatio.getPixelSizeForLayoutSize(1280), // photos only
  maxHeight: PixelRatio.getPixelSizeForLayoutSize(720) // photos only
};
class UploadReceiptScreen extends Layout {
  constructor(props) {
    super(props);
    this.state = {
      OrgSelect: {},
      listOrg: this.props.readLimitList.organizations,
      indexStatusSelect: 1,
      visiblePickerOrg: false,
      isModalError: false,
      uploadSuccess: false,
      isModalCallManger: false,
      arrayImage: []
    };
  }

  componentDidMount() {
    let currentId = this.props.readLimitList.highest_organization;
    let currentOrg = this.props.readLimitList.organizations.filter(
      item => item.id == currentId
    );

    this.setState({ OrgSelect: currentOrg[0] });
  }

  changeStatusModalError = () => {
    this.setState({ isModalError: !this.state.isModalError });
  };

  changeStatusCallManger = () => {
    this.setState({ isModalCallManger: !this.state.isModalCallManger });
  };

  UploadReceipt = () => {
    if (this.state.arrayImage.length == 0) {
      alert("Vui lòng chọn hình biên nhận để tải lên");
    } else {
      let body = {
        organization_id: this.state.OrgSelect.id
      };
      this.props.actions.loans.uploadBankReceipt(body, this.state.arrayImage);
    }
  };

  backToRoot = () => {
    this.props.navigation.popToTop();
  };

  selectItemOrg = item => {
    this.setState({
      OrgSelect: item,
      visiblePickerOrg: false
    });
  };

  search(text) {
    const originalData = this.props.readLimitList.organizations.slice();
    const filterText = filterSymbol(text);
    const patt = new RegExp(filterText);

    const newData = [];
    for (const key in originalData) {
      const name = filterSymbol(originalData[key].name);
      if (patt.test(name)) {
        newData.push(originalData[key]);
      }
    }
    this.setState({
      listOrg: newData
    });
  }

  selectImage = () => {
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        let arrTemp = [...this.state.arrayImage];
        arrTemp.push(response);
        this.setState({ arrayImage: arrTemp });
      }
    });
  };

  deleteImage = index => {
    let arr = this.state.arrayImage.slice();
    arr.splice(index, 1);
    this.setState({ arrayImage: arr });
  };
}

const mapStateToProps = createStructuredSelector({
  readLimitList: makeReadLimitList()
});

export default connectRedux(mapStateToProps, UploadReceiptScreen);
