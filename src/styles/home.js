import { Platform, StyleSheet, Dimensions } from 'react-native';
import { colors } from './theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  introContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9f5dbc',
    height: 230,
  },
  backImageOfIntroContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  tabTitle: {
    color: '#9f5dbc',
    fontFamily: 'Roboto',
    fontSize: 13,
    marginTop: 5,
  },
  introPrgText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 25,
    marginTop: 20,
    backgroundColor: colors.transparent,
  },
  beginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white,
    // height: 32,
    marginTop: 30,
    borderRadius: 18,
  },
  playArrow: {
    margin: 8,
    marginLeft: 12,
  },
  beginText: {
    marginTop: Platform.OS === 'ios' ? 8 : 6,
    marginRight: 16,
    color: colors.black,
    fontSize: 13,
    fontFamily: 'Roboto',
  },
  dailyQuotesContainer: {
    flex: 1,
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
  quotesTitleText: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginTop: 15,
    backgroundColor: colors.transparent,
  },
  seperator: {
    justifyContent: 'center',
    backgroundColor: colors.grey100,
    height: 1,
    width: '70%',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  quotesSubText: {
    color: '#9c9c9c',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 14,
    margin: 10,
    backgroundColor: colors.transparent,
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  categoryTitle: {
    color: '#3c4b65',
    fontFamily: 'Roboto',
    fontSize: 14,
    backgroundColor: colors.transparent,
  },
  categoryInnerContainer: {
    backgroundColor: colors.transparent,
    height: 20,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  diveContainer: {
    backgroundColor: colors.white,
    height: 110,
    margin: 25,
    marginTop: 10,
  },
  diveInnerContainer: {
    backgroundColor: colors.white,
  },
  subscribeText: {
    color: '#3c4b65',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: 20,
    marginLeft: 35,
    marginTop: 35,
    marginRight: 35,
    backgroundColor: colors.transparent,
  },
  listView: {
    backgroundColor: colors.transparent, // '#F5FCFF',
  },
  listViewContainer: {
    height: 110,
    width: 110,
  },
  listViewText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    backgroundColor: colors.transparent,
  },
  listViewSubText: {
    color: colors.white,
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginTop: 5,
  },
  SubCategoryList: {
    backgroundColor: colors.white,
    paddingHorizontal: '5%',
    alignSelf: 'stretch',
  },
  MainList: {
    flex: 1,
    marginBottom: 5,
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
  FlatListImage: {
    height: 130,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatListText: {
    color: colors.white,
    fontSize: width > 400 ? 16 : 14,
    position: 'absolute',
    textAlign: 'center',
    marginLeft: '10%',
    marginTop: '10%',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});

export const learnMoreButtonStyles = StyleSheet.create({
  text: {
    fontSize: 11,
    color: '#9f5dbc',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 0,
  },
  container: {
    height: 20,
    backgroundColor: colors.transparent,
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
