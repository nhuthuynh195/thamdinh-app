import React from 'react';
import { PixelRatio } from 'react-native'
import ImageResizer from 'react-native-image-resizer';

import LayoutCamera from '@core/screens/LayoutCamera';
import { deleteAllPhoto, deleteFileUpload } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class CameraScreen extends LayoutCamera {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            loadingTakePhoto: false,
            visibleWarningModal: false,
            zoom: 0
        }
        this.backDetail = this.backDetail.bind(this);
        this.gotoPhotoScreen = this.gotoPhotoScreen.bind(this);
    }

    deleteAllPhoto() {
        deleteAllPhoto(this.state.photos);
    }

    exitCameraAndRemovePhotos = async () => {
        // this.props.onRequestCloseModalTakePhoto();
        await this.setState({
            visibleWarningModal: false
        });
        this.deleteAllPhoto();
        this.props.onRequestCloseModalTakePhoto();
    }

    backDetail = async () => {
        const { photos } = this.state;
        if (photos.length > 0) {
            await this.setState({
                visibleWarningModal: true
            })
        } else {
            this.props.onRequestCloseModalTakePhoto();
        }
    }

    gotoPhotoScreen() {
        this.props.showModalUploadImage(this.state.photos);
        // this.props.navigation.navigate('Photo', {
        //     photos: this.state.photos
        // });
    }

    optimizePhoto = async (uri,uriOriginal) => {
        let temptPhoto = [...this.state.photos];
        temptPhoto.push({ uri: uri });
        await this.setState({
            photos: temptPhoto,
            loadingTakePhoto: false
        });
        deleteFileUpload(uriOriginal);
    }

    async  takePicture(camera) {
        try {
            await this.setState({
                loadingTakePhoto: true
            })
            const options = {
                quality: 1,
                base64: false,
                skipProcessing: true,
                forceUpOrientation: true,
                fixOrientation: true,
                orientation: "portrait"
            };
            const data = await camera.takePictureAsync(options);

            ImageResizer.createResizedImage(data.uri, 600, 600, 'JPEG', 100)
                .then(({ uri }) => {
                    this.optimizePhoto(uri,data.uri);
                })
                .catch(err => {
                     this.setState({
                        loadingTakePhoto: false
                    })
                    // console.log("-----error ,",err);
                });
        } catch (error) {
            await this.setState({
                loadingTakePhoto: false
            })
            // console.log(error);
        }

    }

    zoomIn = () => {
        this.setState({
            zoom: 0
        })
    }

    zoomOut = () => {
        this.setState({
            zoom: 1
        })
    }

}

const mapStateToProps = state => ({

})

export default connectRedux(mapStateToProps, CameraScreen);



