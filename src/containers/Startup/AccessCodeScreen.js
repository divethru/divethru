import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
import { Button } from 'react-native-material-ui';
import firebaseApp from '../../components/constant';
import styles, { buttonStyles, buttonStylesSkip } from '../../styles/accesscode';
import { colors } from '../../styles/theme';

class AccessCodeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Access Code',
      headerStyle: {
        backgroundColor: '#FFF',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitleStyle: {
        fontSize: 18,
        color: colors.grey500,
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%',
      },
      headerLeft: null,
      headerCenter: (<View />),
      tabBarVisible: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      accessCode: undefined,
      isCodeMatch: false,
      onprofile: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const onprofile = params.onprofile ? params.onprofile : '';
    this.setState({ onprofile });
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  submit() {
    if (this.state.accessCode !== undefined && this.state.accessCode !== '') {
      this.validateAccesscode(this.state.accessCode);
    } else {
      this.showErrorAlertView('You can skip if you do not have any access code.');
    }
  }

  updateAccesscode() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const AceessCode = {
          access_code: this.state.accessCode,
        };

        const ref2 = firebaseApp.database().ref('Users').child(value);
        ref2.update(AceessCode);

        if (this.state.accessCode !== '' && this.state.accessCode !== undefined) {
          const ref = firebaseApp.database().ref('AccessCodes').child(this.state.accessCode);
          ref.once('value').then((dataSnapshot) => {
            const NoPeppleused = dataSnapshot.val().nopeopleused;
            ref.update({ nopeopleused: NoPeppleused + 1 });
          });
        }
      }
    });

    if (this.state.onprofile) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('Tutorial');
    }
  }

  skip() {
    if (this.state.onprofile) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('Tutorial');
    }
  }

  validateAccesscode(accessCode) {
    this.setState({ isCodeMatch: false });
    if (accessCode !== '') {
      const ref = firebaseApp.database().ref('AccessCodes').child(accessCode);
      ref.once('value').then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
          if (dataSnapshot.val().validity === 'unlimited') {
            if (dataSnapshot.val().maxpeopleallowed > dataSnapshot.val().nopeopleused) {
              this.setState({ accessCode, loading: false });
              this.updateAccesscode();
            } else {
              this.setState({ loading: false });
              this.showErrorAlertView('Access code limit is exceeded.');
            }
          } else if (CurrentDate < dataSnapshot.val().enddate) {
            if (dataSnapshot.val().maxpeopleallowed > dataSnapshot.val().nopeopleused) {
              this.setState({ accessCode, loading: false });
              this.updateAccesscode();
            } else {
              this.setState({ loading: false });
              this.showErrorAlertView('Access code limit is exceeded.');
            }
          } else {
            this.setState({ loading: false });
            this.showErrorAlertView('You are no longer valid to use this access code.');
          }
        } else {
          this.setState({ loading: false });
          this.showErrorAlertView('Enter Valid Access Code.');
        }
      });
    } else {
      this.setState({ accessCode });
    }
    this.setState({ accessCode });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{
            height: '100%',
            // flex: 1,
            // flexDirection: 'column',
            // alignItems: 'center',
            // justifyContent: 'center',
            // backgroundColor: 'red',
          }}
          // contentContainerStyle={{
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
        >
          <View style={styles.loginContainer}>
            <Text style={styles.txt}>Do you have any access code?</Text>

            <TextInput
              style={styles.input}
              value={this.state.accessCode}
              placeholder="Access Code"
              returnKeyType="next"
              clearButtonMode="while-editing"
              onChangeText={(accessCode) => { this.setState({ accessCode }); }}
              underlineColorAndroid="transparent"
              blurOnSubmit
            />

            <Text style={styles.helperText}>{this.state.inputAccessCodeError}</Text>

            <Button
              primary
              title=""
              text="S U B M I T"
              onPress={() => { this.submit(); }}
              style={buttonStyles}
            />

            <Button
              primary
              title=""
              text="S K I P"
              onPress={() => { this.skip(); }}
              style={buttonStylesSkip}
            />
          </View>
        </KeyboardAwareScrollView>

        <DropdownAlert
          updateStatusBar={false}
          ref={(ref) => { this.dropdown = ref; }}
          onClose={data => this.onClose(data)}
        />
      </View>
    );
  }
}

AccessCodeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AccessCodeScreen;
