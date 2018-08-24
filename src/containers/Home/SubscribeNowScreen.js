import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  Platform,
  AsyncStorage,
  Modal,
} from 'react-native';
import * as RNIap from 'react-native-iap';
import box from '../../assets/images/box.png';
import IC_LOCK from '../../assets/images/ic_lock_black.png';
import IC_HAND from '../../assets/images/ic_hand.png';
import IC_WEB from '../../assets/images/ic_web.png';
import IC_HEART from '../../assets/images/ic_heart.png';
import IC_LOTUS from '../../assets/images/ic_lotus.png';
import IC_SMILE from '../../assets/images/ic_smile.png';
import SessionPlayerBG from '../../assets/images/SessionPlayerBG.png';
import styles from '../../styles/subscribeNow';
import IC_CLOSE from '../../assets/images/ic_close.png';
import firebaseApp from '../../components/constant';

/*
TODO:
- UnComment @cancelledSubscription method else condition */
const itemSkus = Platform.select({
  ios: [
    'com.divethru.divethru.lifetime',
  ],
  android: [
    'lifetime',
  ],
});

const itemSkuSubs = Platform.select({
  ios: [
    'com.divethru.divethru.monthly',
    'com.divethru.divethru.yearly',
  ],
  android: [
    'monthly', 'yearly',
  ],
});

