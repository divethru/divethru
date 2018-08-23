import React, { Component } from 'react';
import { StackNavigator, SwitchNavigator, Linking } from 'react-navigation';
import { AsyncStorage, Platform, AppState } from 'react-native';
import * as RNIap from 'react-native-iap';
import { ThemeProvider } from 'react-native-material-ui';
import WalkThroughScreen from './containers/Startup/WalkThroughScreen';
import LoginScreen from './containers/Startup/LoginScreen';
import RegistrationScreen from './containers/Startup/RegistrationScreen';
import ForgotPasswordScreen from './containers/Startup/ForgotPasswordScreen';
import DiveThruPlayerScreen from './containers/DiveThru/DiveThruPlayerScreen';
import TabScreen from './containers/Home';
import Tutorial from './containers/Startup/Tutorial';
import firebaseApp from './components/constant';
import { uiTheme } from './styles/theme';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      applicationState: '',
      activeUser: '',
    };
    console.disableYellowBox = true;
  }

  componentWillMount() {
    // if (Platform.OS === 'android') {
    //   Linking.getInitialURL().then((url) => {
    //     this.navigate(url);
    //   });
    // } else {
    //   Linking.addEventListener('url', this.handleOpenURL);
    // }
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ id: value });
    });
  }

  // componentWillUnmount() { // C
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }

  // handleOpenURL = (event) => { // D
  //   this.navigate(event.url);
  // }

  // navigate = (url) => { // E
  //   alert(url)
  //   // const { navigate } = this.props.navigation;
  //   // const route = url.replace(/.*?:\/\//g, '');
  //   // const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   // const routeName = route.split('/')[0];
  
  //   // if (routeName === 'people') {
  //   //   navigate('People', { id, name: 'chris' })
  //   // };
  // }


  componentDidMount() {
    AsyncStorage.getItem('user_id').then((value) => {
      firebaseApp.database().ref(`/Users/${value}`).once('value').then((snapshot) => {
        const subscriptionLogout = snapshot.val().membership_type;
        AsyncStorage.setItem('LogoutSubscription', subscriptionLogout);
      })
      .catch((error) => {
        console.log(error);
      });
    });
    try {
      RNIap.prepare();
    } catch (err) {
      console.log(err);
    }
    AppState.addEventListener('change', applicationState =>
      this.endConnection(applicationState),
    );
  }

  endConnection = async (applicationState) => {
    if (applicationState === 'background') {
      RNIap.endConnection();
    } else if (applicationState === 'active') {
      RNIap.prepare();
    }
  }

  cancelledSubscription = async () => {
    try {
      const datas = await RNIap.getAvailablePurchases();
      for (let i = 0; i < datas.length; i++) { // eslint-disable-line no-plusplus
        AsyncStorage.getItem('user_id').then((value) => {
          const ref = firebaseApp.database().ref('Users').child(`${value}/payment`);
          ref.limitToLast(1).on('child_added', (data) => {
            const user = data.val();
            const key = data.key;
            const packageName = user.subscription_type;
            const subscriptionId = user.transaction_id;
            const paymentType = user.payment_type;
            const subscription = user.subscription;
            if (subscriptionId === datas[i].transactionId && datas[i].autoRenewing === true && subscription === 'active') {
              this.setState({
                subscriptionStatus: true,
                subscriptionPackage: packageName.toLowerCase(),
                disabledClick: true,
                activeUser: key,
              });
            } else if (paymentType === 'paypal' && subscription === 'active') {
              this.setState({
                subscriptionStatus: true,
                subscriptionPackage: packageName.toLowerCase(),
                disabledClick: true,
                activeUser: key,
              });
            } else if (subscriptionId === datas[i].transactionId && datas[i].autoRenewing === false && subscription === 'active') {
              if (this.state.activeUser === '') {
                this.updateSubscriptionData(key);
              }
            } else if (subscriptionId === datas[i].transactionId && datas[i].autoRenewing === undefined && subscription === 'active') {
              if (this.state.activeUser === '') {
                this.updateSubscriptionData(key);
              }
            }
          }, (error) => {
            console.log(error);
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkSubscription() {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment`);
      ref.limitToLast(1).on('child_added', (data) => {
        const user = data.val();
        const packageName = user.subscription_type;

        if (user.subscription === 'active' && user.subscription_type === 'paypal') {
          this.setState({
            subscriptionStatus: true,
            subscriptionPackage: packageName.toLowerCase(),
            disabledClick: true,
          });
        } else if (user.subscription === 'active') {
          if (Platform.OS === 'ios' && user.payment_type === 'App Store') {
            this.cancelledSubscriptionIos();
          } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
            this.cancelledSubscription();
          }
          this.setState({
            subscriptionStatus: true,
            subscriptionPackage: packageName.toLowerCase(),
            disabledClick: true,
          });
        } else if (Platform.OS === 'ios' && user.payment_type === 'App Store') {
            this.cancelledSubscriptionIos();
          } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
            this.cancelledSubscription();
          }
      }, (error) => {
        console.log(error);
      });
    });
  }

  cancelledSubscriptionIos = async () => {
    try {
      AsyncStorage.getItem('user_id').then((value) => {
        const ref = firebaseApp.database().ref('Users').child(`${value}/payment`);
        ref.limitToLast(1).on('child_added', (data) => {
          const user2 = data.val();
          const subscription = user2.subscription;
          const key = data.key;
          const packageName = user2.subscription_type;
          const originalTransactionIdentifier = user2.originalTransactionIdentifier;
          const paymentType = user2.payment_type;
          const receipt = user2.transactionReceipt;
          if (subscription === 'active') {
            fetch('http://34.215.40.163/verifyReceipt.php', {
              method: 'POST',
              body: JSON.stringify({
                receipt,
                originalTransactionIdentifier,
              }),
            })
              .then((response => response.json()))
              .then((responseData) => {
                const data1 = responseData.status;
                if (data1 === 0 && subscription === 'active') {
                  this.updateSubscriptionData(key);
                } else {
                  this.setState({
                    subscriptionStatus: true,
                    subscriptionPackage: packageName.toLowerCase(),
                    disabledClick: true,
                    activeUser: key,
                  });
                }
              })
              .done();
            if (paymentType === 'paypal' && subscription === 'active') {
              this.setState({
                subscriptionStatus: true,
                subscriptionPackage: packageName.toLowerCase(),
                disabledClick: true,
                activeUser: key,
              });
            }
          }
        }, (error) => {
          console.log(error);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  updateSubscriptionData(key) {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment/${key}`);
      ref.update({ subscription: 'cancel' });
      const parentUpdate = firebaseApp.database().ref('Users').child(value);
      parentUpdate.update({ membership_type: 'Free' });
      this.setState({
        subscriptionStatus: false,
        subscriptionPackage: 'undefined',
        disabledClick: false,
      });
      return false;
    });
  }

  render() {
    const StartupStack = StackNavigator({
      WalkThrough: { screen: WalkThroughScreen },
      LoginScreen: { screen: LoginScreen },
      RegistrationScreen: { screen: RegistrationScreen, path: 'referby/:user' },
      ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    });

    const AppNavigator = SwitchNavigator({
      Tutorial: { screen: Tutorial },
      TabScreen: { screen: TabScreen },
      DiveThruPlayer: { screen: DiveThruPlayerScreen },
      startup: StartupStack,
    }, {
      headerMode: 'screen',
      initialRouteName: (this.state.id != null) ? 'TabScreen' : 'startup',
    });
    const prefix = Platform.OS === 'android' ? 'divethru://referby/' : 'divethru://';
    return (
      <ThemeProvider uiTheme={uiTheme}>
        { this.state.id !== undefined
          ?
            (<AppNavigator uriPrefix={prefix} />)
          :
          null
        }
      </ThemeProvider>
    );
  }
}
