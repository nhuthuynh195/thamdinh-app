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

class ItemEditNote extends React.PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        const { editNotes, title, value } = this.props;

        return (
            <View>
                <View style={{ flexDirection: "row" }} >
                    <Text style={{
                        fontSize: scaleSzie(12), color: styleConfigs.PURPLE_COLOR,
                        fontWeight: "bold", width: scaleSzie(140),
                    }} >
                        {title}
                    </Text>
                    <TouchableOpacity onPress={() => editNotes()} >
                        <Text style={{
                            fontSize: scaleSzie(12), color: "red",
                            fontWeight: "bold", textDecorationLine: 'underline'
                        }} >
                            {`( Chỉnh sửa )`}
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* ----------- Value ---------- */}
                <View style={{marginTop:scaleSzie(5)}} >
                    <Text numberOfLines={3} style={{ fontSize: scaleSzie(12), color: "#868686" }} >
                        {value}
                    </Text>
                </View>
            </View>
        );
    }


}


export default ItemEditNote;


