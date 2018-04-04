import React, { Component } from 'react';
import { Animated, Dimensions, Platform, Text, ListView, TouchableOpacity, View, ImageBackground, AsyncStorage, Alert, Image, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { GoogleSignin } from 'react-native-google-signin';
import { Body, Header, ScrollableTab, Tab, TabHeading, Tabs, Title, List, ListItem as Item } from 'native-base';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from '../../styles/profile';
import backgroundImages from '../../assets/images/SessionPlayerBG.png';
import ProfileImage from '../../assets/images/profile.png';
import upperBackground from '../../assets/images/my_stats_bg.png';
import LogoutImg from '../../assets/images/logout.png';
import errow from '../../assets/images/ic_previous.png';
import upperBackgroundTriangle from '../../assets/images/triangle.png';
import watch from '../../assets/images/time.png';
import diveThru from '../../assets/images/divethru.png';
import plus from '../../assets/images/ic_close.png';
import firebaseApp from '../../components/constant';
import Profile from '../../assets/images/ic_profile.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 250;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = 'rgba(85,186,255, 1)';
const FADED_THEME_COLOR = 'rgba(85,186,255, 0.8)';

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => <Image source={Profile} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    this.lScroll.addListener(Animated.event([{ value: this.scroll }], { useNativeDriver: false }));
    this.state = {
      opicity: 0,
      profileName: 'oppo',
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
    AsyncStorage.getItem('full_name').then((value) => {
      this.setState({ profileName: value });
    });
    AsyncStorage.getItem('emailid').then((value) => {
      this.setState({ emailid: value });
    });
    this.getJournalData();
  }

  getJournalData = () => {
    const Journals = [];
    AsyncStorage.getItem('user_id').then((value) => {
      const ref = firebaseApp.database().ref('Journal').child(value);
      ref.once('value').then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          dataSnapshot.forEach((child) => {
            Journals.push({
              cat_name: child.val().category_name,
              date: Moment(child.val().date).format('YYYY/MM/DD'),
              text: child.val().journal_text,
            });
          });
          // console.log(Journals);
          if (Journals.length > 10) {
            this.setState({ loadmoreDisable: true });
          }
          // const size = 10;
          if (this.state.learnMoreClicked === true) {
            this.setState({ size: this.state.size + 10 });
            this.finalJournals = Journals.slice(0, this.state.size);
          } else {
            this.finalJournals = Journals.slice(0, this.state.size);
          }
          // console.log(JSON.stringify(Journals));
          this.setState({ JournalData: this.finalJournals, lastrecordindex: this.state.size - 1 });
          // alert(this.state.lastrecordindex);
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
    this.setState({ dataSource: this.state.dataSource.cloneWithRowsAndSections(dateMap) });
  }

  renderRow = data => (
    <View style={styles.randerView}>
      <View style={styles.leftView}>
        <Text style={[styles.textStyle, { fontSize: 20, color: '#34495e', flex: 1, flexWrap: 'wrap' }]}>{new Date(data.date).getDate()}</Text>
        <Text style={[styles.textStyle, { fontSize: 16, color: '#34495e', flex: 1, flexWrap: 'wrap' }]}>{data.cat_name}</Text>
      </View>
      <View style={styles.rightView}>
        <Text style={[styles.textStyle, { flex: 1, flexWrap: 'wrap' }]}>{data.text}</Text>
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
    AsyncStorage.removeItem('user_id');
    const userData = AsyncStorage.getItem('google_id').then((value) => {
      if (value !== null) {
        GoogleSignin.signOut()
        .then(() => {
          console.log('out');
        })
        .catch((err) => {

        });
      }
    });
  
    this.props.navigation.dispatch(
      NavigationActions.reset({
        actions: [
          NavigationActions.navigate({ routeName: 'WalkThrough' }),
        ],
        index: 0,
        key: null,
      }),
    );
  };

  tabContentSettings = () => (
    <ScrollView>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.subViewStyle} onPress={() => this.props.navigation.navigate('EditProfile')}>
          <Text style={styles.subViewText}>Edit Profile</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.subViewStyle}>
          <Text style={styles.subViewText}>Dive with Friend</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.subViewStyle}>
          <Text style={styles.subViewText}>Terms {'&'} condition</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.subViewStyle}>
          <Text style={styles.subViewText}>Privacy Policy</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.subViewStyle}>
          <Text style={styles.subViewText}>Support</Text>
          <Image
            source={errow}
            style={styles.errowImg}
          />
        </TouchableOpacity>
        <View style={styles.subViewStyle}>
          <Text style={styles.subViewText}>Version</Text>
          <Text style={[{ marginTop: 26, right: 26, position: 'absolute' }, styles.subViewText]}>0.0.1</Text>
        </View> */}
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
    </ScrollView>);

  tabContentMyStreaks = () => (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={upperBackground}
          style={styles.upperBackground}
        >
          <ImageBackground
            source={upperBackgroundTriangle}
            style={styles.upperBackgroundTriangle}
          >
            <Text style={[{ marginTop: '8%' }, styles.upperBackgroundText]}>5</Text>
            <Text style={styles.upperBackgroundText}>Day</Text>
          </ImageBackground>
          <Text style={[{ marginTop: 10 }, styles.upperBackgroundText]}>Current streak</Text>
        </ImageBackground>
        <View style={styles.betweenView}>
          <View style={styles.betweenSubView}>
            <Image
              source={watch}
              style={styles.betweenViewImg}
            />
            <Text style={styles.betweenViewText}>TOTAL TIME</Text>
            <Text style={styles.betweenViewText}>DIVING THRU</Text>
            <View style={styles.betweenTimeView}>
              <Text style={styles.betweenViewEndText}>10</Text>
              <Text style={[styles.betweenViewEndText, { fontSize: 10, marginTop: 20 }]}>min</Text>
            </View>
          </View>
          <View style={styles.betweenSubView}>
            <Image
              source={diveThru}
              style={styles.betweenViewImg}
            />
            <Text style={styles.betweenViewText}>COMPLATED</Text>
            <Text style={styles.betweenViewText}>CONVESATIONS</Text>
            <Text style={styles.betweenViewEndText}>98</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.bottomText}>Divethru With Friends</Text>
          <TouchableOpacity style={styles.plusImgTouchView}>
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
        { this.state.loadmoreDisable &&
          <TouchableOpacity style={{ paddingBottom: 20 }} onPress={() => { this.getJournalData(this.setState({ learnMoreClicked: true })); }}>
            <Text style={styles.loadmoretext}>Load More</Text>
            <View style={styles.line} />
          </TouchableOpacity>
        }
      </View>
    </ScrollView>);

  /* render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{ position: 'absolute', width: '100%', backgroundColor: this.headerBg, zIndex: 1 }}>
          <Header style={{ backgroundColor: 'transperent', width: '100%' }} hasTabs>
            <Body style={{ alignItems: 'center' }}>
              <Title>
                <Animated.Text style={{ color: this.header, fontWeight: 'bold' }}>
                  Profile
                </Animated.Text>
              </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.nScroll } } }], { useNativeDriver: true })}
          style={{ zIndex: 0 }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: Animated.multiply(this.nScroll, 0.65) }, { scale: this.imgScale }],
              backgroundColor: THEME_COLOR,
            }}
          >
            <ImageBackground
              source={backgroundImages}
              style={styles.profilebcImage}
            >
              <Image
                source={ProfileImage}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{ this.state.profileName !== undefined ? this.state.profileName : 'Hello Motoss'}</Text>
            </ImageBackground>
          </Animated.View>
          <Tabs
            prerenderingSiblingsNumber={2}
            onChangeTab={({ i }) => {
              this.setState({ height: 200, activeTab: i });
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
              { this.state.dataSource !== undefined
                ? this.tabContentMyJournal()
                : null
              }
            </Tab>
            <Tab heading="S E T T I N G">
              {this.tabContentSettings()}
            </Tab>
            {/* <Tab heading="M Y  J O U R N A L">
              { this.state.dataSource !== undefined
                ? this.tabContentMyJournal()
                : null
              }
            </Tab>
          </Tabs>
        </Animated.ScrollView>
      </View>
    );
  } */

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View >
          <ImageBackground
            source={backgroundImages}
            style={styles.profilebcImage}
          >
            <Image
              source={ProfileImage}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{ this.state.profileName !== undefined ? this.state.profileName : 'Hello Motoss'}</Text>
          </ImageBackground>
        </View>
        <Tabs
          prerenderingSiblingsNumber={3}
          onChangeTab={({ i }) => {
            if (i === 0) {
              this.getJournalData();
            }
            this.setState({ height: this.heights[i], activeTab: i });
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
