import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  loginContainer: {
    backgroundColor: colors.transparent,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 100,
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
  googleContainer: {
    flex: 1,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 20,
    backgroundColor: '#db4437',
    justifyContent: 'center',
    borderRadius: 2,
  },
  googleLogo: {
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
  },
  helperText: {
    color: colors.red600,
    marginLeft: 10,
    marginRight: 10,
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
  btnIcon: {
    height: 20,
    width: 20,
    padding: 2,
    textAlign: 'center',
  },
});

export const loginButtonStyles = StyleSheet.create({
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

export const forgotPasswordButtonStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.grey700,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 20,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
  },
});

export default styles;
