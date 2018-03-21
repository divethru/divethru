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
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  gridItem: {
    width: width > 400 ? 170 : 120,
    height: width > 400 ? 170 : 120,
    justifyContent: 'center',
  },
  gridItemImage: {
    width: '100%',
    height: '100%',
  },
  gridItemText: {
    textAlign: 'center',
    position: 'absolute',
    fontSize: width > 400 ? 20 : 14,
    color: colors.white,
    fontWeight: '300',
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
    fontSize: 16,
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
    fontSize: width > 400 ? 20 : 16,
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
