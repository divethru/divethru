import { Platform, StyleSheet } from 'react-native';
import { colors } from './theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    // marginBottom: 20,
  },
  profileImage: {
    margin: 26,
    height: 100,
    width: 100,
    justifyContent: 'center',
    borderRadius: 50,
  },
  textBox: {
    fontSize: 14,
    height: Platform.OS === 'ios' ? 40 : 45,
    marginLeft: 10,
    marginRight: 10,
    marginTop: Platform.OS === 'ios' ? 0 : 18,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  helperText: {
    color: colors.red600,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: 14,
    color: colors.white,
  },
  textContainer: {
    flex: 1,
    height: Platform.OS === 'ios' ? 40 : 45,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#7dd3d5',
    justifyContent: 'center',
    // marginTop: 28,
    marginBottom: 20,
  },
  datePickerBox: {
    width: '100%',
  },
  genderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Platform.OS === 'ios' ? 6 : 0,
    marginLeft: 10,
    marginRight: 10,
  },
  genderSubContainer: {
    flex: 1,
    marginLeft: Platform.OS === 'ios' ? 10 : 4,
    marginRight: 18,
  },
  genderText: {
    marginLeft: Platform.OS === 'ios' ? 5 : 10,
    color: colors.grey600,
    width: Platform.OS === 'ios' ? 50 : 70,
    fontFamily: 'Roboto',
    marginRight: Platform.OS === 'ios' ? 5 : 10,
    marginVertical: 10,
  },
  radioButton: {
    width: Platform.OS === 'ios' ? 150 : 250,
    marginRight: 10,
  },
  datepicker: {
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: '#f4f4f4',
  },
  dropdownView: {
    flex: 1,
    marginRight: 18,
    marginTop: Platform.OS === 'ios' ? -18 : -14,
  },
  editProfileImage: {
    height: 36,
    width: 36,
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
});

export default styles;
