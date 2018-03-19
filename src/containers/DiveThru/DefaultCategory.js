import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import styles from '../../styles/category';

class DefaultCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>DIVE THRU</Text>
      </View>
    );
  }
}

DefaultCategory.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default DefaultCategory;
