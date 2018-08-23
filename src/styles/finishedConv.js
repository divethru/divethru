import { StyleSheet, Platform } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 13,
    marginLeft: 35,
    marginRight: 35,
    backgroundColor: colors.transparent,
  },
  quoteImage: {
    textAlign: 'center',
    fontSize: 30,
    backgroundColor: colors.transparent,
  },
  profilebcImage: {
    height: '100%',
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
  },
  betweenSubView: {
    alignItems: 'center',
    padding: 20,
  },
  betweenViewImg: {
    height: 20,
    marginBottom: 10,
    marginTop: 10,
    width: 20,
  },
  shareViewImg: {
    height: 55,
    marginBottom: 10,
    width: 55,
  },
  betweenViewText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
  },
  betweenViewEndText: {
    fontSize: 25,
    color: 'white',
  },
  betweenTimeView: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  centerContainer: {
    width: '100%',
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  centerImage: {
    width: '80%',
    height: '80%',
    marginBottom: 20,
  },
  innercenterContainer: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerContainer: {
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    backgroundColor: 'transparent',
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
