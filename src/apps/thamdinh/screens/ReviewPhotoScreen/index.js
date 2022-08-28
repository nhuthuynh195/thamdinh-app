import React from 'react';
import moment from 'moment';

import Layout from './layout';
import { checkAllArrayIsNotEmpty } from '@core/utils/func';
import connectRedux from '../../redux/connectRedux';

class CameraScreen extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            indexSelectImage:0
        }
    }

    setStateFromParent = async (indexSelectImage) => {
        await this.setState({
            indexSelectImage
        })
    }


}

// const mapStateToProps = state => ({

// })

// export default connectRedux(mapStateToProps, CameraScreen);
export default CameraScreen;

