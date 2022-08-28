import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native';
import _ from 'ramda';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

import { scaleSzie, formatDay, formatTime } from '@core/utils/func';
import styleConfigs from '@core/configs/style';
import Configs from '@core/configs';
import IMAGE from '@core/resources/icon';
import { Button, Text } from '@core/components';
import commonStyles from '@core/commonStyles';
import connectRedux from '../redux/connectRedux';

class ReviewAvatar extends React.PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        const { visible, onRequestClose, images } = this.props
        return (
            <Modal
                transparent={false}
                visible={visible}
                onRequestClose={() => onRequestClose()}
            >
                <View style={{ flex: 1, backgroundColor: 'black' }} >
                    <ImageViewer imageUrls={images} />

                    {/* ------- Button Back ------- */}
                    <TouchableOpacity
                        onPress={() => onRequestClose()}
                        style={{
                            position: 'absolute', top: scaleSzie(40), left: scaleSzie(22),
                            width: 50, height: 50
                        }} >
                        <Image
                            source={IMAGE.back}
                            // style={styles.iconBack}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }


}

const mapStateTpProps = state => {
    return {
        listBusinessEvaluate: state.app.listBusinessEvaluate,
        listPropertyEvaluate: state.app.listPropertyEvaluate,
        callableBusiness: state.app.callableBusiness,
        callabProperty: state.app.callabProperty
    }
}

export default connectRedux(mapStateTpProps, ReviewAvatar);


const styles = StyleSheet.create({
    parentContainer: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(185),
        paddingHorizontal: scaleSzie(12),
        marginBottom: scaleSzie(12)
    },
    containerChild: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: scaleSzie(4),
        padding: scaleSzie(12),
    },
    container: {
        flex: 1,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    userTime: {
        height: scaleSzie(30),
        flexDirection: 'row'
    },
    userInfoContent: {
        flex: 1,
    },
    avatarContainer: {
        width: scaleSzie(70),
        paddingTop: scaleSzie(6)
    }
})