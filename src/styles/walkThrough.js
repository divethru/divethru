import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  pagerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 80,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  text: {
    fontSize: Platform.OS === 'ios' ? 16 : 20,
    color: '#34495e',
    textAlign: 'center',
    backgroundColor: colors.transparent,
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    fontSize: 20,
    color: colors.white,
    backgroundColor: '#7dd3d5',
    fontFamily: 'Roboto',
  },
  backImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: undefined,
    height: undefined,
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
    width: 150,
    margin: 10,
    height: Platform.OS === 'ios' ? 40 : 45,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export default styles;
