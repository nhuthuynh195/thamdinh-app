import {
    StyleSheet
} from 'react-native';

import styleConfig from '../../configs/style';
import { scaleSzie } from '../../utils/func';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66,66,66,0.7)',
        justifyContent: 'center', alignItems: 'center',
    },
    containerContent: {
        flex: 1,
        paddingLeft: scaleSzie(32),
        paddingRight: scaleSzie(24),
        paddingTop: scaleSzie(25)
    },
    constainerFooter: {
        height: scaleSzie(57),
        paddingHorizontal: scaleSzie(15),
        paddingBottom: scaleSzie(17),
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
    },
    containerItemSort: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'red'
    },
    borderTopItem: {
        borderTopWidth: 0.5,
        borderTopColor: 'rgb(219,219,219)',
    }
})