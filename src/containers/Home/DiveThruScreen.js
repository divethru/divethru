import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/home';
import DiveThru from '../../assets/images/ic_divethru.png';

class DiveThruScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'Dive Thru',
    tabBarIcon: ({ tintColor }) => <Image source={DiveThru} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.subscribeText}>DiveThru Screen</Text>
        </View>
      </View>
    );
  }
}

DiveThruScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DiveThruScreen;
