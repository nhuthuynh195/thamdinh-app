import React from 'react';
import {
  View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator,
  Slider
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import styles from './styles';
import { Button, ModalCustom, ButtonSubmit, ZoomView } from '../../components';
import styleConfigs from '@configs/style';
import { scaleSzie, checkAllArrayIsNotEmpty } from '@utils/func';
import IMAGE from '@resources/icon';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window');

export default class LayoutCamera extends React.Component {

  renderModalLoading() {
    if (this.state.loadingTakePhoto) {
      return (
        <ModalCustom
          transparent={true}
          visible={true}
          onRequestClose={() => { }}
        >
          <ActivityIndicator
            color="#fff"
            size="large"
          />
        </ModalCustom>
      );
    }
    return <View />
  }

  render() {
    const { photos } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          // flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          zoom={this.state.zoom}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 1, }} >
                <View style={{ flex: 1 }} >
                  <TouchableOpacity onPress={this.backDetail} style={styles.containerButtonBack}  >
                    <Image
                      source={IMAGE.back}
                      style={styles.iconBack}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}} >
                  <Text style={{color:'#fff',fontSize:scaleSzie(12),fontWeight:'bold'}}> 
                  Thu nhỏ
                  </Text>
                  <Slider
                    style={{ width: scaleSzie(200), height: scaleSzie(40) }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={zoom => this.setState({ zoom })}
                  />
                   <Text style={{color:'#fff',fontSize:scaleSzie(12),fontWeight:'bold'}}> 
                   Phóng to 
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', }} >
                  <View style={{ flex: 1 }} />
                  {/* ============ Button Take Photo ============= */}
                  <View style={styles.containerTakePhoto}>
                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>

                    </TouchableOpacity>
                  </View>
                  {/* ========== Image Photo ================== */}
                  <View style={{ flex: 1, paddingTop: scaleSzie(10) }} >
                    {
                      photos.length > 0 ? <TouchableOpacity onPress={this.gotoPhotoScreen} style={{ width: scaleSzie(35), height: scaleSzie(45), marginLeft: scaleSzie(65) }}  >
                        <Image
                          source={IMAGE.showPhoto}
                          style={{
                            width: scaleSzie(50), height: scaleSzie(50)
                          }}
                        />
                      </TouchableOpacity> : <View />
                    }

                  </View>

                </View>

              </View>

            );
          }}
        </RNCamera>
        {this.renderModalLoading()}
        <PopupConfirmReivew
          visible={this.state.visibleWarningModal}
          confirmAssesment={this.exitCameraAndRemovePhotos}
          closePopupConfirm={() => this.setState({ visibleWarningModal: false })}
        />
      </View>
    );
  }

}

const PopupConfirmReivew = (props) => {
  const { visible } = props;
  return <ModalCustom
    transparent={true}
    visible={visible}
    onRequestClose={() => props.closePopupConfirm()}
  >
    <View style={styles.containerPopup} >
      <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: scaleSzie(4) }} >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          <Text style={{ color: '#424242', fontSize: scaleSzie(16), fontWeight: '600', }} >
            Nếu quay lại tất cả hình chụp sẽ mất hết
              </Text>
          <Text style={{ color: '#424242', fontSize: scaleSzie(16), fontWeight: '600' }} >
            Bạn muốn thoát ra ?
              </Text>
        </View>
        <View style={styles.containerButtonPopup} >
          <ButtonSubmit
            title="Huỷ"
            backgroundButton="#ffffff"
            styleButton={{ flex: 1, }}
            borderButtonColor={styleConfigs.PURPLE_COLOR}
            titleColor={styleConfigs.PURPLE_COLOR}
            onPress={() => props.closePopupConfirm()}
          />
          <View style={{ width: scaleSzie(12) }} />
          <ButtonSubmit
            title="Xác nhận"
            backgroundButton={styleConfigs.PURPLE_COLOR}
            styleButton={{ flex: 1, }}
            borderButtonColor={styleConfigs.PURPLE_COLOR}
            titleColor={'#ffffff'}
            onPress={() => props.confirmAssesment()}
          />
        </View>
      </View>
    </View>
  </ModalCustom>
}


const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);