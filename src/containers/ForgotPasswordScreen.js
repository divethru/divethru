import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-material-ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import { palette, colors } from '../styles/theme';
import firebaseApp from '../components/constant';
import Spinner from '../components/Spinner';
import styles, { loginButtonStyles } from '../styles/forgotPassword';
import IC_LOCK from '../assets/images/ic_lock.png';
import IC_BACK from '../assets/images/ic_back.png';

class ForgotPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft:
  <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
    <Image
      style={{ height: 20, width: 20, margin: 10 }}
      source={IC_BACK}
    />
  </TouchableOpacity>,
    title: 'Forgot Password',
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
      email: undefined,
      errorMessage: '',
      loading: false,
    };
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

  showErrorAlertView = (message) => {
    this.dropdown.alertWithType('error', '', message);
  }

  forgotPasswordButtonClicked = () => {
    this.setState({ loading: true });
    if (this.state.email !== undefined) {
      firebaseApp.auth().sendPasswordResetEmail(this.state.email).then(() => {
        this.setState({ loading: false });
        this.dropdown.alertWithType('success', '', 'A link to reset your password has been sent. Please Check your email.');
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.showErrorAlertView(error.message);
        console.log('Email sent error' + error);
      });
    } else {
      this.setState({ loading: false });
      this.showErrorAlertView('Please fill all required fields');
    }
  }

  render() {
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.innerContainer}>
              <View style={styles.lockIconContainer}>
                <Image source={IC_LOCK} style={styles.lockIcon} />
                <Text style={styles.text}>Forgot Your Password?</Text>
                <Text style={styles.subText}>Enter your e-mail address and we will send
                you a secure link to reset your password.</Text>
              </View>

              <Text style={styles.helperText}>{this.state.errorMessage}</Text>

              <TextInput
                ref={(input) => { this.emailInput = input; }}
                style={styles.input}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                clearButtonMode="while-editing"
                editable={!this.state.editMode}
                selectTextOnFocus={!this.state.editMode}
                value={this.state.email}
                onChangeText={(email) => { this.validateEmail(email); }}
                blurOnSubmit
                returnKeyType="done"
                underlineColorAndroid="transparent"
                onFocus={() => this.setState({ bumpedUp: 1 })}
                onEndEditing={() => this.setState({ bumpedUp: 0 })}
              />

              <Text style={styles.helperText}>{this.state.inputEmailError}</Text>

              <Button
                primary
                title=""
                text="S E N D"
                onPress={this.forgotPasswordButtonClicked}
                style={loginButtonStyles}
              />
            </View>
          </KeyboardAwareScrollView>
          <DropdownAlert ref={(ref) => { this.dropdown = ref; }} />
        </View>
      </Spinner>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ForgotPasswordScreen;
