import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({

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
    marginTop: '15%',
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
    position: 'absolute',
    marginLeft: '10%',
    bottom: '10%',
  },
  FlatListImage: {
    height: 150,
    width: 150,
  },
});

export default styles;
