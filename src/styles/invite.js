import { StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  subViewStyle: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    marginTop: 10,
  },
  Text: {
    fontSize: 16,
    color: 'grey',
    width: '80%',
  },
  Buttons: {
    width: '20%',
    alignItems: 'flex-end',
  },
  // plusButton: {
  //   height: 15,
  //   width: 15,
  //   alignItems: 'flex-end',
  //   // backgroundColor: 'red',
  // },
  plusImg: {
    // tintColor: 'grey',
    // height: 18,
    // width: 18,
    // resizeMode: 'stretch',
    // transform: [{ rotate: '45deg' }],
    tintColor: '#34495e',
    height: 15,
    width: 15,
    // transform: [{ rotate: '45deg' }],
    // padding: 10,
  },
  indicatorview: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    // backgroundColor: '#56565666',
    zIndex: 1,
    justifyContent: 'center' },
});

export default styles;
