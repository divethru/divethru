import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity, Image, ImageBackground,
  ScrollView, AsyncStorage, Platform, Alert,
} from 'react-native';
import * as RNIap from 'react-native-iap';
import Moment from 'moment';
import { Button } from 'react-native-material-ui';
import firebaseApp from '../../components/constant';
import styles, { buttonStyles } from '../../styles/sessionDescription';
import IC_WHITE_CLOSE from '../../assets/images/ic_close.png';
import sessionDescBg from '../../assets/images/SessionDescBg.png';

class BundleDescriptionScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      individualBundlePurchase: false,

    };
  }

  componentWillMount() {
    StatusBar.setHidden(false);
    const { params } = this.props.navigation.state;
    const subCategoryname = params ? params.subCategoryname : undefined;
    const subcategoryId = params ? params.subcategoryId : undefined;
    const bundleName = params ? params.name : undefined;
    const bundleId = params ? params.bundleId : undefined;
    const bundleDesc = params ? params.bundleDesc : undefined;
    const sessionData = params ? params.sessionData : undefined;
    const item = params ? params.item : undefined;
    const purchaseBundle = params ? params.purchasedBundle : undefined;
    const bundleImage = params ? params.bundleImage : undefined;
    const sessionType = params ? params.sessionType : undefined;
    const isCategoryFree = params ? params.isCategoryFree : undefined;
    const isBundleFree = params ? params.isBundleFree : undefined;
    const AccesstoCommon = params ? params.AccesstoCommon : undefined;
    const isAccesstoDeepDive = params ? params.isAccesstoDeepDive : undefined;
    const playStoreProduct = params ? params.playStoreProduct : undefined;
    const categoryName = params ? params.categoryName : undefined;
    const selectedIndexOfCategory = params ? params.selectedIndexOfCategory : undefined;
    const isSessionFree = params ? params.isSessionFree : undefined;
    const isAccesstoQuickDive = params ? params.isAccesstoQuickDive : undefined;

    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.on('value', ((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const type = convo.membership_type;
          this.setState({ membershipType: type });
        }));
      }
    });
    let btnText = '';
    if (categoryName === 'Deep Dive') {
      btnText = 'Get only this Deep Dive Bundle';
    } else if (categoryName === 'Quick Dive') {
      btnText = 'Get only this Quick Dive Session';
    }
    let newtype = '';
    if (sessionType === 'SubCategoryBundle') {
      newtype = 'bundle';
    } else if (sessionType === 'SubCategorySession') {
      newtype = 'session';
    }

    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref().child(`Users/${value}/IndividualSubscription/${newtype}`);
      ref.on('value', ((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          dataSnapshot.forEach((child) => {
            if (bundleId === child.val().id) {
              this.setState({ individualBundlePurchase: true, purchaseBundle: true });
            }
          });
        }
      }));
    });

    const len = Object.keys(sessionData).length;
    this.setState({
      title: subCategoryname,
      data: sessionData,
      bundleDesc,
      bundleId,
      bundleName,
      sessionData,
      name: bundleName,
      bundleImage,
      item,
      purchaseBundle,
      sessionType,
      subcategoryId,
      isCategoryFree,
      isBundleFree,
      AccesstoCommon,
      isAccesstoDeepDive,
      btnText,
      len,
      selectedIndexOfCategory,
      isSessionFree,
      isAccesstoQuickDive,
      categoryName,
      playStoreProduct,
    });

    this.getProduct(playStoreProduct);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  getProduct = async (playStoreProduct) => {
    // console.log(`getProduct playStoreProduct: ${  playStoreProduct}`);
    if (playStoreProduct !== undefined) {
      const products = await this.getItems(playStoreProduct);
      // console.log(`products->${  products}`);
      const sku = products.productId;
      const currency = products.currency;
      const price = products.price;
      const productTitle = products.title;
      // console.log(`getProduct sku: ${  sku}`);
      this.setState({
        sku,
        currency,
        price,
        productTitle,
      });
    }
  }

  getItems = async (product) => {
    const itemSkuSubs = [];
    itemSkuSubs.push(product);
    try {
      console.log('in try');
      const products = await RNIap.getProducts(itemSkuSubs);
      // console.log(`products getitem${ JSON.stringify(products)}`);
      let obj;
      for (let i = 0; i < products.length; i++) { // eslint-disable-line no-plusplus
        obj = products[0];
      }
      // console.log(`obj-->${obj}`);
      return obj;
    } catch (err) {
      console.log(`CategoryScreen getItems err: ${err}`);
      return '';
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  purchaseSession = async (sku, currency, price, sessionId, type, productTitle) => {
    let newtype = '';
    if (type === 'SubCategoryBundle') {
      newtype = 'bundle';
    } else if (type === 'SubCategorySession') {
      newtype = 'session';
    }

    // console.log('getProduct purchaseSession: ' + newtype);
    try {
      const purchaseResponse = await RNIap.buyProduct(sku);
      // const date = this.formatDate(new Date(Number(purchaseResponse.transactionDate)));
      const date = Moment().format('YYYY-MM-DD HH:mm:ss');
      const transactionId = purchaseResponse.transactionId;
      const subscriptionType = purchaseResponse.productId;
      const paymentType = Platform.OS === 'ios' ? 'App Store' : 'Play Store';
      AsyncStorage.getItem('user_id').then((value) => {
        const storeRef = firebaseApp.database().ref().child(`Users/${value}/IndividualSubscription/${newtype}`);
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value', (snapshot) => {
          const userData = snapshot.val();
          const purchaseData = {
            date,
            transaction_id: transactionId,
            subscription_type: subscriptionType,
            subscription_name: subscriptionType.slice(22),
            payment_type: paymentType,
            payment_status: 'verified',
            email: userData.email,
            name: userData.first_name,
            price,
            currency,
            subscription: 'active',
            id: sessionId,
          };

          if (Platform.OS === 'ios') {
            this.sendMailIos(
              transactionId, price, userData.device_token, subscriptionType, userData.email,
            );
          } else {
            this.sendMail(
              transactionId, price, userData.device_token, subscriptionType, userData.email,
            );
          }
          const newPayment = storeRef.push();
          newPayment.set(purchaseData);
        }, (error) => {
          console.log(`CategoryScreen purchaseSession error: ${error}`);
        });
      });
    } catch (err) {
      if (err.message === 'You already own this item.') {
        // this.setState({ modalVisible: false });
        Alert.alert(
          'Alert',
          'You already own this item with your Playstore Account.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true },
        );
      }
    }
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

  sendMail(transactionId, price, token, productTitle, email) {
    console.log('getProduct purchaseResponse 333');
    fetch('http://34.215.40.163/sendPaymentEmailApp.php', {
      method: 'POST',
      body: JSON.stringify({
        device_token: token,
      }),
    })
      .then((response => response.json()))
      .then(() => {
        console.log('getProduct purchaseResponse 34444');
        this.setState({ isPaid: true });
      })
      .done();
  }

  Buttons() {
    // console.log('membershipType->' + this.state.membershipType);
    // console.log('individualBundlePurchase->' + this.state.individualBundlePurchase);
    // console.log('isCategoryFree->' + this.state.isCategoryFree);
    // console.log('isBundleFree->' + this.state.isBundleFree);
    // console.log('AccesstoCommon->' + this.state.AccesstoCommon);
    // console.log('isAccesstoDeepDive->' + this.state.isAccesstoDeepDive);
    // console.log('isSessionFree->' + this.state.isSessionFree);
    // console.log('isAccesstoQuickDive->' + this.state.isAccesstoQuickDive);
    if (this.state.len > 0) {
      if (this.state.categoryName === 'Deep Dive') {
        return (
          <Button
            primary
            title=""
            text="D I V E  T H R U"
            onPress={() => {
              this.props.navigation.navigate('Session',
                {
                  sessionData: this.state.sessionData,
                  subcategoryId: this.state.subcategoryId,
                  name: this.state.name,
                  item: this.state.item,
                  bundleId: this.state.bundleId,
                  backGroundImage: this.state.bundleImage,
                  purchasedBundle: this.state.purchaseBundle,
                  sessionType: this.state.sessionType,
                  selectedIndexOfCategory: this.state.selectedIndexOfCategory,
                  isCategoryFree: this.state.isCategoryFree,
                  AccesstoCommon: this.state.AccesstoCommon,
                  isAccesstoDeepDive: this.state.isAccesstoDeepDive,
                  individualBundlePurchase: this.state.individualBundlePurchase,
                  playStoreProduct: this.state.playStoreProduct,
                  isBundleFree: this.state.isBundleFree,
                });
            }}
            style={buttonStyles}
          />
        );
      } else if (this.state.categoryName === 'Quick Dive') {
        // console.log('Quick Dive 11membershipType: ' + this.state.membershipType);
        // console.log('Quick Dive 11this.state.individualBundlePurchase: ' + this.state.individualBundlePurchase);
        // console.log('Quick Dive 11this.state.isCategoryFree: ' + this.state.isCategoryFree);
        // console.log('Quick Dive 11this.state.isSessionFree: ' + this.state.isSessionFree);
        // console.log('Quick Dive 11AccesstoCommon: ' + this.state.AccesstoCommon);
        // console.log('Quick Dive 11isAccesstoQuickDive: ' + this.state.isAccesstoQuickDive);
        if (this.state.membershipType === 'Paid'
        || this.state.individualBundlePurchase === true
        || this.state.isCategoryFree === true
        || this.state.isSessionFree === true
        || this.state.AccesstoCommon === 'all'
        || this.state.isAccesstoQuickDive === true) {
          return (
            <Button
              primary
              title=""
              text="D I V E  T H R U"
              onPress={() => {
                this.props.navigation.navigate('DiveThruPlayer',
                  {
                    rowdata: this.state.sessionData,
                    bundleName: this.state.name,
                    category: this.state.item,
                    sessionId: this.state.bundleId,
                    sessionType: this.state.sessionType,
                    subcategoryId: this.state.subcategoryId,
                    budle: this.state.name,
                    audioIndex: '',
                    membershipType: this.state.membershipType,
                    onBeginClick: false,
                  },
                  {
                    transitionSpec: { duration: 0 },
                  });
              }}
              style={buttonStyles}
            />
          );
        } else {
          return (
            <View style={{ marginTop: 15 }}>
              <Button
                primary
                title=""
                text="Unlock the Dive Thru library"
                onPress={() => { this.props.navigation.navigate('SubscribeNowScreen', { onDescription: true, onCategory: false }); }}
                style={buttonStyles}
              />
              {/* <Text style={{ alignSelf: 'center' }}>OR</Text> */}
              <Button
                primary
                title=""
                text="Get only this Quick Dive Session"
                onPress={() => {
                  this.purchaseSession(this.state.sku, this.state.currency, this.state.price,
                      this.state.bundleId, this.state.sessionType, this.state.productTitle);
                }}
                style={buttonStyles}
              />
            </View>
          );
        }

        // return (
        //   <Button
        //     primary
        //     title=""
        //     text="D I V E  T H R U"
        //     onPress={() => {
        //       console.log('ITEMMM: SUBCATEGORY: ');
        //       this.props.navigation.navigate('SubCategory',
        //         {
        //           sessionData: this.state.sessionData,
        //           subcategoryId: this.state.subcategoryId,
        //           name: this.state.name,
        //           item: this.state.item,
        //           bundleId: this.state.bundleId,
        //           bundleImage: this.state.bundleImage,
        //           purchasedBundle: this.state.purchaseBundle,
        //           sessionType: this.state.sessionType,
        //           selectedIndexOfCategory: this.state.selectedIndexOfCategory,
        //           isCategoryFree: this.state.isCategoryFree,
        //           isSessionFree: this.state.isSessionFree,
        //           AccesstoCommon: this.state.AccesstoCommon,
        //           isAccesstoQuickDive: this.state.isAccesstoQuickDive,
        //           individualBundlePurchase: this.state.individualBundlePurchase,
        //           playStoreProduct: this.state.playStoreProduct,
        //         });
        //     }}
        //     style={buttonStyles}
        //   />
        // );
      }
      return (
        <View />
      );
    }

    return (
      <View />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.010)"
            animated
            hidden={false}
          />
          <View style={styles.container}>
            <TouchableOpacity onPress={() => { this.goBack(); }}>
              <Image
                style={{ height: 20, width: 20, alignSelf: 'flex-end', marginRight: 20, marginTop: 40 }}
                source={IC_WHITE_CLOSE}
              />
            </TouchableOpacity>
            <View style={styles.introContainer}>
              <ImageBackground
                source={sessionDescBg}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.dayText}>{this.state.bundleName}</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.subText}>{this.state.title}</Text>
            <Text style={styles.descText}>{this.state.bundleDesc}</Text>

            {this.Buttons()}
          </View>

        </ScrollView>
      </View>
    );
  }
}

BundleDescriptionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default BundleDescriptionScreen;
