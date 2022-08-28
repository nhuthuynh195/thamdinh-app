import React from 'react';
import { View, Dimensions, TouchableOpacity, Image ,Text} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';

import styles from './styles';
import { Button, ModalCustom, ButtonSubmit } from '@core/components';
import styleConfigs from '@configs/style';
import { scaleSzie, checkAllArrayIsNotEmpty } from '@utils/func';
import IMAGE from '@resources/icon';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window');

export default class Layout extends React.Component {
  render() {
    const { photosReview } = this.props;
    const {indexSelectImage}=this.state;
    const timeCreatedAt = moment(photosReview[indexSelectImage].created_at).format('DD/MM/YYYY h:mm A')
    return (
      <View style={styles.container}>
        <ImageViewer
          imageUrls={photosReview}
          index={indexSelectImage}
          onChange={(index)=>this.setState({indexSelectImage:index})}
        />


        {/* ------- Button Back ------- */}
        <TouchableOpacity
          onPress={() => this.props.backToTab()}
          style={{
            position: 'absolute', top: scaleSzie(40), left: scaleSzie(22),
            width: 50, height: 50
          }} >
          <Image
            source={IMAGE.back}
            style={styles.iconBack}
          />
        </TouchableOpacity>

        {/* ------------- Time --------- */}
        <View style={{
          position: 'absolute', bottom: scaleSzie(70), right: scaleSzie(22),
        }} >
            <Text style={{color:'#fff',fontSize:scaleSzie(20),fontWeight:'600'}} >
              {`${timeCreatedAt}`}
            </Text>
        </View>


      </View>
    );
  }

}


