import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: colors.white,
  },
  innercontainer: {
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  imageback: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  datePickerBox: {
    // marginLeft: -19,
    width: '100%',
    color: colors.grey400,
    // fontSize: 25,
  },
  timePickerBox: {
    // marginLeft: -16,
    color: colors.grey400,
    width: '100%',
    // fontSize: 25,
  },
  imageprev: {
    height: 20,
    width: 20,
    // marginLeft: '90%',
    // marginRight: '10%',
    // marginBottom: 10,
  },
  headingtext: {
    flex: 2,
    color: colors.grey600,
    textAlign: 'center',
    fontSize: 18,
  },
  headtext: {
    color: colors.grey600,
    paddingLeft: 20,
  },
  underline1: {
    backgroundColor: colors.grey400,
    height: 2,
    width: '25%',
    marginTop: 5,
    marginLeft: 120,
  },
  underline2: {
    backgroundColor: colors.grey400,
    height: 2,
    width: '32%',
    marginTop: 5,
  },
  input: {
    fontSize: 14,
    height: Platform.OS === 'ios' ? 40 : 45,
    // marginLeft: 20,
    fontFamily: 'Roboto',
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: colors.grey200,
    height: 1,
    width: '100%',
    marginTop: 25,
    marginBottom: 20,
  },
  seperatorprev: {
    alignItems: 'center',
    backgroundColor: colors.grey200,
    height: 1,
    width: '100%',
    marginTop: 25,
  },
  text: {
    color: colors.grey400,
    fontSize: 21,
    paddingLeft: 20,
  },
  txt: {
    color: colors.grey700,
    fontSize: 20,
    paddingLeft: 20,
    width: '82%',
  },
  txtunderline: {
    fontSize: 21,
    textAlign: 'center',
    color: colors.grey600,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
  textrem: {
    fontSize: 21,
    textAlign: 'center',
    color: colors.grey400,
  },
});

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 20,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export default styles;
