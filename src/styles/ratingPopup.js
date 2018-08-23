import { StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: colors.grey400,
    height: 1,
    width: '110%',
    marginTop: 5,
    marginBottom: 5,
  },
  closebtn: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
  img: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
  image: {
    height: 50,
    width: 50,
  },
  innerContainer: {
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    padding: 20,
  },
  imgcontainer: {
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 11,
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 13,
    color: colors.black,
    fontFamily: 'Roboto',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export const NotnowButtonStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#0070FF',
    fontFamily: 'Roboto',
  },
  container: {
    marginTop: 10,
    height: 20,
    backgroundColor: colors.transparent,
  },
});

export default styles;
