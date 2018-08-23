import React, { Component } from 'react';
import { Modal, Animated, Dimensions, Platform, Text, ListView, RefreshControl, TouchableOpacity, View, ImageBackground, AsyncStorage, Alert, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-material-ui';
import RNIap from 'react-native-iap';
import { CheckBox } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Share from 'react-native-share';
import ActivityIndicator from '../../components/ActivityIndicator';
import styles, { nextButtonStyles } from '../../styles/profile';
import backgroundImages from '../../assets/images/SessionPlayerBG.png';
import ProfileImage from '../../assets/images/profile.png';
import LogoutImg from '../../assets/images/logout.png';
import errow from '../../assets/images/ic_previous.png';
import downarrow from '../../assets/images/ic_down.png';
import rightarrow from '../../assets/images/ic_.png';
import watch from '../../assets/images/time.png';
import diveThru from '../../assets/images/divethru.png';
import plus from '../../assets/images/ic_close.png';
import firebaseApp from '../../components/constant';
import Profile from '../../assets/images/ic_profile.png';
import tag1 from '../../assets/images/1.png';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = 'rgba(85,186,255, 1)';
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)';

class ProfileScreen extends Component {
  static navigationOptions = navigation => ({
    header: null,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => <Image source={Profile} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    this.lScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    this.state = {
      indicatorLoading: false,
      opicity: 0,
      profileName: '',
      loadmoreDisable: false,
      lastrecordindex: 0,
      size: 10,
      learnMoreClicked: 'false',
      dateMap: [],
      allnewdata: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      activeTab: 0,
      height: 500,
      refreshing: false,
      personalizedModal: false,
      tags: [],
      checked: false,
      checkedItem: [],
      userTagsArray: undefined,
      isHidden: true,
      imgTag: tag1,
      url: undefined,
    };
    this.heights = [500, 500];
  }

  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  lScroll = new Animated.Value(0);
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: ['black', FADED_THEME_COLOR, 'white'],
    extrapolate: 'clamp',
  });
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ['white', THEME_COLOR],
    extrapolate: 'clamp',
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ['transparent', 'transparent', '#A163BE'],
    extrapolate: 'clamp',
  });
  header = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ['transparent', 'transparent', 'white'],
    extrapolate: 'clamp',
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: 'clamp',
  });
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
  });

  componentWillMount = () => {
    this.checkTagIsSelected();

    AsyncStorage.getItem('full_name').then((value) => {
      this.setState({ profileName: value });
    });
    AsyncStorage.getItem('emailid').then((value) => {
      this.setState({ emailid: value });
    });

    this.getStreakData();
    this.getJournalData();
  }

  checkTagIsSelected() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const refcat = firebaseApp.database().ref(`/Users/${value}`);
        refcat.on('value', (dataSnapshot) => {
          const userData = dataSnapshot.val();
          const userTags = userData.tags;
          const AccessCode = userData.access_code;
          const url = userData.url;

          if (userTags === '' || userTags === undefined) {
            this.setState({
              userTagsArray: undefined,
              checkedItem: [],
            });
          } else {
            this.setState({
              userTagsArray: userTags,
              checkedItem: userTags.split(','),
            });
          }

          console.log(`image URl: ${url}`);
          this.setState({
            hideTags: false,
            url,
            AccessCode,
            profileName: `${userData.first_name} ${userData.last_name}`,
          });
        });
      }
    }).catch(() => { });
  }

  closeModal() {
    const checkedItem = this.state.userTagsArray !== undefined ? this.state.userTagsArray.split(',') : '';
    this.setState({
      personalizedModal: false,
      checkedItem,
    });
  }

  onRefreshClicked() {
    this.onRefresh = true;
    this.setState({ refreshing: true });
    this.getStreakData();
    this.getJournalData();
  }

  getStreakData() {
    AsyncStorage.getItem('user_id').then((value) => {
      const refcat = firebaseApp.database().ref(`/Users/${value}/currentStreak`);
      refcat.on('value', (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          dataSnapshot.forEach((child) => {
            if (child.val().Session) {
              const streaklen = Object.keys(child.val().Session).length;
              this.setState({ streaklen });
            } else if (child.val().Bundle) {
              const bundleRry = child.val().Bundle;

              Object.keys(bundleRry).forEach((key1) => {
                const value1 = bundleRry[key1];
                const sessions = value1.Session ? value1.Session : [];
                const streaklen = Object.keys(sessions).length;
                this.setState({ streaklen });
              });
            } else if (child.val().SubCategory) {
              const arraySubCategory = child.val().SubCategory;
              Object.keys(arraySubCategory).forEach((key) => {
                const data = arraySubCategory[key];
                const bundleRry = data.Bundle ? data.Bundle : '';
                const sessionAry = data.Session ? data.Session : '';

                if (bundleRry !== undefined && bundleRry !== '') {
                  Object.keys(bundleRry).forEach((key1) => {
                    const value1 = bundleRry[key1];
                    const sessions = value1.Session ? value1.Session : [];
                    const streaklen = Object.keys(sessions).length;
                    this.setState({ streaklen });
                  });
                } else if (sessionAry !== undefined && sessionAry !== '') {
                  const streaklen = Object.keys(sessionAry).length;
                  this.setState({ streaklen });
                }
              });
            }
          });
        }
      });

      const ref = firebaseApp.database().ref('Users').child(`${value}`);
      ref.on('value', (snapshot) => {
        if (snapshot.val() !== null) {
          this.setState({
            total_time: (snapshot.val().total_time_divethru),
            completed_convo: (snapshot.val().completed_conversation),
          });
          this.convertMinsToHrsMins(snapshot.val().total_time_divethru);
        }
      });
    });
  }

  convertMinsToHrsMins(min) {
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    this.setState({ hourmin: (hours > 0) ? hours : minutes });

    if (hours > 1) {
      this.setState({ hourmintag: 'hrs' });
    } else if (hours > 0) {
      this.setState({ hourmintag: 'hr' });
    } else {
      this.setState({ hourmintag: 'min' });
    }
  }

  getJournalData = () => {
    AsyncStorage.getItem('user_id').then((value) => {
      const refcat = firebaseApp.database().ref(`/Journal/${value}`);
      refcat.on('value', (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          const Journals = [];
          dataSnapshot.forEach((child) => {
            Journals.push({
              cat_name: child.val().category_name,
              date: Moment(child.val().date).format('YYYY/MM/DD'),
              text: child.val().journal_text,
            });
          });

          if (Journals.length > 10) {
            this.setState({ loadmoreDisable: true });
          }

          if (this.state.learnMoreClicked === true) {
            this.setState({ size: this.state.size + 10 });
            this.finalJournals = Journals.slice(0, this.state.size);
          } else {
            this.finalJournals = Journals.slice(0, this.state.size);
          }

          this.setState({
            JournalData: this.finalJournals,
            lastrecordindex: this.state.size - 1,
          });

          if (Journals.length < this.state.lastrecordindex) {
            this.setState({ loadmoreDisable: false });
          }
          this.compo();
        }
      });
    });
  }

  compo = () => {
    const dateMap = {};
    this.state.JournalData.forEach((Item) => {
      if (!dateMap[`${Moment(new Date(Item.date).getMonth() + 1, 'MM').format('MMMM')} ${new Date(Item.date).getFullYear()}`]) {
        dateMap[`${Moment(new Date(Item.date).getMonth() + 1, 'MM').format('MMMM')} ${new Date(Item.date).getFullYear()}`] = [];
      }
      dateMap[`${Moment(new Date(Item.date).getMonth() + 1, 'MM').format('MMMM')} ${new Date(Item.date).getFullYear()}`].push(Item);
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dateMap),
      refreshing: false,
    });
  }

  renderRow = data => (
    <View style={styles.randerView}>
      <View style={styles.leftView}>
        <Text style={[styles.textStyle, { fontSize: 20, color: '#34495e' }]}>{new Date(data.date).getDate()}</Text>
        <View style={styles.horizontalView} />
        <Text style={[styles.textStyle, { fontSize: 14, color: '#34495e' }]}>{data.cat_name}</Text>
      </View>

      <View style={styles.rightView}>
        <Text style={styles.textStyle}>{data.text}</Text>
      </View>
    </View>
  )

  renderSectionHeader = (sectionData, date) => (
    <View
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 10, color: '#34495e' }}>{date}</Text>
    </View>
  )

  onLogout = () => {
    console.log('onLogout =======>');
    AsyncStorage.removeItem('user_id');
    AsyncStorage.getItem('google_id').then((value) => {
      if (value !== null) {
        GoogleSignin.signOut()
          .then(() => {
            console.log('onLogout google');
            AsyncStorage.setItem('wasAlreadyLoggedIn', 'true');
            AsyncStorage.removeItem('Logout');
            AsyncStorage.removeItem('Reload');
            AsyncStorage.removeItem('google_id');
            AsyncStorage.removeItem('fb_id');
            this.props.navigation.navigate('LoginScreen', { loginText: 'true' });
          });
      } else {
        console.log('onLogout Normal');
        AsyncStorage.setItem('wasAlreadyLoggedIn', 'true');
        AsyncStorage.removeItem('Logout');
        AsyncStorage.removeItem('Reload');
        AsyncStorage.removeItem('google_id');
        AsyncStorage.removeItem('fb_id');
        // this.props.navigation.popToTop();
        // this.props.navigation.navigate('LoginScreen', { loginText: 'true' });


        // const { navigate } = this.props.navigation
        // const resetAction = NavigationActions.reset({
        //   index: 0,
        //   actions: [
        //     NavigationActions.navigate({ routeName: 'LoginScreen' }),
        //   ],
        //   key: null,
        // });
        // this.props.navigation.dispatch(resetAction);


        Promise.all([
          this.props.navigation.dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Profile' })],
              }),
          ),
        ]).then(() => this.props.navigation.navigate('LoginScreen', { loginText: 'true' }));
      }
    });
  };

  consumePurchase = async () => {
    try {
      const datas = await RNIap.getAvailablePurchases();
      for (let i = 0; i < datas.length; i++) { // eslint-disable-line no-plusplus
        const token = datas[i].purchaseToken;
        try {
          RNIap.consumePurchase(token);
          console.log(`consumePurchase: ${datas.length}`);
        } catch (er) {
          console.log(`consumePurchase Error: ${er}`);
        }
      }
    } catch (err) {
      console.log(`consumePurchase Error1: ${err}`);
    }
  }

  openPersonalizedModel(page) {
    this.setState({ indicatorLoading: true });
    const ref = firebaseApp.database().ref('Tags');
    ref.once('value', (snap) => {
      const data = [];
      snap.forEach((tagValue) => {
        data.push(tagValue.val());
      });
      const tag = data;
      this.setState({ indicatorLoading: false });
      this.showModalData(tag, page);
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
          if (oldTags.indexOf(string) !== -1) {
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
        this.setState({ finaltags: tags, changeButton: true });
      } else {
        this.renderImage(this.state.imagePage);
        this.setState({ changeButton: false });
      }

      this.setState({ tagsTitle, tags, page });

      if (page === 0) {
        this.setState({ personalizedModal: true });
      }
    }
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
        'Select atleast one tag.',
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

  resetFeed() {
    const tags = '';
    const checkedItem = [];
    AsyncStorage.getItem('user_id').then((value) => {
      const storeRef = firebaseApp.database().ref().child(`Users/${value}`);
      storeRef.update({ skipTags: true });
      storeRef.update({ tags });
    });

    this.setState({
      personalizedModal: false,
      checkedItem,
    });

    Alert.alert(
      'Alert',
      'Your feed has been updated.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true },
    );
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

  renderCheckBox() {
    const tags = this.state.tags;
    return tags.map((item) => {
      return (
        <CheckBox
          title={item}
          checked={this.check(item)}
          onPress={() => this.checkUncheck(item)}
          containerStyle={{ borderWidth: 0, backgroundColor: 'transperent', width: '100%', padding: 5 }}
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

  inviteBuddy = async () => {
    const fullname = await AsyncStorage.getItem('full_name');
    const body = `${fullname} invites you to DiveThru.`;
    const shareOptions = {
      message: body,
      url: 'http://test.divethru.com/registration.php',
    };
    Share.open(shareOptions);
  };

  isHidden() {
    this.setState({ isHidden: !this.state.isHidden });
  }

  tabContentSettings = () => (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.subViewStyle} onPress={() => this.props.navigation.navigate('EditProfile')}>
          <Text style={styles.subViewText}>Edit Profile</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>

        {
          (this.state.AccessCode === '')
          ?
            <TouchableOpacity style={styles.subViewStyle} onPress={() => this.props.navigation.navigate('AccessCode', { onprofile: true })}>
              <Text style={styles.subViewText}>Access code</Text>
              <Image
                source={errow}
                style={styles.errowImg}
              />
            </TouchableOpacity>
          :
            null
        }

        {
          (Platform.OS === 'android') ?
            <TouchableOpacity style={styles.subViewStyle} onPress={() => this.consumePurchase()}>
              <Text style={styles.subViewText}>ConsumePurchase</Text>

              <Image
                source={errow}
                style={styles.errowImg}
              />
            </TouchableOpacity>
            :
            null
        }
        <TouchableOpacity style={styles.subViewStyle} onPress={() => this.isHidden(0)}>
          <Text style={styles.subViewText}>Update Customized Feed</Text>

          <Image
            source={this.state.isHidden ? errow : downarrow}
            style={styles.errowImg}
          />

        </TouchableOpacity>

        <View style={this.state.isHidden ? styles.hideView : ''} >
          <View style={styles.submenu}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, marginLeft: '15%' }}>
              <Image
                source={rightarrow}
                style={styles.arrowImg}
              />

              <TouchableOpacity onPress={() => this.openPersonalizedModel(0)}>
                <Text style={[styles.subViewText, { color: '#34495e' }]}>Update Customized Feed</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.seperator} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, marginLeft: '15%' }}>
              <Image
                source={rightarrow}
                style={styles.arrowImg}
              />

              <TouchableOpacity onPress={() => this.resetFeed()}>
                <Text style={[styles.subViewText, { color: '#34495e' }]}>Default Feed</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.boldSeperator} />
          </View>
        </View>


        <TouchableOpacity style={styles.subViewStyle} onPress={() => this.onLogout()}>
          <Text style={[styles.subViewText, { color: '#ef8282' }]}>Log out</Text>

          <Image
            source={LogoutImg}
            style={[styles.errowImg, { tintColor: '#ef8282' }]}
          />
        </TouchableOpacity>

        <View style={styles.BottomViewStyle}>
          <Text style={styles.BottomViewText}>Logged in as</Text>

          <Text style={styles.BottomViewText}>{this.state.emailid}</Text>
        </View>
      </View>
    </ScrollView>
  );

  tabContentMyStreaks = () => (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => { this.onRefreshClicked(); }}
        />
      }
    >
      <View style={styles.container}>
        <Text style={[{ marginTop: '8%', color: '#9f5dbc' }, styles.upperBackgroundText]}>
          {(this.state.streaklen)
            ? this.state.streaklen
            : 0
          }
        </Text>

        <Text style={[{ marginBottom: '5%' }, styles.betweenViewText]}>DAYS IN A ROW</Text>

        <View style={styles.betweenView}>
          <View style={styles.betweenSubView}>
            <Image
              source={watch}
              style={styles.betweenViewImg}
            />

            <Text style={styles.betweenViewText}>TOTAL TIME</Text>

            <Text style={styles.betweenViewText}>DIVING THRU</Text>

            <View style={styles.betweenTimeView}>
              <Text style={styles.betweenViewEndText}>{this.state.hourmin}</Text>

              <Text
                style={[styles.betweenViewEndText, { fontSize: 10, marginTop: 20 }]}
              >
                {this.state.hourmintag}
              </Text>
            </View>
          </View>

          <View style={styles.betweenSubView}>
            <Image
              source={diveThru}
              style={styles.betweenViewImg}
            />

            <Text style={styles.betweenViewText}>COMPLETED</Text>

            <Text style={styles.betweenViewText}>CONVERSATIONS</Text>

            <Text style={styles.betweenViewEndText}>{this.state.completed_convo}</Text>
          </View>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>DiveThru With Friends</Text>

          <TouchableOpacity
            style={styles.plusImgTouchView}
            onPress={() => {
              this.inviteBuddy();
              // this.props.navigation.navigate('Invite');
            }}
          >
            <Image
              source={plus}
              style={styles.plusImg}
            />
          </TouchableOpacity>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />

        {this.state.loadmoreDisable &&
          <TouchableOpacity
            style={{ paddingBottom: 20 }}
            onPress={() => { this.getJournalData(this.setState({ learnMoreClicked: true })); }}
          >
            <Text style={styles.loadmoretext}>Load More</Text>

            <View style={styles.line} />
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  );

  render() {
    const titles = this.state.tagsTitle;
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Modal
            visible={this.state.personalizedModal}
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
                    // onPress={() => {
                    //   this.setState({
                    //     personalizedModal: false,
                    //   });
                    // }}
                    onPress={() => { this.closeModal(); }}
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

          <ImageBackground
            source={backgroundImages}
            style={styles.profilebcImage}
          >
            <Image
              source={this.state.url !== undefined ? { uri: this.state.url } : ProfileImage}
              style={styles.profileImage}
            />

            <Text style={styles.profileName}>{this.state.profileName !== undefined ? this.state.profileName : 'Hello'}</Text>
          </ImageBackground>
        </View>

        <Tabs
          prerenderingSiblingsNumber={3}
          onChangeTab={({ i }) => {
            if (i === 0) {
              this.getStreakData();
              this.getJournalData();
            }
            this.setState({
              height: this.heights[i],
              activeTab: i,
            });
          }}
          renderTabBar={props => <Animated.View
            style={{ transform: [{ translateY: this.tabY }], zIndex: 1, width: '100%', backgroundColor: 'white' }}
          >
            <ScrollableTab
              {...props}
              renderTab={(name, page, active, onPress, onLayout) => (
                <TouchableOpacity
                  key={page}
                  onPress={() => onPress(page)}
                  onLayout={onLayout}
                  activeOpacity={0.4}
                >
                  <Animated.View
                    style={{
                      flex: 1,
                      height: 100,
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <TabHeading
                      scrollable
                      style={{
                        backgroundColor: '#f5f5f5',
                        width: SCREEN_WIDTH / 2,
                      }}
                      active={active}
                    >
                      <Animated.Text
                        style={{
                          color: active ? '#1A1A1A' : '#535353',
                          fontSize: 14,
                          marginTop: 12,
                        }}
                      >
                        {name}
                      </Animated.Text>
                    </TabHeading>
                  </Animated.View>
                </TouchableOpacity>
              )}
              underlineStyle={{ backgroundColor: 'black' }}
            />
          </Animated.View>
          }
        >
          <Tab heading="M Y  J O U R N E Y">
            {this.tabContentMyStreaks()}
          </Tab>
          <Tab heading="S E T T I N G">
            {this.tabContentSettings()}
          </Tab>
        </Tabs>
      </View>
    );
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default ProfileScreen;
