/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AsyncStorage, StatusBar, Platform } from 'react-native';
import { ThemeProvider } from 'react-native-material-ui';
import WalkThroughScreen from './containers/WalkThroughScreen';
import LoginScreen from './containers/LoginScreen';
import RegistrationScreen from './containers/RegistrationScreen';
import ForgotPasswordScreen from './containers/ForgotPasswordScreen';
import DiveThruPlayerScreen from './containers/DiveThru/DiveThruPlayerScreen';
import TabScreen from './containers/Home';
import Tutorial from './containers/Tutorial';
import { uiTheme } from './styles/theme';
// import constant from './components/constant';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ id: value });
    });
  }

  render() {
    const AppNavigator = StackNavigator({
      WalkThrough: { screen: WalkThroughScreen },
      RegistrationScreen: { screen: RegistrationScreen },
      LoginScreen: { screen: LoginScreen },
      ForgotPasswordScreen: { screen: ForgotPasswordScreen },
      Tutorial: { screen: Tutorial },
      TabScreen: { screen: TabScreen },
      DiveThruPlayer: { screen: DiveThruPlayerScreen },
    }, {
      headerMode: 'screen',
      initialRouteName: (this.state.id != null) ? 'TabScreen' : 'WalkThrough',
    });

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}
