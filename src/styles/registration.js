import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  innerContainer: {
    padding: 10,
  },
  input: {
    fontSize: 14,
    height: Platform.OS === 'ios' ? 40 : 45,
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    fontFamily: 'Roboto',
  },
  datePickerBox: {
    marginLeft: -20,
  },
  datepicker: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
    backgroundColor: '#f4f4f4',
  },
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  genderText: {
    marginLeft: Platform.OS === 'ios' ? 5 : 10,
    color: colors.grey600,
    width: Platform.OS === 'ios' ? 50 : 70,
    fontFamily: 'Roboto',
    marginRight: Platform.OS === 'ios' ? 5 : 10,
    marginTop: 3,
  },
  radioButton: {
    width: Platform.OS === 'ios' ? 150 : 250,
    marginRight: 10,
  },
  radioButtonMale: {
    width: 50,
    // marginRight: 10,
  },
  ORContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    height: 15,
    marginTop: 5,
  },
  separatorView: {
    height: 1,
    backgroundColor: colors.grey400,
    flexDirection: 'row',
    margin: 8,
    flex: 1,
  },
  ORText: {
    width: 30,
    color: colors.grey600,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  termsContainer: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerTermsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 12,
    color: colors.grey600,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  andText: {
    fontSize: 12,
    color: colors.grey600,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  facebookContainer: {
    flex: 1,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    borderRadius: 2,
  },
  facebookLogo: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    margin: Platform.OS === 'ios' ? 11 : 12,
  },
  btnText: {
    fontSize: Platform.OS === 'ios' ? 12 : 14,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
    margin: 12,
    marginTop: 14,
  },
  helperText: {
    color: colors.red600,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    fontFamily: 'Roboto',
  },
  errorContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: colors.red600,
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  linkInline: {
    fontSize: 12,
    color: '#6084c2',
    marginRight: 5,
    marginLeft: 5,
    fontFamily: 'Roboto',
  },
  btnIcon: {
    height: 20,
    width: 20,
    padding: 2,
    textAlign: 'center',
  },
});

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export default styles;
