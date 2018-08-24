import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Modal, View, Text, Image, TouchableOpacity, ScrollView,
  ImageBackground, Platform, ListView, Dimensions, AsyncStorage,
  Animated, RefreshControl, StatusBar, FlatList,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';
// import Orientation from 'react-native-orientation';
import { GoogleSignin } from 'react-native-google-signin';
import { Button } from 'react-native-material-ui';
import * as RNIap from 'react-native-iap';
import * as Progress from 'react-native-progress';
import Rate from 'react-native-rate';
import Moment from 'moment';
import firebaseApp from '../../components/constant';
import InfoPopup from '../../components/InfoPopup';
import RatingPopup from '../../components/RatingPopup';
import PaginatedListView from '../../components/PaginatedListView';
import PromptedPopup from '../../components/PromptedPopup';
import Spinner from '../../components/Spinner';
import ActivityIndicator from '../../components/ActivityIndicator';
import styles, { learnMoreButtonStyles, buttonStyles, nextButtonStyles } from '../../styles/home';
import PersonalizedBack from '../../assets/images/personalizedBack.png';
import dashboardBG from '../../assets/images/Dashboard_bg.png';
import dashboardQuotesBG from '../../assets/images/Dashboard_QuotesBG.png';
import subscribeNowBG from '../../assets/images/SubscribeNow_bg.png';
import Home from '../../assets/images/ic_home.png';
import tag1 from '../../assets/images/1.png';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';

const width = Dimensions.get('window').width;

// this shall be called regardless of app state: running, background or not running.
// Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  // there are two parts of notif. notif.notification contains the notification payload,
  // notif.data contains data payload
  if (notif.local_notification) {
    // this is a local notification
  }
  if (notif.opened_from_tray) {
    // notif.opened_from_tray
  }

  if (Platform.OS === 'ios') {
    if (notif._actionIdentifier === 'com.meditation.divethru') {
      // com.meditation.divethru
    }

    switch (notif._notificationType) {
      case NotificationType.Remote:
        // other types available: RemoteNotificationResult.NewData,
        // RemoteNotificationResult.ResultFailed
        notif.finish(RemoteNotificationResult.NewData);
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        // other types available: WillPresentNotificationResult.None
        notif.finish(WillPresentNotificationResult.All);
        break;
      default:
        break;
    }
  } else {
    FCM.presentLocalNotification({
      body: notif.fcm.body,
      priority: 'high',
      title: notif.fcm.title,
      sound: 'default',
      show_in_foreground: true,
      tag: 'DiveThru',
      icon: 'splash_logo',
      'large-icon': 'splash_logo',
    });
  }
});

// eslint-disable-next-line no-unused-vars
FCM.on(FCMEvent.RefreshToken, (token) => {

});

class HomeScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => <Image source={Home} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      indicatorLoading: false,
      dailyQuotes: '',
      session: [],
      last_conversation_id: 0,
      membershipType: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: false,
      catName: '10 Day Intro Program',
      bundleName: '',
      modalVisible: false,
      activeUser: '',
      isRatePrompted: false,
      personalizedModal: false,
      tags: [],
      checked: false,
      checkedItem: [],
      userTagsArray: undefined,
      hideTags: true,
      hideCategories: false,
      imgTag: tag1,
      isCategoryFree: false,
      isAccesstoOpenDive: false,
      isAccesstoDeepDive: false,
      isAccesstoQuickDive: false,
      AccesstoCommon: 'custom',
      sessionProducts: [],
      sessionSubscriptionIds: [],
      bundleSubscriptionIds: [],
    };

    this.onRefresh = false;
    this.quickDivesItem = 0;
    this.deepDivesItem = 0;
    this.openDivesItem = 0;
    this.scrollX = new Animated.Value(0);
    this.scrollX1 = new Animated.Value(0);
    this.scrollX2 = new Animated.Value(0);
    this.arrStreak = [];
    this.arrStreakHasData = false;
  }

  componentWillMount() {
    // Orientation.lockToPortrait();
    this.checkTagIsSelected();
    this.review();
    this.props.navigation.addListener('willFocus', () => {
      this.setState({ activeUser: '' });
      this.checkSubscription();
    });
  }

  async componentDidMount() {
    // this.willMount();
    const vals = [];
    const vals1 = [];
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/IndividualSubscription/session`);
      ref.on('value', (data) => {
        // console.log('DiveThruScreen===> CategoryScreen IndividualSubscription/session');
        data.forEach((userSnapshot) => {
          const values = userSnapshot.val();
          vals.push(values.id);
          this.setState({ sessionSubscriptionIds: vals });
        });
      }, (error) => {
        console.log(`CategoryScreen componentDidMount error: ${error}`);
      });

      const ref1 = firebaseApp.database().ref('Users').child(`${value}/IndividualSubscription/bundle`);
      ref1.on('value', (data1) => {
        // console.log('DiveThruScreen===> CategoryScreen IndividualSubscription/bundle');
        data1.forEach((userSnapshot1) => {
          const values1 = userSnapshot1.val();
          vals1.push(values1.id);
          this.setState({ bundleSubscriptionIds: vals1 });
        });
      }, (error) => {
        console.log(`CategoryScreen componentDidMount error: ${error}`);
      });
    });

    this.fetchUpdatedUser();

    AsyncStorage.getItem('user_id').then((value) => {
      const refcat = firebaseApp.database().ref(`/Users/${value}/device_token`);
      refcat.on('value', (snapshot) => {
        AsyncStorage.getItem('deviceToken').then((deviceToken) => {
          if (snapshot.val() !== deviceToken) {
            AsyncStorage.setItem('Logout', 'You are logged out because you are currently logged in from another device.')
              .then(() => {
                this.onLogout();
                return false;
              });
          }
        });
      });
    });

    const ref = firebaseApp.database().ref('InAppProducts');
    const vals2 = [];
    ref.once('value', (data) => {
      data.forEach((userSnapshot) => {
        const values = userSnapshot.val();
        vals2.push({
          product_id: values.product_id,
          session_id: values.session_id,
          bundle_id: values.bundle_id,
        });
        this.setState({ sessionProducts: vals2 });
      });
    }, (error) => {
      console.log(`CategoryScreen componentDidMount error: ${error}`);
    });

    setInterval(() => {
      AsyncStorage.getItem('Reload').then((value1) => {
        if (value1 === 'Yes') {
          AsyncStorage.setItem('Reload', 'No');
        }
      });
    }, 1000);

    this.props.navigation.addListener('willFocus', () => {
      // this.checkTagIsSelected();
      // this.willMount();

      FCM.on(
        FCMEvent.Notification,
        (notification) => {
          if (notification.opened_from_tray) {
            this.fetchQuotesData();
          }
        },
      );

      try {
        this.checkSubscription();
      } catch (err) {
        console.log(`componentDidMount Error: ${err}`);
      }
    });
  }

  onLogout = () => {
    AsyncStorage.removeItem('user_id');
    AsyncStorage.getItem('google_id').then((value) => {
      if (value !== null) {
        GoogleSignin.configure({
          iosClientId: '5071479695-r7nemrqv9msoh45ebdc0vrif39ghoivl.apps.googleusercontent.com',
        });
        GoogleSignin.signOut()
          .then(() => {
            AsyncStorage.setItem('wasAlreadyLoggedIn', 'true');
            AsyncStorage.removeItem('google_id');
            AsyncStorage.removeItem('fb_id');
            this.props.navigation.navigate('LoginScreen', { loginText: 'true' });
          })
          .catch((err) => {
            console.log(`onLogout Error: ${err}`);
          });
      } else {
        AsyncStorage.setItem('wasAlreadyLoggedIn', 'true');
        AsyncStorage.removeItem('google_id');
        AsyncStorage.removeItem('fb_id');
        this.props.navigation.navigate('LoginScreen', { loginText: 'true' });
      }
    });
  };

  onRefreshClicked() {
    this.onRefresh = true;
    this.setState({ refreshing: true });
    this.fetchUserLastConversationData().then(() => {
      this.fetch10DayProgramData().then(() => {
        this.fetchQuotesData().then(() => {
          this.setState({ refreshing: false });
          this.fetchAccessCodeData(() => {
            // this.fetchCategoryWiseDataHome().then(() => {
            // this.props.navigation.navigate('Home');
            this.onRefresh = false;
            this.setState({ refreshing: false });
            // }).catch(() => { });
          }).catch(() => { });
        }).catch(() => { });
      }).catch(() => { });
    }).catch(() => { });
  }

  onBegin = () => {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const membership = convo.membership_type;
          this.setState({ membershipType: membership });
          if (membership === 'Free') {
            if (this.state.session.length > 0) {
              if (this.state.last_conversation_id === 10 && this.state.AccesstoCommon !== 'all') {
                this.props.navigation.navigate('SubscribeNowScreen', { onDescription: false });
              } else {
                this.redirectToPlayer();
              }
            }
          } else {
            this.redirectToPlayer();
          }
        });
      }
    }).catch(() => { });
  }

  getFinalData() {
    const finalCategory = this.state.allData;
    const finalData = [];
    let mainindex = 0;
    finalCategory.forEach((child, index) => {
      const arrData = [];
      const CategoryName = child.cat_name;
      const CategoryDescription = child.cat_desc;

      const scrollx = new Animated.Value(0);
      if (child.session) {
        const categoryData = child.session;
        let keyindex = '';
        if (child.active === true) {
          keyindex = mainindex;
        }
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.session_id,
            img: innerchild.session_img,
            name: innerchild.session_name,
            type: 'session',
            index: keyindex,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      } else if (child.bundle) {
        const categoryData = child.bundle;
        let keyindex = '';
        if (child.active === true) {
          keyindex = mainindex;
        }
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.bundle_id,
            img: innerchild.bundle_img,
            name: innerchild.bundle_name,
            type: 'bundle',
            index: keyindex,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      } else if (child.SubCategory) {
        const categoryData = child.SubCategory;
        let keyindex = '';
        if (child.active === true) {
          keyindex = mainindex;
        }
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.subcategory_id,
            img: innerchild.subcategory_img,
            name: innerchild.subcategory_name,
            type: 'subcategory',
            index: keyindex,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      }

      if (child.active === true) {
        finalData.push({
          cat_name: CategoryName,
          cat_desc: CategoryDescription,
          arrdata: this.finalarrData,
          scroll: scrollx,
          isCustomDashboard: false,
        });
        mainindex += 1;
      }
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(finalData),
    });

    FCM.requestPermissions().then(() => {
      AsyncStorage.setItem('notification_allow', 'true');
    })
      .catch(() => {
        AsyncStorage.setItem('notification_allow', 'false');
      });
  }

  getFinalTagsData() {
    const finalCategory = this.state.allData;
    // console.log(`finalCategory-->${JSON.stringify(finalCategory)}`);
    const finalData = [];
    finalCategory.forEach((child, index) => {
      const arrData = [];
      const CategoryName = child.cat_name;
      const CategoryDescription = child.cat_desc;
      const scrollx = new Animated.Value(0);
      let isCategoryFree = false;
      if (this.state.Arrcategory !== undefined) {
        isCategoryFree = this.state.Arrcategory.includes(CategoryName);
      }

      this.setState({
        CategoryName,
        isCategoryFree,
      });

      if (child.session) {
        const categoryData = child.session;
        categoryData.forEach((innerchild) => {
          if (innerchild.tagMatched === 'Matched') {
            arrData.push({
              id: innerchild.session_id,
              img: innerchild.session_img,
              name: innerchild.session_name,
              type: 'session',
              index,
              title: '',
            });
          }
        });
        // const size = 6;
        this.finalarrData = arrData;
      } else if (child.bundle) {
        const categoryData = child.bundle;
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.bundle_id,
            img: innerchild.bundle_img,
            name: innerchild.bundle_name,
            type: 'bundle',
            index,
            title: '',
          });
        });
        // const size = 6;
        this.finalarrData = arrData;
      } else if (child.SubCategory) {
        const categoryData = child.SubCategory;
        categoryData.forEach((innerchild) => {
          // console.log('innerchild-->' + JSON.stringify(innerchild));
          if (innerchild.session !== undefined) {
            const innerSession = innerchild.session;
            const dataArray = [];
            innerSession.forEach((element) => {
              // console.log('element-->' + JSON.stringify(element.isSessionFree));
              if (element.tagMatched !== 'Not Matched') {
                if (innerchild.subcategory_id === element.tagMatched.budle_id) {
                  dataArray.push({
                    sessionDatas: element.tagMatched,
                  });
                  if (JSON.stringify(dataArray).indexOf(element.tagMatched.budle_id) > -1) {
                    arrData.push({
                      id: element.tagMatched.budle_id,
                      img: element.tagMatched.session_img,
                      name: element.tagMatched.session_name,
                      type: 'subcategorySession',
                      index,
                      description: element.tagMatched.session_description,
                      session: innerchild.session,
                      isSessionFree: element.isSessionFree,
                      title: innerchild.subcategory_name,
                      subcategory_id: innerchild.subcategory_id,
                      playStoreProduct: element.playStoreProduct,
                      categoryName: innerchild.parentcategory,
                      subcategory_img: innerchild.subcategory_img,
                    });
                  }
                }
              }
            });
          } else if (innerchild.bundle) {
            // console.log('bundle-->' + JSON.stringify(innerchild.bundle));
            const bundle = innerchild.bundle;
            bundle.forEach((bchild) => {
              // const innerSession = bchild.session;
              // const dataArray = [];
              if (bchild.tagMatched !== 'Not Matched') {
                arrData.push({
                  id: bchild.bundle_id,
                  img: bchild.bundle_img,
                  name: bchild.bundle_name,
                  type: 'subcategoryBundleSession',
                  index,
                  description: bchild.bundle_description,
                  session: bchild.session,
                  isBundleFree: bchild.isBundleFree,
                  title: innerchild.subcategory_name,
                  subcategory_id: innerchild.subcategory_id,
                  playStoreProduct: bchild.playStoreProduct,
                  categoryName: innerchild.parentcategory,
                  subcategory_img: innerchild.subcategory_img,
                });
              }
            });
          }
        });
        // const size = 6;
        this.finalarrData = arrData;
      }

      if (child.active === true) {
        finalData.push({
          cat_name: CategoryName,
          cat_desc: CategoryDescription,
          arrdata: this.finalarrData,
          scroll: scrollx,
          isCustomDashboard: true,
        });
      }
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(finalData),
    });

    FCM.requestPermissions().then(() => {
      AsyncStorage.setItem('notification_allow', 'true');
    })
      .catch(() => {
        AsyncStorage.setItem('notification_allow', 'false');
      });
  }

  getMatchedTagResult(sessionTags) {
    let result = 'Not Matched';
    const userTags = this.state.userTagsArray;
    if (userTags === undefined) {
      return 'Not Matched';
    }

    const userArray = this.convertArray(userTags);
    if (sessionTags !== undefined) {
      this.convertArray(sessionTags);
      if (userArray.length > 0) {
        userArray.forEach((element) => {
          if (sessionTags.toString().indexOf(element) > -1) {
            result = 'Matched';
          }
        });
      } else {
        result = 'Not Matched';
      }
    }
    return result;
  }

  getMatchedTagResultSubCategory(session) {
    let result = 'Not Matched';
    const userTags = this.state.userTagsArray;
    if (userTags === undefined) {
      result = 'Not Matched';
    } else {
      const sessionTags = session.tag;
      const userArray = this.convertArray(userTags);
      if (sessionTags !== undefined) {
        this.convertArray(sessionTags);
        if (userArray.length > 0) {
          userArray.forEach((element) => {
            if (sessionTags.toString().indexOf(element) > -1) {
              result = session;
            }
          });
        } else {
          result = 'Not Matched';
        }
      }
    }
    return result;
  }

  // eslint-disable-next-line no-unused-vars
  cancelledSubscription = async (subStatus) => {
    try {
      const datas = await RNIap.getAvailablePurchases();
      for (let i = 0; i < datas.length; i++) { // eslint-disable-line no-plusplus
        // let obj = datas[i];
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
            // eslint-disable-next-line no-empty
            } else if (subscriptionId === datas[i].transactionId && datas[i].autoRenewing === true && subscription === 'false') {

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
            console.log(`limitToLast Error: ${error}`);
          });
        });
      }
    } catch (err) {
      console.log(`cancelledSubscription Error: ${err}`);
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
          // eslint-disable-next-line no-empty
          if (Platform.OS === 'ios' && user.payment_type === 'App Store') {

          } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
            this.cancelledSubscription(subscription);
          }

          this.setState({
            subscriptionStatus: true,
            subscriptionPackage: packageName.toLowerCase(),
            disabledClick: true,
          });
        // eslint-disable-next-line no-empty
        } else if (Platform.OS === 'ios' && user.payment_type === 'App Store') {

        } else if (Platform.OS === 'android' && user.payment_type === 'Play Store') {
          this.cancelledSubscription(subscription);
        }
      }, (error) => {
        console.log(`limitToLast Error: ${error}`);
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
          // const subscriptionId = user2.transaction_id;
          const originalTransactionIdentifier = user2.originalTransactionIdentifier;
          const paymentType = user2.payment_type;
          const receipt = user2.transactionReceipt;
          // const date = new Date(Number(user2.transactionDate)).toString();
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
          console.log(`cancelledSubscriptionIos limitToLast Error: ${error}`);
        });
      });
    } catch (err) {
      console.log(`cancelledSubscriptionIos Error: ${err}`);
    }
  }

  updateSubscriptionData(key) {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment/${key}`);
      ref.update({ subscription: 'cancel' }).then(() => {

      }).catch((error) => {
        console.log(`updateSubscriptionData Error: ${error}`);
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

  closePopup() {
    this.setState({ modalVisible: false });
    this.onLogout();
  }

  fetchUserLastConversationData() {
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const refcat = firebaseApp.database().ref(`/Users/${value}`);
        refcat.on('value', (dataSnapshot) => {
          const convo = dataSnapshot.val();
          const membership = convo.membership_type;
          // const rating = convo.rating;
          const lastConversation = convo.last_free_conversation_id;
          const halted = convo.halted;
          let streakData = [];
          if (convo.streak !== '') {
            streakData = convo.streak;
            this.arrStreak = streakData;
            this.arrStreakHasData = true;
          }

          this.setState({
            loading: false,
            last_conversation_id: lastConversation,
            halted,
            membershipType: membership,
          });
        });
      }
    }).catch(() => { });
    return userData;
  }

  fetchQuotesData() {
    const ref = firebaseApp.database().ref('DailyQuotes');
    return ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const quotes = [];
        dataSnapshot.forEach((child) => {
          quotes.push({
            quotes: child.val().qoute_description,
          });
        });
        const dailyQuotes = quotes.slice(-1)[0];
        this.setState({ dailyQuotes: dailyQuotes.quotes });
      } else {
        this.setState({ dailyQuotes: 'It’s time to accept the shit out of yourself.' });
      }
    }).catch(() => { });
  }

  fetchAccessCodeData() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot1) => {
          let Arrsession = [];
          let ArrBundle = [];
          let Arrcategory = [];
          if (dataSnapshot1.exists()) {
            const AccessCode = dataSnapshot1.val().access_code;
            if (AccessCode !== '') {
              const refaccess = firebaseApp.database().ref('AccessCodes').child(AccessCode);
              refaccess.once('value').then((dataSnapshot) => {
                if (dataSnapshot.exists()) {
                  const Accessto = dataSnapshot.val().accessto;
                  const enddate = dataSnapshot.val().enddate;
                  const validity = dataSnapshot.val().validity;
                  const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
                  if (validity === 'unlimited') {
                    if (Accessto !== 'all') {
                      if (Accessto === 'Open Dive') {
                        this.setState({ isAccesstoOpenDive: true });
                      } else if (Accessto === 'Deep Dive') {
                        this.setState({ isAccesstoDeepDive: true });
                      } else if (Accessto === 'Quick Dive') {
                        this.setState({ isAccesstoQuickDive: true });
                      } else if (Accessto === 'custom') {
                        this.setState({ AccesstoCommon: Accessto });
                        const Sessions = dataSnapshot.val().session;
                        const Bundles = dataSnapshot.val().bundle;
                        const Categories = dataSnapshot.val().category;
                        if (Sessions) {
                          Arrsession = Sessions.split(',');
                          this.setState({ Arrsession });
                        }
                        if (Bundles) {
                          ArrBundle = Bundles.split(',');
                          this.setState({ ArrBundle });
                        }
                        if (Categories) {
                          Arrcategory = Categories.split(',');
                          this.setState({ Arrcategory });
                        }
                      }
                    } else if (Accessto === 'all') {
                      this.setState({ AccesstoCommon: Accessto });
                    }
                  } else if (CurrentDate < enddate) {
                    if (Accessto !== 'all') {
                      if (Accessto === 'Open Dive') {
                        this.setState({ isAccesstoOpenDive: true });
                      } else if (Accessto === 'Deep Dive') {
                        this.setState({ isAccesstoDeepDive: true });
                      } else if (Accessto === 'Quick Dive') {
                        this.setState({ isAccesstoQuickDive: true });
                      } else if (Accessto === 'custom') {
                        this.setState({ AccesstoCommon: Accessto });
                        const Sessions = dataSnapshot.val().session;
                        const Bundles = dataSnapshot.val().bundle;
                        const Categories = dataSnapshot.val().category;
                        if (Sessions) {
                          Arrsession = Sessions.split(',');
                          this.setState({ Arrsession });
                        }
                        if (Bundles) {
                          ArrBundle = Bundles.split(',');
                          this.setState({ ArrBundle });
                        }
                        if (Categories) {
                          Arrcategory = Categories.split(',');
                          this.setState({ Arrcategory });
                        }
                      }
                    } else if (Accessto === 'all') {
                      this.setState({ AccesstoCommon: Accessto });
                    }
                  } else {
                    this.setState({
                      isAccesstoOpenDive: false,
                      isAccesstoDeepDive: false,
                      isAccesstoQuickDive: false,
                      AccesstoCommon: 'custom',
                      isCategoryFree: false,
                    });
                  }
                }
              });
            }
            this.fetchCategoryWiseDataHome();
          }
        });
      }
    });
  }

  fetchCategoryWiseDataHome() {
    const subscriptionIds = this.state.sessionSubscriptionIds;
    const bSubscriptionIds = this.state.bundleSubscriptionIds;
    const ref = firebaseApp.database().ref('Category');
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const arrayCategory = [];
        dataSnapshot.forEach((child) => {
          if (child.key !== '10 Day Intro Program') {
            const arraySessionAllData = [];
            const arraySubCategoryAllData = [];
            const arrayBundleAllData = [];
            if (child.val().Session) { // Open Dive
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              const CategoryID = child.val().category_id;
              const Active = child.val().active;
              let streakVisitedSessionCount = 0;
              let isSessionAvailable = false;
              if (child.val().Bundle === '' || child.val().SubCategory === '') {
                let arraySession = [];
                arraySession = child.val().Session ? child.val().Session : [];

                Object.keys(arraySession).forEach((key, i) => {
                  const value = arraySession[key];
                  if (this.arrStreakHasData === true) {
                    if (Object.keys(this.arrStreak).length > 0) {
                      Object.keys(this.arrStreak).forEach((streakKey) => {
                        let streakValue = [];
                        streakValue = this.arrStreak[streakKey];
                        if (CategoryID === streakKey) {
                          streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                          if (streakVisitedSessionCount > 0) {
                            isSessionAvailable = Object.keys(streakValue.Session).includes(
                              value.session_id,
                            );
                          }
                        }
                      });
                    }
                  }

                  arraySessionAllData.push({
                    index: i,
                    isSessionAvailable,
                    session_name: value.session_name,
                    session_img: value.session_img,
                    session_id: value.session_id,
                    session_description: value.session_description,
                    meditation_audio: value.meditation_audio[0],
                    meditation_audio_time: value.meditation_audio_time[0],
                    tag: value.tag,
                    tagMatched: this.getMatchedTagResult(value.tag),
                    session_quote_description: value.session_quote_description,
                    session_quote_img: value.session_quote_img,
                  });
                });

                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  active: Active,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  active: Active,
                });
              }
            } else if (child.val().Bundle) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              const Active = child.val().active;
              if (child.val().Session === '' || child.val().SubCategory === '') {
                let arrayBundle = [];
                arrayBundle = child.val().Bundle;
                Object.keys(arrayBundle).forEach((key) => {
                  let value = [];
                  value = arrayBundle[key];
                  const sessionRry = value.Session ? value.Session : [];
                  const arrayNewSession = [];
                  let streakVisitedSessionCount = 0;
                  let isSessionAvailable = false;
                  if (sessionRry !== undefined) {
                    Object.keys(sessionRry).forEach((key1, index) => {
                      const value1 = sessionRry[key1];
                      if (this.arrStreakHasData === true) {
                        if (Object.keys(this.arrStreak).length > 0) {
                          Object.keys(this.arrStreak).forEach((streakKey) => {
                            let streakValue = [];
                            streakValue = this.arrStreak[streakKey];
                            if (value.bundle_id === streakKey) {
                              streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                              if (streakVisitedSessionCount > 0) {
                                isSessionAvailable = Object.keys(streakValue.Session).includes(
                                  value1.session_id,
                                );
                              }
                            }
                          });
                        }
                      }

                      arrayNewSession.push({
                        index,
                        isSessionAvailable,
                        session_name: value1.session_name,
                        session_img: value1.session_img,
                        session_id: value1.session_id,
                        session_description: value1.session_description,
                        meditation_audio: value1.meditation_audio,
                        meditation_audio_time: value1.meditation_audio_time,
                        tag: value1.tag,
                        tagMatched: this.getMatchedTagResult(value1.tag),
                        session_quote_description: value1.session_quote_description,
                        session_quote_img: value1.session_quote_img,
                      });
                    });
                  }

                  arrayBundleAllData.push({
                    bundle_name: value.bundle_name,
                    bundle_img: value.bundle_img,
                    bundle_id: value.bundle_id,
                    bundle_description: value.bundle_description,
                    session: arrayNewSession,

                  });
                });

                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  active: Active,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  active: Active,
                });
              }
            } else if (child.val().SubCategory) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              const Active = child.val().active;
              if (child.val().Bundle === '' || child.val().Session === '') {
                let arraySubCategory = [];
                arraySubCategory = child.val().SubCategory;
                Object.keys(arraySubCategory).forEach((key) => {
                  const value = arraySubCategory[key];
                  const bundleRry = value.Bundle ? value.Bundle : [];
                  const sessionAry = value.Session ? value.Session : [];
                  const arrayNewBundle = [];
                  let arrayNewSession = [];
                  let isBundleFree = false;
                  let isSessionFree = false;
                  let streakVisitedSessionCount = 0;
                  let isSessionAvailable = false;
                  if (bundleRry !== undefined && sessionAry.length <= 0) { // Deep Dive
                    Object.keys(bundleRry).forEach((key1) => {
                      const value1 = bundleRry[key1];
                      const sessionRry = value1.Session ? value1.Session : [];
                      arrayNewSession = [];
                      if (sessionRry !== undefined) {
                        Object.keys(sessionRry).forEach((key2, index) => {
                          const value2 = sessionRry[key2];
                          if (this.arrStreakHasData === true) {
                            if (Object.keys(this.arrStreak).length > 0) {
                              Object.keys(this.arrStreak).forEach((streakKey) => {
                                let streakValue = [];
                                streakValue = this.arrStreak[streakKey];
                                if (value1.bundle_id === streakKey) {
                                  streakVisitedSessionCount
                                    = Object.keys(streakValue.Session).length;
                                  if (streakVisitedSessionCount > 0) {
                                    isSessionAvailable = Object.keys(streakValue.Session).includes(
                                      value2.session_id,
                                    );
                                  }
                                }
                              });
                            }
                          }
                          if (this.state.ArrBundle !== undefined && this.state.ArrBundle !== '') {
                            isBundleFree = this.state.ArrBundle.includes(value1.bundle_id);
                          }
                          if (isBundleFree === true) {
                            isSessionFree = true;
                          }
                          arrayNewSession.push({
                            index,
                            isSessionAvailable,
                            session_name: value2.session_name,
                            session_img: value2.session_img,
                            session_id: value2.session_id,
                            session_description: value2.session_description,
                            meditation_audio: value2.meditation_audio,
                            meditation_audio_time: value2.meditation_audio_time,
                            session_quote_description: value2.session_quote_description,
                            session_quote_img: value2.session_quote_img,
                          });
                        });
                      }

                      arrayNewBundle.push({
                        bundle_name: value1.bundle_name,
                        bundle_img: value1.bundle_img,
                        bundle_id: value1.bundle_id,
                        bundle_description: value1.bundle_description,
                        session: arrayNewSession,
                        subcategory_id: value.subcategory_id,
                        tagMatched: this.getMatchedTagResultSubCategory(value1),
                        bundleSubscription: !!bSubscriptionIds.includes(value1.bundle_id),
                        playStoreProduct: this.sessionSubscriptionPlay(value1.bundle_id, 'bundle'),
                        isBundleFree,
                      });
                    });

                    arraySubCategoryAllData.push({
                      subcategory_id: value.subcategory_id,
                      subcategory_name: value.subcategory_name,
                      subcategory_img: value.subcategory_img,
                      subcategory_description: value.subcategory_description,
                      parentcategory: value.parentcategory,
                      bundle: arrayNewBundle,
                    });
                  } else if (sessionAry !== undefined && bundleRry.length <= 0) { // Quick
                    Object.keys(sessionAry).forEach((key1, index) => {
                      const sessionData = sessionAry[key1];
                      if (this.arrStreakHasData === true) {
                        if (Object.keys(this.arrStreak).length > 0) {
                          Object.keys(this.arrStreak).forEach((streakKey) => {
                            let streakValue = [];
                            streakValue = this.arrStreak[streakKey];
                            if (value.subcategory_id === streakKey) {
                              streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                              if (streakVisitedSessionCount > 0) {
                                isSessionAvailable = Object.keys(streakValue.Session).includes(
                                  sessionData.session_id,
                                );
                              }
                            }
                          });
                        }
                      }
                      if (this.state.Arrsession !== undefined && this.state.Arrsession !== '') {
                        isSessionFree = this.state.Arrsession.includes(sessionData.session_id);
                      }
                      arrayNewSession.push({
                        index,
                        session_name: sessionData.session_name,
                        session_img: sessionData.session_img,
                        session_id: sessionData.session_id,
                        session_description: sessionData.session_description,
                        meditation_audio: sessionData.meditation_audio,
                        meditation_audio_time: sessionData.meditation_audio_time,
                        tag: sessionData.tag,
                        subcategory_id: value.subcategory_id,
                        tagMatched: this.getMatchedTagResultSubCategory(sessionData),
                        sessionSubscription: !!subscriptionIds.includes(sessionData.session_id),
                        playStoreProduct: this.sessionSubscriptionPlay(sessionData.session_id, 'session'),
                        isSessionAvailable,
                        isSessionFree,
                        session_quote_description: sessionData.session_quote_description,
                        session_quote_img: sessionData.session_quote_img,
                      });
                    });

                    arraySubCategoryAllData.push({
                      subcategory_id: value.subcategory_id,
                      subcategory_name: value.subcategory_name,
                      subcategory_img: value.subcategory_img,
                      subcategory_description: value.subcategory_description,
                      parentcategory: value.parentcategory,
                      session: arrayNewSession,
                    });
                  }
                });

                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  active: Active,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  active: Active,
                });
              }
            } else {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              const Active = child.val().active;
              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                session: [],
                active: Active,
              });
            }
          }
        });
        this.setState({ allData: arrayCategory });

        if (this.state.userTagsArray !== undefined) {
          this.getFinalTagsData();
        } else {
          this.getFinalData();
        }
      }
    });
  }

  convertArray = (string) => {
    return string.split(',');
  }

  checkTagIsSelected() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const refcat = firebaseApp.database().ref(`/Users/${value}`);
        refcat.on('value', (dataSnapshot) => {
          const userData = dataSnapshot.val();
          console.log(`Homescreen checkTagIsSelected skipTags: ${userData.skipTags}`);
          const userTags = userData.tags;
          const skipTag = userData.skipTags;
          // const visited = userData.visited;

          if (skipTag === true) {
            if (userTags === '') {
              this.setState({
                hideTags: true,
                userTagsArray: undefined,
                hideCategories: false,
              });
            } else {
              this.setState({
                hideTags: true,
                userTagsArray: userTags,
                hideCategories: false,
              });
            }
          } else {
            this.setState({
              userTagsArray: userTags,
              hideTags: false,
              hideCategories: true,
            });
          }
        });
      }
    }).catch((error) => {
      console.log(`Homescreen checkTagIsSelected Error: ${error}`);
    });
  }

  fetchUpdatedUser() {
    StatusBar.setHidden(false);
    this.setState({ loading: true });
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const refcat = firebaseApp.database().ref(`/Users/${value}`);
        // eslint-disable-next-line no-unused-vars
        refcat.on('value', (dataSnapshot) => {
          this.willMount();
        });
      }
    }).catch(() => { });
    return userData;
  }

  willMount = () => {
    // StatusBar.setHidden(false);
    // this.setState({ loading: true });
    this.fetchUserLastConversationData().then(() => {
      this.fetch10DayProgramData().then(() => {
        this.fetchQuotesData().then(() => {
          this.fetchAccessCodeData(() => {
            // this.fetchCategoryWiseDataHome().then(() => {
            this.setState({ loading: false });
            // }).catch(() => { });
          }).catch(() => { });
        }).catch(() => { });
      }).catch(() => { });
    }).catch(() => { });
  }

  review() {
    AsyncStorage.getItem('user_id').then((value) => {
      firebaseApp.database().ref(`/Users/${value}`).once('value').then((snapshot) => {
        const lastConverstionId = snapshot.val().last_free_conversation_id;
        const rating = snapshot.val().rating;
        if (lastConverstionId === 3) {
          if (rating === undefined || rating !== true) {
            if (Platform.OS === 'android') {
              this.setState({ isRatePrompted: true });
            } else {
              this.reviewForIos();
            }
          }
        }
      });
    });
  }

  sessionSubscriptionPlay(id, type) {
    if (type === 'bundle') {
      const arrObj = this.state.sessionProducts;
      for (let i = 0; i < arrObj.length; i++) { // eslint-disable-line no-plusplus
        if (arrObj[i].bundle_id === id) {
          return arrObj[i].product_id;
        }
      }
    } else if (type === 'session') {
      const arrObj = this.state.sessionProducts;
      for (let i = 0; i < arrObj.length; i++) { // eslint-disable-line no-plusplus
        if (arrObj[i].session_id === id) {
          return arrObj[i].product_id;
        }
      }
    }
    return '';
  }

  reviewForIos() {
    const STORE_LINK = 'https://itunes.apple.com/us/app/divethru/id1383605874?ls=1&mt=8';
    const options = {
      AppleAppID: '1383605874',
      GooglePackageName: 'com.divethru.divethru',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferInApp: true,
      fallbackPlatformURL: STORE_LINK,
    };

    Rate.rate(options, (success) => {
      if (success) {
        this.setState({ rated: true });
        AsyncStorage.getItem('user_id').then((value) => {
          if (value != null) {
            const Rating = {
              rating: this.state.rated,
            };
            const ref2 = firebaseApp.database().ref('Users').child(value);
            ref2.update(Rating);

            const RatingData = {
              rating: 1,
              device_type: Platform.OS,
            };
            const ref = firebaseApp.database().ref('Rating').child(value);
            ref.push(RatingData);
          }
        });
      }
    });
  }

  fetch10DayProgramData() {
    const ref = firebaseApp.database().ref('Category').child('10 Day Intro Program');
    return ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const sessionData = [];
        let ArrSession = [];
        const CategoryName = dataSnapshot.val().category_name;
        const CategoryDescription = dataSnapshot.val().category_description;
        ArrSession = dataSnapshot.val().Session;
        this.setState({
          OpenDiveTitle: CategoryName,
          OpenDiveDescription: CategoryDescription,
        });

        Object.keys(ArrSession).forEach((key) => {
          const value = ArrSession[key];
          sessionData.push({
            session_name: value.session_name,
            session_img: value.session_img,
            session_id: value.session_id,
            session_description: value.session_description,
            meditation_audio: value.meditation_audio,
            meditation_audio_time: value.meditation_audio_time,
            session_quote_description: value.session_quote_description,
            session_quote_img: value.session_quote_img,
          });
        });
        const size = 6;
        this.openDivesItem = sessionData.slice(0, size);
        this.setState({
          session: sessionData,
        });
      }
    }).catch(() => { });
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  redirectToPlayer() {
    if (this.state.last_conversation_id >= 8) {
      this.clearTimer();
    }
    let lastConversation = this.state.last_conversation_id;
    if (lastConversation === 10) {
      lastConversation = 9;
    }
    const session = this.state.session[lastConversation];
    const rowdata = {
      session_name: session.session_name,
      session_img: session.session_img,
      session_id: session.session_id,
      session_description: session.session_description,
      meditation_audio: session.meditation_audio,
      meditation_audio_time: session.meditation_audio_time,
      last_conversation_id: this.state.last_conversation_id,
      halted: this.state.halted,
      session_quote_description: session.session_quote_description,
      session_quote_img: session.session_quote_img,
    };

    this.props.navigation.navigate('Player', {
      returnData: this.fetchUserLastConversationData.bind(this),
      rowdata,
      sessionHalted: this.state.sessionHalted,
      AccesstoCommon: this.state.AccesstoCommon,
    });
  }

  openPersonalizedModel(page) {
    this.setState({ indicatorLoading: true });
    const ref = firebaseApp.database().ref('Tags');
    ref.once('value', (snap) => {
      const data = [];
      snap.forEach((tagValue) => {
        data.push(tagValue.val());
      });
      const taggs = data;
      this.setState({ indicatorLoading: false });
      this.showModalData(taggs, page);
    });
  }

  showModalData(tagsData, page) {
    const tagsTitle = tagsData[page].tags_category;
    const tagsString = tagsData[page].tags;
    const finalPage = tagsData.length - 1;
    const checkedItem = this.state.checkedItem;

    this.setState({ matched: undefined, imagePage: page });
    const newPage = page - 1;
    const checkedItemArray = checkedItem.toString().split(',');
    if (newPage > -1) {
      const oldTags = tagsData[newPage].tags;

      checkedItemArray.forEach((element) => {
        if (element === '') {
          this.setState({ matched: undefined });
        } else {
          const string = element.toString();
          if (oldTags !== undefined && oldTags.indexOf(string) !== -1) {
            this.setState({ matched: true });
          }
        }
      });
    }

    const tags = tagsString.split(',');
    if (this.state.matched === undefined && page > 0) {
      Alert.alert(
        'Alert',
        'Select atleast one tag',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    } else {
      if (finalPage === page) {
        this.renderImage(this.state.imagePage);
        this.setState({
          finaltags: tags,
          changeButton: true,
        });
      } else {
        this.renderImage(this.state.imagePage);
        this.setState({ changeButton: false });
      }
      this.setState({
        tagsTitle,
        tags,
        page,
      });

      if (page === 0) {
        this.setState({ personalizedModal: true });
      }
    }
  }

  closePersonalizedModal() {
    const checkedItem = this.state.checkedItem;
    const oldTags = this.state.finaltags;
    let matchedStrings = '';
    checkedItem.forEach((element) => {
      const string = element.toString();
      if (oldTags !== undefined && oldTags.indexOf(string) !== -1) {
        matchedStrings = string;
      }
    });

    if (matchedStrings === '') {
      Alert.alert(
        'Alert',
        'Select Atleast One Tag.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    } else {
      const tags = checkedItem.toString();

      this.setState({ personalizedModal: false });
      AsyncStorage.getItem('user_id').then((value) => {
        const storeRef = firebaseApp.database().ref().child(`Users/${value}`);
        storeRef.update({ skipTags: true });
        storeRef.update({ tags });
      });
    }
  }

  skipTags = () => {
    AsyncStorage.getItem('user_id').then((value) => {
      const storeRef = firebaseApp.database().ref().child(`Users/${value}`);
      storeRef.update({ skipTags: true });
    });
    // this.props.navigation.navigate('Home');
  }

  CloseModal = () => {
    this.setState({
      isLearnMoreClicked: false,
      DeepDive: false,
      OpenDive: false,
      QuickDive: false,
    });
  }

  CloseRatModal = () => {
    this.setState({ isRatePrompted: false });
    this.state.isRatePrompted = false;
  }

  redirectToDay4() {
    if (this.state.isRatePrompted === false) {
      this.redirectToPlayer();
    }
  }

  redirectToDiveThruTab(item) {
    const i = item.index.toString();
    AsyncStorage.setItem('selectedIndex', i).then(() => {
      this.props.navigation.navigate('DiveThru');
    });
  }

  redirectToDescription(item) {
    let i = 0;
    item.session.forEach((child) => {
      if (item.name === child.session_name) {
        i = child.index;
      }
    });

    if (item.categoryName === 'Deep Dive') {
      this.props.navigation.navigate('BundleDescription',
        {
          selectedIndexOfCategory: i,
          sessionData: item.session,
          subCategoryname: item.title,
          subcategoryId: item.subcategory_id,
          name: item.name,
          item: item.categoryName,
          bundleId: item.id,
          bundleDesc: item.description,
          bundleImage: item.img,
          purchasedBundle: false,
          returnData: this.fetchUserLastConversationData.bind(this),
          sessionType: 'SubCategoryBundle',
          isCategoryFree: this.state.isCategoryFree,
          isBundleFree: item.isBundleFree,
          AccesstoCommon: this.state.AccesstoCommon,
          isAccesstoDeepDive: this.state.isAccesstoDeepDive,
          playStoreProduct: item.playStoreProduct,
          categoryName: item.categoryName,
          isSessionFree: false,
          isAccesstoQuickDive: this.state.isAccesstoQuickDive,
        },
      );
    } else if (item.categoryName === 'Quick Dive') {
      // console.log('ITEMMM: ' + JSON.stringify(item));
      // console.log('ITEMMM: iiiii: ' + i);
      this.props.navigation.navigate('BundleDescription', {
        selectedIndexOfCategory: i,
        sessionData: item.session[i],
        subCategoryname: item.title,
        subcategoryId: item.subcategory_id,
        name: item.name,
        item: item.categoryName,
        bundleId: item.session[i].session_id,
        bundleDesc: item.description,
        bundleImage: item.subcategory_img,
        purchasedBundle: false,
        returnData: this.fetchUserLastConversationData.bind(this),
        sessionType: 'SubCategorySession',
        isCategoryFree: this.state.isCategoryFree,
        isBundleFree: false,
        AccesstoCommon: this.state.AccesstoCommon,
        isAccesstoDeepDive: this.state.isAccesstoDeepDive,
        playStoreProduct: item.playStoreProduct,
        categoryName: item.categoryName,
        isSessionFree: item.isSessionFree,
        isAccesstoQuickDive: this.state.isAccesstoQuickDive,
      });
    }
  }

  checkUncheck(e) {
    const checkedItem = this.state.checkedItem;
    const index = checkedItem.indexOf(e);
    if (index > -1) {
      checkedItem.splice(index, 1);
      this.setState({ checkedItem });
    } else {
      this.setState({ checkedItem: [...this.state.checkedItem, e] });
    }
  }

  check(item) {
    const checkedItemState = this.state.checkedItem;
    if (checkedItemState.indexOf(item) >= 0) {
      return true;
    }
    return false;
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => { this.redirectToDiveThruTab(item); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.img }}
            style={styles.FlatListImage}
            resizeMethod="resize"
          >
            {
              (this.state.userTagsArray !== undefined && this.state.userTagsArray !== '')
                ? <Text style={styles.FlatListTitle}>{item.title}</Text>
                : null
            }
            <Text style={styles.FlatListText}>{item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  renderCustomItem({ item }) {
    return (
      <TouchableOpacity onPress={() => { this.redirectToDescription(item); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.img }}
            style={styles.FlatCustomListImage}
            resizeMethod="resize"
          >
            {
              (this.state.userTagsArray !== undefined && this.state.userTagsArray !== '')
                ? <Text style={styles.FlatListCustomTitle}>{item.title}</Text>
                : null
            }
            <Text style={styles.FlatListCustomText}>{item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  renderImage(page) {
    const imageTag = tag1;
    if (page !== undefined) {
      if (page === 0) {
        this.setState({ imageTag: 'tag1' });
      } else if (page === 1) {
        this.setState({ imageTag: 'tag2' });
      } else if (page === 2) {
        this.setState({ imageTag: 'tag3' });
      } else if (page === 3) {
        this.setState({ imageTag: 'tag4' });
      } else {
        this.setState({ imageTag: 'tag1' });
      }
    }
    return imageTag;
  }

  renderCheckBox() {
    const tags = this.state.tags;
    return tags.map((item) => {
      return (
        <CheckBox
          title={item}
          checked={this.check(item)}
          onPress={() => this.checkUncheck(item)}
          containerStyle={styles.checkboxContainer}
          textStyle={{ color: 'white' }}
          checkedColor="white"
          uncheckedColor="white"
        />
      );
    });
  }

  renderButton() {
    if (this.state.changeButton === true) {
      return (
        <Button
          accent
          text="F I N I S H"
          onPress={() => { this.closePersonalizedModal(); }}
          upperCase={false}
          style={nextButtonStyles}
        />
      );
    }
    return (
      <Button
        accent
        text="N E X T"
        onPress={() => { this.openPersonalizedModel(this.state.page + 1); }}
        upperCase={false}
        style={nextButtonStyles}
      />
    );
  }

  render() {
    const titles = this.state.tagsTitle;
    let day = 0;
    if (this.state.last_conversation_id <= 9) {
      day = this.state.last_conversation_id + 1;
    } else {
      day = 10;
    }

    const progress = day / 10;
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <Modal
            visible={this.state.personalizedModal}
            // onRequestClose={() => { this.closePersonalizedModal(); }}
            supportedOrientations={['portrait', 'landscape']}
          >
            <View style={styles.popcontainer}>
              <ActivityIndicator isLoading={this.state.indicatorLoading} />
              <ImageBackground
                source={{ uri: `http://34.215.40.163/img/tags/${this.state.imageTag}.png` }}
                style={styles.backImage}
              >
                <View style={styles.popinnerContainer}>
                  <TouchableOpacity
                    style={styles.closebtn}
                    onPress={() => {
                      this.setState({
                        personalizedModal: false,
                        checkedItem: [],
                      });
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={IC_WHITE_CLOSE}
                    />
                  </TouchableOpacity>

                  <View style={styles.iconContainer}>
                    <Text style={styles.topText}>
                      {titles}
                    </Text>
                    <Text style={styles.hedertxt}>(check the options that apply to you)</Text>
                  </View>

                  <View style={styles.centerContainer}>
                    <ScrollView style={{ width: '100%' }}>
                      {this.renderCheckBox()}
                    </ScrollView>
                  </View>

                  <View style={styles.bottomContainer}>
                    {this.renderButton()}
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => { this.onRefreshClicked(); }}
              />
            }
          >
            <StatusBar
              translucent
              backgroundColor="rgba(0, 0, 0, 0.010)"
              animated
              hidden={false}
            />

            <View style={styles.introContainer}>
              <ImageBackground
                source={dashboardBG}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.dayText}>{`Day ${day} of 10`}</Text>
                <Text style={styles.introPrgText}>Intro Program</Text>

                <View>
                  <TouchableOpacity onPress={() => { this.onBegin(); }}>
                    <View style={styles.beginContainer}>
                      <Icon name="play-arrow" size={14} style={styles.playArrow} />
                      <Text style={styles.beginText}>B E G I N</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Progress.Bar
                  progress={progress}
                  height={4}
                  borderRadius={0}
                  width={width}
                  color="rgba(255, 255, 255, 0.5)"
                  unfilledColor="rgba(255, 255, 255, 0.4)"
                  style={{ position: 'absolute', bottom: 0 }}
                />
              </ImageBackground>
            </View>

            <View style={styles.dailyQuotesContainer}>
              <ImageBackground
                source={dashboardQuotesBG}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.quotesTitleText}>W O R D S  T O  S I T  W I T H</Text>
                <View style={styles.seperator} />
                <Text style={styles.quotesSubText}>{this.state.dailyQuotes}</Text>
              </ImageBackground>
            </View>

            <View
              style={[styles.personalizedContainer, this.state.hideTags ? styles.hideView : '']}
            >
              <ImageBackground
                source={PersonalizedBack}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.personalizedTitleText}>
                  Create My Personalized DiveThru Journey
                </Text>

                <View style={styles.tchblebtn}>
                  <TouchableOpacity
                    style={styles.buttonPersonalized}
                    onPress={() => { this.openPersonalizedModel(0); }}
                  >
                    <Text style={styles.btnTxtPersonalized}>
                      Tap Here
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.upperSeperator} />

                <TouchableOpacity onPress={() => { this.skipTags(); }}>
                  <Text style={styles.skipnowText}>
                    S K I P  N O W
                  </Text>
                </TouchableOpacity>

                {/* <View style={styles.bottomSeperator} /> */}
              </ImageBackground>
            </View>

            <ListView
              style={[styles.SubCategoryList, this.state.hideCategories ? styles.hideView : '']}
              dataSource={this.state.dataSource}
              enableEmptySections
              removeClippedSubviews={false}
              renderRow={data => (
                <View style={styles.MainList}>
                  <View style={styles.categoryInnerContainer}>
                    <Text style={styles.categoryTitle}>{data.cat_name}</Text>
                    <Button
                      accent
                      text="Learn more"
                      onPress={() => {
                        this.setState({
                          isLearnMoreClicked: true,
                          title: data.cat_name,
                          description: data.cat_desc,
                        });
                      }}
                      upperCase={false}
                      style={learnMoreButtonStyles}
                    />
                  </View>

                  {
                    // eslint-disable-next-line no-nested-ternary
                    (data.arrdata.length > 0)
                      ? ((data.isCustomDashboard)
                        ? (
                          <FlatList
                            // horizontal
                            removeClippedSubviews={false}
                            scrollEnabled={false}
                            data={data.arrdata}
                            style={styles.FlatCustomListViewStyle}
                            renderItem={e => this.renderCustomItem(e)}
                            numColumns={3}
                          />
                        ) : (
                          <View>
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: data.scroll } } }],
                              )}
                            >
                              <FlatList
                                horizontal
                                removeClippedSubviews={false}
                                scrollEnabled={false}
                                data={data.arrdata}
                                style={styles.FlatListViewStyle}
                                renderItem={e => this.renderItem(e, data.isCustomDashboard)}
                              />
                            </ScrollView>

                            <PaginatedListView
                              listScrollId={data.scroll}
                              totalLength={data.arrdata.length}
                            />
                          </View>
                        )
                      ) : null
                  }
                </View>
              )}
            />

            <View style={[styles.dailyQuotesContainer, { marginTop: 20 }]}>
              <ImageBackground
                source={subscribeNowBG}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.subscribeText}>Unlock the Dive Thru library</Text>

                <Button
                  primary
                  title=""
                  text="S U B S C R I B E  N O W"
                  onPress={() => { this.props.navigation.navigate('SubscribeNowScreen'); }}
                  style={buttonStyles}
                />
              </ImageBackground>
            </View>

            {this.state.isPrompted
              ? (
                <PromptedPopup
                  onTouchUpFree={this.onContinueWithFreeProgram}
                  onTouchUpSubscription={this.onContinueWithSubscription}
                  categoryname={this.state.catName}
                  lastAudio={this.state.lastAudio}
                  title="10 day Intro program"
                  description="Purchase for a subscription or continue and check out the exciting bundles and activities that can be unlocked when subscribing to the full Dive Thru account."
                />
              ) : null
            }

            {this.state.isRatePrompted
              ? (
                <RatingPopup
                  onTouchup={this.CloseRatModal}
                />
              ) : null
            }

            {this.state.isLearnMoreClicked
              ? (
                <InfoPopup
                  title={this.state.title}
                  description={this.state.description}
                  onTouchup={this.CloseModal}
                />
              ) : null
            }
          </ScrollView>
        </View>
      </Spinner>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