class SubscribeNowScreen extends Component {
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
      products: '',
      subproducts: '',
      productList: '',
      onClicked: false,
      subscriptionStatus: false,
      subscriptionPackage: 'undefined',
      disabledClick: false,
      subscriptionId: '',
      activeUser: '',
      productSubs: [],
      modalVisible: false,
    };

    this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this);
  }

  async componentDidMount() {
    try {
      this.getItems();
      this.checkSubscription();
      this.handlerPurchase();
    } catch (err) {
      console.log(`SubscribeNowScreen err: ${err}`);
    }

    const { params } = this.props.navigation.state;
    const onDescription = params ? params.onDescription : undefined;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ onDescription });
  }

  getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      let obj;
      for (let i = 0; i < products.length; i++) { // eslint-disable-line no-plusplus
        obj = products[0];
      }
      this.setState({ products: obj });
      const productsSubs = await RNIap.getSubscriptions(itemSkuSubs);
      productsSubs.push(this.state.products);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(productsSubs),
      });
    } catch (err) {
      console.log(`SubscribeNowScreen getItems err: ${err}`);
    }
    await RNIap.getPurchaseHistory();
  }

  formatDate = (currentdate) => {
    // eslint-disable-next-line prefer-template
    return `${+('0' + currentdate.getDate()).slice(-2)}-${
       ('0' + (currentdate.getMonth() + 1)).slice(-2)}-${ // eslint-disable-line prefer-template
       currentdate.getFullYear()} ${
       currentdate.getHours()}:${
       currentdate.getMinutes()}:${
       currentdate.getSeconds()}`;
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  // eslint-disable-next-line no-unused-vars
  buySubscribeItem = async (sku, currency, price, title, productId) => {
    if (this.state.disabledClick === true) {
      this.setState({ modalVisible: true });
    } else {
      try {
        let purchaseResponse;
        if (sku === 'lifetime' || sku === 'com.divethru.divethru.lifetime') {
          purchaseResponse = await RNIap.buyProduct(sku);
        } else {
          purchaseResponse = await RNIap.buySubscription(sku);
        }

        const date = this.formatDate(new Date(Number(purchaseResponse.transactionDate)));
        const transactionId = purchaseResponse.transactionId;
        const subscriptionType = this.checkPackageName(purchaseResponse.productId);
        const transactionReceipt = Platform.OS === 'ios' ? purchaseResponse.transactionReceipt : '';
        const paymentType = Platform.OS === 'ios' ? 'App Store' : 'Play Store';
        const originalTransactionIdentifier = Platform.OS === 'ios'
          ? purchaseResponse.originalTransactionIdentifier
          : '';

        AsyncStorage.getItem('user_id').then((value) => {
          const storeRef = firebaseApp.database().ref().child(`Users/${value}/payment`);
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
              transactionReceipt,
              originalTransactionIdentifier,
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
            const refUpdate = firebaseApp.database().ref('Users').child(value);
            refUpdate.update({ membership_type: 'Paid' });
            this.setState({
              subscriptionStatus: true,
              subscriptionPackage: subscriptionType.toLowerCase(),
              disabledClick: true,
            });
          }, (error) => {
            console.log(`buySubscribeItem error: ${error}`);
          });
        });
      } catch (err) {
        console.log(`buySubscribeItem err: ${err}`);
      }
    }
  }

  checkDuplicateReceipt = (receipt) => {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment`);
      ref.limitToLast(1).on('child_added', (data) => {
        const user = data.val();
        const transactionReceipt = user.transactionReceipt;
        if (receipt === transactionReceipt) {
          return false;
        }
        return true;
      }, (error) => {
        console.log(`checkDuplicateReceipt error: ${error}`);
      });
    });
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
      .then(() => {
        this.setState({ isPaid: true });
      })
      .done();

    if (this.state.onDescription === true) {
      Promise.all([
        this.props.navigation.dispatch(
          this.props.navigation.navigate('Home'),
        ),
      ]).then(() => this.props.navigation.navigate('Home'))
      .then(() => this.props.navigation.navigate('DiveThru'));
    } else {
      this.props.navigation.navigate('Home');
    }
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
      .then(() => {
        this.setState({ isPaid: true });
      })
      .done();

    if (this.state.onDescription === true) {
      Promise.all([
        this.props.navigation.dispatch(
          this.props.navigation.navigate('Home'),
        ),
      ]).then(() => this.props.navigation.navigate('Home'))
      .then(() => this.props.navigation.navigate('DiveThru'));
    } else {
      this.props.navigation.navigate('Home');
    }
  }

  handlerPurchase() {
    const date = new Date(Number(purchaseResponse.transactionDate)).toString();
    const transactionId = purchaseResponse.transactionId;
    const subscriptionType = this.checkPackageName(purchaseResponse.productId);
    const paymentType = Platform.OS === 'ios' ? 'App Store' : 'Play Store';
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(value);
      ref.on('value', (snapshot) => {
        const userData = snapshot.val();
        // eslint-disable-next-line no-unused-vars
        const purchaseData = {
          date,
          transaction_id: transactionId,
          subscription_type: subscriptionType,
          payment_type: paymentType,
          payment_status: 'verified',
          email: userData.email,
          name: userData.first_name,
        };
      }, (error) => {
        console.log(`handlerPurchase error: ${error}`);
      });
    });
  }

  checkPackageName = (name) => {
    if (name.indexOf('monthly') >= 0) {
      return 'Monthly';
    } else if (name.indexOf('yearly') >= 0) {
      return 'Yearly';
    }
    return 'Lifetime';
  }

  handlerButtonOnClick() {
    this.setState({
      onClicked: true,
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
          console.log(`consumePurchase er: ${er}`);
        }
      }
    } catch (err) {
      console.log(`consumePurchase err: ${err}`);
    }
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
            // && datas[i].autoRenewing === true && subscription === 'false') {
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
            console.log(`cancelledSubscription error: ${error}`);
          });
        });
      }
    } catch (err) {
      console.log(`cancelledSubscription err: ${err}`);
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
        console.log(`checkSubscription error: ${error}`);
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
          console.log(`cancelledSubscriptionIos error: ${error}`);
        });
      });
    } catch (err) {
      console.log(`cancelledSubscriptionIos err: ${err}`);
    }
  }

  updateSubscriptionData(key) {
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Users').child(`${value}/payment/${key}`);
      ref.update({ subscription: 'cancel' }).then(() => {

      }).catch((error) => {
        console.log(`updateSubscriptionData error: ${error}`);
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

  CloseButtonClick() {
    if (this.state.onDescription === true) {
      // alert('if');
      Promise.all([
        this.props.navigation.dispatch(
          this.props.navigation.navigate('Home'),
        ),
      ]).then(() => this.props.navigation.navigate('Home'))
      .then(() => this.props.navigation.navigate('DiveThru'));
    } else {
      this.props.navigation.navigate('Home');
    }
  }

  renderCategory(category) {
    return (
      <TouchableOpacity
        onPress={() => this.buySubscribeItem(
          category.productId,
          category.currency,
          category.price,
          category.title,
          category.productId,
        )}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={category.productId.includes(this.state.subscriptionPackage)
              ? styles.imagebox
              : styles.imgbox}
            source={box}
          />

          <Image
            style={styles.imagebckground}
            source={SessionPlayerBG}
          />

          <Text style={styles.imagetxt1}>{category.title.replace('(DiveThru)', '')}</Text>
          <Text style={styles.imagetxt2}>{category.localizedPrice}</Text>
          <Text style={styles.imagetxt3}>{category.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.closebtn}
            onPress={() => { this.CloseButtonClick(); }}
          >
            <Image
              style={styles.image}
              source={IC_CLOSE}
            />
          </TouchableOpacity>

          <Text style={styles.mainheadingtext}>Subscribe now</Text>

          <Text style={styles.headtext}>
            Get 100s of conversations by unlocking the complete Dive Thru library now.
          </Text>

          <View style={{ paddingBottom: 25, paddingTop: 25 }}>
            {this.state.dataSource
              ? <ListView
                horizontal
                dataSource={this.state.dataSource}
                renderRow={category => this.renderCategory(category)}
              />
              : null
            }

            <Modal
              animationType="none"
              transparent
              visible={this.state.modalVisible}
              onRequestClose={() => { this.closeModal(); }}
              supportedOrientations={['portrait', 'landscape']}
            >
              <View style={styles.containermodal}>
                <View style={styles.innerContainer}>
                  <View style={styles.content}>
                    <Text style={styles.title}>
                      You have already subscribed our {this.state.subscriptionPackage} plan
                    </Text>

                    <View style={styles.tchblebtn}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => { this.closeModal(); }}
                      >
                        <Text style={styles.btnTxt}>
                          OK
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_LOCK}
            />
          </View>

          <Text style={styles.headingtext}>Unlock The Entire Library</Text>

          <Text style={styles.text}>
            By signing up you get access to the entire Dive Thru. The library features 100s of
            converstaions with new ones coming every month.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_HAND}
            />
          </View>

          <Text style={styles.headingtext}>$1 Each Month Donated</Text>

          <Text style={styles.text}>
            We donate $1 monthly membership each month to_____ which runs safe spaces for youth
            girls to build confidence, leam coping skills, and gain self awareness. Your membership
            helps them.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_WEB}
            />
          </View>

          <Text style={styles.headingtext}>Accessible Everyewhere</Text>

          <Text style={styles.text}>
            Access Dive Thru on your phone, on your desktop and with or are.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_HEART}
            />
          </View>

          <Text style={styles.headingtext}>Boost Your Self Confidence</Text>

          <Text style={styles.text}>
            Reconnect with your self and learn to feel at peace with who you are.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={styles.imageicon} source={IC_LOTUS} />
          </View>

          <Text style={styles.headingtext}>Gain Self Awareness</Text>

          <Text style={styles.text}>
            Get to know yourself better and move through life effortlessly.
          </Text>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_SMILE}
            />
          </View>

          <Text style={styles.headingtext}>Build Emotional Resilience</Text>
          <Text style={styles.text}>
            Learn to better handle stressfull experiences and release what&apos;s holding you back.
          </Text>

          <Text style={styles.txt}>Recurring billing. Cancel anytime.</Text>
          <Text style={styles.txt}>*Billed in one payment</Text>

          <View>
            <Text style={styles.rtext}>Restore purchase     .      Terms & Conditions</Text>
          </View>

          <Text style={styles.txtsubscription}>
          The Subscription will automatically renew unless auto-renew is tuened off at
          least 24 hours before the and of the current period. You can go to your iTunes
          Account settings to manage your subscription and turn off auto-renew. Your iTunes
          Accounts will be charged when the purchase is confirmed. if you subscribe before your
          free trial ends the rest of your free trial will be forfeited as soon as your purchase
          is confirmed.
          </Text>

          <View style={{ paddingBottom: 25, paddingTop: 25 }}>
            <ListView
              horizontal
              dataSource={this.state.dataSource}
              renderRow={category => this.renderCategory(category)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SubscribeNowScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SubscribeNowScreen;
