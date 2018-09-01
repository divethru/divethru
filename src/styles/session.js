import { Platform, Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backImage: {
    flex: 1,
    width,
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
  topText: {
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
  iconRightContainer: {
    alignSelf: 'flex-end',
  },
  icon: {
    height: 20,
    width: 20,
    margin: 10,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  currentBackground: {
    width,
    height,
    top: 0,
    resizeMode: 'cover',
    position: 'absolute',
  },
  playerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  FlatlistContainer: {
    width,
    backgroundColor: 'transparent',
  },
  FlatlistContainerin: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  sliderContainer: {
    marginTop: 42,
    marginBottom: 47,
    justifyContent: 'center',
    alignItems: 'center',
    height: 136,
    width: 136,
    backgroundColor: 'transparent',
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
  text: {
    fontSize: 22,
    color: colors.white,
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  gridItem: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    backgroundColor: 'transparent',
  },
  btnContainer: {
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    marginVertical: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  textOfButton: {
    fontSize: 14,
    color: colors.white,
    marginHorizontal: 24,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  noAudio: {
    height: 50,
    backgroundColor: colors.grey100,
    margin: 10,
    borderRadius: 5,
    borderColor: colors.grey400,
    borderWidth: 2,
    justifyContent: 'center',
  },
  noAudioContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
  noSessionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icBack: {
    height: 20,
    width: 20,
    margin: 10,
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
    flex: 1,
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

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  container: {
    marginTop: 5,
    marginBottom: 35,
    height: Platform.OS === 'ios' ? 40 : 45,
    backgroundColor: '#00000040',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default styles;
