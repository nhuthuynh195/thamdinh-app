import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  centerHorVer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  maxSizeScreen: {
    width,
    height
  },
  shadowApp: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(95,94,163,0.2)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25
      },
      android: {
        elevation: 1
      }
    })
  }
});
