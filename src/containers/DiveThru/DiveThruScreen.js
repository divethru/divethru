import React, { Component } from 'react';
import { View, ScrollView, Image, StatusBar, AsyncStorage, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import * as RNIap from 'react-native-iap';
import firebaseApp from '../../components/constant';
import CategoryScreen from './CategoryScreen';
import { colors } from '../../styles/theme';
import Spinner from '../../components/Spinner';
import DiveThru from '../../assets/images/ic_divethru.png';
import styles from '../../styles/divethru';

class DiveThruScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarLabel: 'DiveThru',
    tabBarIcon: ({ tintColor }) => {
      AsyncStorage.getItem('selectedIndex').then((value) => {
        if (value !== null || value !== undefined) {
          if (value !== null) {
            console.log('handleSelectedIndex: ' + value);
            navigation.state.params.handleSelectedIndex(value);
          }
        }
      });
      return (<Image source={DiveThru} style={{ tintColor }} />);
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tabs: [],
    };
  }

  async componentWillMount() {
    // console.log('DiveThruScreen===> componentWillMount');
    StatusBar.setHidden(false);
    this.props.navigation.setParams({ handleSelectedIndex: this.handleSelectedIndex.bind(this) });
    // this.fetchCategoryName();
    // const tabs = () => (
    //   <Text tabLabel="Tab #1">My</Text>
    // );
    // this.setState({ tabs });
    this.getAllDataFromDb();
    this.props.navigation.addListener('willFocus', () => {
      // this.setState({ activeUser: '' });
      this.checkSubscription();
      // this.getAllDataFromDb();
    });
  }

  async componentDidMount() {
    try {
      this.checkSubscription();
    } catch (err) {
      console.log(`DiveThruScreen componentDidMount err: ${err}`);
    }
    // this.setState({ loading: true });
  }

  getAllDataFromDb() {
    this.setState({ loading: true, activeUser: '' });
    this.fetchCategoryName();
    // const tabs = () => (
    //   <Text tabLabel="Tab #1">My</Text>
    // );
    // this.setState({ tabs });
  }

  // eslint-disable-next-line no-unused-vars
  cancelledSubscription = async (subStatus) => {
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
            // } else if (subscriptionId === datas[i].transactionId
            // && datas[i].autoRenewing === true
            //   && subscription === 'false') {
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
            console.log(`DiveThruScreen cancelledSubscription error: ${error}`);
          });
        });
      }
    } catch (err) {
      console.log(`DiveThruScreen cancelledSubscription err: ${err}`);
    }
  }

  checkSubscription() {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment`);
      ref.limitToLast(1).on('child_added', (data) => {
        const user = data.val();
        const packageName = user.subscription_type;
        const subscription = user.subscription;

        if (user.subscription === 'active' && user.subscription_type === 'paypal') {
          this.setState({
            subscriptionStatus: true,
            subscriptionPackage: packageName.toLowerCase(),
            disabledClick: true,
          });
        } else if (user.subscription === 'active') {
          if (Platform.OS === 'ios' && user.payment_type === 'App Store') {
            this.cancelledSubscriptionIos(subscription);
          } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
            this.cancelledSubscription(subscription);
          }
          this.setState({
            subscriptionStatus: true,
            subscriptionPackage: packageName.toLowerCase(),
            disabledClick: true,
          });
        } else if (Platform.OS === 'ios' && user.payment_type === 'App Store') {
          this.cancelledSubscriptionIos(subscription);
        } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
          this.cancelledSubscription(subscription);
        }
      }, (error) => {
        console.log(`DiveThruScreen checkSubscription err: ${error}`);
      });
    });
  }

  // eslint-disable-next-line no-unused-vars
  cancelledSubscriptionIos = async (subStatus) => {
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
          console.log(`DiveThruScreen cancelledSubscriptionIos error: ${error}`);
        });
      });
    } catch (err) {
      console.log(`DiveThruScreen cancelledSubscriptionIos err: ${err}`);
    }
  }

  updateSubscriptionData(key) {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment/${key}`);
      ref.update({ subscription: 'cancel' }).then(() => {

      }).catch((error) => {
        console.log(`DiveThruScreen updateSubscriptionData error: ${error}`);
      });
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

  handleSelectedIndex(setCurrentIndex) {
    const page = parseInt(setCurrentIndex, 10);
    this.tabView.goToPage(page);

    AsyncStorage.getItem('selectedIndex').then((value) => {
      if (value !== null || value !== undefined) {
        AsyncStorage.removeItem('selectedIndex');
      }
    });
  }

  redirectToPage() {
    AsyncStorage.getItem('selectedIndex').then((value) => {
      if (value !== null || value !== undefined) {
        if (value !== null) {
          this.handleSelectedIndex(value);
          AsyncStorage.removeItem('selectedIndex');
        }
      }
    });
  }

  fetchCategoryName() {
    // console.log('DiveThruScreen===> fetchCategoryName');
    // this.setState({ loading: false });
    const ref = firebaseApp.database().ref('Category');
    ref.once('value').then((dataSnapshot) => {
    // const ref = firebaseApp.database().ref('Category');
    // ref.on('value', (dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const labels = [];
        dataSnapshot.forEach((child) => {
          const Active = child.val().active;
          if (child.key !== '10 Day Intro Program') {
            if (Active === true) {
              labels.push(child.key);
            }
          }
        });

        if (labels.length > 0) {
          const tabs = [];
          labels.forEach((item, index) => {
            // console.log('DiveThruScreen===> fetchCategoryName foreach');
            tabs.push(
              <ScrollView tabLabel={item.toUpperCase()} key={item}>
                <CategoryScreen index={index} item={item} screenProps={this.props} key={item} />
              </ScrollView>,
            );
          });
          this.setState({ tabs, loading: false });

          // console.log('DiveThruScreen===> fetchCategoryName redirectToPage');
          this.redirectToPage();
        }
      }
    });
  }

  render() {
    console.log('DiveThruScreen===> render');
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <ScrollableTabView
            ref={(tabView) => { this.tabView = tabView; }}
            style={{ marginTop: 20 }}
            renderTabBar={() => <ScrollableTabBar />}
            tabBarUnderlineStyle={{ backgroundColor: colors.black, width: 130 }}
            tabBarBackgroundColor={colors.white}
            tabBarActiveTextColor="#1A1A1A"
            tabBarInactiveTextColor="#535353"
          >
            { this.state.tabs }
          </ScrollableTabView>
        </View>
      </Spinner>
    );
  }
}

DiveThruScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DiveThruScreen;
