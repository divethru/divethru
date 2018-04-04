import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 25,
    backgroundColor: colors.white,
  },
  // listView: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   flex: 1,
  //   marginHorizontal: 1,
  //   justifyContent: 'center',
  //   // marginLeft: width > 400 ? 60 : 40,
  //   // marginRight: width > 400 ? 60 : 40,
  // },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  gridItem: {
    width: (width - 30) / 2,
    height: (width - 50) / 2, // (height - 30) / 4,
  },
  // gridItem: {
  //   width: width > 400 ? 170 : 130,
  //   height: width > 400 ? 170 : 130,
  //   justifyContent: 'center',
  // },
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
    marginLeft: '10%',
    marginTop: '10%',
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
});

export default styles;
