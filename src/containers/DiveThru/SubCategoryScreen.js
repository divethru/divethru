import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, Dimensions, ListView, FlatList,
  ImageBackground, AsyncStorage, Platform, StatusBar, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-material-ui';
import * as RNIap from 'react-native-iap';
import Moment from 'moment';
import Spinner from '../../components/Spinner';
import firebaseApp from '../../components/constant';
import styles, { timeButtonStyles, buttonStyles } from '../../styles/session';
import { colors } from '../../styles/theme';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import Play from '../../assets/images/play.png';
import Lock from '../../assets/images/lock.png';
import Done from '../../assets/images/done.png';

const width = Dimensions.get('window').width;
class SubCategoryScreen extends Component {
  static navigationOptions= () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loading: false,
      isAdioCompleted: false,
      imageIndex: 0,
      pageImage: '',
    };
    this.arrSession = [];
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.pageImage = '';
    this.props.navigation.setParams({ handleBack: this.handleBack.bind(this) });
    this.fetchUserSubscriptionType();
  }

  onClickOfRowItem(index, rowdata, bundleName, bundleId) {
    const transitionConfig = () => {
      return {
        from: 'SubCategory',
        to: 'Player',
        transitionSpec: {
          duration: 0,
        },
        // screenInterpolator: (sceneProps) => {
        //   const { layout, position, scene } = sceneProps;

        //   const thisSceneIndex = scene.index;
        //   const width = layout.initWidth;

        //   const translateX = position.interpolate({
        //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
        //     outputRange: [width, 0],
        //   });

        //   return { transform: [{ translateX }] };
        // },
      };
    };
    console.log('on click rowItem');
    this.setState({ sessionId: rowdata.session_id });
    if (this.state.membershipType !== undefined) {
      if (this.state.membershipType === 'Free' && this.state.purchaseBundle === false) {
        // if (rowdata.index === 0) {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, sessionId: bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: index }, { transitionSpec: { duration: 0 } });
        // } 
      } else if (this.state.membershipType === 'Paid') {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, sessionId: bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: index }, { transitionSpec: { duration: 0 } });
      } else if (this.state.purchaseBundle === true) {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, sessionId: bundleId, returnData: this.fetchUserSubscriptionType.bind(this), sessionType: this.state.sessionType, subcategoryId: this.state.subcategoryId, budle: bundleName, audioIndex: index }, { transitionSpec: { duration: 0 } });
      }
    }
  }

  onClickOfInformation = () => {
    const bundleData = {
      title: this.state.title,
      bundleName: this.state.bundleName,
      bundleDesc: this.state.bundleDesc,
    };
    this.props.navigation.navigate('BundleDescription', { bundleData });
  }

  onClickOfCalendar = () => {
    this.props.navigation.navigate('CalenderReminderScreen');
  }

  onClickOfClose = () => {
    this.props.navigation.goBack();
  }

  onLayout() {
    this.list.scrollToIndex({ index: this.state.selectedIndexOfCategorySession ? this.state.selectedIndexOfCategorySession : 0 });
  }

  getItemLayout = (data, index) => (
    { length: width, offset: width * index, index }
  )

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

  getProduct = async (index) => {
    console.log('getProduct playStoreProduct: ' + this.state.data[index].playStoreProduct);
    if (this.state.data[index].playStoreProduct !== undefined) {
      // this.setState({ loading: true });
      const products = await this.getItems(this.state.data[index].playStoreProduct);
      const sku = products.productId;
      const currency = products.currency;
      const price = products.price;
      const productTitle = products.title;
      console.log('getProduct sku: ' + sku);
      // this.setState({
      //   sku,
      //   currency,
      //   price,
      //   productTitle,
      // });
      this.purchaseSession(sku, currency, price, this.state.data[index].session_id, this.state.sessionType, productTitle, index);
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
        ref.once('value').then((dataSnapshot) => {
          const membership = dataSnapshot.val();
          const type = membership.membership_type;
          this.setState({ membershipType: type });
          const { params } = this.props.navigation.state;
          console.log('PARAMS=====> ' + JSON.stringify(params));
          const sessionData = params ? params.sessionData : undefined;
          const name = params ? params.name : undefined;
          const item = params ? params.item : undefined;
          const purchaseBundle = params ? params.purchasedBundle : undefined;
          const bundleImage = params ? params.bundleImage : undefined;
          const sessionType = params ? params.sessionType : undefined;
          const subcategoryId = params ? params.subcategoryId : undefined;
          const selectedIndexOfCategorySession = params ? params.selectedIndexOfCategory : undefined;
          const bundleId = params ? params.bundleId : undefined;
          const individualBundlePurchase = params ? params.individualBundlePurchase : undefined;
          // const playStoreProduct = params ? params.playStoreProduct : undefined;

          const isCategoryFree = params ? params.isCategoryFree : undefined;
          const isSessionFree = params ? params.isSessionFree : undefined;
          const AccesstoCommon = params ? params.AccesstoCommon : undefined;
          const isAccesstoQuickDive = params ? params.isAccesstoQuickDive : undefined;

          this.arrSession = sessionData;

          let isAdioCompleted = false;
          console.log('bundleId111: ' + bundleId);
          const ref1 = firebaseApp.database().ref('Users').child(value).child(`streak/${bundleId}`);
          ref1.once('value').then((dataSnapshot) => {
            isAdioCompleted = dataSnapshot.val() === null ? false : Object.keys(dataSnapshot.val().Session).includes(bundleId);
            console.log('bundleId111 completed: ' + isAdioCompleted);
            this.setState({ isAdioCompleted, sid: bundleId });
          });

          // this.getProduct(playStoreProduct);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(sessionData),
            data: sessionData,
            bundleName: name,
            bundleImage,
            mainCategoryName: item,
            purchaseBundle,
            sessionType,
            subcategoryId,
            selectedIndexOfCategorySession,
            bundleId,
            individualBundlePurchase,
            meditation_audio_time: sessionData.meditation_audio_time,
            pageImage: sessionData[selectedIndexOfCategorySession].session_img,
            isCategoryFree,
            isSessionFree,
            AccesstoCommon,
            isAccesstoQuickDive,
            loading: false,
          });

          let newtype = '';
          if (sessionType === 'SubCategoryBundle') {
            newtype = 'bundle';
          } else if (sessionType === 'SubCategorySession') {
            newtype = 'session';
          }

          AsyncStorage.getItem('user_id').then((value1) => {
            const ref1 = firebaseApp.database().ref().child(`Users/${value1}/IndividualSubscription/${newtype}`);
            ref1.on('value', ((dataSnapshot1) => {
              if (dataSnapshot1.exists()) {
                dataSnapshot1.forEach((child) => {
                  if (bundleId === child.val().id) {
                    this.setState({ individualBundlePurchase: true, purchaseBundle: true });
                  }
                });
              }
            }));
          });
        });
      }
    }).catch(() => { });
  }

  purchaseSession = async (sku, currency, price, sessionId, type, productTitle, index) => {
    let newtype = '';
    if (type === 'SubCategoryBundle') {
      newtype = 'bundle';
    } else if (type === 'SubCategorySession') {
      newtype = 'session';
    }

    console.log('getProduct purchaseSession: ' + newtype);
    try {
      // this.setState({ processofGoUnlimited: true });
      console.log('getProduct purchaseResponse 111: ' + sku);
      const purchaseResponse = await RNIap.buyProduct(sku);
      console.log('getProduct purchaseResponse 2222');
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
            this.sendMailIos(transactionId, price, userData.device_token, subscriptionType, userData.email, index);
          } else {
            this.sendMail(transactionId, price, userData.device_token, subscriptionType, userData.email, index);
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

  sendMailIos(transactionId, price, token, productTitle, email, index) {
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
        this.state.data[index].sessionSubscription = true;
        this.setState({
          data: this.state.data,
          // loading: false,
        });
      })
      .done();
  }

  sendMail(transactionId, price, token, productTitle, email, index) {
    console.log('getProduct purchaseResponse 333');
    fetch('http://34.215.40.163/sendPaymentEmailApp.php', {
      method: 'POST',
      body: JSON.stringify({
        device_token: token,
      }),
    })
      .then((response => response.json()))
      .then((responseData) => {
        console.log('getProduct purchaseResponse 34444');
        this.state.data[index].sessionSubscription = true;
        this.setState({
          data: this.state.data,
          // loading: false,
        });
      })
      .done();
  }

  renderGridItem=({ item, index }) => {
    // console.log('renderGridItem membershipType: ' + this.state.membershipType);
    // console.log('renderGridItem isSessionAvailable: ' + item.isSessionAvailable);
    // console.log('renderGridItem sessionSubscription: ' + item.sessionSubscription);
    // console.log('renderGridItem isCategoryFree: ' + this.state.isCategoryFree);
    // console.log('renderGridItem isSessionFree: ' + item.isSessionFree);
    // console.log('renderGridItem AccesstoCommon: ' + this.state.AccesstoCommon);
    // console.log('renderGridItem isAccesstoQuickDive: ' + this.state.isAccesstoQuickDive);

    let lock = null;
    if (this.state.membershipType !== undefined) {
      // console.log('bundleId111 isAdioCompleted: ' + this.state.isAdioCompleted);
      // console.log('.bundleId111 session_id==========>: ' + (this.state.sid === item.session_id));
      // if (this.state.isAdioCompleted === true && this.state.sid === item.session_id) {
      //   lock = (
      //     <ImageBackground style={styles.gridItemImage} source={Done} />
      //   );
      //   this.setState({ isAdioCompleted: false });
      // } else 
      if (item.isSessionAvailable === true && this.state.membershipType === 'Paid') {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Free' && item.sessionSubscription === false
        && this.state.isCategoryFree === false && item.isSessionFree === false
        && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoQuickDive === false) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Lock} />
        );
      } else if (this.state.membershipType === 'Free' && item.sessionSubscription === true
        && item.isSessionAvailable === true) {
        lock = (
          <ImageBackground style={styles.gridItemImage} source={Done} />
        );
      } else if (this.state.membershipType === 'Free' && item.isSessionAvailable === true) {
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
          backgroundColor="#66348b"
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
            <View style={styles.FlatlistContainer}>
              <View style={styles.FlatlistContainerin}>
                <Text style={styles.text}>
                  {item.session_name}
                </Text>
                {(item.meditation_audio !== undefined) ?
                  <View style={styles.sliderContainer} onPress={() => { this.onClickOfRowItem(0, item, bundleName, bundleId); }} >
                    {lock}
                  </View>
                :
                  <View style={styles.sliderContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
                      <View style={{ height: 50, backgroundColor: colors.grey100, margin: 10, borderRadius: 5, borderColor: colors.grey400, borderWidth: 2, justifyContent: 'center' }}>
                        <Text style={{ margin: 10 }}>No Audio available</Text>
                      </View>
                    </View>
                  </View>
                }
                {
                (this.state.membershipType === 'Free' && item.sessionSubscription === false
                  && this.state.isCategoryFree === false && item.isSessionFree === false
                  && this.state.AccesstoCommon === 'custom' && this.state.isAccesstoQuickDive === false)
                ? (
                  <View>
                    <Button
                      primary
                      title=""
                      text="Unlock the Dive Thru library"
                      onPress={() => { this.props.navigation.navigate('SubscribeNowScreen', { onDescription: true }); }}
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
                        console.log('ITEM PURCHASE: ' + JSON.stringify(item));
                        this.getProduct(index);
                      }}
                      style={buttonStyles}
                    />
                  </View>
                ) : (
                  <View style={styles.timeContainer}>
                    <View style={styles.timeInnerContainer}>
                      {
                        (item.meditation_audio !== undefined) ?
                          item.meditation_audio.map((data, index1) => {
                            return (
                              item.meditation_audio_time[index1] !== undefined
                              ?
                                <Button
                                  primary
                                  title=""
                                  text={`${item.meditation_audio_time[index1]}${'\n'}min`}
                                  upperCase={false}
                                  disabled={this.state.isTimeDisable}
                                  onPress={() => {
                                    this.onClickOfRowItem(index1, item, bundleName, bundleId);
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
              }
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  render() {
    const count = this.arrSession.length;
    return (
      <View style={styles.container} >
        <StatusBar hidden />
        <Spinner isLoading={this.state.loading}>
          {
            (count > 0)
            ? (
              <View style={styles.playerContainer} onLayout={() => this.onLayout()}>
                <FlatList
                  keyExtractor={item => item}
                  data={this.state.data}
                  horizontal
                  ref={(ref) => { this.list = ref; }}
                  showsHorizontalScrollIndicator={false}
                  getItemLayout={this.getItemLayout}
                  renderItem={this.renderGridItem}
                  pagingEnabled
                  // onMomentumScrollEnd={(e) => {
                  //   const contentOffset = e.nativeEvent.contentOffset;
                  //   const viewSize = e.nativeEvent.layoutMeasurement;
                  //   const pageNum = Math.floor(contentOffset.x / viewSize.width);
                  //   this.setState({ pageImage: this.state.data[pageNum].session_img });
                  // }}
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
                  <View style={{ flex: 1 }}>
                    <View style={{ height: 50, backgroundColor: colors.grey100, margin: 10, borderRadius: 5, borderColor: colors.grey400, borderWidth: 2, justifyContent: 'center' }}>
                      <Text style={{ margin: 10 }}>No session available.</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            )
          }
        </Spinner>
      </View>
    );
  }
}

SubCategoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired,
};

export default SubCategoryScreen;
