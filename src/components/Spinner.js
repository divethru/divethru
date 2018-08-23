import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StatusBar, Modal } from 'react-native';
import { palette } from '../styles/theme';
import styles from '../styles/spinner';
import loader from '../assets/images/loader.gif';

const Spinner = ({
  children,
  isLoading,
}) => {
  if (!isLoading) return children;

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
    >
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.010)"
          animated
          hidden={false}
        />
        <View style={styles.circle}>
          <Image source={loader} style={{ width: 400, height: 400 }} />
        </View>
      </View>
    </Modal>
  );
};

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
};

Spinner.defaultProps = {
  isLoading: true,
  size: 80,
  color: palette.accentColor,
  thickness: 5,
};

export default Spinner;
