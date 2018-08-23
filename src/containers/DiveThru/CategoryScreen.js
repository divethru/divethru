import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar,
  ListView, ImageBackground, FlatList, ScrollView,
  AsyncStorage, Image, Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { PropTypes } from 'prop-types';
import Moment from 'moment';
import * as RNIap from 'react-native-iap';
import styles from '../../styles/category';
import Spinner from '../../components/Spinner';
import firebaseApp from '../../components/constant';
import IC_LOCK from '../../assets/images/ic_lock_white.png';
import IC_DONE from '../../assets/images/ic_done.png';
import { colors } from '../../styles/theme';

const width = Dimensions.get('window').width;

class CategoryScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: false,
      sessionImage: '',
      modalVisible: false,
      product: [],
      sku: '',
      currency: '',
      price: '',
      sessionName: '',
      sessionSubscriptionIds: [],
      bundleSubscriptionIds: [],
      sessionProducts: [],
      item: '',
      sessionSubscriptionPayment: false,
      bundleSubscription: false,
      showPlayer: false,
      refreshing: false,
      qrefreshing: false,
      processofGoUnlimited: false,
      // individualBundlePurchase: false,
      isCategoryFree: false,
      isAccesstoOpenDive: false,
      isAccesstoDeepDive: false,
      isAccesstoQuickDive: false,
      AccesstoCommon: 'custom',
    };
    this.arrStreak = [];
    this.arrStreakHasData = false;
  }

  async componentWillMount() {
    // console.log('DiveThruScreen===> CategoryScreen componentWillMount');
    try {
      this.sessionSubscriptionData();
    } catch (err) {
      console.log(`CategoryScreen componentWillMount error: ${err}`);
    }

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
      this.fetchUserLastConversationData();
    }, (error) => {
      console.log(`CategoryScreen componentDidMount error: ${error}`);
    });
  }

  componentDidMount() {
    // console.log('DiveThruScreen===> CategoryScreen componentDidMount');
    StatusBar.setHidden(false);
    const vals = [];
    const vals1 = [];
    // let vals2 = [];
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

    // const ref = firebaseApp.database().ref('InAppProducts');
    // vals2 = [];
    // ref.once('value', (data) => {
    //   data.forEach((userSnapshot) => {
    //     const values = userSnapshot.val();
    //     vals2.push({
    //       product_id: values.product_id,
    //       session_id: values.session_id,
    //       bundle_id: values.bundle_id,
    //     });
    //     this.setState({ sessionProducts: vals2 });
    //   });
    //   console.log('state-->' + JSON.stringify(this.state.sessionProducts));
    // }, (error) => {
    //   console.log(`CategoryScreen componentDidMount error: ${error}`);
    // });

    AsyncStorage.getItem('redirectToPlayer').then((value) => {
      if (value !== null) {
        this.setState({ sessionSubscriptionPayment: true });
        this.goToDiveThruPlayer(JSON.parse(value));
      } else {
        this.setState({ sessionSubscriptionPayment: false });
      }
    });
  }

  onClickOfRowItem(id, name, index, type, catSubcriptionType) {
    if (type === 'session' && catSubcriptionType === 'Paid' && this.state.membershipType === 'Free') {
      if (index !== undefined) {
        if (index === 0) {
          this.getSession(id, name);
        } else if (this.state.isCategoryFree === true || this.state.isAccesstoOpenDive === true) {
          this.getSession(id, name);
        } else if (this.state.AccesstoCommon === 'all') {
          this.getSession(id, name);
        }
      } else {
        this.getSession(id, name);
      }
    } else {
      this.getSession(id, name);
    }
  }

  getItemsIds = async () => {
    try {
      const ref = firebaseApp.database().ref('InAppProducts');
      const vals = [];
      ref.once('value', (data) => {
        data.forEach((userSnapshot) => {
          const values = userSnapshot.val();
          vals.push(values.product_id);
        });
      }, (error) => {
        console.log(`CategoryScreen getItemsIds error: ${error}`);
      });
    } catch (err) {
      console.log(`CategoryScreen getItemsIds err: ${err}`);
    }
  }

  getSessionData = async (item, subCategoryname) => {
    this.setState({ item });

    if (item.session !== null) {
      this.props.screenProps.navigation.navigate('BundleDescription', {
        selectedIndexOfCategory: item.index,
        sessionData: item.session,
        subCategoryname,
        subcategoryId: item.subcategory_id,
        name: item.bundle_name,
        item: this.props.item,
        bundleId: item.bundle_id,
        bundleDesc: item.bundle_description,
        bundleImage: item.bundle_img,
        purchasedBundle: false,
        returnData: this.fetchUserLastConversationData.bind(this),
        sessionType: 'SubCategoryBundle',
        isCategoryFree: this.state.isCategoryFree,
        isBundleFree: item.isBundleFree,
        AccesstoCommon: this.state.AccesstoCommon,
        isAccesstoDeepDive: this.state.isAccesstoDeepDive,
        playStoreProduct: item.playStoreProduct,
        categoryName: this.state.categoryName,
        isSessionFree: false,
        isAccesstoQuickDive: this.state.isAccesstoQuickDive,
      });
      // if (item.bundleSubscription === false) {
      //   if (item.playStoreProduct !== undefined) {
      //     if (this.state.showPlayer === true) {
      //       this.setState({ showPlayer: false });
      //       if (this.session.isPaid === true || this.state.membershipType === 'Paid') {
      //         purchasedBundle = true;
      //         this.setState({ modalVisible: false });
      //       }
      //       this.props.screenProps.navigation.navigate('BundleDescription', { sessionData, subCategoryname, subcategoryId, name, item: this.props.item, bundleId: item.bundle_id, bundleDesc: item.bundle_description, bundleImage: item.bundle_img, purchasedBundle, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategoryBundle', isCategoryFree: this.state.isCategoryFree, isBundleFree: false, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive, playStoreProduct: item.playStoreProduct, categoryName: this.state.CategoryName });
      //     } else {
      //       const products = await this.getItems(item.playStoreProduct, item);
      //       const sku = products.productId;
      //       const currency = products.currency;
      //       const price = products.price;
      //       const productTitle = products.title;
      //       this.setState({
      //         sessionName: item.bundle_name,
      //         sku,
      //         currency,
      //         price,
      //         sessionImage: item.bundle_img,
      //       });
      //       if (this.state.membershipType === 'Paid') {
      //         this.setState({ modalVisible: false });
      //         this.props.screenProps.navigation.navigate('BundleDescription', { sessionData, subCategoryname, subcategoryId, name, item: this.props.item, bundleId: item.bundle_id, bundleDesc: item.bundle_description, bundleImage: item.bundle_img, purchasedBundle, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategoryBundle', isCategoryFree: this.state.isCategoryFree, isBundleFree: false, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive, playStoreProduct: item.playStoreProduct, categoryName: this.state.CategoryName });
      //       } else if (this.state.isCategoryFree === true || item.isBundleFree === true || this.state.AccesstoCommon === 'all' || this.state.isAccesstoDeepDive === true) {
      //         this.setState({ modalVisible: false });
      //         this.props.screenProps.navigation.navigate('BundleDescription', { sessionData, subCategoryname, subcategoryId, name, item: this.props.item, bundleId: item.bundle_id, bundleDesc: item.bundle_description, bundleImage: item.bundle_img, purchasedBundle, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategoryBundle', isCategoryFree: this.state.isCategoryFree, isBundleFree: true, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive, playStoreProduct: item.playStoreProduct, categoryName: this.state.CategoryName });
      //       } else {
      //         this.setState({ modalVisible: true });
      //       }
      //       this.setState({
      //         sessionId: item.bundle_id,
      //         sessionType: 'bundle',
      //         productTitle,
      //       });
      //     }
      //   } else if (this.state.showPlayer === true) {
      //     if (this.session.isPaid === true) {
      //       purchasedBundle = true;
      //     }
      //     this.props.screenProps.navigation.navigate('BundleDescription', { sessionData, subcategoryId, name, subCategoryname, item: this.props.item, bundleId: item.bundle_id, bundleDesc: item.bundle_description, bundleImage: item.bundle_img, purchasedBundle, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategoryBundle', isCategoryFree: this.state.isCategoryFree, isBundleFree: false, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive, playStoreProduct: item.playStoreProduct, categoryName: this.state.CategoryName });
      //   }
      // } else {
      //   if (item.bundleSubscription === true) {
      //     purchasedBundle = true;
      //   }
      //   this.props.screenProps.navigation.navigate('BundleDescription', { sessionData, subcategoryId, name, subCategoryname, item: this.props.item, bundleId: item.bundle_id, bundleDesc: item.bundle_description, bundleImage: item.bundle_img, purchasedBundle, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategoryBundle', isCategoryFree: this.state.isCategoryFree, isBundleFree: false, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive, playStoreProduct: item.playStoreProduct, categoryName: this.state.CategoryName });
      // }
    }
  }

  // eslint-disable-next-line no-unused-vars
  getItems = async (product, item) => {
    const itemSkuSubs = [];
    itemSkuSubs.push(product);
    try {
      const products = await RNIap.getProducts(itemSkuSubs);
      let obj;
      for (let i = 0; i < products.length; i++) { // eslint-disable-line no-plusplus
        obj = products[0];
      }
      return obj;
    } catch (err) {
      console.log(`CategoryScreen getItems err: ${err}`);
      return null;
    }
  }

  getSession = (id, name) => {
    let sessionData = [];
    if (this.state.categoryName === this.state.categoryAllData.cat_name) {
      if (this.state.categoryAllData.bundle) {
        console.log('getSession bundle====> ');
        const categoryData = this.state.categoryAllData.bundle;
        categoryData.forEach((data) => {
          if (id === data.bundle_id) {
            if (data.session) {
              sessionData = data.session;
              this.props.screenProps.navigation.navigate('Session', { sessionData, name, item: this.props.item, bundleId: data.bundle_id, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'Bundle', isCategoryFree: this.state.isCategoryFree, AccesstoCommon: this.state.AccesstoCommon, isAccesstoDeepDive: this.state.isAccesstoDeepDive });
            }
          }
        });
      } else if (this.state.categoryAllData.session) {
        console.log('getSession bundle====> ');
        const categoryData = this.state.categoryAllData.session;
        const bundleName = this.state.categoryAllData.cat_name;
        const catId = this.state.categoryAllData.cat_Id;
        categoryData.forEach((data) => {
          if (id === data.session_id) {
            const rowdata = {
              session_name: data.session_name,
              session_img: data.session_img,
              session_id: data.session_id,
              session_description: data.session_description,
              meditation_audio: data.meditation_audio,
              meditation_audio_time: data.meditation_audio_time,
              last_conversation_id: this.state.last_conversation_id,
              session_quote_description: data.session_quote_description,
              session_quote_img: data.session_quote_img,
              halted: this.state.halted,
            };
            this.props.screenProps.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'Session' });
          }
        });
      }
    }
  }

  callServer = (index) => {
    // console.log('DiveThruScreen===> CategoryScreen callServer');
    const categoryAllData = this.state.allData[index];
    const categoryName = categoryAllData.cat_name;
    let isCategoryFree = false;
    if (this.state.Arrcategory !== undefined) {
      isCategoryFree = this.state.Arrcategory.includes(categoryName);
    }
    this.setState({
      isCategoryFree,
      categoryAllData,
      categoryName,
    });
    if (categoryAllData.session) {
      const categoryData = categoryAllData.session;
      // this.setState({ categoryData });
      const categoryFinalData = [];
      categoryData.forEach((child, i) => {
        categoryFinalData.push({
          id: child.session_id,
          img: child.session_img,
          name: child.session_name,
          index: i,
          type: 'session',
          cat_subcription_type: child.cat_subcription_type,
          isSessionAvailable: child.isSessionAvailable,
        });
      });
      this.setState({
        categoryData,
        dataSource: this.state.dataSource.cloneWithRows(categoryFinalData),
        tabscreen: 'Category',
      });
    } else if (categoryAllData.bundle) {
      const categoryData = categoryAllData.bundle;
      this.setState({
        categoryData,
        dataSource: this.state.dataSource.cloneWithRows(categoryData),
        tabscreen: 'Category',
      });
    } else if (categoryAllData.SubCategory) {
      categoryAllData.SubCategory.forEach((element) => {
        if (element.session) {
          const categoryData = categoryAllData.SubCategory;
          // console.log('categoryData->' + JSON.stringify(categoryData));
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(categoryData),
            tabscreen: 'subCategorySession',
          });
        } else {
          const categoryData = categoryAllData.SubCategory;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(categoryData),
            tabscreen: 'subCategory',
          });
        }
      });
    }
  }

  sessionSubscriptionData = () => {
    const vals = [];
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/IndividualSubscription/session`);
      ref.on('value', (data) => {
        data.forEach((userSnapshot) => {
          const values = userSnapshot.val();
          return vals.push(values.id);
        });
      }, (error) => {
        console.log(`CategoryScreen sessionSubscriptionData error: ${error}`);
      });
    });
  }

  consumePurchase = async () => {
    try {
      const datas = await RNIap.getAvailablePurchases();
      for (let i = 0; i < datas.length; i++) { // eslint-disable-line no-plusplus
        const token = datas[i].purchaseToken;
        try {
          RNIap.consumePurchase(token);
        } catch (er) {
          console.log(`CategoryScreen consumePurchase er: ${er}`);
        }
      }
    } catch (err) {
      console.log(`CategoryScreen consumePurchase err: ${err}`);
    }
  }

  fetchUserLastConversationData() {
    this.setState({ loading: true });
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        // const ref = firebaseApp.database().ref('Users').child(value);
        // ref.once('value').then((dataSnapshot) => {
        const ref = firebaseApp.database().ref('Users').child(`${value}`);
        ref.on('value', (dataSnapshot) => {
          // console.log('DiveThruScreen===> CategoryScreen fetchUserLastConversationData');
          const convo = dataSnapshot.val();
          const lastConversation = convo.last_free_conversation_id;
          const halted = convo.halted;
          const type = convo.membership_type;
          let streakData = [];
          if (convo.streak !== '') {
            streakData = convo.streak;
            this.arrStreak = streakData;
            // console.log('fetchUserLastConversationData arrStreak: ' + JSON.stringify(streakData));
            this.arrStreakHasData = true;
          }
          this.setState({
            last_conversation_id: lastConversation,
            halted,
            membershipType: type,
          });
          this.fetchAccessCodeData();
          // this.setState({ loading: false });
        });
      }
    }).catch(() => { });
    return userData;
  }

  fetchAccessCodeData() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          let Arrsession = [];
          let ArrBundle = [];
          let Arrcategory = [];
          if (dataSnapshot.exists()) {
            const AccessCode = dataSnapshot.val().access_code;
            if (AccessCode !== '') {
              // const refaccess = firebaseApp.database().ref('AccessCodes').child(AccessCode);
              // refaccess.once('value').then((dataSnapshot) => {
              const refaccess = firebaseApp.database().ref('AccessCodes').child(AccessCode);
              refaccess.on('value', (dataSnapshot) => {
                // console.log('DiveThruScreen===> CategoryScreen fetchAccessCodeData');
                if (dataSnapshot.exists()) {
                  const Accessto = dataSnapshot.val().accessto;
                  const enddate = dataSnapshot.val().enddate;
                  const validity = dataSnapshot.val().validity;
                  const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
                  // console.log('Accessto->' + Accessto);
                  // console.log('enddate->' + enddate);
                  // console.log('CurrentDate->' + CurrentDate);
                  // console.log('validity->' + validity);
                  if (validity === 'unlimited') {
                    if (Accessto !== 'all') {
                      if (Accessto === 'Open Dive') {
                        this.setState({ isAccesstoOpenDive: true });
                      } else if (Accessto === 'Deep Dive') {
                        this.setState({
                          isAccesstoDeepDive: true,
                        });
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
                    console.log('else if');
                    if (Accessto !== 'all') {
                      if (Accessto === 'Open Dive') {
                        this.setState({ isAccesstoOpenDive: true });
                      } else if (Accessto === 'Deep Dive') {
                        // console.log(`==>BUNDLE NAME==> Set isAccesstoDeepDive`);
                        // this.state.dataSource.isAccesstoDeepDive = true;
                        // const dataSource = this.state.dataSource;
                        // dataSource.isAccesstoDeepDive: true;
                        this.setState({
                          isAccesstoDeepDive: true,
                        });
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
                      console.log('all');
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
                  this.fetchCategoryWiseData();
                } else {
                  this.fetchCategoryWiseData();
                }
              });
            } else {
              this.fetchCategoryWiseData();
            }
          }
        });
      }
    });
  }

  fetchCategoryWiseData() {
    const arrayCategory = [];
    const subscriptionIds = this.state.sessionSubscriptionIds;
    const bSubscriptionIds = this.state.bundleSubscriptionIds;

    // const ref = firebaseApp.database().ref('Category');
    // ref.once('value').then((dataSnapshot) => {
    const ref = firebaseApp.database().ref('Category');
    ref.on('value', (dataSnapshot) => {
      // console.log('DiveThruScreen===> CategoryScreen fetchCategoryWiseData');
      if (dataSnapshot.exists()) {
        dataSnapshot.forEach((child) => {
          if (child.key !== '10 Day Intro Program') {
            const arraySessionAllData = [];
            const arraySubCategoryAllData = [];
            const arrayBundleAllData = [];
            let Active = child.val().active;
            if (child.val().Session && Active === true) {
              const CategoryName = child.val().category_name;
              const CategoryID = child.val().category_id;
              const CategoryDescription = child.val().category_description;
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
                            isSessionAvailable = Object.keys(streakValue.Session).includes(value.session_id);
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
                    meditation_audio: value.meditation_audio,
                    meditation_audio_time: value.meditation_audio_time,
                    cat_subcription_type: child.val().session_subcription_type,
                    session_quote_description: value.session_quote_description,
                    session_quote_img: value.session_quote_img,
                  });
                });
                arrayCategory.push({
                  cat_Id: child.val().category_id,
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_Id: child.val().category_id,
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else if (child.val().Bundle && Active === true) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
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
                                isSessionAvailable = Object.keys(streakValue.Session).includes(value1.session_id);
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
                        cat_subcription_type: child.val().session_subcription_type,
                        bundle_name: value.bundle_name,
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
                    streakVisitedSessionCount,
                    cat_subcription_type: child.val().session_subcription_type,
                  });
                });
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else if (child.val().SubCategory && Active === true) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              if (child.val().Bundle === '' || child.val().Session === '') {
                let arraySubCategory = [];
                arraySubCategory = child.val().SubCategory;
                Object.keys(arraySubCategory).forEach((key) => {
                  const value = arraySubCategory[key];
                  const bundleRry = value.Bundle ? value.Bundle : [];
                  const sessionAry = value.Session ? value.Session : [];
                  const arrayNewBundle = [];

                  if (bundleRry !== undefined && sessionAry.length <= 0) {
                    Object.keys(bundleRry).forEach((key1) => {
                      const value1 = bundleRry[key1];
                      const sessionRry = value1.Session ? value1.Session : [];
                      const arrayNewSession = [];
                      let streakVisitedSessionCount = 0;
                      let isSessionAvailable = false;
                      let isBundleFree = false;
                      let isSessionFree = false;
                      if (sessionRry !== undefined) {
                        Object.keys(sessionRry).forEach((key2, index) => {
                          const value2 = sessionRry[key2];
                          if (this.arrStreakHasData === true) {
                            if (Object.keys(this.arrStreak).length > 0) {
                              Object.keys(this.arrStreak).forEach((streakKey) => {
                                let streakValue = [];
                                streakValue = this.arrStreak[streakKey];
                                if (value1.bundle_id === streakKey) {
                                  streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                                  if (streakVisitedSessionCount > 0) {
                                    isSessionAvailable = Object.keys(streakValue.Session).includes(value2.session_id);
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
                            isSessionFree,
                            session_name: value2.session_name,
                            session_img: value2.session_img,
                            session_id: value2.session_id,
                            session_description: value2.session_description,
                            meditation_audio: value2.meditation_audio,
                            meditation_audio_time: value2.meditation_audio_time,
                            cat_subcription_type: child.val().session_subcription_type,
                            session_quote_description: value2.session_quote_description,
                            session_quote_img: value2.session_quote_img,
                          });
                        });
                      }
                      // Deep Dive Array
                      arrayNewBundle.push({
                        bundle_name: value1.bundle_name,
                        bundle_img: value1.bundle_img,
                        bundle_id: value1.bundle_id,
                        bundle_description: value1.bundle_description,
                        session: arrayNewSession,
                        streakVisitedSessionCount,
                        cat_subcription_type: child.val().session_subcription_type,
                        subcategory_id: value.subcategory_id,
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
                      cat_subcription_type: child.val().session_subcription_type,
                    });
                  } else if (sessionAry !== undefined && bundleRry.length <= 0) {
                    // Quick Dive
                    const arrayNewSession = [];
                    let isSessionAvailable = false;
                    let isSessionFree = false;
                    let streakVisitedSessionCount = 0;
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
                                isSessionAvailable = Object.keys(streakValue.Session).includes(sessionData.session_id);
                              }
                            }
                          });
                        }
                      }
                      if (this.state.Arrsession !== undefined && this.state.Arrsession !== '') {
                        isSessionFree = this.state.Arrsession.includes(sessionData.session_id);
                      }

                      // console.log('DiveThruScreen===> CategoryScreen subscriptionIds: ' + JSON.stringify(subscriptionIds));
                      // console.log('DiveThruScreen===> CategoryScreen session_id: ' + sessionData.session_id);
                      // console.log('DiveThruScreen===> CategoryScreen isIncludes: ' + (!!subscriptionIds.includes(sessionData.session_id)));
                      // console.log('DiveThruScreen===> CategoryScreen isIncludes11: ' + (subscriptionIds.includes(sessionData.session_id)));
                      arrayNewSession.push({
                        index,
                        session_name: sessionData.session_name,
                        session_img: sessionData.session_img,
                        session_id: sessionData.session_id,
                        session_description: sessionData.session_description,
                        meditation_audio: sessionData.meditation_audio,
                        meditation_audio_time: sessionData.meditation_audio_time,
                        cat_subcription_type: child.val().session_subcription_type,
                        subcategory_id: value.subcategory_id,
                        sessionSubscription: !!subscriptionIds.includes(sessionData.session_id),
                        playStoreProduct: this.sessionSubscriptionPlay(sessionData.session_id, 'session'),
                        isSessionAvailable,
                        isSessionFree,
                        session_quote_description: sessionData.session_quote_description,
                        session_quote_img: sessionData.session_quote_img,
                      });
                    });
                    // console.log('arrayNewSession-->' + JSON.stringify(arrayNewSession));
                    arraySubCategoryAllData.push({
                      subcategory_id: value.subcategory_id,
                      subcategory_name: value.subcategory_name,
                      subcategory_img: value.subcategory_img,
                      subcategory_description: value.subcategory_description,
                      parentcategory: value.parentcategory,
                      session: arrayNewSession,
                      cat_subcription_type: child.val().session_subcription_type,
                    });
                  }
                });
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              Active = child.val().active;
              if (Active === true) {
                arrayCategory.push({
                  cat_Id: child.val().category_id,
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: [],
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            }
          }
        });

        this.setState({
          loading: false,
          allData: arrayCategory,
        });

        // console.log('categorywise data: ====> ' + JSON.stringify(arrayCategory));
        // this.setState({ loading: false });
        this.callServer(this.props.index);
      }
    });
  }

  freeBundleView = (rowdata) => {
    let sessionView = null;
    let seek = 0;
    if (rowdata.streakVisitedSessionCount === 0) {
      seek = 0;
    } else {
      seek = rowdata.streakVisitedSessionCount / rowdata.sessionCount;
    }
    sessionView = (
      <View style={{ marginTop: width > 300 ? '68%' : '65%' }}>
        <Text style={styles.freeText}>
          {rowdata.streakVisitedSessionCount} of {rowdata.sessionCount} Sessions
        </Text>

        <Progress.Bar
          color={'white'}
          progress={seek}
          style={styles.FlatListSessionProgres}
          unfilledColor={'#ffffff5e'}
          borderWidth={0}
        />
      </View>
    );
    return sessionView;
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

  formatDate = (currentdate) => {
    return `${+(`0${currentdate.getDate()}`).slice(-2)}-${
      (`0${currentdate.getMonth() + 1}`).slice(-2)}-${
      currentdate.getFullYear()} ${
      currentdate.getHours()}:${
      currentdate.getMinutes()}:${
      currentdate.getSeconds()}`;
  }

  paidBundleView = (item) => {
    // console.log(`render===>paidBundleView-> `+ item.bundle_name);
    let sessionView = null;
    let seek = 0;
    if (item.streakVisitedSessionCount === 0) {
      seek = 0;
    } else {
      seek = item.streakVisitedSessionCount / Object.keys(item.session).length;
    }
    sessionView = (
      <View style={{ bottom: '15%', marginTop: '85%' }}>
        <Text style={styles.freeText}>
          {item.streakVisitedSessionCount} of {Object.keys(item.session).length} Sessions
        </Text>

        <Progress.Bar
          color={'white'}
          progress={seek}
          style={styles.FlatListSessionProgres}
          unfilledColor={'#ffffff5e'}
          borderWidth={0}
        />
      </View>
    );
    return sessionView;
  }

  goToDiveThruPlayer = async (item, subCategoryData) => {
    console.log('item-goto->' + JSON.stringify(item));
    AsyncStorage.removeItem('redirectToPlayer');
    // const bundleName = this.state.categoryAllData.cat_name;
    // const subcategoryId = item.subcategory_id;
    // const bundleName = subCategoryData.subcategory_name;
    // const bundleDesc = subCategoryData.subcategory_description;
    // const catId = this.state.categoryAllData.cat_Id;
    // const subCategoryname = this.state.categoryName;
    // const purchasedBundle = false;
    // const sessionData = subCategoryData.session;
    // const sessionData = {
    //   session_name: item.session_name,
    //   session_img: item.session_img,
    //   session_id: item.session_id,
    //   session_description: item.session_description,
    //   meditation_audio: item.meditation_audio,
    //   meditation_audio_time: item.meditation_audio_time,
    //   last_conversation_id: this.state.last_conversation_id,
    //   halted: this.state.halted,
    //   session_quote_description: item.session_quote_description,
    //   session_quote_img: item.session_quote_img,
    // };

    // let purchasedBundle = '';
    // if (this.state.individualBundlePurchase === true) {
    //   purchasedBundle = true;
    // } else {
    //   purchasedBundle = false;
    // }

    this.props.screenProps.navigation.navigate('BundleDescription', {
      selectedIndexOfCategory: item.index,
      sessionData: item,
      subCategoryname: subCategoryData.subcategory_name,
      subcategoryId: item.subcategory_id,
      name: item.session_name,
      item: this.props.item,
      bundleId: item.session_id,
      bundleDesc: item.session_description,
      bundleImage: subCategoryData.subcategory_img,
      purchasedBundle: false,
      returnData: this.fetchUserLastConversationData.bind(this),
      sessionType: 'SubCategorySession',
      isCategoryFree: this.state.isCategoryFree,
      isBundleFree: false,
      AccesstoCommon: this.state.AccesstoCommon,
      isAccesstoDeepDive: this.state.isAccesstoDeepDive,
      playStoreProduct: item.playStoreProduct,
      categoryName: this.state.categoryName,
      isSessionFree: item.isSessionFree,
      isAccesstoQuickDive: this.state.isAccesstoQuickDive,
    });

    // if (this.state.isCategoryFree === true || item.isSessionFree === true || this.state.AccesstoCommon === 'all' || this.state.isAccesstoQuickDive === true) {
    // this.props.screenProps.navigation.navigate('SubCategoryDescription', { selectedIndexOfCategory: item.index, rowdata, bundleName, subcategoryId, subCategoryData, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategorySession' });
    // } else if (this.state.membershipType === 'Paid' || item.sessionSubscription === true || this.state.sessionSubscriptionPayment === true && this.state.individual_sessionid === item.session_id) {
    //  this.props.screenProps.navigation.navigate('SubCategoryDescription', { selectedIndexOfCategory: item.index, rowdata, bundleName, subcategoryId, subCategoryData, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategorySession' });
    // } else {
    //   this.props.screenProps.navigation.navigate('SubCategoryDescription', { selectedIndexOfCategory: item.index, rowdata, bundleName, subcategoryId, subCategoryData, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this), sessionType: 'SubCategorySession' });
    //   // const products = await this.getItems(item.playStoreProduct, item);
    //   // const sku = products.productId;
    //   // const currency = products.currency;
    //   // const price = products.price;
    //   // this.setState({
    //   //   sessionName: item.session_name,
    //   //   sku,
    //   //   currency,
    //   //   price,
    //   //   sessionImage: item.session_img,
    //   //   modalVisible: true,
    //   //   sessionId: item.session_id,
    //   //   sessionType: 'session',
    //   // });
    // }
  }

  sendMailIos(transactionId, price, token, productTitle, email) {
    fetch('http://34.215.40.163/sendPaymentEmailIosApp.php', {
      method: 'POST',
      body: JSON.stringify({
        device_token: token,
        email,
        txid: transactionId,
        subcription_type: productTitle,
        price,
      }),
    })
      .then((response => response.json()))
      .then((responseData) => {
        console.log(`sendMailIos${JSON.stringify(responseData)}`);
        this.setState({ isPaid: true });
      })
      .done();
  }

  // eslint-disable-next-line no-unused-vars
  sendMail(transactionId, price, token, productTitle, email) {
    fetch('http://34.215.40.163/sendPaymentEmailApp.php', {
      method: 'POST',
      body: JSON.stringify({
        device_token: token,
      }),
    })
      .then((response => response.json()))
      .then((responseData) => {
        this.setState({ isPaid: true });
      })
      .done();
  }

  renderItem({ item }, subCategoryname) {
    console.log(`${item.bundle_name} ==>BUNDLE NAME==> ${this.state.isAccesstoDeepDive}`);
    // console.log('render===>renderItem: ' + this.state.AccesstoCommon);
    // console.log(`render===>isCategoryFree->  ${this.state.isCategoryFree}`);
    // console.log(`render===>isBundleFree-> ${item.isBundleFree}`);
    // console.log(`render===>AccesstoCommon-> ${this.state.AccesstoCommon}`);
    // console.log(`render===>isAccesstoDeepDive->${this.state.isAccesstoDeepDive}`);
    // console.log(`render===>bundleSubscription-> ` + item.bundleSubscription);

    let sessionView = null;
    if (this.state.membershipType === 'Free' && item.streakVisitedSessionCount === 0) {
      // console.log('AAAAAAELSE1111: ' + this.state.AccesstoCommon);
      if (this.state.isCategoryFree === true || item.isBundleFree === true || this.state.AccesstoCommon === 'all' || this.state.isAccesstoDeepDive === true || item.bundleSubscription === true) {
        sessionView = this.paidBundleView(item);
      } else {
        // console.log('AAAAAAELSE2222: ' + this.state.AccesstoCommon);
        sessionView = (
          <View style={{ bottom: '10%', marginTop: '80%' }}>
            <Text style={styles.freeText}>Try a free session</Text>
            <Text style={styles.sessionCountText}>{Object.keys(item.session).length} Sessions</Text>
          </View>
        );
      }
    } else if (this.state.membershipType === 'Free' && item.streakVisitedSessionCount > 0) {
      // console.log('AAAAAAELSE333: ' + this.state.AccesstoCommon);
      if (this.state.isCategoryFree === true || item.isBundleFree === true || this.state.AccesstoCommon === 'all' || this.state.isAccesstoDeepDive === true || item.bundleSubscription === true) {
        sessionView = this.paidBundleView(item);
      } else {
        // console.log('AAAAAAELSE4444: ' + this.state.AccesstoCommon);
        sessionView = (
          <View style={{ bottom: '10%', marginTop: '80%' }}>
            <Text style={styles.freeText}>Try a free session</Text>
            <Text style={styles.sessionCountText}>{Object.keys(item.session).length} Sessions</Text>
          </View>
        );
      }
    } else {
      // console.log('AAAAAAELSE55555: ' + item.bundle_name);
      sessionView = this.paidBundleView(item);
    }

    return (
      <TouchableOpacity onPress={() => { this.getSessionData(item, subCategoryname); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.bundle_img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.bundle_name}</Text>
            {sessionView}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  renderGridItem(rowdata) {
    let lock = null;
    if (rowdata.index !== undefined) {
      if (rowdata.index === 0 && rowdata.isSessionAvailable === false) {
        lock = null;
      } else if (rowdata.isSessionAvailable === true && this.state.membershipType === 'Free' && rowdata.index === 0) {
        lock = (
          <Image
            source={IC_DONE}
            style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
          />
        );
      } else if (rowdata.isSessionAvailable === true && this.state.membershipType === 'Paid') {
        lock = (
          <Image
            source={IC_DONE}
            style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
          />
        );
      } else if (rowdata.isSessionAvailable === true && this.state.membershipType === 'Free') {
        if (this.state.isCategoryFree === false && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoOpenDive === false) {
          lock = (
            <View>
              <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
              <Image
                source={IC_LOCK}
                style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
              />
            </View>
          );
        } else {
          lock = (
            <Image
              source={IC_DONE}
              style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
            />
          );
        }
      } else if (this.state.membershipType === 'Free' && this.state.isCategoryFree === false && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoOpenDive === false) {
        lock = (
          <View>
            <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
            <Image
              source={IC_LOCK}
              style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
            />
          </View>
        );
      }
    }

    let sessionView = null;
    if (this.state.membershipType === 'Free' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle' && rowdata.streakVisitedSessionCount === 0) {
      sessionView = (
        <View style={{ marginTop: width > 300 ? '67%' : '65%' }}>
          <Text style={styles.freeText}>Try a free session</Text>
          <Text style={styles.sessionCountText}>{rowdata.sessionCount} Sessions</Text>
        </View>
      );
    } else if (this.state.membershipType === 'Free' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle' && rowdata.streakVisitedSessionCount > 0) {
      sessionView = this.freeBundleView(rowdata);
    } else if (this.state.membershipType === 'Paid' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle') {
      sessionView = this.freeBundleView(rowdata);
    }
    return (
      <TouchableOpacity onPress={() => { this.onClickOfRowItem(rowdata.id, rowdata.name, rowdata.index, rowdata.type, rowdata.cat_subcription_type); }} style={styles.gridItem} activeOpacity={1}>
        <View style={styles.gridItemImage}>
          <ImageBackground
            source={{ uri: rowdata.img }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.gridItemText}>{rowdata.name}</Text>
            {sessionView}
            {(rowdata.type === 'session' && rowdata.cat_subcription_type === 'Paid') || this.state.membershipType === 'Free' ? lock : null}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  renderBundleItem({ item }, subCategoryData) {
    this.setState({ item });
    const lock = null;
    // if (item.isSessionAvailable === true && this.state.membershipType === 'Paid') {
    //   lock = (
    //     <Image
    //       source={IC_DONE}
    //       style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
    //     />
    //   );
    // } else if (this.state.membershipType === 'Free' && item.sessionSubscription === false && this.state.isCategoryFree === false && item.isSessionFree === false && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoQuickDive === false) {
    //   lock = (
    //     <View>
    //       <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
    //       <Image
    //         source={IC_LOCK}
    //         style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
    //       />
    //     </View>
    //   );
    // } else if (this.state.membershipType === 'Free' && item.sessionSubscription === true && item.isSessionAvailable === true) {
    //   lock = (
    //     <Image
    //       source={IC_DONE}
    //       style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
    //     />
    //   );
    // } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === true) {
    //   lock = (
    //     <Image
    //       source={IC_DONE}
    //       style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
    //     />
    //   );
    // }

    return (
      <TouchableOpacity onPress={() => { this.goToDiveThruPlayer(item, subCategoryData); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.session_img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.session_name}</Text>
            {lock}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let category = null;
    if (this.state.tabscreen === 'Category') {
      category = (<ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        removeClippedSubviews={false}
        renderRow={rowdata => this.renderGridItem(rowdata)}
        contentContainerStyle={styles.listView}
      />);
    } else if (this.state.tabscreen === 'subCategorySession') {
      category = (<ListView
        style={styles.SubCategoryList}
        dataSource={this.state.dataSource}
        enableEmptySections
        removeClippedSubviews={false}
        renderRow={data => (
          <View style={styles.MainList}>
            <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
            {
              (data.session)
                ?
                  <ScrollView horizontal>
                    <FlatList
                      horizontal
                      removeClippedSubviews={false}
                      data={data.session}
                      style={styles.FlatListViewStyle}
                      renderItem={e => this.renderBundleItem(e, data)}
                    />
                  </ScrollView>
                : null
            }
          </View>
        )}

      />);
    } else {
      category = (<ListView
        style={styles.SubCategoryList}
        dataSource={this.state.dataSource}
        enableEmptySections
        removeClippedSubviews={false}
        keyExtractor={item => item}
        extraData={this.state}
        renderRow={(data) => {
          console.log(`==>BUNDLE NAME==>LISTVIEW`);
          return (<View style={styles.MainList}>
            {/* {(data.subcategory_name !== undefined)
            ?
              <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
            :
              null
            } */}
            <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
            {
              (data.bundle.length > 0)
                ?
                  <ScrollView horizontal>
                    <FlatList
                      horizontal
                      removeClippedSubviews={false}
                      data={data.bundle}
                      style={styles.FlatListViewStyle}
                      renderItem={e => this.renderItem(e, data.subcategory_name)}
                      keyExtractor={item => item}
                      extraData={this.state}
                    />
                  </ScrollView>
                : null
            }
          </View>);
        }}
      />);
    }

    return (
      <View style={styles.container}>
        <Spinner isLoading={this.state.loading}>
          {category}
          {/* <Modal
            animationType="none"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => { this.closeModal(); }}
            supportedOrientations={['portrait', 'landscape']}
          >
            <View style={styles.containermodal}>
              <View style={styles.innerContainer}>
                <View style={styles.content}>
                  <ImageBackground source={{ uri: this.state.sessionImage }} style={styles.content}>
                    <Text style={styles.title}>{this.state.sessionName}</Text>
                    <Text style={styles.subtitle}>One Subscription. Unlimited access.</Text>
                    <View style={styles.tchblebtn}>
                      <Text style={styles.boxTitle1}>L I F E  T I M E</Text>
                      <Text style={styles.boxTitle2}>{this.state.currency} {this.state.price}</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={
                          () => { this.purchaseSession(this.state.sku, this.state.currency, this.state.price, this.state.sessionId, this.state.sessionType, this.state.productTitle); }}
                      >
                        <Text style={styles.btnTxt}>
                          G O  U N L I M I T E D
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { this.closeModal(); }} style={styles.button} >
                        <Text style={styles.btnTxt}>
                          C A N C E L
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </View>
          </Modal> */}
        </Spinner>
      </View>
    );
  }
}

CategoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  index: PropTypes.number,
  item: PropTypes.string,
  screenProps: PropTypes.object.isRequired,
};

export default CategoryScreen;
