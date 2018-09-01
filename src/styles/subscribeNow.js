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
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginRight: 10,
    marginTop: 10,
  },
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
    width: (width - 20) / 3,
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
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    alignSelf: 'center',
  },
  imagetxt3: {
    position: 'absolute',
    marginTop: 125,
    fontSize: 10,
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
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containermodal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '20%',
  },
  innerContainer: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    height: '20%',
  },
  btnTxt: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  boxTitle1: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  title:
  {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  tchblebtn: {
    marginTop: '4%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: '#a25ad6',
  },
  icLock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 25,
    paddingTop: 25,
  },
});

export default styles;
