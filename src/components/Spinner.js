import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';
import { palette } from '../styles/theme';
import styles from '../styles/spinner';
import loader from '../assets/images/loader.gif';

const Spinner = ({
  children,
  isLoading,
  size,
  color,
  thickness,
}) => {
  if (!isLoading) return children;

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.010)"
        animated
        hidden={false}
      />
      <View style={styles.circle}>
        <Image source={loader} style={{ width: 400, height: 400 }} />
        {/* <Progress.CircleSnail color={color} size={size} thickness={thickness} indeterminate /> */}
      </View>
    </View>
  );
};

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
  thickness: PropTypes.number,
};

Spinner.defaultProps = {
  isLoading: true,
  size: 80,
  color: palette.accentColor,
  thickness: 5,
};

export default Spinner;
