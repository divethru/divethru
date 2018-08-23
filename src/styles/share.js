import { StyleSheet, Platform } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  icon: {
    height: 20,
    width: 20,
    margin: 10,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 80,
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  topText: {
    fontSize: 16,
    color: colors.grey700,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: '50%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.grey900,
    fontFamily: 'Roboto',
    marginLeft: 60,
    marginRight: 60,
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
