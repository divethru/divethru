import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';
import { Button } from 'react-native-material-ui';
import styles, { buttonStyles } from '../../styles/profile';
import Profile from '../../assets/images/ic_profile.png';

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => <Image source={Profile} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  onLogout = () => {
    AsyncStorage.removeItem('user_id');
    const userData = AsyncStorage.getItem('google_id').then((value) => {
      if(value !== null) {
        GoogleSignin.signOut()
        .then(() => {
          console.log('out');
        })
        .catch((err) => {

        });
      }
    });
  
    this.props.navigation.dispatch(
      NavigationActions.reset({
        actions: [
          NavigationActions.navigate({ routeName: 'WalkThrough' }),
        ],
        index: 0,
        key: null,
      }),
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Profile Screen</Text>
          <Button
            primary
            title=""
            text="L O G O U T"
            onPress={() => { this.onLogout(); }}
            style={buttonStyles}
          />
        </View>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen;
