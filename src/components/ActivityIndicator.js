import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import styles from '../styles/spinner';

const ActivityIndicatorLoader = ({
  isLoading,
}) => {
  return (
    (!isLoading)
      ? null
      : (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.indicator} />
      )
  );
};

ActivityIndicatorLoader.propTypes = {
  isLoading: PropTypes.bool,
};

ActivityIndicatorLoader.defaultProps = {
  isLoading: true,
};

export default ActivityIndicatorLoader;
