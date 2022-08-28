import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Text, Button } from '@core/components';
import { scaleSzie } from '@utils/func';
import IMAGE from '@core/resources/icon';
import Configs from '@core/configs';

export default class ItemPhoto extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected
        }
        this.selectPhoto = this.selectPhoto.bind(this);
        this.displayPhoto = this.displayPhoto.bind(this);

    }

    selectPhoto() {
        const { url } = this.props
      this.props.selectPhoto(url);
    //   const { url } = this.props
        // this.setState((prevState) => ({
        //     isSelected: !prevState.isSelected
        // }), () => {
        //     if (this.state.isSelected) {
        //         this.props.addPhoto(url);
        //     } else {
        //         this.props.deletePhoto(url);
        //     }
        // })
    }

    displayPhoto() {
        const { url } = this.props
        this.props.displayPhoto(url);
    }

    render() {
        const iconSelect = this.props.isSelected ? IMAGE.chooseImage : IMAGE.unChooseImage;
        const temptWidth = (Configs.FULL_WIDTH - scaleSzie(34)) / 4;
        const { url } = this.props;
        if (url) {
            return (
                <TouchableOpacity onPress={this.displayPhoto} style={{ width: temptWidth, height: scaleSzie(110), }} >
                    <Image
                        source={{ uri: url }}
                        style={{ width: temptWidth, height: scaleSzie(110) }} />
                    <TouchableOpacity onPress={this.selectPhoto} style={{
                        position: 'absolute', top: scaleSzie(0), right: scaleSzie(0),
                        height: scaleSzie(30), width: scaleSzie(30), alignItems: 'flex-end',
                    }} >
                        <Image
                            source={iconSelect}
                            style={{ height: scaleSzie(14), width: scaleSzie(14), marginTop: scaleSzie(4), marginRight: scaleSzie(7) }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        }
        return <View style={{ width: temptWidth, height: scaleSzie(110), }} />
    }

}