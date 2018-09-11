import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from './theme';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    marginLeft: 35,
    marginTop: 35,
    marginRight: 35,
    backgroundColor: colors.transparent,
  },
  profilebcImage: {
    height: 180,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    marginTop: 20,
    color: colors.white,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    marginTop: 15,
  },
  subViewStyle: {
    padding: 26,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.white,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  submenu: {
    flex: 1,
  },
  subViewText: {
    fontSize: 14,
    color: 'grey',
  },
  errowImg: {
    height: '80%',
    width: '3.98%',
    position: 'absolute',
    top: 26,
    right: 26,
    tintColor: 'grey',
    resizeMode: 'stretch',
  },
  hideView: {
    display: 'none',
  },
  seperator: {
    justifyContent: 'center',
    backgroundColor: colors.grey200,
    height: 1,
  },
  boldSeperator: {
    justifyContent: 'center',
    backgroundColor: colors.grey300,
    height: 1,
  },
  arrowImg: {
    height: 10,
    width: 25,
  },
  BottomViewStyle: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.white,
  },
  BottomViewText: {
    fontSize: 10,
    color: '#34495e',
  },
  upperBackground: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperBackgroundTriangle: {
    width: 100,
    height: 84,
    justifyContent: 'center',
    resizeMode: 'center',
    alignItems: 'center',
  },
  upperBackgroundText: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 5,
  },
  randerView: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
  },
  rightView: {
    width: '75%',
    marginRight: '10%',
    justifyContent: 'center',
    flex: 1,
  },
  leftView: {
    width: '25%',
    alignItems: 'center',
    paddingRight: 10,
  },
  textStyle: {
    color: 'grey',
    fontSize: 17,
  },
  horizontalView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '70%',
    margin: 5,
  },
  betweenView: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
  },
  betweenSubView: {
    alignItems: 'center',
    margin: '3.98%',
  },
  betweenViewImg: {
    height: 30,
    marginBottom: 10,
    width: 30,
  },
  betweenViewText: {
    textAlign: 'center',
    fontSize: 12,
  },
  betweenViewEndText: {
    fontSize: 30,
    color: '#34495e',
  },
  betweenTimeView: {
    flexDirection: 'row',
  },
  plusImgTouchView: {
    height: 20,
    width: 20,
    right: 26,
    top: 26,
    position: 'absolute',
  },
  plusImg: {
    tintColor: '#34495e',
    height: 20,
    width: 20,
    transform: [{ rotate: '45deg' }],
  },
  bottomView: {
    padding: 26,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
  },
  bottomText: {
    fontSize: 20,
  },
  loadmoretext: {
    fontSize: 20,
    color: '#9f5dbc',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 0,
  },
  line: {
    borderBottomColor: '#9f5dbc',
    borderBottomWidth: 2,
    width: 90,
    alignSelf: 'center',
  },
  popcontainer: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  popinnerContainer: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  topText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 5,
  },
  hedertxt: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 20,
  },
  headingtext: {
    fontSize: 18,
    color: colors.black,
    letterSpacing: 2,
    paddingRight: 9,
    textAlign: 'center',
    marginBottom: 10,
  },
  bottomContainer: {
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  closebtn: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    marginTop: height > 750 ? 40 : 20,
  },
  image: {
    height: 20,
    width: 20,
  },
  sharecontainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  close: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
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
    margin: 20,
    height: Platform.OS === 'ios' ? 40 : 45,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export const nextButtonStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  container: {
    height: 40,
    backgroundColor: colors.transparent,
    alignSelf: 'center',
    width: '70%',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
});

export default styles;
