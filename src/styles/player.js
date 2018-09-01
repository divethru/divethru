import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from './theme';

const height = Dimensions.get('window').height;

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
    backgroundColor: 'transparent',
  },
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  iconLeftContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  centerText: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  topText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
  },
  iconRightContainer: {
    alignSelf: 'flex-end',
  },
  icon: {
    height: 20,
    width: 20,
    margin: 10,
  },
  text: {
    fontSize: 22,
    color: colors.white,
    fontFamily: 'Roboto',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  playerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  playerSvg: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 40,
    backgroundColor: colors.transparent,
  },
  iosViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.transparent,
  },
  iosViewIcon: {
    color: colors.grey700,
    position: 'absolute',
  },
  iosViewIconEnable: {
    color: '#cccccc',
    position: 'absolute',
  },
  timeContainer: {
    width: '70%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  timeInnerContainer: {
    flexDirection: 'row',
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
    marginTop: Platform.OS === 'ios' && height === 812 ? 40 : 0,
  },
  progressBarUnFill: {
    width: '8.5%',
    height: 6,
    backgroundColor: colors.white,
    opacity: 0.5,
    marginLeft: '1.66%',
    marginTop: Platform.OS === 'ios' && height === 812 ? 40 : 0,
  },
  progrssBarFill: {
    width: '8.5%',
    height: 6,
    backgroundColor: colors.white,
    marginLeft: '1.66%',
    marginTop: Platform.OS === 'ios' && height === 812 ? 40 : 0,
  },
  popupcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  inputContainer: {
    borderColor: '#7dd3d5',
    borderWidth: 2,
    // borderStyle: 'dashed',
    borderRadius: 5,
    height: 150,
    width: '90%',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closebtn: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    margin: 15,
  },
  image: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
  headingtext: {
    fontSize: 18,
    color: colors.black,
    letterSpacing: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
  },
  textinput: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: 'Roboto',
    color: colors.grey400,
    textAlignVertical: 'top',
  },
  playerIcon: {
    color: colors.grey700,
    position: 'absolute',
  },
  pauseIcon: {
    color: colors.grey700,
    position: 'absolute',
    alignItems: 'center',
  },
  pauseDisableIcon: {
    color: '#cccccc',
    position: 'absolute',
    alignItems: 'center',
  },
  playerSvgBack: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 35,
    marginBottom: 40,
    backgroundColor: colors.transparent,
  },
  playerView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: colors.transparent,
  },
  addJournal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  circleView: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 50 : 55,
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

export const timeButtonStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  container: {
    // flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 0,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export const timeButtonClickStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  container: {
    // flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export const popupbuttonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto',
  },
  container: {
    height: Platform.OS === 'ios' ? 50 : 55,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default styles;
