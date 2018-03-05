import { StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  iconLeftContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  icon: {
    height: 20,
    width: 20,
    margin: 10,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontFamily: 'Roboto',
  },
  topText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  playerContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  VLogo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container11: {
    position: 'relative',
    width: 200,
    height: 200,
  },
  slider1: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  slider2: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  progrssBarContainer: {
    width: '8.5%',
    height: 6,
    backgroundColor: colors.white,
  },
  progressBarUnFill: {
    width: '8.5%',
    height: 6,
    backgroundColor: colors.white,
    opacity: 0.5,
    marginLeft: '1.66%',
  },
  progrssBarFill: {
    width: '8.5%',
    height: 6,
    backgroundColor: colors.white,
    marginLeft: '1.66%',
  },
});

export const playerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    height: '50%',
  },
  text: {
    fontSize: 25,
    color: colors.grey500,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 20,
  },
});

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.white,
    // fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 3,
    marginBottom: 20,
    height: 40,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});


export default styles;
