'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { scaleSzie } from '@core/utils/func'
import { ModalCustom, Button } from "@core/components"

const { width } = Dimensions.get('window');

export default class Dropdown extends Component {

    render() {
        const { visible, onRequestClose,
            heightPicker,
        } = this.props;
        const height = heightPicker && heightPicker || scaleSzie(141);
        return (
            <ModalCustom
                transparent={true}
                visible={visible}
                onRequestClose={() => onRequestClose()}
                animationType={this.props.animationType || 'none'}
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    paddingRight: scaleSzie(20),
                    paddingTop: scaleSzie(235),
                }}
            >
                <View style={{ width: scaleSzie(149), height, backgroundColor: '#ffffff', borderRadius: scaleSzie(4) }} >
                    {
                        ["Đang thẩm", "Duyệt", "Từ chối"].map((item, index) => <ItemDropDown
                            key={index}
                            title={item}
                            index={index}
                            selectDropDown={() => this.props.selectDropDown(index + 1)}
                        />)
                    }
                </View>
            </ModalCustom>
        );
    }

}


const ItemDropDown = ({ title, selectDropDown, index }) => {
    return (
        <Button onPress={() => selectDropDown()} style={[{
            flex: 1, justifyContent: 'center', alignItems: 'center',
        }, index !== 0 ? { borderTopColor: '#F0F0F0', borderTopWidth: 1 } : {}]} >
            <Text style={{ color: "#6D6D6D", fontWeight: '600', fontSize: scaleSzie(14) }} >
                {title}
            </Text>
        </Button>
    );
}

