import { StyleSheet, Platform } from 'react-native';

import styleConfig from '@configs/style';
import { scaleSzie, scaleSzieHeight } from '@utils/func';
import Configs from '@core/configs';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConfig.BACKGROUND_COLOR_CONTAINER,
    },
    headerContainer: {
        height: scaleSzie(85),
        flexDirection: 'row',
    },
    containerMainPhoto: {
        width: Configs.FULL_WIDTH,
        height: scaleSzie(400),
        paddingBottom: scaleSzie(15),
        paddingHorizontal: scaleSzie(12)
    },
    dropdownUpload: {
        position: 'absolute',
        width: scaleSzie(244),
        right: scaleSzie(9),
        top: scaleSzie(80)

    }
})