import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-material-ui';
import { palette, colors } from '../styles/theme';
import styles, { inviteButtonStyles } from '../styles/resumePopup';
import IC_CLOSE from '../assets/images/ic_close.png';

class TextfieldPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      email: undefined,
      inputEmailColor: palette.accentColor,
      inputEmailError: '',
      errorMessage: '',
    };
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }

  validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      this.setState({
        email,
        inputEmailColor: colors.red600,
        inputEmailError: 'Please enter a valid email address.',
      });
    } else {
      this.setState({
        email,
        inputEmailColor: palette.accentColor,
        inputEmailError: '',
      });
    }
  }

  render() {
    const { animationType, supportedOrientation, transparent, modalVisible } = this.props;

    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={modalVisible}
        onRequestClose={() => { this.closeModal(); }}
        supportedOrientations={supportedOrientation}
      >
        <KeyboardAwareScrollView style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%' }}>
          <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.closebtn} onPress={() => { this.props.onTouchup(); }}>
              <Image
                style={styles.image}
                source={IC_CLOSE}
              />
            </TouchableOpacity>

            <Text style={styles.headingtext}>{this.props.title}</Text>

            <TextInput
              ref={(input) => { this.emailInput = input; }}
              style={styles.input}
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              clearButtonMode="while-editing"
              value={this.state.email}
              onChangeText={(email) => { this.validateEmail(email); }}
              blurOnSubmit
              onSubmitEditing={() => {}}
              underlineColorAndroid="transparent"
            />

            <Text style={styles.helperText}>{this.state.inputEmailError}</Text>
          </View>

          <View style={{ width: '80%', marginLeft: 40, marginTop: 10 }}>
            <Button
              primary
              text="I N V I T E"
              onPress={() => {
                console.log('Email: ' + this.state.email);
                this.props.onInvite(this.state.email);
                this.setState({ email: undefined });
                this.props.onTouchup();
              }}
              upperCase={false}
              style={inviteButtonStyles}
            />
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  }
}

TextfieldPopup.propTypes = {
  title: PropTypes.string.isRequired,
  animationType: PropTypes.string,
  onTouchup: PropTypes.func,
  onInvite: PropTypes.func,
  supportedOrientation: PropTypes.array,
  transparent: PropTypes.bool,
  modalVisible: PropTypes.bool,
};

TextfieldPopup.defaultProps = {
  animationType: 'none',
  supportedOrientation: ['portrait', 'landscape'],
  transparent: true,
  modalVisible: false,
  onTouchup: undefined,
  onInvite: undefined,
};

export default TextfieldPopup;
