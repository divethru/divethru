import React, { Component } from 'react';
import { Modal, Animated, Dimensions, Platform, Text, ListView, RefreshControl, TouchableOpacity, View, ImageBackground, AsyncStorage, Alert, Image, ScrollView } from 'react-native';
// import { Button } from 'react-native-material-ui';
import RNIap from 'react-native-iap';
import { CheckBox } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { ScrollableTab, Tab, TabHeading, Tabs } from 'native-base';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Share, { ShareSheet, Button } from 'react-native-share';
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
      daysInRow: 0,
      lastPlayedon: '',
      imgTag: tag1,
      url: undefined,
      shareModal: false,
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
          const lastPlayedon = dataSnapshot.val().lastPlayed_on ? dataSnapshot.val().lastPlayed_on : '';
          let daysInRow = dataSnapshot.val().days_in_row ? dataSnapshot.val().days_in_row : 0;

          const CurrentOnlyDate = Moment().format('YYYY-MM-DD');
          const difference = Moment(CurrentOnlyDate).diff(lastPlayedon, 'days');
          if (difference > 1) {
            daysInRow = 0;
          }

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
            lastPlayedon,
            daysInRow,
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

  onCancel() {
    this.setState({ shareModal: false });
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
    if (hours > 0 && minutes > 0) {
      this.setState({
        hourmin: `${hours}:${minutes}`,
        hourmintag: 'min',
      });
    } else if (hours > 1 && minutes === 0) {
      this.setState({
        hourmin: hours,
        hourmintag: 'hrs',
      });
    } else if (hours > 0 && minutes === 0) {
      this.setState({
        hourmin: hours,
        hourmintag: 'hr',
      });
    } else {
      this.setState({
        hourmin: minutes,
        hourmintag: 'min',
      });
    }

    // this.setState({ hourmin: (hours > 0) ? hours : minutes });

    // if (hours > 1) {
    //   this.setState({ hourmintag: 'hrs' });
    // } else if (hours > 0) {
    //   this.setState({ hourmintag: 'hr' });
    // } else {
    //   this.setState({ hourmintag: 'min' });
    // }
  }

  getJournalData = () => {
    AsyncStorage.getItem('user_id').then((value) => {
      const refcat = firebaseApp.database().ref(`/Journal/${value}`);
      refcat.on('value', (dataSnapshot) => {
        if (dataSnapshot.exists()) {
          let Journals = [];
          dataSnapshot.forEach((child) => {
            Journals.push({
              cat_name: child.val().category_name,
              date: Moment(child.val().date).format('YYYY/MM/DD'),
              text: child.val().journal_text,
            });
          });

          Journals = Journals.reverse();

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
      console.log('onLogout google_id=======> ' + value);
      if (value !== null) {
        GoogleSignin.signOut().then(() => {
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
        'Select at least one tag',
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
        'Select at least one tag',
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
          containerStyle={{ borderWidth: 0, backgroundColor: 'transperent', padding: 5 }}
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
        // <Button
        //   accent
        //   text="F I N I S H"
        //   onPress={() => { this.closePersonalizedModal(); }}
        //   upperCase={false}
        //   style={nextButtonStyles}
        // />
        <TouchableOpacity onPress={() => { this.closePersonalizedModal(); }} style={nextButtonStyles.container}>
          <Text style={nextButtonStyles.text}>F I N I S H</Text>
        </TouchableOpacity>
      );
    }

    return (
      // <Button
      //   accent
      //   text="N E X T"
      //   onPress={() => { this.openPersonalizedModel(this.state.page + 1); }}
      //   upperCase={false}
      //   style={nextButtonStyles}
      // />
      <TouchableOpacity onPress={() => { this.openPersonalizedModel(this.state.page + 1); }} style={nextButtonStyles.container}>
        <Text style={nextButtonStyles.text}>N E X T</Text>
      </TouchableOpacity>
    );
  }

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

        <TouchableOpacity style={styles.subViewStyle} onPress={() => this.openPersonalizedModel(0)}>
          <Text style={styles.subViewText}>Update Customized Feed</Text>

          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.subViewStyle} onPress={() => this.isHidden(0)}>
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
        </View> */}


        <TouchableOpacity style={styles.subViewStyle} onPress={() => { this.onLogout(); }}>
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
          {(this.state.daysInRow)
            ? this.state.daysInRow
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
                this.setState({ shareModal: true });
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
     //  twitter icon
    const TWITTER_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==';

     //  facebook icon
    const FACEBOOK_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==';

     //  gplus icon
    const GOOGLE_PLUS_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==';

     //  email icon
    const EMAIL_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==';

     //  more icon
    const MORE_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=';

    const shareOptions = {
      message: 'Hi friend. I have been loving this new app called DiveThru. It helps you DiveThru what you go through.. Clever name, hey? Taking care of your mental wellbeing is cool, so I think you should use it. You can check it out at divethru.com or download it in the app store.',
      url: 'http://divethru.com/',
      subject: 'Invite friends', //  for email
    };
    const shareOptionsTwitter = {
      message: 'The land of Twitter, I have been loving this new app called DiveThru. It helps you DiveThru what you go through.. Clever name, hey? Taking care of your mental wellbeing is cool, so I think you should use it. You can check it out at divethru.com or download it in the app store.',
      url: 'http://divethru.com/',
    };
    const shareOptionsFacebook = {
      message: 'Facebook, I have been loving this new app called DiveThru. It helps you DiveThru what you go through.. Clever name, hey? Taking care of your mental wellbeing is cool, so I think you should use it. You can check it out at divethru.com or download it in the app store.',
      url: 'http://divethru.com/',
    };
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
          <Modal
            transparent
            visible={this.state.shareModal}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => { this.onCancel(); }}
          >
            <TouchableOpacity style={styles.sharecontainer} onPress={() => this.onCancel()}>
              <View style={styles.innerContainer}>
                <Button
                  iconSrc={{ uri: TWITTER_ICON }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptionsTwitter, {
                        social: 'twitter',
                      }));
                    }, 300);
                  }}
                >Twitter</Button>
                <Button
                  iconSrc={{ uri: FACEBOOK_ICON }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptionsFacebook, {
                        social: 'facebook',
                      }));
                    }, 300);
                  }}
                >Facebook</Button>
                <Button
                  iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        social: 'googleplus',
                      }));
                    }, 300);
                  }}
                >Google +</Button>
                <Button
                  iconSrc={{ uri: EMAIL_ICON }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.shareSingle(Object.assign(shareOptions, {
                        social: 'email',
                      }));
                    }, 300);
                  }}
                >Email</Button>
                <Button
                  iconSrc={{ uri: MORE_ICON }}
                  onPress={() => {
                    this.onCancel();
                    setTimeout(() => {
                      Share.open(shareOptions);
                    }, 300);
                  }}
                >More</Button>
              </View>
            </TouchableOpacity>
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
                          fontSize: 13,
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
