import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: colors.white,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  innerContainer: {
    flex: 1,
    marginTop: 200,
    marginLeft: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    height: 200,
    width: '80%',
    borderRadius: 8,
  },
  gridItem: {
    width: (width - 30) / 2,
    height: (width - 50) / 2,
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
  },
  gridItemText: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: 16,
    color: colors.white,
    marginLeft: '10%',
    marginTop: '20%',
  },
  freeText: {
    color: 'white',
    marginLeft: '10%',
    marginBottom: '2%',
    bottom: '2%',
    fontWeight: '600',
    fontSize: 14,
  },
  sessionCountText: {
    color: 'white',
    marginLeft: '10%',
    bottom: '4%',
    fontWeight: '300',
    fontSize: 12,
  },
  SubCategoryList: {
    backgroundColor: colors.white,
    paddingHorizontal: '5%',
    alignSelf: 'stretch',
  },
  MainList: {
    flex: 1,
  },
  MainListText: {
    color: colors.grey800,
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: 3,
  },
  FlatListViewStyle: {
    backgroundColor: 'white',
    height: 150,
  },
  FlatListText: {
    color: colors.white,
    fontSize: 16,
    position: 'absolute',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '10%',
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
    fontSize: 11,
    color: '#fff',
    fontWeight: '300',
    alignSelf: 'center',
  },
  FlatListSessionText: {
    color: 'white',
    fontSize: width > 400 ? 15 : 14,
    position: 'absolute',
    marginLeft: '10%',
    marginBottom: '2%',
    bottom: '15%',
  },
  FlatListSessionProgres: {
    width: 120,
    marginLeft: '10%',
    bottom: '4%',
    marginTop: 5,
  },
  FlatListImage: {
    height: 150,
    width: 150,
  },
  content: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bkimg: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginTop: '4%',
    color: 'white',
    textAlign: 'center',
  },
  tchblebtn: {
    marginTop: '6%',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 300,
    width: 300 - 30,
  },
  boxTitle1: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  boxTitle2: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  btnTxt: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  containermodal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '90%',
  },
  innerContainer: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    height: '90%',
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
