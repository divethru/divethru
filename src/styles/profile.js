import { StyleSheet, Platform } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
  // rightButtons: {
  //   position: 'absolute',
  //   top: 26,
  //   right: 26,
  //   height: '80%',
  //   width: '3.98%',
  // },
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
    fontSize: 20,
    color: '#34495e',
  },
  randerView: {
    padding: '4%',
    width: '100%',
    flexDirection: 'row',
  },
  rightView: {
    width: '75%',
    marginRight: '10%',
  },
  leftView: {
    width: '25%',
    alignItems: 'center',
    paddingRight: 10,
  },
  textStyle: {
    color: 'grey',
    // textAlign: 'justify',
    fontSize: 16,
    // flexWrap: 'wrap',
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

export default styles;
