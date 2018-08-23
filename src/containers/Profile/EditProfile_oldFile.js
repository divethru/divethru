import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import RNFetchBlob from 'react-native-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Moment from 'moment';
import { View, TextInput, Text, Image, ScrollView, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Spinner from '../../components/Spinner';
import firebaseApp from '../../components/constant';
import styles from '../../styles/editProfileStyle';
import IC_BACK from '../../assets/images/ic_back.png';
import ProfileImage from '../../assets/images/profile.png';
import editButton from '../../assets/images/add.png';
import { palette, colors } from '../../styles/theme';
import Profile from '../../assets/images/ic_profile.png';

class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const name = params ? params.name : undefined;
    return {
      tabBarIcon: ({ tintColor }) => <Image source={Profile} style={{ tintColor }} />,
      headerLeft: (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Image
            style={{ height: 20, width: 20, margin: 10 }}
            source={IC_BACK}
          />
        </TouchableOpacity>
      ),
      title: name,
      headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        alignSelf: 'center',
        color: 'grey',
        fontSize: 18,
        fontWeight: '300',
      },
      headerRight: (<View />),
      tabBarVisible: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      profileImage: ProfileImage,
      dateOfBirth: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile_number: '',
      cityName: '',
      // location: '',
      Imagestatus: 'local',
      tabVisible: true,
      ImageSourceBase64: undefined,
      btnload: false,
      IsProfile: false,
      inputFirstNameColor: palette.accentColor,
      inputFirstNameError: '',
      inputLastNameColor: palette.accentColor,
      inputLastNameError: '',
      inputDateOfBirthColor: palette.accentColor,
      inputDateOfBirthError: '',
      inputGenderColor: palette.accentColor,
      inputGenderError: '',
      inputCityNameColor: palette.accentColor,
      inputCityNameError: '',
      // inputLocationColor: palette.accentColor,
      // inputLocationError: '',
      loading: false,
      gender: 'Male',
      gender1: '',
      GenderData: [{
        value: 'Gender',
      }, {
        value: 'Male',
      }, {
        value: 'Female',
      }, {
        value: 'Non-Binary',
      }, {
        value: 'Questioning',
      }, {
        value: 'Prefer Not To Say',
      }, {
        value: 'Other',
      }],
      showPlacesList: false,
    };
  }

  componentWillMount= () => {
    // AsyncStorage.getItem('user_id').then((value) => {
      // this.setState({ user_id: value });
    const userId = firebaseApp.auth().currentUser.uid;
    this.setState({ user_id: userId });
    firebaseApp.database().ref(`/Users/${userId}`).once('value').then((snapshot) => {
      this.setState({
        email: (snapshot.val().email),
        firstName: (snapshot.val().first_name),
        lastName: (snapshot.val().last_name),
        dateOfBirth: (snapshot.val().birthdate ? snapshot.val().birthdate : ''),
        // cityName: (snapshot.val().city ? snapshot.val().city : ''),
        // location: (snapshot.val().location ? snapshot.val().location : ''),
      });

      const genderData = [];
      for (let i = 0; i < this.state.GenderData.length; i += 1) {
        genderData.push(this.state.GenderData[i].value);
      }

      if (genderData.includes(snapshot.val().gender)) {
        this.setState({ gender: snapshot.val().gender });
        if (snapshot.val().gender === 'Other') {
          this.setState({ gender: 'Other', gender1: 'Other' });
        }
      } else {
        this.setState({
          gender: snapshot.val().gender ? 'Other' : 'Gender',
          gender1: snapshot.val().gender ? snapshot.val().gender : '',
        });
      }

      if (snapshot.val().url) {
        if (snapshot.val().url !== '') {
          this.setState({
            profileImage: (snapshot.val().url),
            Imagestatus: 'url',
            IsProfile: true,
          });
        }
      }

      if (snapshot.val().mobile_number) {
        this.setState({ mobile_number: (snapshot.val().mobile_number) });
      }
    })
        .catch((error) => {
          alert(error.message);
        });
    // });
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  onclick=() => {
    const options = {
      quality: 1.0,
      maxWidth: 100,
      maxHeight: 100,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const sourceurl = response.uri;
        const sourceName = response.fileName;
        this.setState({
          Imagestatus: 'local',
          profileImage: source,
          ImageSourceBase64: sourceurl,
          ImageName: sourceName,
        });
      }
    });
  }

  validateFirstName(firstName) {
    if (!firstName) {
      this.setState({
        inputFirstNameColor: colors.red600,
        inputFirstNameError: 'A first name is required',
      });
    } else {
      this.setState({
        firstName,
        inputFirstNameColor: palette.accentColor,
        inputFirstNameError: '',
      });
    }
    this.setState({ firstName });
  }

  validateLastName(lastName) {
    if (!lastName) {
      this.setState({
        inputLastNameColor: colors.red600,
        inputLastNameError: 'A last name is required',
      });
    } else {
      this.setState({
        lastName,
        inputLastNameColor: palette.accentColor,
        inputLastNameError: '',
      });
    }
    this.setState({ lastName });
  }

  validateGender(gender) {
    if (gender === '') {
      this.setState({
        inputGenderColor: colors.red600,
        inputGenderError: 'A gender is required',
      });
    } else {
      this.setState({
        gender1: gender,
        inputGenderColor: palette.accentColor,
        inputGenderError: '',
      });
    }
    this.setState({ gender1: gender });
  }

  // validateCity(cityName) {
  //   if (!cityName) {
  //     this.setState({
  //       inputCityNameColor: colors.red600,
  //       inputCityNameError: 'A city is required',
  //     });
  //   } else {
  //     this.setState({
  //       cityName,
  //       inputCityNameColor: palette.accentColor,
  //       inputCityNameError: '',
  //     });
  //   }
  //   this.setState({ cityName });
  // }

  // validateLocation(location) {
  //   if (!location) {
  //     this.setState({
  //       inputLocationColor: colors.red600,
  //       inputLocationError: 'A location is required',
  //     });
  //   } else {
  //     this.setState({
  //       location,
  //       inputLocationColor: palette.accentColor,
  //       inputLocationError: '',
  //     });
  //   }
  //   this.setState({ location });
  // }

  validateDateOfBirth(dateOfBirth) {
    const bod = Moment(dateOfBirth).format('YYYY-MM-DD');
    const birthdate = new Date(bod);
    const cur = new Date();
    const diff = cur - birthdate; // This is the difference in milliseconds
    const age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25

    if (!dateOfBirth) {
      this.setState({
        inputDateOfBirthColor: colors.red600,
        inputDateOfBirthError: 'Date of Birth is required',
        dateOfBirth: '',
      });
    } else if (age < 8) {
      this.setState({
        inputDateOfBirthColor: colors.red600,
        inputDateOfBirthError: 'Your age must be 8 or older.',
        dateOfBirth: '',
      });
    } else {
      this.setState({
        dateOfBirth,
        inputDateOfBirthColor: palette.accentColor,
        inputDateOfBirthError: '',
      });
    }
  }

  uploadImage=(uri, mime = 'image/jpeg') => new Promise((resolve, reject) => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageRef = firebaseApp.storage().ref('Profile').child(`${this.state.email}.jpg`);

    fs.readFile(uploadUri, 'base64').then(data => Blob.build(data, { type: `${mime};BASE64` })).then((blob) => {
      uploadBlob = blob;
      return imageRef.put(blob, { contentType: mime });
    })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        this.state.imgUrl = url;
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  })

  updateUser= () => {
    if (this.state.dateOfBirth !== '' &&
    this.state.firstName !== '' &&
    this.state.lastName !== '' &&
    this.state.email !== '' &&
    this.state.inputFirstNameError === '' &&
    this.state.inputLastNameError === '' &&
    this.state.inputDateOfBirthError === '' &&
    this.state.inputGenderError === ''
  ) {
      const currentDate = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      this.setState({
        btnload: true,
        loading: true,
      });
      this.setState({ loading: true });
      if (this.state.gender === 'Gender') {
        this.state.gender = '';
      }
      if (this.state.ImageSourceBase64 !== undefined) {
        this.uploadImage(this.state.ImageSourceBase64).then(() => {
          const url = this.state.imgUrl;
          const finalSessions = {
            birthdate: this.state.dateOfBirth,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            lastUpdated_on: currentDate,
            email: this.state.email,
            mobile_number: this.state.mobile_number,
            gender: this.state.gender === 'Other' ? this.state.gender1 : this.state.gender,
            // city: this.state.cityName,
            // location: this.state.location,
            url,
          };
          const ref2 = firebaseApp.database().ref('Users').child(this.state.user_id);
          ref2.update(finalSessions);

          AsyncStorage.setItem('full_name', `${this.state.firstName} ${this.state.lastName}`).then(() => {
            AsyncStorage.setItem('emailid', this.state.email).then(() => {
              AsyncStorage.setItem('IMG', this.state.email).then(() => {
                AsyncStorage.setItem('url', url).then(() => {
                  this.setState({
                    btnload: false,
                    loading: false,
                  });
                  this.props.navigation.goBack();
                });
              });
            });
          });
        })
        .catch((error) => {
          console.log(`inesrt->${error.message}`);
        });
      } else {
        const finalSessions = {
          birthdate: this.state.dateOfBirth,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          lastUpdated_on: currentDate,
          gender: this.state.gender === 'Other' ? this.state.gender1 : this.state.gender,
          email: this.state.email,
          // city: this.state.cityName,
          // location: this.state.location,
          mobile_number: this.state.mobile_number,
        };
        const ref2 = firebaseApp.database().ref('Users').child(this.state.user_id);
        ref2.update(finalSessions);
        AsyncStorage.setItem('full_name', `${this.state.firstName} ${this.state.lastName}`).then(() => {
          AsyncStorage.setItem('emailid', this.state.email).then(() => {
            AsyncStorage.setItem('IMG', this.state.email).then(() => {
              this.setState({
                btnload: false,
                loading: false,
              });
              this.props.navigation.goBack();
            });
          });
        });
      }
    } else {
      this.showErrorAlertView('All fields are required with proper data.');
    }
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  dropdownChange= (e) => {
    this.setState({
      gender: e,
      inputGenderError: (e === 'Other') ? 'A Gender is required' : '',
      gender1: '',
    });
  }

  render() {
    return (
      <Spinner isLoading={this.state.loading}>
        <ScrollView style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View>
              {this.state.Imagestatus === 'local'
                ?
                  <Image
                    source={this.state.profileImage}
                    style={styles.profileImage}
                  />
                :
                  <Image
                    source={{ uri: this.state.profileImage }}
                    style={styles.profileImage}
                  />
              }

              <TouchableOpacity
                style={{
                  height: 36,
                  width: 36,
                  bottom: 20,
                  right: 20,
                  position: 'absolute',
                }}
                onPress={() => { this.onclick(); }}
              >
                <Image
                  source={editButton}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <KeyboardAwareScrollView>
            <TextInput
              style={styles.textBox}
              value={this.state.firstName}
              onSubmitEditing={() => this.lastName.focus()}
              returnKeyType="next"
              onChangeText={(firstName) => { this.validateFirstName(firstName); }}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.helperText}>{this.state.inputFirstNameError}</Text>

            <TextInput
              style={styles.textBox}
              value={this.state.lastName}
              returnKeyType="next"
              ref={(input) => { this.lastName = input; }}
              onChangeText={(lastName) => { this.validateLastName(lastName); }}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.helperText}>{this.state.inputLastNameError}</Text>

            {Platform.OS === 'ios'
             ? (
               <TextInput
                 style={[styles.textBox, { color: '#C0BEBE' }]}
                 editable={false}
                 value={this.state.email}
                 underlineColorAndroid="transparent"
               />
             )
             : (
               <TextInput
                 style={styles.textBox}
                 editable={false}
                 value={this.state.email}
                 underlineColorAndroid="transparent"
               />
             )
            }

            <Text style={styles.helperText} />

            <View style={styles.genderContainer}>
              <Text style={styles.genderText}>Gender:</Text>
              <View style={styles.dropdownView}>
                <Dropdown
                  itemTextStyle={styles.genderSubContainer}
                  label=""
                  value={this.state.gender}
                  data={this.state.GenderData}
                  onChangeText={(e) => { this.dropdownChange(e); }}
                />
              </View>
            </View>

            <View
              height={this.state.gender === 'Other' ? undefined : 0}
            >
              <TextInput
                style={styles.textBox}
                value={this.state.gender1}
                returnKeyType="next"
                ref={(input) => { this.lastName = input; }}
                placeholder="Gender"
                onChangeText={(OtherGender) => { this.validateGender(OtherGender); }}
                underlineColorAndroid="transparent"
              />

              <Text
                style={styles.helperText}
                height={this.state.gender === 'Other' ? undefined : 0}
                width={this.state.gender === 'Other' ? undefined : 0}
              >
                {this.state.inputGenderError}
              </Text>
            </View>

            <View style={styles.datepicker}>
              <DatePicker
                ref={(datepicker) => { this.dateOfBirth = datepicker; }}
                date={this.state.dateOfBirth}
                mode="date"
                style={styles.datePickerBox}
                placeholder="Date of birth"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    left: 10,
                    position: 'absolute',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  placeholderText: {
                    color: 'grey',
                  },
                }}
                onDateChange={(dateOfBirth) => { this.validateDateOfBirth(dateOfBirth); }}
              />
            </View>

            <Text style={styles.helperText}>{this.state.inputDateOfBirthError}</Text>
            {/* <TextInput
              style={styles.textBox}
              value={this.state.cityName}
              placeholder="City"
              onSubmitEditing={() => this.location.focus()}
              returnKeyType="next"
              onChangeText={(e) => { this.validateCity(e); }}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.helperText}>{this.state.inputCityNameError}</Text>

            <TextInput
              style={styles.textBox}
              value={this.state.location}
              placeholder="Location"
              onChangeText={(e) => { this.validateLocation(e); }}
              ref={(input) => { this.location = input; }}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.helperText}>{this.state.inputLocationError}</Text> */}
            {/* <GooglePlacesAutocomplete
              placeholder="Address"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed={this.state.showPlacesList}    // true/false/undefined
              fetchDetails
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                console.log(`data->${data.description}`);
                this.setState({ showPlacesList: false });
                this.validateLocation(data.description);
              }}
              getDefaultValue={() => { return `${this.state.location}`; }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAEHaO8ajJ_V2O7LH1A7JNjNiMOeXiUS78',
                language: 'en', // language of the results
                types: 'geocode', // default: 'geocode' for only city used (cities)
              }}
              styles={{
                textInputContainer: {
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                },
                textInput: {
                  fontSize: 14,
                  height: Platform.OS === 'ios' ? 40 : 35,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  // marginTop: Platform.OS === 'ios' ? 0 : 18,
                  backgroundColor: '#f4f4f4',
                  borderRadius: 0,
                },
              }}
              // currentLocation // Will add a 'Current location' button at the top of the predefined places list
              // currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              // GoogleReverseGeocodingQuery={{
              //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              // }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}
              textInputProps={{
                value: this.state.location,
                underlineColorAndroid: 'transparent',
                clearButtonMode: 'while-editing',
                onChangeText: (e) => { this.setState({ location: e }); },
                onFocus: () => this.setState({ showPlacesList: true }),
                // onBlur: () => this.setState({ showPlacesList: false }),
              }}
              // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              // predefinedPlaces={[homePlace, workPlace]}

              // debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
              // renderRightButton={() => <Text>Custom text after the input</Text>}
            /> */}

            <Text style={styles.helperText}>{this.state.inputLocationError}</Text>

            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => this.updateUser()} disabled={this.state.btnload}
            >
              <Text style={styles.text}>S U B M I T</Text>
            </TouchableOpacity>

            <DropdownAlert
              updateStatusBar={false}
              ref={(ref) => { this.dropdown = ref; }}
              onClose={data => this.onClose(data)}
            />
          </KeyboardAwareScrollView>
        </ScrollView>
      </Spinner>
    );
  }
}

EditProfile.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EditProfile;
