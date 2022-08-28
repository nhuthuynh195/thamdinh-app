'use strict';

import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native';
import Picker from 'react-native-wheel-picker'

import { scaleSzie } from '@core/utils/func'
import Modal from "./ModalCustom"

const { width } = Dimensions.get('window');
const PickerItem = Picker.Item;

export default class PickerDropdown extends Component {

    render() {
        const { visible, onRequestClose,
            heightPicker, title, data, selectedValue, onValueChange
        } = this.props;
        const height = heightPicker && heightPicker || scaleSzie(300);
        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={() => onRequestClose()}
                animationType={this.props.animationType || 'none'}
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                <View style={{ width, height, backgroundColor: '#5F5EA3' }} >
                    <View style={{ alignItems: "center", paddingVertical: scaleSzie(12), }} >
                        <Text style={{ fontSize: scaleSzie(24), color: '#ffffff', fontWeight: '500' }} >
                            {title}
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1, }} >
                        <Picker style={{ flex: 1 }}
                            selectedValue={selectedValue}
                            itemStyle={{ color: '#ffffff', fontSize: scaleSzie(22) }}
                            onValueChange={(index) => onValueChange(index)}>
                            {
                                data.map((value, i) => (
                                    <PickerItem label={value} value={i} key={"money" + value} />
                                ))
                            }
                        </Picker>
                    </TouchableOpacity>

                </View>
            </Modal>
        );
    }

}

