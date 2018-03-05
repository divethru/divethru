import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
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
  },
  text: {
    fontSize: 18,
    color: colors.grey500,
    marginTop: 20,
    marginBottom: 20,
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: colors.grey100,
    height: 2,
    width: '70%',
    marginTop: 10,
  },
  closebtn: {
    height: 20,
    width: 20,
    // left: 130,
    alignSelf: 'flex-end',
  },
  headingtext: {
    fontSize: 21,
    color: colors.black,
    letterSpacing: 2,
    paddingRight: 9,
  },
  image: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
  prInnerContainer: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  prTitle: {
    fontSize: 16,
    color: colors.grey800,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 20,
  },
  prDesc: {
    fontSize: 14,
    color: colors.grey600,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  clearContainer: {
    flex: 1,
    backgroundColor: '#139e8c',
  },
});

export const FreeButtonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.blue500,
    fontFamily: 'Roboto',
  },
  container: {
    marginTop: 4,
    height: 40,
    backgroundColor: colors.transparent,
  },
});

export const learnMoreButtonStyles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: '#9f5dbc',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  container: {
    marginTop: 20,
    height: 10,
    backgroundColor: colors.transparent,
  },
});

export const buttonStyles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: colors.white,
    fontFamily: 'Roboto',
  },
  container: {
    flex: 1,
    marginTop: 20,
    borderRadius: 3,
    marginBottom: 20,
    height: Platform.OS === 'ios' ? 45 : 45,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export default styles;
