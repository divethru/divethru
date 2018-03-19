import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { Button } from 'react-native-material-ui';
import FCM from 'react-native-fcm';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import { palette, colors } from '../styles/theme';
import styles, { loginButtonStyles, forgotPasswordButtonStyles } from '../styles/login';
import firebaseApp from '../components/constant';
import Spinner from '../components/Spinner';
import IC_CLOSE from '../assets/images/ic_close.png';

const FBSDK = require('react-native-fbsdk');

const { LoginManager, AccessToken } = FBSDK;

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft:
  <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
    <Image
      style={{ height: 20, width: 20, margin: 10 }}
      source={IC_CLOSE}
    />
  </TouchableOpacity>,
    title: 'Welcome Back',
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
      inputEmailColor: palette.accentColor,
      inputEmailError: '',
      inputPasswordColor: palette.accentColor,
      inputPasswordError: '',
      email: undefined,
      password: undefined,
      errorMessage: '',
      loading: false,
    };
  }

  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      // play services are available. can now configure library
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    })

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

  validatePassword(password) {
    if (!password) {
      this.setState({
        inputPasswordColor: colors.red600,
        inputPasswordError: 'Password is required',
      });
    } else {
      this.setState({
        password,
        inputPasswordColor: palette.accentColor,
        inputPasswordError: '',
      });
    }
    this.setState({ password });
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  loginButtonClicked = () => {
    let deviceToken = '';
    FCM.getFCMToken().then(token => {
      console.log('HelloNewToken: '+ token);
      if(token !== undefined) {
        deviceToken = token;
      }
    });

    this.setState({ loading: true });
    if (this.state.email !== undefined && this.state.password !== undefined) {
      const { email, password } = this.state;
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            const ref = firebaseApp.database().ref('Users').child(user.uid);
            ref.once('value').then((dataSnapshot) => {
              this.setState({ loading: false });
              const data = dataSnapshot.val();
              if (data != null){
                if (data.activated_on !== '') {
                  AsyncStorage.setItem('user_id', data.user_id);
                  AsyncStorage.getItem('isMarketingLaunched').then((value) => {
                    const ref = firebaseApp.database().ref('Users').child(data.user_id);
                    ref.update({ device_token: deviceToken });
                    if (value === 'yes') {
                      this.props.navigation.navigate('TabScreen');
                    } else {
                      this.props.navigation.navigate('Tutorial');
                    }
                  });
                } else {
                  this.showErrorAlertView('Please verify your email to proceed further.');
                }
              } else {
                this.showErrorAlertView('Something went wrong. Please contact at divethru@gmail.com');
              }
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

  fbAuth = () => {
    let deviceToken = '';
    FCM.getFCMToken().then(token => {
      console.log('HelloNewToken: '+token);
      if(token !== undefined){
        deviceToken = token;
      }
    });

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        alert('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data;
          this.setState({ loading: true });
          fetch('https://graph.facebook.com/v2.5/me?fields=email,name,first_name,last_name,friends&access_token=' + accessToken)
            .then(response => response.json())
            .then((json) => {
              console.log(json);

              firebaseApp.auth().fetchProvidersForEmail(json.email).then((response) => {
                const provider = response.toString(); 
                if (provider === 'facebook.com') {
                  const provider = firebase.auth.FacebookAuthProvider;
                  const credential = provider.credential(accessToken);

                  // Login with the credential
                  firebaseApp.auth().signInWithCredential(credential).then((response) => {
                    const ref = firebaseApp.database().ref('Users').child(response.uid);
                    ref.once('value').then((dataSnapshot) => {
                      const userData = dataSnapshot.val();
                      if (userData != null) {
                        AsyncStorage.setItem('user_id', userData.user_id);
                        AsyncStorage.setItem('fb_id', json.id);
                        AsyncStorage.getItem('isMarketingLaunched').then((value) => {
                          if (value === 'yes') {
                            const ref = firebaseApp.database().ref('Users').child(userData.user_id);
                            ref.update({ device_token: deviceToken });
                            this.props.navigation.navigate('TabScreen');
                          } else {
                            this.props.navigation.navigate('Tutorial');
                          }
                        });
                      } else {
                        this.setState({ loading: false });
                        this.showErrorAlertView('User does not exist.');
                      }
                    });
                  })
                  .catch((error) => {
                    this.setState({ loading: false });
                    console.log('Error' + JSON.stringify(error));
                    this.showErrorAlertView(error.message);
                  });
                } else if (provider === '') {
                  this.setState({ loading: false });
                  this.showErrorAlertView('User does not exist.');
                }
                else {
                  this.setState({ loading: false });
                  this.showErrorAlertView('Email already associated with another account.');
                }
              })
            })
            .catch((error) => {
              this.setState({ loading: false });
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
      const accessToken = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
      let deviceToken = '';
     
      FCM.getFCMToken().then((fcmtoken) => {
        if (fcmtoken !== undefined) {
          deviceToken = fcmtoken;
        }
      });
      this.setState({ loading: true });
      // Login with the credential
      firebaseApp.auth().fetchProvidersForEmail(user.email).then((response) => {
        const provider = response.toString();
        if (provider === 'google.com') {
          firebaseApp.auth().signInWithCredential(accessToken).then((response) => {
            const ref = firebaseApp.database().ref('Users').child(response.uid);
              ref.once('value').then((dataSnapshot) => {
                const userData = dataSnapshot.val();
                if (userData != null) {
                  AsyncStorage.setItem('user_id', userData.user_id);
                  AsyncStorage.setItem('google_id', user.id);
                  AsyncStorage.getItem('isMarketingLaunched').then((value) => {
                    this.setState({ loading: false });
                    if (value === 'yes') {
                      const ref = firebaseApp.database().ref('Users').child(userData.user_id);
                      ref.update({ device_token: deviceToken });
                      this.props.navigation.navigate('TabScreen');
                    } else {
                      this.props.navigation.navigate('Tutorial');
                    }
                  });
                } else {
                  this.setState({ loading: false });
                  this.showErrorAlertView('User does not exist.');
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
        } else if (provider === '') {
          this.setState({ loading: false });
          this.showErrorAlertView('User does not exist.');
        }
        else {
          this.setState({ loading: false });
          this.showErrorAlertView('Email already associated with another account.');
        }
      })
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
      // alert(err);
      this.setState({ loading: false });
    })
    .done();
  }


  render() {
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
            <View style={styles.loginContainer}>
              <Text style={styles.helperText}>{this.state.errorMessage}</Text>

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
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordInput.focus()}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputEmailError}</Text>

              <TextInput
                ref={(input) => { this.passwordInput = input; }}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                clearButtonMode="while-editing"
                blurOnSubmit
                returnKeyType="done"
                value={this.state.password}
                onChangeText={(password) => { this.validatePassword(password); }}
                underlineColorAndroid="transparent"
              />

              <Text style={styles.helperText}>{this.state.inputPasswordError}</Text>

              <Button
                primary
                title=""
                text="L O G  I N"
                onPress={this.loginButtonClicked}
                style={loginButtonStyles}
              />

              <Button
                primary
                title=""
                text="Forgot your password?"
                upperCase={false}
                onPress={() => { this.props.navigation.navigate('ForgotPasswordScreen'); }}
                style={forgotPasswordButtonStyles}
              />

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

            </View>
          </KeyboardAwareScrollView>
          <DropdownAlert ref={(ref) => { this.dropdown = ref; }} />
        </View>
      </Spinner>
    );
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginScreen;
