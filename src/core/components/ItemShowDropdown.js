import React from 'react';

import {
    View,
    Image
} from 'react-native';

import IMAGE from '@core/resources/icon';
import { scaleSzie, isIphoneX } from '@core/utils/func';
import Text from './Text';
import Button from './Button';
import styleConfigs from '../configs/style';


export default class ItemShowDropdown extends React.PureComponent {

    constructor(props) {
        super(props);
        this.showDropdown = this.showDropdown.bind(this);
    }

    showDropdown() {
        if (this.props.isPress) {
            this.props.showDropdown();
        }

    }

    render() {
        const { palceHolder, value, isPress, style ,disabled} = this.props;
        const temptValue = value ? value : palceHolder;
        const temptBorder = isPress ? { borderBottomColor: '#C8C8C8', borderBottomWidth: scaleSzie(1) } : {}
        return (
            <Button 
            disabled={disabled}
            onPress={this.showDropdown} style={[{
                height: scaleSzie(45), flexDirection: 'row',
            }, temptBorder, style]} >
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: scaleSzie(2), }} >
                    {
                        value ? <Text numberOfLines={1} style={{ color: '#424242', fontSize: scaleSzie(16), }} >
                            {temptValue}
                        </Text> : <Text  numberOfLines={1}  bold style={{ color: '#A2A2A2', fontSize: scaleSzie(13), }} >
                                {temptValue}
                            </Text>
                    }

                </View>
                <View style={{
                    width: scaleSzie(30), justifyContent: 'flex-end',
                    paddingBottom: scaleSzie(7),
                }} >
                    {
                        isPress ? <Image source={IMAGE.dropdownBrown}
                            style={{ width: scaleSzie(13), height: scaleSzie(7) }}
                        /> : <View />
                    }

                </View>
                {
                    value ? <Text numberOfLines={1}  bold style={{ position: 'absolute', top: 0, left: 0, color: styleConfigs.PURPLE_COLOR, fontSize: scaleSzie(12) }} >
                        {palceHolder}
                    </Text> : <View />
                }

            </Button>
        );
    }

}