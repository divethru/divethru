import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  innerContainer: {
    backgroundColor: colors.transparent,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 80 : 100,
    padding: 10,
  },
  lockIconContainer: {
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: undefined,
    height: undefined,
  },
  lockIcon: {
    width: 80,
    height: 80,
  },
  text: {
    color: colors.black,
    margin: 15,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  subText: {
    color: colors.grey700,
    marginBottom: 20,
    fontSize: 15,
    fontFamily: 'Roboto',
    textAlign: 'center',
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

export default styles;
