import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container1: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#66348b',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#139e8c',
  },
  container3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#b679d3',
  },
  container4: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#5fb399',
  },
  container5: {
    flex: 1,
    backgroundColor: '#66348b',
  },
  container6: {
    flex: 1,
    backgroundColor: '#139e8c',
  },
  container7: {
    flex: 1,
    backgroundColor: '#b679d3',
  },
  containerForReminder: {
    flex: 1,
    backgroundColor: colors.white,
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
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.transparent,
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.transparent,
    fontFamily: 'Roboto',
    marginTop: '20%',
  },
  button: {
    fontSize: 20,
    color: colors.white,
    backgroundColor: '#7dd3d5',
    fontFamily: 'Roboto',
  },
  backImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearContainer: {
    flex: 1,
    backgroundColor: '#139e8c',
  },
  VLogoContainer: {
    backgroundColor: colors.transparent,
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  VLogo: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBackImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  IntroVideoView: {
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
    marginTop: '20%',
  },
  videoView: {
    backgroundColor: colors.white,
    margin: 20,
    flex: 1,
  },
  PlayerView: {
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    height: 250,
    marginTop: '5%',
  },
  playerContainerText: {
    fontSize: Platform.OS === 'ios' ? 16 : 20,
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.transparent,
    fontFamily: 'Roboto',
    marginTop: '1%',
  },
  playerText: {
    fontSize: Platform.OS === 'ios' ? 19 : 22,
    color: colors.white,
    textAlign: 'center',
    backgroundColor: colors.transparent,
    fontFamily: 'Roboto',
    marginTop: '5%',
  },
  reminderContainer: {
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    height: '70%',
    marginBottom: '10%',
  },
  reminderInnerView: {
    backgroundColor: colors.white,
    margin: 50,
    flex: 1,
  },
  backImage1: {
    flex: 1,
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diveReminderContainer: {
    flex: 1,
    backgroundColor: '#4faca0',
  },
  secondBlock: {
    width: '50%',
    height: '100%',
    backgroundColor: '#65348a',
  },
  thirdBlock: {
    width: '50%',
    height: '100%',
    backgroundColor: '#b3a3cb',
  },
  forthBlock: {
    width: '50%',
    height: '100%',
    backgroundColor: '#a6d9c9',
  },
  fifthBlock: {
    width: '50%',
    height: '100%',
    backgroundColor: '#4faca0',
  },
  portion: {
    width: '500%',
  },
  PlayerSubView: {
    backgroundColor: colors.red100,
    flexDirection: 'row',
    height: '20%',
    width: '100%',
    flex: 1,
  },
  loadingext: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
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
    backgroundColor: colors.transparent,
    justifyContent: 'center',
  },
});

export const reminderButtonStyles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  container: {
    // flex: 1,
    height: Platform.OS === 'ios' ? 45 : 45,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    width: '50%',
  },
});

export default styles;
