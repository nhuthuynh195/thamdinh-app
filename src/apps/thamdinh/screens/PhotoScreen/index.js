import _ from 'ramda';

import Layout from './layout';
import { getPosotion, showAlertTurnOnLocation } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class PhotoScreen extends Layout {
  constructor(props) {
    super(props);
    const { photos } = this.props;
    this.state = {
      imageSelected: [],
      displayImage: 0,
      photos: photos,
      isSelectAll: false,
      activeSection: [],
      activeSectionIndetityCard: [],
      citizenship: [],
      visibleDropdownUpload: false
    };
    this.goback = this.goback.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.displayPhoto = this.displayPhoto.bind(this);
  }

  selectPhoto = (url) => {

    const { photos } = this.state;
    const photosSelected = (this.getArrayPhotoSelected(photos)).length;
    const temptPhotos = _.clone(photos);
    let isAdd = true;
    for (let i = 0; i < temptPhotos.length; i++) {
      if (temptPhotos[i].uri === url) {
        isAdd = temptPhotos[i].isSelected;
        temptPhotos[i].isSelected = !temptPhotos[i].isSelected;
        break;
      }
    }
    if (isAdd) {
      this.setState({
        photos: temptPhotos
      })
    } else {
      if (photosSelected < 3) {
        this.setState({
          photos: temptPhotos
        })
      } else {
        alert('Chỉ đăng tối đa 3 tấm 1 lần !')
      }
    }


  }

  getArrayPhotoSelected(photos = []) {
    return photos.filter(photo => photo.isSelected);
  }

  goback() {
    this.props.backCameraModal();
  }

  addPhoto(url) {

    let temptimageSelected = [...this.state.imageSelected];
    temptimageSelected.push({ uri: url })
    this.setState({
      imageSelected: temptimageSelected
    })

  }

  deletePhoto = () => {
    const { photos } = this.state;
    const temptPhoto = photos.filter(photo => !photo.isSelected);
    this.setState({
      photos: temptPhoto
    })
  }

  displayPhoto(url) {
    const indexDisplay = _.findIndex(_.propEq('uri', url))(this.state.photos);
    this.setState({
      displayImage: indexDisplay,
    })
  }

  showDropDownUpload = () => {
    const { photos } = this.state;
    const photosSelected = photos.filter(photo => photo.isSelected);
    if (photosSelected.length === 0) {
      alert('Vui lòng chọn ảnh để upload!')
    } else {
      this.setState({
        visibleDropdownUpload: true
      })
    }

  }

  checkTypeChildren(section) {
    if (section.type === 'identityCard') {
      return this.state.activeSectionIndetityCard
    }
    return this.state.citizenship
  }

  updateSections = activeSection => {
    this.setState({
      activeSection,
      citizenship: [],
      activeSectionIndetityCard: []
    })
  }
  updateSectionsGrandChildrend(activeSection, section) {
    if (section.type === 'identityCard') {
      this.setState({
        activeSectionIndetityCard: activeSection,
      })
    } else {
      this.setState({
        citizenship: activeSection,
      })
    }
  }

  selectAllPhotos = async () => {
    const { photos } = this.state;
    await this.setState(prevState => ({
      isSelectAll: !prevState.isSelectAll
    }))
    const temptPhotos = [];
    for (let i = 0; i < photos.length; i++) {
      temptPhotos.push({ ...photos[i], isSelected: this.state.isSelectAll });
    }
    this.setState({
      photos: temptPhotos
    })
  }


  async uploadPhoto(key) {
    try {
      const { photos } = this.state;
      const { clientDetail } = this.props;
      const { id, person_id } = clientDetail;
      const photosSelected = photos.filter(photo => photo.isSelected);
      const position = await getPosotion();
      this.props.actions.upload.uploadPhoto(photosSelected, key, person_id, id, position.coords.longitude, position.coords.latitude, true);
      await this.setState({
        visibleDropdownUpload: false
      })
    } catch (error) {
      showAlertTurnOnLocation();
    }
  }

}

const mapStateToProps = state => ({
  clientDetail: state.client.clientDetail,
  loading: state.app.loading
})

export default connectRedux(mapStateToProps, PhotoScreen);
