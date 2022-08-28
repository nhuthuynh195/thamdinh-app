import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { Text, Button, ModalCustom, ButtonSubmit } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie } from '@core/utils/func';


export default class PopupEditReviewBusiness extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            temptMoneyDay: 0,
            initState: true
        }

        this.countRowRef = React.createRef();
        this.unitPriceRowRef = React.createRef();
        this.dayIntoMoneyRowRef = React.createRef();
        this.monthIntoMoneyRowRef = React.createRef();
        this.explainRowRef = React.createRef();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible && prevState.initState) {
            const { so_luong, don_gia } = nextProps.dataEdit
            return {
                temptMoneyDay: parseFloat(so_luong) * parseFloat(don_gia),
                initState: false
            }
        }
        return null;
    }

    saveChangeInfoBusiness = () => {
        const countRow = this.countRowRef.current.state.value;
        const unitPriceRow = this.unitPriceRowRef.current.state.value;
        const dayIntoMoneyRow = this.dayIntoMoneyRowRef.current.state.value;
        const monthIntoMoneyRow = this.monthIntoMoneyRowRef.current.state.value;
        const explainRow = this.explainRowRef.current.state.value;

        const table = {
            so_luong: countRow,
            don_gia: unitPriceRow,
            thanh_tien_ngay: dayIntoMoneyRow,
            thanh_tien_thang: monthIntoMoneyRow,
            dien_giai: explainRow
        }
        this.props.saveChangeInfoBusiness(table);
    }

    calculatorMoney = async () => {
        const countRow = this.countRowRef.current.state.value;
        const unitPriceRow = this.unitPriceRowRef.current.state.value;

        const temptMoney = parseFloat(this.formatNumber(countRow)) * parseFloat(this.formatNumber(unitPriceRow));
        this.dayIntoMoneyRowRef.current.setStateFromParent(this.formatNumberDot(temptMoney));
        this.monthIntoMoneyRowRef.current.setStateFromParent(this.formatNumberDot(temptMoney * 30));
    }

    formatNumber(number) {
        const temptNumber = number.split('.');
        return temptNumber.join("");
    }

    formatNumberDot(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

    render() {
        const { visible, dataEdit, titlePopup, titleHeader } = this.props;
        const { temptMoneyDay } = this.state;
        return <ModalCustom
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
            style={{
                justifyContent: 'flex-start',
                paddingTop: scaleSzie(40)
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
                        <ItemPopup
                            ref={this.countRowRef}
                            title="Số lượng"
                            initValue={dataEdit.so_luong}
                            editable={true}
                            calculatorMoney={this.calculatorMoney}
                        />
                        <ItemPopup
                            ref={this.unitPriceRowRef}
                            title="Đơn giá"
                            initValue={dataEdit.don_gia}
                            editable={true}
                            calculatorMoney={this.calculatorMoney}
                        />
                        <ItemPopup
                            ref={this.dayIntoMoneyRowRef}
                            title="Thành tiền (ngày)"
                            initValue={temptMoneyDay}
                            editable={false}
                        />
                        <ItemPopup
                            ref={this.monthIntoMoneyRowRef}
                            title="Thành tiền (tháng)"
                            initValue={dataEdit.thanh_tien_thang}
                            editable={false}
                        />
                        <ItemPopup
                            ref={this.explainRowRef}
                            title="Diễn giải" isText={true}
                            initValue={dataEdit.dien_giai}
                            editable={true}
                        />
                        <View style={{ height: scaleSzie(38) }} />
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

    setStateFromParent(value) {
        this.setState({
            value
        })
    }

    checkFocus(isFocus) {
        this.setState({
            isFocus
        })
    }

    onChangeText = async (value) => {
        await this.setState({ value });
        this.props.calculatorMoney();
    }

    render() {
        const { title, isText, editable } = this.props;
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
                                onChangeText={this.onChangeText}
                                editable={editable}
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
        height: scaleSzie(395),
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