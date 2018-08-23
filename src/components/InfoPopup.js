import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-material-ui';
import styles, { learnMoreButtonStyles } from '../styles/resumePopup';
import IC_CLOSE from '../assets/images/ic_close.png';

class InfoPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
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
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.closebtn} onPress={() => { this.props.onTouchup(); }}>
              <Image
                style={styles.image}
                source={IC_CLOSE}
              />
            </TouchableOpacity>

            <Text style={styles.headingtext}>{this.props.title.toUpperCase()}</Text>

            <Text style={styles.text}>{this.props.description}</Text>

            <View style={styles.seperator} />

            <Button
              accent
              text="G O T  I T"
              onPress={() => { this.props.onTouchup(); }}
              upperCase={false}
              style={learnMoreButtonStyles}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

InfoPopup.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  animationType: PropTypes.string,
  onTouchup: PropTypes.func,
  supportedOrientation: PropTypes.array,
  transparent: PropTypes.bool,
};

InfoPopup.defaultProps = {
  animationType: 'none',
  supportedOrientation: ['portrait', 'landscape'],
  transparent: true,
  onTouchup: undefined,
};

export default InfoPopup;
