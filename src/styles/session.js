import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: colors.white,
  },
  // listView: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   flex: 1,
  //   marginHorizontal: 1,
  //   justifyContent: 'center',
  //   // marginLeft: width / 10,
  // },
  // gridItem: {
  //   width: width > 400 ? 170 : 130,
  //   height: width > 400 ? 170 : 130,
  //   justifyContent: 'center',
  //   alignItems: 'center',
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
});

export default styles;
