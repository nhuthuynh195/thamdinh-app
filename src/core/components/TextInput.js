import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    TextInput,
    Platform
} from 'react-native';

import Button from './Button';
import commonStyles from '../commonStyles';
import { scaleSzie } from '../utils/func';
import styleConfigs from '../configs/style';

import Configs from '../configs';


export default class TextInputApp extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isFocus: false,
        }
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);

        this.textinputRef = React.createRef();
    }

    async onFocus() {
        await this.setState({
            isFocus: true
        })
    }

    async onBlur() {
        await this.setState({
            isFocus: false
        })
    }

    onFocusTextInput(){
        this.textinputRef.current.focus();
    }

    onChangeText(value) {
        this.props.onChangeText(value);
    }

    onSubmitEditing() {
        this.props.onSubmitEditing();
    }

    componentDidUpdate(prevProps, prevState) {
        return this.state.isFocus !== prevState.isFocus;
    }

    render() {
        const {
            placeholder,
            borderColorActive,
            borderColorUnActive,
            iconActive,
            iconUnActive,
            secureTextEntry,
            value
        } = this.props;
        const { isFocus } = this.state;
        const borderColor = isFocus ? borderColorActive : borderColorUnActive;
        const icon = (isFocus || value !== '') ? iconActive : iconUnActive
        return (
            <View style={styles.container} >
                <View style={[styles.containerTextInput, {
                    borderColor: borderColor ? borderColor : 'rgb(220,220,220)',
                    backgroundColor: '#ffffff'
                }]} >
                    <View style={styles.containerIcon} >
                        <Image source={icon} />
                    </View>
                    <View style={[styles.textInput,]} >
                        <TextInput
                            ref={this.textinputRef}
                            placeholder={placeholder}
                            placeholderTextColor="rgb(150,150,150)"
                            style={styles.realTextInput}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onChangeText={this.onChangeText}
                            value={value}
                            secureTextEntry={secureTextEntry ? secureTextEntry : false}
                            onSubmitEditing={this.onSubmitEditing}
                        />
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(45),
        paddingHorizontal: scaleSzie(47),
    },
    containerTextInput: {
        flex: 1,
        borderRadius: scaleSzie(40),
        borderWidth: scaleSzie(1),
        flexDirection: 'row',
    },
    containerIcon: {
        width: scaleSzie(50),
        justifyContent: 'center',
        marginLeft: scaleSzie(21)
    },
    textInput: {
        flex: 1,
        paddingRight: scaleSzie(20)
    },
    realTextInput: {
        flex: 1,
        ...Platform.select({
            ios: {

            },
            android: {
                padding: 0,
                margin: 0,
            },
        })

    }

})