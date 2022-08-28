import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Text, Button, ModalCustom, ButtonSubmit } from '@core/components';
import styleConfigs from '@configs/style';
import Configs from '@configs';
import { scaleSzie } from '@core/utils/func';
import IMAGE from '@core/resources/icon';

export default class PopupConfirmRecorder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    playAudio = () => {
        this.setState({
            isPlaying: true
        });
        this.props.playAudio();
    }

    stopAudio = () => {
        this.setState({
            isPlaying: false
        });
        this.props.stopPlayAudio();
    }

    render() {
        const { visible } = this.props;
        const { isPlaying } = this.state;
        return <ModalCustom
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}
        >
            <View style={styles.containerPopup} >
                <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: scaleSzie(4) }} >
                    <View style={{ flex: 1, paddingTop: scaleSzie(20) }} >
                        <Text style={{ color: '#424242', fontSize: scaleSzie(16), fontWeight: '600', alignSelf: 'center', }} >
                            Bạn muốn lưu đoạn ghi âm?
                    </Text>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            {
                                isPlaying ? <Button onPress={this.stopAudio} >
                                    <Image source={IMAGE.pauseAudio} style={{ width: scaleSzie(70), height: scaleSzie(70) }} />
                                </Button> : <Button onPress={this.playAudio} >
                                        <Image source={IMAGE.playAudio} style={{ width: scaleSzie(80), height: scaleSzie(70) }} />
                                    </Button>
                            }

                        </View>
                    </View>
                    <View style={styles.containerButtonPopup} >
                        <ButtonSubmit
                            title="Huỷ"
                            backgroundButton="#ffffff"
                            styleButton={{ flex: 1, }}
                            borderButtonColor={styleConfigs.PURPLE_COLOR}
                            titleColor={styleConfigs.PURPLE_COLOR}
                            onPress={() => this.props.cancelAudio()}
                        />
                        <View style={{ width: scaleSzie(12) }} />
                        <ButtonSubmit
                            title="Lưu"
                            backgroundButton={styleConfigs.PURPLE_COLOR}
                            styleButton={{ flex: 1, }}
                            borderButtonColor={styleConfigs.PURPLE_COLOR}
                            titleColor={'#ffffff'}
                            onPress={() => this.props.submitAudio()}
                        />
                    </View>
                </View>
            </View>
        </ModalCustom>
    }

}


const styles = StyleSheet.create({
    containerPopup: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(250),
        paddingHorizontal: scaleSzie(20)
    },
    containerButtonPopup: {
        height: scaleSzie(64),
        paddingHorizontal: scaleSzie(16),
        flexDirection: 'row'
    },
})