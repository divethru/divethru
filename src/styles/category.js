import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 25,
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
});

export default styles;
