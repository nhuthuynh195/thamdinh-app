'use strict';

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform,
    TextInput,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Keyboard
} from 'react-native';

import { Button, ModalCustom, Text, ButtonSubmit } from '@core/components';
import { scaleSzie, removeAccent, getKeyOfObject, getValueOfObject } from '@core/utils/func';
import Configs from '@core/configs';
import styleConfigs from '@configs/style';
import IMAGE from '@core/resources/icon';
// import Util from '../utils';

const { width, height } = Dimensions.get('window');

class EditNoteModal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            keyNote: "",
            valueNote: "",
            titleNote: ""
        }
    }

    setStateFromParent = async (keyNote, valueNote, titleNote) => {
        await this.setState({
            visible: true,
            keyNote,
            valueNote,
            titleNote
        })
    }

    cancelEdit = async () => {
        await this.setState({
            visible: false
        })
    }

    saveNote = async () => {
        const { keyNote, valueNote } = this.state;
        this.props.saveNote(keyNote, valueNote);
        await this.setState({
            visible: false
        })
    }

    render() {
        const { visible, valueNote, titleNote } = this.state;
        return (
            <ModalCustom
                transparent={true}
                visible={visible}
                animationType="none"
                onRequestClose={() => Keyboard.dismiss()}
                style={{
                    justifyContent: 'flex-start',
                    paddingTop: scaleSzie(40)
                }}
            >
                <View style={{
                    width: Configs.FULL_WIDTH - 40, height: scaleSzie(400),
                    backgroundColor: '#fff', 
                    // borderRadius: scaleSzie(4)
                }} >
                    {/* ------------- Header ------------ */}
                    <View style={{
                        height: scaleSzie(40),
                        flexDirection: "row"
                    }} >
                        <View style={{ width: scaleSzie(60) }} />

                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}  >
                            <Text style={{ fontSize: scaleSzie(18), color: styleConfigs.PURPLE_COLOR, fontWeight: "bold" }} >
                                {titleNote}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.cancelEdit} style={{ width: scaleSzie(60), justifyContent: "flex-end", alignItems: "center" }} >
                            <Text style={{ fontSize: scaleSzie(18), color: "red", fontWeight: "bold", textDecorationLine: 'underline' }} >
                                Huỷ
                        </Text>
                        </TouchableOpacity>
                    </View>
                    {/* ------------- Body ------------ */}
                    <View style={{
                        height: scaleSzie(315),
                        padding: scaleSzie(10)
                    }} >
                        <TextInput
                            style={{
                                flex: 1,
                                // backgroundColor:"red",
                                ...Platform.select({
                                    android: {
                                        textAlignVertical: "top"
                                    }
                                }),
                                paddingBottom: scaleSzie(10)
                            }}
                            value={valueNote}
                            onChangeText={valueNote => this.setState({ valueNote })}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            placeholder="Vui lòng nhập ở đây "
                            autoFocus={true}
                        />
                    </View>

                    {/* ------------- Footer ------------ */}
                    <View style={{
                        height: scaleSzie(52), paddingLeft: scaleSzie(15 / 2),
                        paddingRight: scaleSzie(15 / 2), paddingBottom: scaleSzie(19 / 2),
                        backgroundColor:"#fff"
                    }} >
                        <ButtonSubmit
                            title="Lưu"
                            onPress={this.saveNote}
                        />
                    </View>
                </View>
            </ModalCustom>
        );
    }
}


export default EditNoteModal;


