import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  backImage1: {
    flex: 1,
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
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
  reminderContainer: {
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginBottom: '10%',
  },
  reminderInnerView: {
    backgroundColor: colors.white,
    margin: 30,
    flex: 1,
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
  PlayerSubView: {
    backgroundColor: colors.red100,
    flexDirection: 'row',
    height: '30%',
    width: '100%',
    flex: 1,
  },
});

export const reminderButtonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    backgroundColor: colors.transparent,
    justifyContent: 'center',
  },
});

export default styles;
