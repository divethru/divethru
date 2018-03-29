import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.white,
  },
  mainheadingtext: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  headtext: {
    fontSize: 14,
    color: colors.grey700,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: colors.grey700,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  image: {
    height: 20,
    width: 20,
  },
  closebtn: {
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  // closebtn: {
  //   height: 20,
  //   width: 20,
  //   marginLeft: 280,
  //   marginTop: 20,
  // },
  headingtext: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  imageicon: {
    height: 70,
    width: 70,
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.black,
    textAlign: 'center',
  },
  txtsubscription: {
    fontSize: 12,
    color: colors.grey900,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  imagebox: {
    height: 155,
    width: (width - 20) / 3, // 115,
    borderRadius: 5,
    borderColor: '#a25ad6',
    borderWidth: 2,
  },
  imgbox: {
    height: 155,
    width: (width - 20) / 3,
    borderRadius: 5,
  },
  imagebckground: {
    height: 143,
    width: (width - 50) / 3,
    position: 'absolute',
    borderRadius: 5,
    margin: 6,
  },
  imagetxt1: {
    position: 'absolute',
    marginTop: 25,
    fontSize: 15,
    color: '#fff',
    fontWeight: '300',
    alignSelf: 'center',
  },
  imagetxt2: {
    position: 'absolute',
    marginTop: 65,
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'center',
  },
  imagetxt3: {
    position: 'absolute',
    marginTop: 125,
    fontSize: 11,
    color: '#fff',
    fontWeight: '300',
    alignSelf: 'center',
  },
  rtext: {
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    color: colors.grey500,
    fontSize: 15,
  },
});

export default styles;
