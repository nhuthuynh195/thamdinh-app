import {
    StyleSheet
} from 'react-native';

import styleConfig from '@core/configs/style';
import Configs from '@core/configs';
import { scaleSzie } from '@core/utils/func';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConfig.BACKGROUND_COLOR_CONTAINER,
        paddingTop: scaleSzie(36)
    },
    containerHeader: {
        width: Configs.FULL_WIDTH,
        height: 50,
        paddingHorizontal: scaleSzie(12),
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    containerProfile: {
        flex: 1,
        justifyContent: 'center'
    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerNoti: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    numberNoti: {
        position: 'absolute',
        width: scaleSzie(16),
        height: scaleSzie(16),
        backgroundColor: 'red',
        right: scaleSzie(-4),
        top: scaleSzie(-5),
        borderRadius: scaleSzie(18),
        justifyContent: 'center',
        alignItems:'center'
    }
})