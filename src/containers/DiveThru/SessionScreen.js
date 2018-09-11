import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, ListView, FlatList, ImageBackground,
  AsyncStorage, Platform, StatusBar, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-material-ui';
import * as RNIap from 'react-native-iap';
import Moment from 'moment';
import _ from 'lodash';
// import Spinner from '../../components/Spinner';
import firebaseApp from '../../components/constant';
import styles, { timeButtonStyles, buttonStyles } from '../../styles/session';
import { colors } from '../../styles/theme';
import IC_BACK from '../../assets/images/ic_back.png';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import Play from '../../assets/images/play.png';
import Lock from '../../assets/images/lock.png';
import Done from '../../assets/images/done.png';

class SessionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const name = params ? params.name : undefined;
    return {
      headerLeft: (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.state.params.handleBack()}>
          <Image
            style={styles.icBack}
            source={IC_BACK}
          />
        </TouchableOpacity>
      ),
      title: name,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 5,
      },
      headerTitleStyle: {
        alignSelf: 'center',
        color: colors.grey700,
        fontSize: 18,
        fontWeight: '300',
      },
      headerRight: (<View />),
      header: null,
      tabBarVisible: false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: false,
      isAdioCompleted: false,
      pageImage: '',
      data: [],
      sessionData: [],
    };
    this.arrSession = [];
  }

  componentWillMount() {
    this.pageImage = '';
    this.props.navigation.setParams({ handleBack: this.handleBack.bind(this) });
    this.fetchUserSubscriptionType();
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;
    const name = params ? params.name : undefined;
    const item = params ? params.item : undefined;
    const bundleId = params ? params.bundleId : undefined;
    const purchaseBundle = params ? params.purchasedBundle : undefined;
    const bundleImage = params ? params.backGroundImage : undefined;
    const sessionType = params ? params.sessionType : undefined;
    const subcategoryId = params ? params.subcategoryId : undefined;
    const isCategoryFree = params ? params.isCategoryFree : undefined;
    const isBundleFree = params ? params.isBundleFree : undefined;
    const AccesstoCommon = params ? params.AccesstoCommon : undefined;
    const isAccesstoDeepDive = params ? params.isAccesstoDeepDive : undefined;
    const individualBundlePurchase = params ? params.individualBundlePurchase : undefined;
    const playStoreProduct = params ? params.playStoreProduct : undefined;
    // console.log('sessionData-->' + JSON.stringify(sessionData));
    this.arrSession = sessionData;

    this.getProduct(playStoreProduct);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sessionData),
      data: sessionData,
      bundleName: name,
      bundleImage,
      bundleId,
      mainCategoryName: item,
      purchaseBundle,
      sessionType,
      subcategoryId,
      isCategoryFree,
      isBundleFree,
      AccesstoCommon,
      isAccesstoDeepDive,
      meditation_audio_time: sessionData.meditation_audio_time,
      pageImage: sessionData.length > 0 ? sessionData[0].session_img : '',
      individualBundlePurchase,
    });

    let newtype = '';
    if (sessionType === 'SubCategoryBundle') {
      newtype = 'bundle';
    } else if (sessionType === 'SubCategorySession') {
      newtype = 'session';
    }
    AsyncStorage.getItem('user_id').then((value) => {
      // const ref = firebaseApp.database().ref().child(`Users/${value}/IndividualSubscription/${newtype}`);
      // ref.on('value', ((dataSnapshot) => {
      const ref = firebaseApp.database().ref().child(`Users/${value}/IndividualSubscription/${newtype}`);
      ref.once('value').then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          dataSnapshot.forEach((child) => {
            if (bundleId === child.val().id) {
              this.setState({ individualBundlePurchase: true, purchaseBundle: true });
            }
          });
        }
      });
    });
  }

  onClickOfClose = () => {
    this.props.navigation.goBack();
  }

  onClickOfRowItem(rowdata, bundleName, bundleId) {
    console.log(`onClickOfRowItem rowdata: ${rowdata}`);
    console.log(`onClickOfRowItem bundleName: ${bundleName}`);
    console.log(`onClickOfRowItem bundleId: ${bundleId}`);
    console.log(`onClickOfRowItem index: ${this.state.index}`);
    // console.log('DiveThruPlayerScreen membershipType: ' + this.state.membershipType);
    // console.log('DiveThruPlayerScreen purchaseBundle: ' + this.state.purchaseBundle);
    // console.log('DiveThruPlayerScreen isCategoryFree: ' + this.state.isCategoryFree);
    // console.log('DiveThruPlayerScreen isBundleFree: ' + this.state.isBundleFree);
    // console.log('DiveThruPlayerScreen AccesstoCommon: ' + this.state.AccesstoCommon);
    // console.log('DiveThruPlayerScreen isAccesstoDeepDive: ' + this.state.isAccesstoDeepDive);
    this.setState({ sessionId: rowdata.session_id });
    if (this.state.membershipType !== undefined) {
      if (this.state.membershipType === 'Free' && this.state.purchaseBundle === false) {
        if (rowdata.index === this.state.sessionData[0].index) {
          this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: this.state.index, onBeginClick: false });
        } else if (this.state.isCategoryFree === true || this.state.isBundleFree === true || this.state.AccesstoCommon === 'all' || this.state.isAccesstoDeepDive === true) {
          this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: this.state.index, onBeginClick: false });
        }
      } else if (this.state.membershipType === 'Paid') {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: this.state.index, onBeginClick: false });
      } else if (this.state.purchaseBundle === true) {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: this.state.index, onBeginClick: false });
      }
    }
  }

  getProduct = async (playStoreProduct) => {
    // console.log('getProduct playStoreProduct: ' + playStoreProduct);
    if (playStoreProduct !== undefined) {
      const products = await this.getItems(playStoreProduct);
      const sku = products.productId;
      const currency = products.currency;
      const price = products.price;
      const productTitle = products.title;
      // console.log('getProduct sku: ' + sku);
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
      let obj;
      for (let i = 0; i < products.length; i++) { // eslint-disable-line no-plusplus
        obj = products[0];
      }
      return obj;
    } catch (err) {
      console.log(`CategoryScreen getItems err: ${err}`);
      return '';
    }
  }

  handleBack() {
    this.props.navigation.state.params.returnData();
    this.props.navigation.goBack();
  }

  fetchUserSubscriptionType() {
    this.setState({ loading: true });
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot1) => {
          const membership = dataSnapshot1.val();
          const type = membership.membership_type;


          let isAdioCompleted = false;
          const bundleId = this.state.bundleId;
          // console.log('bundleID: ' + bundleId);
          const ref1 = firebaseApp.database().ref('Users').child(value).child(`streak/${bundleId}`);
          ref1.once('value').then((dataSnapshot) => {
            // console.log('bundleID Session: ' + dataSnapshot.val());
            isAdioCompleted = dataSnapshot.val() === null
              ? false
              : Object.keys(dataSnapshot.val().Session).includes(this.state.sessionId);

            const { params } = this.props.navigation.state;
            let sessionData = params ? params.sessionData : undefined;
            sessionData = this.sortAudioFiles(sessionData);
            // sessionData.sort((a, b) => a.session_name.localeCompare(b.session_name, 'en', { numeric: true }));

            this.setState({
              membershipType: type,
              loading: false,
              sessionData,
              isAdioCompleted,
              sid: this.state.sessionId,
            });
          });
        });
      }
    }).catch(() => { });
  }

  sortAudioFiles = (item) => {
    return item.sort(
      (a, b) => {
        const aMixed = this.normalizeMixedDataValue(a.session_name);
        const bMixed = this.normalizeMixedDataValue(b.session_name);
        return (aMixed < bMixed ? -1 : 1);
      },
    );
  }

  normalizeMixedDataValue = (value) => {
    const padding = '000000000000000';
    value = value.replace(/(\d+)((\.\d+)+)?/g,
      ($0, integer, decimal, $3) => {
        if (decimal !== $3) {
          return (padding.slice(integer.length) + integer + decimal);
        }

        decimal = (decimal || '.0');
        return (
          padding.slice(integer.length) +
          integer +
          decimal +
          padding.slice(decimal.length)
        );
      },
    );

    return (value);
  }

  // eslint-disable-next-line no-unused-vars
  purchaseSession = async (sku, currency, price, sessionId, type, productTitle) => {
    let newtype = '';
    if (type === 'SubCategoryBundle') {
      newtype = 'bundle';
    } else if (type === 'SubCategorySession') {
      newtype = 'session';
    }

    // console.log('getProduct purchaseSession: ' + newtype);
    try {
      // this.setState({ processofGoUnlimited: true });
      // console.log('getProduct purchaseResponse 111: ' + sku);
      const purchaseResponse = await RNIap.buyProduct(sku);
      // console.log('getProduct purchaseResponse 2222');
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

      this.setState({
        // processofGoUnlimited: false,
        // modalVisible: false,
      });
    }
  }

  sendMailIos(transactionId, price, token, productTitle, email) {
    console.log('sendMailIos: ==> ' + email + ' ' + transactionId + ' ' + productTitle);
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

  // renderGridItem=({ item, position }) => {
  renderGridItem = ({ item, index }) => {
    let lock = null;
    if (this.state.membershipType !== undefined) {
      if (this.state.isAdioCompleted === true && this.state.sid === item.session_id) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
        this.setState({ isAdioCompleted: false });
      } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === false && this.state.purchaseBundle === false && this.state.isCategoryFree === false && item.isSessionFree === false && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoDeepDive === false) {
        if (index !== 0 && this.state.purchaseBundle === false) {
          lock = (
            <ImageBackground style={styles.gridItemImage} source={Lock} />
          );
        } if (index === 0 && this.state.purchaseBundle === false) {
          lock = (
            <ImageBackground style={styles.gridItemImage} source={Play} />
          );
        }
      } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === true && this.state.purchaseBundle === false && index === 0) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Paid' && item.isSessionAvailable === true && this.state.purchaseBundle === false) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === true && this.state.purchaseBundle === true) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Free' && this.state.purchaseBundle === false && this.state.isCategoryFree === false && item.isSessionFree === false && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoDeepDive === false) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Lock} />
        );
      } else if (this.state.membershipType === 'Paid' && item.isSessionAvailable === true && this.state.purchaseBundle === true) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === true && this.state.purchaseBundle === false) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Play} />
        );
      }
    }
    const bundleName = this.state.bundleName;
    const bundleId = this.state.bundleId;
    return (
      <View>
        <ImageBackground
          source={{ uri: this.state.data[index].session_img }}
          style={styles.backImage}
          backgroundColor="white"
          resizeMethod="resize"
        >
          <View style={styles.iconContainer}>
            <Text style={styles.topText}>
              {this.state.bundleName}
            </Text>
            <View style={styles.iconRightContainer}>
              <TouchableOpacity onPress={() => { this.onClickOfClose(); }}>
                <Image
                  style={styles.icon}
                  source={IC_WHITE_CLOSE}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.FlatlistContainer} key={item.session_id}>
              <View style={styles.FlatlistContainerin}>
                <Text style={styles.text}>
                  {item.session_name}
                </Text>
                {(item.meditation_audio !== undefined) ?
                  <View
                    style={styles.sliderContainer}
                    onPress={() => { this.onClickOfRowItem(item, bundleName, bundleId); }}
                  >
                    {lock}
                  </View>
                :
                  <View style={styles.sliderContainer}>
                    <View style={styles.noAudioContainer}>
                      <View style={styles.noAudio}>
                        <Text style={{ margin: 10 }}>No Audio available</Text>
                      </View>
                    </View>
                  </View>
                }

                {/* {console.log('Session Screen this.state.membershipType: ' + this.state.membershipType)}
                {console.log('Session Screen this.state.individualBundlePurchase: ' + this.state.individualBundlePurchase)}
                {console.log('Session Screen this.state.isCategoryFree: ' + this.state.isCategoryFree)}
                {console.log('Session Screen this.state.isBundleFree: ' + this.state.isBundleFree)}
                {console.log('Session Screen this.state.AccesstoCommon: ' + this.state.AccesstoCommon)}
                {console.log('Session Screen this.state.isAccesstoDeepDive: ' + this.state.isAccesstoDeepDive)} */}
                {(this.state.membershipType === 'Paid'
                  || this.state.individualBundlePurchase === true
                  || this.state.isCategoryFree === true
                  || this.state.isBundleFree === true
                  || this.state.AccesstoCommon === 'all'
                  || this.state.isAccesstoDeepDive === true
                  || index === 0)
                  ? (
                    <View style={styles.timeContainer}>
                      <View style={styles.timeInnerContainer}>
                        {(item.meditation_audio !== undefined) ?
                          item.meditation_audio.map((data, index1) => {
                            return (
                              item.meditation_audio_time[index1] !== undefined
                              ?
                                <Button
                                  key={item.meditation_audio_time[index1]}
                                  primary
                                  title=""
                                  text={`${item.meditation_audio_time[index1]}${'\n'}min`}
                                  upperCase={false}
                                  disabled={this.state.isTimeDisable}
                                  onPress={() => {
                                    this.setState({ index: index1 }, () => {
                                      this.onClickOfRowItem(item, bundleName, bundleId);
                                    });
                                  }}
                                  style={timeButtonStyles}
                                />
                              : null
                            );
                          })
                        : null
                        }
                      </View>
                    </View>
                  )
                  : (
                    (item.meditation_audio !== undefined) ?
                      <View>
                        <Button
                          primary
                          title=""
                          text="Unlock the Dive Thru library"
                          onPress={() => {
                            this.props.navigation.navigate('SubscribeNowScreen', {
                              onDescription: true,
                              onCategory: false,
                              returnData: this.fetchUserSubscriptionType.bind(this),
                            });
                          }}
                          style={buttonStyles}
                        />

                        <Button
                          primary
                          title=""
                          text={
                            this.state.mainCategoryName === 'Deep Dive'
                            ? 'Get only this Deep Dive Bundle'
                            : 'Get only this Quick Dive Session'
                          }
                          onPress={() => {
                            this.purchaseSession(
                              this.state.sku, this.state.currency, this.state.price,
                              this.state.bundleId, this.state.sessionType, this.state.productTitle,
                            );
                          }}
                          style={buttonStyles}
                        />
                      </View>
                    : null
                  )
                }
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const count = Object.keys(this.arrSession).length;

    return (
      <View style={styles.container} >
        <StatusBar hidden />

        {/* <Spinner isLoading={this.state.loading}> */}
          {
            (count > 0)
            ? (
              <View style={styles.playerContainer}>
                <FlatList
                  data={this.state.sessionData}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={this.renderGridItem}
                  pagingEnabled
                  // onMomentumScrollEnd={(e) => {
                  //   const contentOffset = e.nativeEvent.contentOffset;
                  //   const viewSize = e.nativeEvent.layoutMeasurement;
                  //   const pageNum = Math.floor(contentOffset.x / viewSize.width);
                  //   this.setState({ pageImage: this.state.data[pageNum].session_img });
                  // }}
                  keyExtractor={item => item.session_id}
                  extraData={this.state}
                />
              </View>
            )
            : (
              <ImageBackground
                source={{ uri: this.state.pageImage }}
                style={styles.backImage}
                backgroundColor="white"
                resizeMethod="resize"
              >
                <View style={styles.iconContainer}>
                  <View style={styles.iconLeftContainer} />
                  <View>
                    <Text style={styles.topText}>
                      {this.state.bundleName}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => { this.onClickOfClose(); }}>
                      <Image
                        style={styles.icon}
                        source={IC_WHITE_CLOSE}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.centerContainer}>
                  <View style={styles.noSessionContainer}>
                    <View style={styles.noAudio}>
                      <Text style={{ margin: 10 }}>No session available.</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            )
          }
        {/* </Spinner> */}
      </View>
    );
  }
}

SessionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  // screenProps: PropTypes.object.isRequired,
};

export default SessionScreen;
