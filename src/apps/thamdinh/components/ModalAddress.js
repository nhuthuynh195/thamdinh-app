'use strict';

import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform,
    TextInput,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { Button, ModalCustom, Text, ButtonSubmit } from '@core/components';
import { scaleSzie, removeAccent, getKeyOfObject, getValueOfObject } from '@core/utils/func';
import Configs from '@core/configs';
import IMAGE from '@core/resources/icon';
// import Util from '../utils';

const { width, height } = Dimensions.get('window');

class ModalAddress extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            arraySearch: [],
            visible: false
        }
    }

    render() {
        const { visible } = this.state;
        const { data } = this.props;
        const temptData = Array.isArray(data) ? data : getKeyOfObject(data);
        return (
            <ModalCustom
                transparent={true}
                visible={visible}
                animationType="none"
                onRequestClose={() => { }}
                style={{
                    justifyContent: 'flex-start',
                    paddingTop: scaleSzie(50)
                }}
            >
                <View style={{ width: Configs.FULL_WIDTH - 40, height: scaleSzie(820 / 2), backgroundColor: '#fff', borderRadius: scaleSzie(10) }} >
                    <View style={{ height: scaleSzie(42) }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: '#1C1C1C', fontSize: scaleSzie(14), fontWeight: '600', }} >
                                {this.props.titleModal}
                            </Text>
                        </View>
                        <View style={{ height: scaleSzie(1), backgroundColor: '#DBDBDB' }} />
                    </View>
                    {/* ======= box search ====== */}
                    <View style={{
                        height: scaleSzie(95 / 2), paddingTop: scaleSzie(19 / 2), paddingBottom: scaleSzie(16 / 2), paddingLeft: scaleSzie(21),
                        paddingRight: scaleSzie(21),
                    }} >
                        <View style={{
                            flex: 1, backgroundColor: '#EBEBEB', borderRadius: scaleSzie(60), flexDirection: 'row',
                            borderWidth: scaleSzie(1), borderColor: '#DBDBDB'
                        }} >
                            <View style={{ width: scaleSzie(71 / 2), justifyContent: 'center', alignItems: 'center' }} >
                                <Image
                                    source={IMAGE.searchFilter}
                                    style={{ width: scaleSzie(35 / 2), height: scaleSzie(35 / 2) }}
                                />
                            </View>
                            <View style={{ flex: 1 }} >
                                <TextInput
                                    style={[{ flex: 1, },
                                    (Platform.OS != 'ios' ? {
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                    } : {})
                                    ]}
                                    value={this.state.keyWord}
                                    onChangeText={(keyWord) => this.searchGeolocation(keyWord)}
                                    underlineColorAndroid="transparent"
                                    placeholder={`Tìm kiếm ${this.props.titleSearch}`}
                                    autoFocus={true}
                                />
                            </View>
                            {
                                this.state.keyWord !== '' ?
                                    <Button onPress={() => this.clearSearch()} style={{ width: scaleSzie(57), justifyContent: 'center', alignItems: 'center' }} >
                                        <Image
                                            source={IMAGE.deleteTextSearch}
                                            style={{ width: scaleSzie(37 / 2), height: scaleSzie(37 / 2) }}
                                        />
                                    </Button>
                                    :
                                    <View />
                            }

                        </View>
                    </View>
                    {/* =============== Content ============ */}
                    <View style={{ flex: 1, }} >
                        {
                            temptData.length === 0 ?
                                <ActivityIndicator
                                    color="#55529E"
                                    size="large"
                                /> : <FlatList
                                    keyboardShouldPersistTaps='always'
                                    showsVerticalScrollIndicator={false}
                                    data={(this.state.keyWord.length > 0 ? this.state.arraySearch : temptData)}
                                    renderItem={({ item, index }) => this.renderItemProvince(item, index)}
                                    ListFooterComponent={() => <View style={{ height: 100 }} />}
                                    keyExtractor={(item, index) => item}

                                />
                        }
                    </View>
                    {/* ============== Footer =========== */}
                    <View style={{
                        height: scaleSzie(99 / 2), paddingLeft: scaleSzie(15 / 2),
                        paddingRight: scaleSzie(15 / 2), paddingBottom: scaleSzie(19 / 2)
                    }} >
                        <ButtonSubmit
                            title="Hủy"
                            onPress={this.resetState}
                        />
                    </View>
                </View>
            </ModalCustom>
        );
    }

    resetState = () => {
        this.setState({
            visible: false,
            keyWord: '',
            arraySearch: []
        });
    }

    async searchGeolocation(keyWord) {
        const { data } = this.props;
        let geoLocations;
        if (Array.isArray(data)) {
            geoLocations = data;
        } else {
            geoLocations = getKeyOfObject(this.props.data);
        }
        //  geoLocations = getKeyOfObject(this.props.data);
        let arraySearch = [];
        for (let i = 0; i < geoLocations.length; i++) {
            if (removeAccent(geoLocations[i]).indexOf(removeAccent(keyWord).toLowerCase()) != -1) {
                arraySearch.push(geoLocations[i]);
            }
        }
        await this.setState({
            keyWord,
            arraySearch
        });
    }

    async  clearSearch() {
        await this.setState({
            keyWord: '',
            arraySearch: []
        })
    }

    updateAddress(dataUpdate) {
        const { data } = this.props;
        this.setState({
            keyWord: '',
            arraySearch: [],
            visible: false
        });
        if (Array.isArray(data)) {
            this.props.updateAddress(dataUpdate)
        } else {
            this.props.updateAddress({
                code: data[dataUpdate],
                title: dataUpdate
            })
        }

    }

    displayModalAddress(visible) {
        this.setState({
            visible
        })
    }

    renderItemProvince(title, index) {
        const { data } = this.props;
        let icon;
        if (Array.isArray(data)) {
            icon = title !== this.props.dataSelected ? IMAGE.stickNull : IMAGE.stickYes;
        } else {
            icon = title !== this.props.dataSelected.title ? IMAGE.stickNull : IMAGE.stickYes;
        }
        return (
            <Button onPress={() => this.updateAddress(title)} key={index} style={{ minHeight: scaleSzie(93 / 2) }} >
                <View style={{ height: 0.5, paddingLeft: scaleSzie(19 / 2), paddingRight: scaleSzie(19 / 2) }} >
                    <View style={{ flex: 1, backgroundColor: (index == 0 ? null : '#DBDBDB') }} />
                </View>
                <View style={{
                    flex: 1, paddingLeft: scaleSzie(19 / 2),
                    paddingRight: scaleSzie(19 / 2), flexDirection: 'row', alignItems: 'center',
                    //  backgroundColor:"red"
                }} >
                    <Image
                        source={icon}
                        style={{ width: scaleSzie(15), height: scaleSzie(15), marginRight: scaleSzie(24) }}
                    />
                    <View style={{ flex: 1,paddingRight:scaleSzie(10) }} >
                        <Text style={{ color: '#1C1C1C', fontSize: scaleSzie(28 / 2),  }} >
                            {title}
                        </Text>
                    </View>

                    <View style={{ width: scaleSzie(15), alignItems: 'flex-end' }} >
                        <Image
                            source={IMAGE.arrowOrder}
                            style={{ width: scaleSzie(11 / 2), height: scaleSzie(20 / 2), marginRight: scaleSzie(11 / 2) }}
                        />
                    </View>
                </View>
            </Button>
        );
    }

    async  componentWillUnmount() {
        await this.setState({
            keyWord: '',
            arraySearch: []
        })
    }

}


export default ModalAddress;


