import {
    StyleSheet
} from 'react-native';

import styleConfig from '../../configs/style';
import {scaleSzie} from '../../utils/func';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : styleConfig.BACKGROUND_COLOR_CONTAINER,
        alignItems: 'center',
    },
    textLogin:{
        fontWeight:'600',
        fontSize : scaleSzie(20),
        color :'#424242'
    },
    logo :{
        width: scaleSzie(70),
        height : scaleSzie(70)
    },
    textError:{
        color:'#E23838',
        fontSize: scaleSzie(14),
    }
})