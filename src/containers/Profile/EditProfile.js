import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import RNFetchBlob from 'react-native-fetch-blob';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Moment from 'moment';
import { View, TextInput, Text, Image, ScrollView, TouchableOpacity, AsyncStorage, Platform, Picker } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Spinner from '../../components/Spinner';
import firebaseApp from '../../components/constant';
import styles from '../../styles/editProfileStyle';
import IC_BACK from '../../assets/images/ic_back.png';
import ProfileImage from '../../assets/images/profile.png';
import editButton from '../../assets/images/add.png';
import { palette, colors } from '../../styles/theme';
import Profile from '../../assets/images/ic_profile.png';
import Loader from '../../components/Loader';

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
      loading: false,
      loader: false,
      gender: 'Male',
      gender1: '',
      CityData: [{ id: 'Select city', value: 'Select city' }],
      StateData: [{ id: 'Select state', value: 'Select state' }],
      CountryData: [{ id: 'Select country', value: 'Select country' }],
      city: 'Select city',
      state: 'Select state',
      country: 'Select country',
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
      selectCountryError: '',
      selectStateError: '',
      selectCityError: '',
      showPlacesList: false,
    };
  }

  componentWillMount= () => {
    // AsyncStorage.getItem('user_id').then((value) => {
      // this.setState({ user_id: value });
    this.setState({ loader: true });
    const userId = firebaseApp.auth().currentUser.uid;
    this.setState({ user_id: userId });
    fetch('http://geodata.solutions/api/api.php?type=getCountries', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      const CountryData = this.state.CountryData;
      Object.keys(responseJson.result).forEach((key) => {
        CountryData.push({ id: key, value: responseJson.result[key] });
      });
      this.setState({ CountryData });

      firebaseApp.database().ref(`/Users/${userId}`).once('value').then((snapshot) => {
        this.setState({
          email: (snapshot.val().email),
          firstName: (snapshot.val().first_name),
          lastName: (snapshot.val().last_name),
          dateOfBirth: (snapshot.val().birthdate ? snapshot.val().birthdate : ''),
          // city: (snapshot.val().City ? snapshot.val().City : ''),
          // state: (snapshot.val().State ? snapshot.val().State : ''),
        });

        const countryCode = (snapshot.val().Country ? snapshot.val().Country : '');
        if (countryCode !== '') {
          const countryIndexNumber = CountryData.findIndex((item) => {
            return item.id === countryCode;
          });
          this.setState({ country: this.state.CountryData[countryIndexNumber].value, countryCode });
        } else {
          this.setState({
            country: 'Select country',
            countryCode: 'Select country',
            state: 'Select country',
            stateCode: 'Select country',
            city: 'Select city',
            cityCode: 'Select city',
          });
        }

        const stateCode = (snapshot.val().State ? snapshot.val().State : '');
        if (stateCode !== '') {
          fetch(`http://geodata.solutions/api/api.php?type=getStates&countryId=${countryCode}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json())
          .then((responseJson1) => {
            const StateData = this.state.StateData;
            Object.keys(responseJson1.result).forEach((key) => {
              StateData.push({ id: key, value: responseJson1.result[key] });
            });
            this.setState({ StateData });
            const stateIndexNumber = StateData.findIndex((item) => {
              return item.id === stateCode;
            });
            this.setState({ state: this.state.StateData[stateIndexNumber].value, stateCode });

            const cityName = (snapshot.val().City ? snapshot.val().City : '');
            if (cityName !== '') {
              fetch(`http://geodata.solutions/api/api.php?type=getCities&countryId=${countryCode}&stateId=${stateCode}`, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              })
              .then(response => response.json())
              .then((responseJson2) => {
                const CityData = this.state.CityData;
                const arrayOfCity = Object.keys(responseJson2.result).length;
                if (arrayOfCity > 0) {
                  Object.keys(responseJson2.result).forEach((key) => {
                    CityData.push({ id: key, value: responseJson2.result[key] });
                  });
                } else {
                  CityData.push({ id: stateCode, value: this.state.state });
                  // alert('in this');
                }
                // Object.keys(responseJson2.result).forEach((key) => {
                //   CityData.push({ id: key, value: responseJson2.result[key] });
                // });
                // this.setState({ CityData });
                // alert(cityName);
                this.setState({ city: cityName });
              })
              .catch((error) => {
                console.log(error);
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }

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
        console.log(error.message);
      });

      this.setState({ loader: false });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount = () => {
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  onclick=() => {
    console.log('ImagePicker onclick');
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
        console.log('ImagePicker User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('ImagePicker User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const sourceurl = response.uri;
        const sourceName = response.fileName;

        console.log('ImagePicker sourceurl: ' + sourceurl);
        console.log('ImagePicker sourceName: ' + sourceName);
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

  validateLocation(location) {
    if (!location) {
      this.setState({
        inputLocationColor: colors.red600,
        inputLocationError: 'A location is required',
      });
    } else {
      this.setState({
        location,
        inputLocationColor: palette.accentColor,
        inputLocationError: '',
      });
    }
    this.setState({ location });
  }

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
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const originalXMLHttpRequest = window.XMLHttpRequest;
    const originalBlob = window.Blob;
    const imageRef = firebaseApp.storage().ref('Profile').child(`${this.state.email}.jpg`);

    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

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
      .then(() => {
        window.XMLHttpRequest = originalXMLHttpRequest;
        window.Blob = originalBlob;
      })
      .catch((error) => {
        reject(error);
      });
  })

  // uploadImageToStorage = (file1) => {
  //   const storage = firebaseApp.storage();
  //   return new Promise((resolve, reject) => {
  //     const fileUpload = storage.bucket().file('ABC');
  //     const blobStream = fileUpload.createWriteStream({
  //       metadata: {
  //         contentType: 'image/jpg',
  //       },
  //     });

  //     blobStream.on('error', error => reject(error));

  //     blobStream.on('finish', () => {
  //       fileUpload.getMetadata()
  //         .then(metadata => resolve(metadata))
  //         .catch(error => reject(error));
  //     });

  //     blobStream.end(file.buffer);
  //   });
  // }

  updateUser= () => {
    if (this.state.dateOfBirth !== '' &&
    this.state.firstName !== '' &&
    this.state.lastName !== '' &&
    this.state.email !== '' &&
    this.state.inputFirstNameError === '' &&
    this.state.inputLastNameError === '' &&
    this.state.inputDateOfBirthError === '' &&
    this.state.inputGenderError === '' &&
    this.state.country !== '' &&
    this.state.state !== '' &&
    this.state.city !== '' &&
    this.state.country !== 'Select country' &&
    this.state.state !== 'Select state' &&
    this.state.city !== 'Select city'
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
        // this.uploadImageToStorage(this.state.sourceurl);
        this.uploadImage(this.state.ImageSourceBase64).then(() => {
          const url = this.state.imgUrl;
          const finalSessions = {
            birthdate: this.state.dateOfBirth,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            lastUpdated_on: currentDate,
            email: this.state.email,
            // mobile_number: this.state.mobile_number,
            gender: this.state.gender === 'Other' ? this.state.gender1 : this.state.gender,
            City: this.state.city ? this.state.city : '',
            State: this.state.stateCode ? this.state.stateCode : '',
            Country: this.state.countryCode ? this.state.countryCode : '',
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
          City: this.state.city ? this.state.city : '',
          State: this.state.stateCode ? this.state.stateCode : '',
          Country: this.state.countryCode ? this.state.countryCode : '',
          // mobile_number: this.state.mobile_number,
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

  dropdownChangeCountry = (e, index) => {
    this.setState({ loader: true });
    // if (this.state.state !== 'Select state') {
      this.setState({
        StateData: [{ id: 'Select state', value: 'Select state' }],
      });
    // }
    // if (this.state.city !== 'Select city') {
      this.setState({
        CityData: [{ id: 'Select city', value: 'Select city' }],
      });
    // }
    fetch(`http://geodata.solutions/api/api.php?type=getStates&countryId=${this.state.CountryData[index].id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      const StateData = this.state.StateData;
      Object.keys(responseJson.result).forEach((key) => {
        StateData.push({ id: key, value: responseJson.result[key] });
      });
      this.setState({ StateData, loader: false });
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({
      state: 'Select state',
      stateCode: 'Select state',
      city: 'Select city',
      cityCode: 'Select city',
      country: e,
      countryCode: this.state.CountryData[index].id,
    });
  }

  dropdownChangeState = (e, index) => {
    this.setState({ loader: true });
    // if (this.state.city !== 'Select city') {
      this.setState({
        CityData: [{ id: 'Select city', value: 'Select city' }],
      });
    // }
    fetch(`http://geodata.solutions/api/api.php?type=getCities&countryId=${this.state.countryCode}&stateId="${this.state.StateData[index].id}"`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      // alert(JSON.stringify(responseJson.result));
      const CityData = [{ id: 'Select city', value: 'Select city' }];
      const arrayOfCity = Object.keys(responseJson.result).length;
      if (arrayOfCity > 0) {
        Object.keys(responseJson.result).forEach((key) => {
          CityData.push({ id: key, value: responseJson.result[key] });
        });
      } else {
        CityData.push({ id: this.state.StateData[index].id, value: e });
        // alert('in this');
      }
      this.setState({
        CityData,
        loader: false,
      });
      // alert(JSON.stringify(CityData));
      this.setState({
        city: 'Select city',
        cityCode: 'Select city',
        state: e,
        stateCode: this.state.StateData[index].id,
      });
    })
    .catch((error) => {
      // alert(error);
      console.log(error);
    });
  }

  dropdownChangeCity = (e, index) => {
    this.setState({
      city: e,
      cityCode: this.state.CityData[index].id,
    });
  }

  render() {
    return (
      <Spinner isLoading={this.state.loading}>
        {this.state.loader === true ? <Loader /> : null}
        <ScrollView style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <View>
              {console.log(this.state.Imagestatus + 'this.state.profileImage: ' + this.state.profileImage)}
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

            {Platform.OS === 'ios'
            ?
            (<View>
              <View style={styles.genderContainer}>
                <View style={[styles.dropdownView, { marginLeft: 18 }]}>
                  <Dropdown
                    itemTextStyle={styles.genderSubContainer}
                    label=""
                    value={this.state.country}
                    data={this.state.CountryData}
                    onChangeText={(e, index) => { this.dropdownChangeCountry(e, index); }}
                  />
                </View>
              </View>

              <Text style={styles.helperText}>{this.state.selectCountryError}</Text>

              <View style={styles.genderContainer}>
                <View style={[styles.dropdownView, { marginLeft: 18 }]}>
                  <Dropdown
                    itemTextStyle={styles.genderSubContainer}
                    label=""
                    value={this.state.state}
                    // dropdownOffset={{ top: 150, left: 0 }}
                    data={this.state.StateData}
                    onChangeText={(e, index) => { this.dropdownChangeState(e, index); }}
                  />
                </View>
              </View>

              <Text style={styles.helperText}>{this.state.selectStateError}</Text>

              <View style={styles.genderContainer}>
                <View style={[styles.dropdownView, { marginLeft: 18 }]}>
                  <Dropdown
                    itemTextStyle={styles.genderSubContainer}
                    label=""
                    value={this.state.city}
                    data={this.state.CityData}
                    onChangeText={(e, index) => { this.dropdownChangeCity(e, index); }}
                  />
                </View>
              </View>

              <Text style={styles.helperText}>{this.state.selectCityError}</Text>
            </View>)
            :
            (<View>
              <View style={[styles.textBox, { backgroundColor: 'white', borderBottomWidth: 0.4, borderBottomColor: 'grey' }]} >
                <Picker
                  selectedValue={this.state.country}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue, itemIndex) => { this.dropdownChangeCountry(itemValue, itemIndex); }}
                >
                  {
                  this.state.CountryData.map(item => (
                    <Picker.Item label={item.value} value={item.value} key={item.key} />),
                  )
                  }
                </Picker>
              </View>

              <View style={[styles.textBox, { backgroundColor: 'white', borderBottomWidth: 0.4, borderBottomColor: 'grey' }]} >
                <Picker
                  selectedValue={this.state.state}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue, itemIndex) => { this.dropdownChangeState(itemValue, itemIndex); }}
                >
                  {
                  this.state.StateData.map(item => (
                    <Picker.Item label={item.value} value={item.value} key={item.key} />),
                  )
                  }
                </Picker>
              </View>

              <View style={[styles.textBox, { backgroundColor: 'white', borderBottomWidth: 0.4, borderBottomColor: 'grey' }]} >
                <Picker
                  selectedValue={this.state.city}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue, itemIndex) => { this.dropdownChangeCity(itemValue, itemIndex); }}
                >
                  {
                  this.state.CityData.map(item => (
                    <Picker.Item label={item.value} value={item.value} key={item.key} />),
                  )
                  }
                </Picker>
              </View>
            </View>)
            }

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
