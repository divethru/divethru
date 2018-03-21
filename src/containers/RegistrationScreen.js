import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import FormData from 'FormData';
import { View, Text, TextInput, Image, TouchableOpacity, Platform, AsyncStorage, StatusBar, Dimensions } from 'react-native';
import { Button } from 'react-native-material-ui';
import { GoogleSignin } from 'react-native-google-signin';
// import RadioButton from 'radio-button-react-native';
import FCM from 'react-native-fcm';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import RadioForm from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { palette, colors } from '../styles/theme';
import styles, { buttonStyles } from '../styles/registration';
import PasswordStrengthChecker from '../components/PasswordStrengthChecker';
import firebaseApp from '../components/constant';
import Spinner from '../components/Spinner';
import IC_BACK from '../assets/images/ic_back.png';

const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;

class RegistrationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft:
  <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
    <Image
      style={{ height: 20, width: 20, margin: 10 }}
      source={IC_BACK}
    />
  </TouchableOpacity>,
    title: 'Registration',
    headerStyle: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: colors.grey500,
    },
    headerRight: (<View />),
  });

  constructor(props) {
    super(props);
    this.state = {
      inputFirstNameColor: palette.accentColor,
      inputFirstNameError: '',
      inputLastNameColor: palette.accentColor,
      inputLastNameError: '',
      inputEmailColor: palette.accentColor,
      inputEmailError: '',
      inputPasswordColor: palette.accentColor,
      inputPasswordError: '',
      inputConfirmPasswordColor: palette.accentColor,
      inputConfirmPasswordError: '',
      inputDateOfBirthColor: palette.accentColor,
      inputDateOfBirthError: '',
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      confirmPassword: undefined,
      dateOfBirth: undefined,
      accessCode: '',
      gender: 0,
      errorMessage: '',
      loading: false,
      password: {
        value: '',
        isValid: false,
      },
    };
  }

  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });

    GoogleSignin.configure({
      iosClientId: '53159239409-9nevpupur18e4ur2k0n80smhq9698p0i.apps.googleusercontent.com', // only for iOS
    })
    .then(() => {
      // GoogleSignin.currentUserAsync().then((user) => {
      //   console.log('USER', user);
      //   this.setState({user: user});
      // }).done();
    });
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
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

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if (!re.test(email)) {
      this.setState({
        inputEmailColor: colors.red600,
        inputEmailError: 'Please enter a valid email address.',
      });
    } else {
      this.setState({
        email,
        inputEmailColor: palette.accentColor,
        inputEmailError: '',
        errorMessage: '',
      });
    }
    this.setState({ email });
  }

  validatePassword(password, isValid) {
    if (!password) {
      this.setState({
        inputPasswordColor: colors.red600,
        inputPasswordError: 'Password is required',
      });
    } else {
      this.setState({
        password: { value: password, isValid },
        inputPasswordColor: palette.accentColor,
        inputPasswordError: '',
      });
    }
    this.setState({ password: { value: password, isValid } });
  }

  validateConfirmPassword(confirmPassword) {
    if (!confirmPassword || confirmPassword !== this.state.password.value) {
      this.setState({
        inputConfirmPasswordColor: colors.red600,
        inputConfirmPasswordError: 'Your password and confirmation password do not match.',
      });
    } else {
      this.setState({
        confirmPassword,
        inputConfirmPasswordColor: palette.accentColor,
        inputConfirmPasswordError: '',
      });
    }
    this.setState({ confirmPassword });
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
      });
    } else if (age < 8) {
      this.setState({
        inputDateOfBirthColor: colors.red600,
        inputDateOfBirthError: 'Your age must be 8 or older.',
      });
    } else {
      this.setState({
        dateOfBirth,
        inputDateOfBirthColor: palette.accentColor,
        inputDateOfBirthError: '',
      });
    }
    // this.setState({ dateOfBirth });
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  submit = () => {
    this.setState({ loading: true });
    if (this.state.firstName !== undefined &&
       this.state.lastName !== undefined &&
       this.state.email !== undefined &&
       this.state.password.value !== '' &&
       this.state.dateOfBirth !== undefined
    ) {
      let gender = '';
      if (this.state.gender === 0) {
        gender = 'Male';
      } else if (this.state.gender === 1) {
        gender = 'Female';
      } else {
        gender = 'Other';
      }

      const currentDate = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let deviceToken = '';
      // AsyncStorage.getItem('deviceToken').then((value) => {
      //   if (value != null) {
      //     deviceToken = value;
      //   }
      // }).done();

      FCM.getFCMToken().then(token => {
        console.log('HelloNewToken: '+token);
        if(token !== undefined){
          deviceToken = token;
        }
      });

      firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password.value)
      .then((user) => {
          // Get a key for a user
        // var newUserKey = firebase.firebaseApp.database().ref().child('Users').push().key;
        const userData = {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          gender,
          birthdate: this.state.dateOfBirth,
          membership_type: 'Free',
          activation_code: '',
          activated_on: '',
          login_via: 'email',
          device_type: Platform.OS,
          device_token: deviceToken,
          fb_id: '',
          google_id: '',
          registered_on: currentDate,
          lastUpdated_on: currentDate,
          user_id: user.uid,
          access_code: this.state.accessCode,
          last_free_conversation_id: 0,
          halted: 0.0,
          total_time_divethru: 0,
          completed_conversation: 0,
          streak: '',
        };

        const updates = {};
        updates['/Users/' + user.uid] = userData;
        firebaseApp.database().ref().update(updates).then(() => {
          // var ref = firebase.firebaseApp.database().ref('Users');
          // ref.once('value').then(function(dataSnapshot) {
          this.setState({ loading: false });
          // handle read data.
          // var data = dataSnapshot.val();
          // console.log(user.uid);
          // console.log(this.state.email);
          this.sendEmailVerification(user.uid, this.state.email);
          // this.props.navigation.navigate('Tutorial');
          // });
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showErrorAlertView(error.message);
      });
    } else {
      this.setState({ loading: false });
      this.showErrorAlertView('Please fill all required fields');
    }
  }

  sendEmailVerification(id, email) {
    const formData = new FormData();
    formData.append('mail', email);
    fetch('http://34.215.40.163/sendEmailVerification.php?uid=' + id, {
      method: 'POST',
      body: formData,
    })
    .then((response => response.json()))
    .then((responseData) => {
      // if (responseData.error_code === 0) {
        this.dropdown.alertWithType('success', '', 'A link to verify your email address has been sent. Please check your email to proceed further.');
      // } else {
      //   this.dropdown.alertWithType('error', '', 'Something went wrong');
      //   // this.props.navigation.goBack();
      // }
    })
    .done();
  }

  fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        // alert('Login success with permissions: ' + result.grantedPermissions.toString());
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data;
          this.setState({ loading: true });
          fetch('https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,friends&access_token=' + accessToken)
            .then((response) => response.json())
            .then((json) => {
              const provider = firebase.auth.FacebookAuthProvider;
              const credential = provider.credential(accessToken);
            
              const currentDate = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
              let deviceToken = '';
             
              FCM.getFCMToken().then(token => {
                console.log('HelloNewToken: '+token);
                if(token !== undefined){
                  deviceToken = token;
                }
              });

              // Login with the credential
              firebaseApp.auth().signInWithCredential(credential).then((response) => {
                const ref = firebaseApp.database().ref('Users').child(response.uid);
                ref.once('value').then((dataSnapshot) => {
                  const dataUser = dataSnapshot.val();
                  
                  if (dataUser == null) {
                    const userData = {
                      first_name: json.first_name,
                      last_name: json.last_name,
                      email: json.email,
                      gender: '',
                      birthdate: '',
                      membership_type: 'Free',
                      activation_code: '',
                      activated_on: '',
                      login_via: 'facebook',
                      device_type: Platform.OS,
                      device_token: deviceToken,
                      fb_id: json.id,
                      google_id: '',
                      registered_on: currentDate,
                      lastUpdated_on: currentDate,
                      user_id: response.uid,
                      access_code: '',
                      last_free_conversation_id: 0,
                      halted: 0.0,
                      total_time_divethru: 0,
                      completed_conversation: 0,
                      streak: '',
                    };

                    const updates = {};
                    updates['/Users/' + response.uid] = userData;
                    firebaseApp.database().ref().update(updates).then(() => {
                      this.setState({ loading: false });
                      AsyncStorage.setItem('user_id', response.uid);
                      AsyncStorage.setItem('fb_id', json.id);
                      this.props.navigation.navigate('Tutorial');
                    })
                    .catch((error) => {
                      console.log('Error' + JSON.stringify(error));
                      this.setState({ loading: false });
                      // this.showErrorAlertView(error.message);
                    });
                  } else {
                    this.setState({ loading: false });
                    this.showErrorAlertView('User with this email address already exist.');
                  }
                });
              })
              .catch((error) => {
                this.setState({ loading: false });
                this.showErrorAlertView('Email already associated with another account.')
                console.log('Error' + JSON.stringify(error));
              });
            })
            .catch((error) => {
              this.setState({ loading: false });
              // alert(error)
              console.log('Error' + JSON.stringify(error));
            });
        });
      }
    },
      function (error) {
        this.setState({ loading: false });
        // alert('Login fail with error: ' + error);
      },
    );
  }

  _googleAuth() {
    GoogleSignin.signOut()
    GoogleSignin.signIn()
    .then((user) => {        
      this.setState({user: user});
      const accessToken = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
      const currentDate = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let deviceToken = '';
         
      FCM.getFCMToken().then((fcmtoken) => {
        if (fcmtoken !== undefined) {
          deviceToken = fcmtoken;
        }
      });

       this.setState({ loading: true });
      // Login with the credential
      firebaseApp.auth().signInWithCredential(accessToken).then((response) => {
        const ref = firebaseApp.database().ref('Users').child(response.uid);
        ref.once('value').then((dataSnapshot) => {
          const dataUser = dataSnapshot.val();
          if (dataUser == null) {
            const userData = {
              first_name: user.name,
              last_name: '',
              email: user.email,
              gender: '',
              birthdate: '',
              membership_type: 'Free',
              activation_code: '',
              activated_on: '',
              login_via: 'google',
              device_type: Platform.OS,
              device_token: deviceToken,
              fb_id: '',
              google_id: user.id,
              registered_on: currentDate,
              lastUpdated_on: currentDate,
              user_id: response.uid,
              access_code: '',
              last_free_conversation_id: 0,
              halted: 0.0,
              total_time_divethru: 0,
              completed_conversation: 0,
              streak: '',
            };

            const updates = {};
            updates['/Users/' + response.uid] = userData;
            firebaseApp.database().ref().update(updates).then(() => {
              this.setState({ loading: false });
              AsyncStorage.setItem('user_id', response.uid);
              AsyncStorage.setItem('google_id', user.id);
              this.props.navigation.navigate('Tutorial');
            })
            .catch((error) => {
              console.log('Error' + JSON.stringify(error));
              this.setState({ loading: false });
              this.showErrorAlertView(error.message);
            });
          } else {
            this.setState({ loading: false });
            this.showErrorAlertView('User with this email address already exist.')
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          this.setState({ loading: false });
          this.showErrorAlertView('Email already associated with another account.');
        }
      });
    })
    .catch((err) => {
      this.setState({ loading: false });
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {
    const RADIO_PROPS = [
      { label: 'Male', value: 0 },
      { label: 'Female', value: 1 },
      { label: 'Other', value: 2 },
    ];

    // Define too short object
    const tooShort = {
      enabled: true,
      label: 'Too short',
      labelColor: 'red',
    };

    // Define streng level list
    const strengthLevels = [
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: '33',
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: '67',
        innerBarColor: '#feb466',
      },
      {
        label: 'Strong',
        labelColor: '#fff',
        widthPercent: '100',
        innerBarColor: '#6cfeb5',
      },
    ];

    const passwordHelperText = (this.state.password.value === '') ? <Text style={styles.helperText}>{this.state.inputPasswordError}</Text> : null;
    const isSetPassword = (this.state.password.value !== '') ? true : false;
    const width = Dimensions.get('window').width;
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            {/* <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.30)"
              animated
              hidden={false}
            /> */}
            <StatusBar
              // translucent
              hidden={false}
              backgroundColor="rgba(255, 255, 255, 0.5)"
              animated
              barStyle="dark-content"
            />
            <View style={styles.innerContainer}>
              <Text style={styles.helperText}>{this.state.errorMessage}</Text>

              <TextInput
                ref={(input) => { this.firstNameInput = input; }}
                style={styles.input}
                placeholder="First name"
                returnKeyType="next"
                clearButtonMode="while-editing"
                autoCapitalize="words"
                value={this.state.firstName}
                onChangeText={(firstName) => { this.validateFirstName(firstName); }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.lastNameInput.focus()}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputFirstNameError}</Text>

              <TextInput
                ref={(input) => { this.lastNameInput = input; }}
                style={styles.input}
                placeholder="Last name"
                returnKeyType="next"
                clearButtonMode="while-editing"
                autoCapitalize="words"
                value={this.state.lastName}
                onChangeText={(lastName) => { this.validateLastName(lastName); }}
                blurOnSubmit={false}
                onSubmitEditing={() => this.emailInput.focus()}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputLastNameError}</Text>

              <TextInput
                ref={(input) => { this.emailInput = input; }}
                style={styles.input}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                clearButtonMode="while-editing"
                editable={!this.state.editMode}
                selectTextOnFocus={!this.state.editMode}
                value={this.state.email}
                onChangeText={(email) => { this.validateEmail(email); }}
                blurOnSubmit
                // onSubmitEditing={() => this.passwordInput.focus()}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputEmailError}</Text>

              {/* <TextInput
                ref={(input) => { this.passwordInput = input; }}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                clearButtonMode="while-editing"
                blurOnSubmit
                value={this.state.password}
                onChangeText={(password) => { this.validatePassword(password); }}
                onSubmitEditing={() => this.confirmPasswordInput.focus() }
                underlineColorAndroid='transparent'
              /> */}

              <PasswordStrengthChecker
                ref={(input) => { this.passwordInput = input; }}
                style={styles.input}
                placeholder="Password"
                blurOnSubmit
                secureTextEntry
                minLength={4}
                ruleNames="symbols|words"
                strengthLevels={strengthLevels}
                tooShort={tooShort}
                minLevel={0}
                returnKeyType="next"
                barWidthPercent={65}
                showBarOnEmpty={false}
                barColor="#ccc"
                onChangeText={(text, isValid) => { this.validatePassword(text, isValid); }}
                onSubmitEditing={() => this.confirmPasswordInput.focus()}
                underlineColorAndroid="transparent"
                send={isSetPassword}
              />

              { passwordHelperText}

              <TextInput
                ref={(input) => { this.confirmPasswordInput = input; }}
                style={styles.input}
                placeholder="Confirm password"
                secureTextEntry
                autoCapitalize="none"
                clearButtonMode="while-editing"
                blurOnSubmit
                returnKeyType="next"
                value={this.state.confirmPassword}
                onChangeText={(confirmPassword) => {
                  this.validateConfirmPassword(confirmPassword);
                }}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputConfirmPasswordError}</Text>

              <View style={styles.datepicker}>
                <DatePicker
                  ref={(datepicker) => { this.dateOfBirth = datepicker; }}
                  date={this.state.dateOfBirth}
                  mode="date"
                  style={styles.datePickerBox}
                  placeholder="Date of birth"
                  format="YYYY-MM-DD"
                  maxDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      borderColor: colors.transparent,
                      borderWidth: 0.0,
                      marginRight: width > 320 ? '73%' : '62%'
                    },
                    btnTextConfirm: {
                      color: '#7dd3d5',
                      height: 30,
                      marginTop: 30,
                      marginBottom: 20,
                    },
                    btnTextCancel: {
                      color: colors.black,
                      height: 30,
                      marginTop: 30,
                      marginBottom: 20,
                    },
                    placeholderText: {
                      color: colors.grey500,
                    },
                  }}
                  onDateChange={(dateOfBirth) => { this.validateDateOfBirth(dateOfBirth); }}
                />
              </View>

              <Text style={styles.helperText}>{this.state.inputDateOfBirthError}</Text>

              <TextInput
                ref={(input) => { this.accessCodeInput = input; }}
                style={styles.input}
                placeholder="Access code(Optional)"
                returnKeyType="done"
                clearButtonMode="while-editing"
                autoCapitalize="words"
                value={this.state.accessCode}
                onChangeText={(accessCode) => { this.setState({ accessCode }); }}
                blurOnSubmit
                underlineColorAndroid="transparent"
              />

              <View style={styles.genderContainer}>
                <Text style={styles.genderText}>Gender:</Text>
                {/* <RadioButton
                  currentValue={this.state.gender}
                  onPress={value => this.setState({ gender: value })}
                  value={0}
                  outerCircleColor="gray"
                  outerCircleSize={20}
                  outerCircleWidth={2}
                  innerCircleColor="#7dd3d5"
                  innerCircleSize={10}
                >
                  <Text style={styles.radioButtonMale}> Male </Text>
                </RadioButton>
                <RadioButton
                  currentValue={this.state.gender}
                  onPress={value => this.setState({ gender: value })}
                  value={1}
                  outerCircleColor="gray"
                  outerCircleSize={20}
                  outerCircleWidth={2}
                  innerCircleColor="#7dd3d5"
                  innerCircleSize={10}
                >
                  <Text style={styles.radioButton}> Female </Text>
                </RadioButton>
                <RadioButton
                  currentValue={this.state.gender}
                  onPress={value => this.setState({ gender: value })}
                  value={2}
                  outerCircleColor="gray"
                  outerCircleSize={20}
                  outerCircleWidth={2}
                  innerCircleColor="#7dd3d5"
                  innerCircleSize={10}
                >
                  <Text style={styles.radioButton}> Other </Text>
                </RadioButton> */}
                <RadioForm
                  radio_props={RADIO_PROPS}
                  initial={0}
                  formHorizontal
                  buttonColor={colors.grey600}
                  style={styles.radioButton}
                  buttonSize={12}
                  animation={false}
                  labelStyle={{ fontSize: 14, color: colors.grey600, paddingRight: 8 }}
                  onPress={(gender) => { this.setState({ gender }); }}
                />
              </View>

              <Button
                primary
                title=""
                text="G E T  S T A R T E D"
                onPress={this.submit}
                style={buttonStyles}
              />

              <View style={styles.ORContainer}>
                <View style={styles.separatorView} />
                <Text style={styles.ORText}>OR</Text>
                <View style={styles.separatorView} />
              </View>

              <TouchableOpacity
                onPress={this.fbAuth}
              >
                <View style={styles.facebookContainer}>
                  <View style={styles.facebookLogo}>
                    <Icon
                      name="facebook"
                      size={15}
                      color="#3b5998"
                      style={styles.btnIcon}
                    />
                  </View>
                  <Text style={styles.btnText}>C O N T I N U E  W I T H  F A C E B O O K</Text>
                </View>
              </TouchableOpacity>

              {/* <GoogleSigninButton
                style={{width: 48, height: 48}}
                size={GoogleSigninButton.Size.Icon}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn.bind(this)}
              /> */}

              <TouchableOpacity
                onPress={this._googleAuth.bind(this)}
              >
                <View style={styles.googleContainer}>
                  <View style={styles.googleLogo}>
                    <Icon
                      name="google"
                      size={15}
                      color="#db4437"
                      style={styles.btnIcon}
                    />
                  </View>
                  <Text style={styles.btnText}>C O N T I N U E  W I T H  G O O G L E</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.termsText}>By signing up, you agree to Dive Thru</Text>
              <View style={styles.termsContainer}>
                <View style={styles.innerTermsContainer}>
                  <Text style={styles.linkInline} onPress={() => this.props.navigation.navigate('LegalTerms')} >Terms & Condition</Text>
                  <Text style={styles.andText}>and</Text>
                  <Text style={styles.linkInline} onPress={() => this.props.navigation.navigate('LegalBAA')} >Privacy Policy</Text>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <DropdownAlert ref={(ref) => { this.dropdown = ref; }} onClose={data => this.onClose(data)} />
        </View>
      </Spinner>
    );
  }
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegistrationScreen;
