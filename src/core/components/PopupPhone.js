import React from 'react';
import { View, StyleSheet } from 'react-native';

import ModalCustom from './ModalCustom';
import Text from './Text';
import ButtonSubmit from './ButtonSubmit';
import Configs from '@core/configs';
import styleConfigs from '@configs/style';
import { scaleSzie } from '@core/utils/func';

export default class PopupPhone extends React.PureComponent {
    constructor(props) {
        super(props);
        this.hidePopupCall = this.hidePopupCall.bind(this);
        this.callPhone = this.callPhone.bind(this);
    }

    hidePopupCall() {
        this.props.hidePopupCall();
    }
    callPhone() {
        this.props.callPhone();
    }

    render() {
        return (
            <ModalCustom
                transparent={true}
                visible={this.props.visible}
                onRequestClose={this.hidePopupCall}
            >
                <View style={styles.containerPopup} >
                    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: scaleSzie(4) }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ color: '#424242', fontSize: scaleSzie(16), fontWeight: '600', textDecorationLine: 'underline' }} >
                               {this.props.phone}
                        </Text>
                        </View>
                        <View style={styles.containerButtonPopup} >
                            <ButtonSubmit
                                title="Huỷ"
                                backgroundButton="#ffffff"
                                styleButton={{ flex: 1, }}
                                borderButtonColor={styleConfigs.PURPLE_COLOR}
                                titleColor={styleConfigs.PURPLE_COLOR}
                                onPress={this.hidePopupCall}
                            />
                            <View style={{ width: scaleSzie(12) }} />
                            <ButtonSubmit
                                title="Gọi"
                                backgroundButton={styleConfigs.PURPLE_COLOR}
                                styleButton={{ flex: 1, }}
                                borderButtonColor={styleConfigs.PURPLE_COLOR}
                                titleColor={'#ffffff'}
                                onPress={this.callPhone}
                            />
                        </View>
                    </View>
                </View>
            </ModalCustom>
        );
    }
}

const styles = StyleSheet.create({
    containerPopup: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(156),
        paddingHorizontal: scaleSzie(20)
    },
    containerButtonPopup: {
        height: scaleSzie(64),
        paddingHorizontal: scaleSzie(16),
        flexDirection: 'row'
    },
})