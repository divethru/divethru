import { StyleSheet, Platform } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  backImageOfIntroContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introContainer: {
    flex: 1,
    height: 230,
    justifyContent: 'center',
    backgroundColor: colors.white,
    margin: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 2,
    elevation: 1,
    borderColor: colors.grey200,
    borderWidth: 1,
    borderRadius: 2,
  },
  dayText: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 25,
    position: 'absolute',
  },
  subText: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginBottom: 10,
  },
  descContainer: {
    margin: 25,
    marginTop: 10,
  },
  descText: {
    color: '#727272',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 18,
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
    marginTop: 20,
    marginBottom: 35,
    height: Platform.OS === 'ios' ? 40 : 45,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
  },
});

export default styles;
