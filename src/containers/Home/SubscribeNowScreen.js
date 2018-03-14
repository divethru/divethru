import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ListView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import * as RNIap from 'react-native-iap';
import IC_LOCK from '../../assets/images/ic_lock.png';
import IC_HAND from '../../assets/images/ic_hand.png';
import IC_WEB from '../../assets/images/ic_web.png';
import IC_HEART from '../../assets/images/ic_heart.png';
import IC_LOTUS from '../../assets/images/ic_lotus.png';
import IC_SMILE from '../../assets/images/ic_smile.png';
import SessionPlayerBG from '../../assets/images/SessionPlayerBG.png';
import styles from '../../styles/subscribeNow';
import IC_CLOSE from '../../assets/images/ic_close.png';

const data = [
  {
    title: 'M O N T H L Y',
    subTitle: 'PAID MONTH',
    price: '$ 14.99',
  },
  {
    title: 'Y E A R L Y',
    subTitle: 'PAID YEARLY',
    price: '$ 7.99',
  },
  {
    title: 'L I F E T I M E',
    subTitle: 'PAID ONCE',
    price: '$ 345',
  },
  {
    title: 'M O N T H L Y 1',
    subTitle: 'PAID MONTH',
    price: '$ 14.99',
  },
  {
    title: 'Y E A R L Y 1',
    subTitle: 'PAID YEARLY',
    price: '$ 7.99',
  },
  {
    title: 'L I F E T I M E 2',
    subTitle: 'PAID ONCE',
    price: '$ 345',
  },
];

const itemSkus = {
  ios: [
    'com.meditation.divethru.mothlyTest',
    'com.meditation.divethru.yearlyTest',
  ],
  android: [
    'com.meditation.divethru.mothlyTest',
    'com.meditation.divethru.yearlyTest',
  ],
};

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
      onClicked: false,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    try {
      const message = RNIap.prepareAndroid().then(() => {
        const items = RNIap.getItems(itemSkus)
        this.setState({ items })
      });
    } catch(errorCode) {
    
    }
    this.fetchData();
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  fetchData() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  renderCategory(category) {
    return (
      <TouchableOpacity style={{}} onPress={() => { this.setState({ onClicked: true, itemTitle: category.title }); }}>
        <View style={this.state.onClicked && this.state.itemTitle === category.title ? styles.innerContainerFocus : styles.innerContainer}>
          <Image
            style={styles.imagebckground}
            source={SessionPlayerBG}
          />
          <Text style={styles.imagetxt1}>{category.title}</Text>
          <Text style={styles.imagetxt2}>{category.price}</Text>
          <Text style={styles.imagetxt3}>{category.subTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity style={styles.closebtn} onPress={() => { this.props.navigation.goBack(); }}>
            <Image
              style={styles.image}
              source={IC_CLOSE}
            />
          </TouchableOpacity>
          <Text style={styles.mainheadingtext}>Subscribe now</Text>
          <Text style={styles.headtext}>Get 100s of converstaions by unlocking the complete Dive Thru library now.</Text>
          <View style={{ paddingBottom: 25, paddingTop: 25 }}>
            <ListView
              horizontal
              dataSource={this.state.dataSource}
              // renderRow={category => <Text>{category.title}</Text>}
              renderRow={category => this.renderCategory(category)}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_LOCK}
            />
          </View>
          <Text style={styles.headingtext}>Unlock The Entire Library</Text>
          <Text style={styles.text}>By singing up you get access to the entire Dive Thru. The library feutures 100s of converstaions with new once coming every month.</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_HAND}
            />
          </View>
          <Text style={styles.headingtext}>$1 Each Month Donated</Text>
          <Text style={styles.text}>We donate $1 monthly membership each month to_____ which runs safe spaces for youth girls to build confidence, leam coping skills, and gain self awareness. Your membership helps them.</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_WEB}
            />
          </View>
          <Text style={styles.headingtext}>Accessible Everyewhere</Text>
          <Text style={styles.text}>Access Dive Thru on your phone, on your desktop and with or are.</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_HEART}
            />
          </View>
          <Text style={styles.headingtext}>Boost Your Self Confidence</Text>
          <Text style={styles.text}>Reconnect with your self and learn to feel at peace with who you are.</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_LOTUS}
            />
          </View>
          <Text style={styles.headingtext}>Gain Self Awareness</Text>
          <Text style={styles.text}>Get to know yourself better and move through life effortlessly.</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.imageicon}
              source={IC_SMILE}
            />
          </View>
          <Text style={styles.headingtext}>Build Emotional Resilience</Text>
          <Text style={styles.text}>Learn to better handle stressfull experiences and release what's holding you back.</Text>
          <Text style={styles.txt}>Recurring billing. Cancel anytime.</Text>
          <Text style={styles.txt}>*Billed in one payment</Text>
          <View>
            <Text style={styles.rtext}>Restore purchase     .      Terms & Conditions</Text>
          </View>
          <Text style={styles.txtsubscription}>The Subscription will automatically renew unless auto-renew is tuened off at least 24 hours before the and of the current period. You can go to your iTunes Account settings to manage your subscription and turn off auto-renew. Your iTunes Accounts will be charged when the purchase is confirmed. if you subscribe before your free trial ends the rest of your free trial will be forfeited as soon as your purchase is confirmed.</Text>
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
