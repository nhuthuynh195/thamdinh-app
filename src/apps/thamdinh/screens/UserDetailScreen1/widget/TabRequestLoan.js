import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { Text, AutoGrowingTextInput } from '@core/components';
import Configs from '@configs';
import { scaleSzie, formatMoney } from '@core/utils/func';
import connectRedux from '../../../redux/connectRedux';

class TabRequestLoan extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { loan_request } = this.props.clientDetail
        return <View style={{ flex: 1 }} >
            <View style={{ height: scaleSzie(45), paddingHorizontal: scaleSzie(24) }} >
                <Text style={{ color: '#424242', fontSize: scaleSzie(18), fontWeight: '800' }} >
                    Yêu cầu vay
            </Text>
            </View>
            <View style={{ flex: 1 }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                >
                    <View style={[{
                        width: Configs.FULL_WIDTH, paddingTop: scaleSzie(17), paddingHorizontal: scaleSzie(24), paddingBottom: scaleSzie(12),
                    }]} >
                        <AutoGrowingTextInput
                            placeholder={'Số tiền vay đề nghị'}
                            value={`${formatMoney(loan_request.so_tien_de_nghi)} VND`}
                            styleContainer={{}}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                        />
                        <AutoGrowingTextInput
                            placeholder={'Kỳ hạn đề nghị'}
                            value={`${loan_request.ky_han_de_nghi}`}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                        />
                        <AutoGrowingTextInput
                            placeholder={'Lãi suất'}
                            value={`${loan_request.lai_suat} %`}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                        />
                        <AutoGrowingTextInput
                            placeholder={'Mục đích vay đề nghị'}
                            value={`${loan_request.muc_dich}`}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                        />
                        <AutoGrowingTextInput
                            placeholder={'Ghi chú'}
                            value={`${loan_request.ghi_chu}`}
                            styleContainer={{ marginTop: scaleSzie(16) }}
                            styleTextInput={{ color: '#424242', fontSize: scaleSzie(16), }}
                            disable={true}
                        />
                    </View>
                    <View style={{ height: scaleSzie(100) }} />
                </ScrollView>
            </View>
        </View>
    }
}


const mapStateToProps = state => ({
    clientDetail: state.client.clientDetail
});

export default connectRedux(mapStateToProps, TabRequestLoan);