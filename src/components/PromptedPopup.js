import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';
import styles, { FreeButtonStyles } from '../styles/resumePopup';

class PromptedPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { animationType, supportedOrientation, transparent } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={this.state.modalVisible}
        onRequestClose={() => { this.closeModal(); }}
        supportedOrientations={supportedOrientation}
      >
        <View style={styles.container}>
          <View style={styles.prInnerContainer}>
            <Text style={styles.prTitle}>{this.props.title}</Text>
            <Text style={styles.prDesc}>{this.props.description}</Text>
            {
              this.props.categoryname !== '10 day Intro program' && this.props.lastAudio === 2
              ?
                <View />
              :
                <Button
                  primary
                  text="Continue with free program"
                  onPress={() => { this.props.onTouchUpFree(); }}
                  upperCase={false}
                  style={FreeButtonStyles}
                />
            }
            <Button
              primary
              text="Purchase for a subscription"
              onPress={() => { this.props.onTouchUpSubscription(); }}
              upperCase={false}
              style={FreeButtonStyles}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

PromptedPopup.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  animationType: PropTypes.string,
  supportedOrientation: PropTypes.array,
  transparent: PropTypes.bool,
  onTouchUpFree: PropTypes.func,
  onTouchUpSubscription: PropTypes.func,
  categoryname: PropTypes.string.isRequired,
  lastAudio: PropTypes.number,
};

PromptedPopup.defaultProps = {
  animationType: 'none',
  supportedOrientation: ['portrait', 'landscape'],
  transparent: true,
  onTouchUpFree: undefined,
  onTouchUpSubscription: undefined,
  lastAudio: undefined,
};

export default PromptedPopup;
