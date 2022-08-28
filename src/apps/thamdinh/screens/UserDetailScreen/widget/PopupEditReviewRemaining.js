import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { Text, Button, ModalCustom, ButtonSubmit } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie } from '@core/utils/func';


export default class PopupEditReviewRemaining extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        }

        this.countRowRef = React.createRef();
        this.unitPriceRowRef = React.createRef();
        // this.dayIntoMoneyRowRef = React.createRef();
        this.monthIntoMoneyRowRef = React.createRef();
        this.explainRowRef = React.createRef();
    }

    splitDotNumber(number) {
        const temptNumber = `${number}`.split('.');
        return temptNumber.join('');
    }

    saveChangeInfoBusiness = () => {
        // const dayIntoMoneyRow = this.dayIntoMoneyRowRef.current.state.value;
        const monthIntoMoneyRow = this.monthIntoMoneyRowRef.current.state.value;
        const explainRow = this.explainRowRef.current.state.value;
        // dayIntoMoneyRow === '' || dayIntoMoneyRow === '0' ||
        // if ( monthIntoMoneyRow === '' || monthIntoMoneyRow === '0' || explainRow === '') {
            if (  explainRow === '') {
            this.setState({
                errorMessage: 'Vui lòng điền đầy đủ thông tin !'
            })
        } else {
            const table = {
                // thanh_tien_ngay: this.splitDotNumber(dayIntoMoneyRow),
                thanh_tien_thang: monthIntoMoneyRow === '' || monthIntoMoneyRow === '0' ? 0 : this.splitDotNumber(monthIntoMoneyRow),
                dien_giai: explainRow
            }
            this.props.saveChangeInfoBusiness(table);
        }


    }

    render() {
        const { visible, dataEdit, titlePopup, titleHeader } = this.props;
        return <ModalCustom
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
            style={{
                justifyContent: 'flex-start',
                paddingTop: scaleSzie(100)
            }}
        >
            <View style={styles.containerPopup} >
                <View style={{ flex: 1 }} >
                    <View style={{ alignItems: 'center' }} >
                        <Text bold style={styles.textTitle} >
                            {titleHeader}
                        </Text>
                        <Text bold style={[styles.textTitle, { color: '#6D6D6D', fontWeight: '800', fontSize: scaleSzie(14) }]} >
                            {titlePopup}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }} >
                        {/* <ItemPopup
                            ref={this.dayIntoMoneyRowRef}
                            title="Thành tiền (ngày)"
                            initValue={dataEdit.thanh_tien_ngay}
                        /> */}
                        <ItemPopup
                            ref={this.monthIntoMoneyRowRef}
                            title="Thành tiền (tháng)"
                            initValue={dataEdit.thanh_tien_thang}
                        />
                        <ItemPopup
                            ref={this.explainRowRef}
                            title="Diễn giải" isText={true}
                            initValue={dataEdit.dien_giai}
                        />
                        <View style={{ height: scaleSzie(38), justifyContent: "center", alignItems: 'center' }} >
                            <Text style={{ color: 'red', fontSize: scaleSzie(14), fontWeight: 'bold' }} >
                                {this.state.errorMessage}
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <ButtonSubmit
                                title="Huỷ"
                                backgroundButton="#ffffff"
                                styleButton={{ flex: 1, }}
                                borderButtonColor={styleConfigs.PURPLE_COLOR}
                                titleColor={styleConfigs.PURPLE_COLOR}
                                onPress={() => this.props.closePopupEditInfoBusiness()}
                            />
                            <View style={{ width: scaleSzie(12) }} />
                            <ButtonSubmit
                                title="Lưu"
                                styleButton={{ flex: 1, }}
                                onPress={this.saveChangeInfoBusiness}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ModalCustom>
    }


}

class ItemPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
            value: this.props.initValue ? this.props.initValue : ''
        }
    }

    checkFocus(isFocus) {
        this.setState({
            isFocus
        })
    }

    render() {
        const { title, isText } = this.props;
        const { isFocus, value } = this.state;
        const temptFocus = isFocus || (value ? true : false);
        const temptTextColorFocus = !temptFocus ? { color: '#A2A2A2' } : {};
        const temptBorderColorFocus = !temptFocus ? { borderBottomColor: '#A2A2A2' } : {};
        return (
            <View style={{ height: scaleSzie(42), flexDirection: 'row' }} >
                <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                    <Text bold style={[styles.textTitleInfo, temptTextColorFocus]} >
                        {title}
                    </Text>
                </View>
                <View style={[{ width: scaleSzie(201), borderBottomColor: styleConfigs.PURPLE_COLOR, borderBottomWidth: scaleSzie(1) }, temptBorderColorFocus]} >
                    {
                        isText ? <TextInput
                            style={{
                                flex: 1,
                                paddingTop: scaleSzie(20), fontSize: scaleSzie(16),
                                paddingRight: scaleSzie(5),
                                color: '#000',
                                ...Platform.select({
                                    android: {
                                        paddingBottom: 0,
                                    }
                                })
                            }}
                            autoFocus={title === 'Số lượng' ? true : false}
                            onFocus={() => this.checkFocus(true)}
                            onBlur={() => this.checkFocus(false)}
                            textAlign={'right'}
                            options={{ unit: '', precision: 0 }}
                            type={'money'}
                            value={value}
                            onChangeText={(value) => this.setState({ value })}
                        /> : <TextInputMask
                                style={{
                                    flex: 1,
                                    paddingTop: scaleSzie(20), fontSize: scaleSzie(16),
                                    paddingRight: scaleSzie(5),
                                    color: '#000',
                                    ...Platform.select({
                                        android: {
                                            paddingBottom: 0,
                                        }
                                    })
                                }}
                                keyboardType='numeric'
                                autoFocus={title === 'Số lượng' ? true : false}
                                onFocus={() => this.checkFocus(true)}
                                onBlur={() => this.checkFocus(false)}
                                textAlign={'right'}
                                options={{ unit: '', precision: 0 }}
                                type={'money'}
                                value={value}
                                onChangeText={(value) => this.setState({ value })}
                            />
                    }
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    containerPopup: {
        width: Configs.FULL_WIDTH - scaleSzie(40),
        height: scaleSzie(300),
        backgroundColor: '#fff',
        borderRadius: scaleSzie(4),
        paddingHorizontal: scaleSzie(16),
        paddingTop: scaleSzie(24)
    },
    textTitle: {
        color: '#424242',
        fontSize: scaleSzie(16)
    },
    textTitleInfo: {
        color: styleConfigs.PURPLE_COLOR,
        fontSize: scaleSzie(14)
    }
})