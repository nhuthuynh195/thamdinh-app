import React from 'react';
import { View, Modal, Dimensions, TouchableOpacity, Text } from 'react-native';
import ModalCustom from 'react-native-modal';
import { scaleSzie, checkAllArrayIsNotEmpty } from '@utils/func';
const { width } = Dimensions.get('window');
export default class ModalContent extends React.Component {
  render() {
    const { isVisible, children, onSwipe, scrollTo, scrollOffset, visibleModalTakePhoto,
      visibleModalUpload, onRequestCloseModalTakePhoto, onRequestCloseModalUpload,
      visibleModalReviewPhotos, onRequestCloseModalReviewPhotos,swipeDirection
    } = this.props;
    return (
      <ModalCustom
        isVisible={isVisible}
        onSwipe={onSwipe}
        swipeDirection={swipeDirection}
        swipeThreshold={0}
        scrollTo={scrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={400 - 300}
        style={{
          justifyContent: 'flex-end',
          margin: 0
        }}
        propagateSwipe={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            marginTop: scaleSzie(65),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden'
          }}
        >
          {children}
          {/* ------- Modal Picker -------- */}
          <Modal
            transparent={true}
            visible={this.props.phi}
            onRequestClose={() => { }}
          >
            {this.props.renderPickerMaKD()}
          </Modal>

          {/* ------- Modal Take Photo -------- */}
          <Modal
            transparent={false}
            visible={visibleModalTakePhoto}
            onRequestClose={() => { }}
          >
            {this.props.takePhotoComponent()}

            {/* ------- Modal Upload Photo -------- */}
            <Modal
              transparent={false}
              visible={visibleModalUpload}
              onRequestClose={() => onRequestCloseModalUpload()}
            >
              {this.props.uploadImageComponent()}
            </Modal>


          </Modal>


          {/* --------- Modal Reivew Photo ------ */}
          <Modal
            transparent={false}
            visible={visibleModalReviewPhotos}
            onRequestClose={() => onRequestCloseModalReviewPhotos()}
          >
            {this.props.reviewPhotoComponent()}
          </Modal>


        </View>


      </ModalCustom>
    );
  }
}
