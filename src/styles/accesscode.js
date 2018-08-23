import { Platform, StyleSheet, Dimensions } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    // flexDirection: 'column',
    // padding: 10,
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  input: {
    fontSize: 18,
    height: Platform.OS === 'ios' ? 40 : 45,
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    fontFamily: 'Roboto',
    width: '80%',
  },
  txt: {
    color: colors.grey700,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
    marginTop: -56,
  },
  helperText: {
    color: colors.red600,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    fontFamily: 'Roboto',
  },
});

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    width: '80%',
    textAlign: 'center',
  },
  container: {
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 40,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const buttonStylesSkip = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.grey500,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 0,
  },
  container: {
    height: 30,
    backgroundColor: colors.transparent,
  },
});
export default styles;
