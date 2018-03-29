import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground, ListView, Dimensions, AsyncStorage, Animated, RefreshControl, StatusBar, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-ui';
import * as Progress from 'react-native-progress';
import firebaseApp from '../../components/constant';
import InfoPopup from '../../components/InfoPopup';
import PaginatedListView from '../../components/PaginatedListView';
import PromptedPopup from '../../components/PromptedPopup';
import Spinner from '../../components/Spinner';
import styles, { learnMoreButtonStyles, buttonStyles } from '../../styles/home';
import dashboardBG from '../../assets/images/Dashboard_bg.png';
import dashboardQuotesBG from '../../assets/images/Dashboard_QuotesBG.png';
import subscribeNowBG from '../../assets/images/SubscribeNow_bg.png';
import Home from '../../assets/images/ic_home.png';
import DiveThruScreen from '../DiveThru/DiveThruScreen';

const width = Dimensions.get('window').width;

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
      dailyQuotes: '',
      session: [],
      last_conversation_id: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      refreshing: false,
    };
    this.onRefresh = false;
    this.quickDivesItem = 0;
    this.deepDivesItem = 0;
    this.openDivesItem = 0;
    this.scrollX = new Animated.Value(0);
    this.scrollX1 = new Animated.Value(0);
    this.scrollX2 = new Animated.Value(0);
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    // StatusBar.setTranslucent(true);
    this.setState({ loading: true });

    this.fetchUserLastConversationData().then(() => {
      this.fetch10DayProgramData().then(() => {
        this.fetchQuotesData().then(() => {
          this.fetchCategoryWiseDataHome().then(() => {
            this.setState({ loading: false });
          }).catch(() => { });
        }).catch(() => { });
      }).catch(() => { });
    }).catch(() => { });
  }

  fetchUserLastConversationData() {
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const lastConversation = convo.last_free_conversation_id;
          const halted = convo.halted;
          this.setState({ loading: false, last_conversation_id: lastConversation, halted });
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

  fetchCategoryWiseDataHome() {
    const ref = firebaseApp.database().ref('Category');
    const arrayCategory = [];
    ref.once('value').then((dataSnapshot) => {
      // console.log('dataSnapshot-->' + JSON.stringify(dataSnapshot));
      if (dataSnapshot.exists()) {
        dataSnapshot.forEach((child) => {
          // alert('kk');
          const arraySessionAllData = [];
          const arraySubCategoryAllData = [];
          const arrayBundleAllData = [];
          // alert('child-->'+ JSON.stringify(child.val()));
          if (child.val().Session) {
            const CategoryName = child.val().category_name;
            const CategoryDescription = child.val().category_description;
            if (child.val().Bundle === '' || child.val().SubCategory === '') {
              let arraySession = [];
              arraySession = child.val().Session ? child.val().Session : [];

              Object.keys(arraySession).forEach((key) => {
                const value = arraySession[key];
                arraySessionAllData.push({
                  session_name: value.session_name,
                  session_img: value.session_img,
                  session_id: value.session_id,
                  session_description: value.session_description,
                  meditation_audio: value.meditation_audio[0],
                  meditation_audio_time: value.meditation_audio_time[0],
                });
              });
              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                session: arraySessionAllData,
              });
            } else {
              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                session: arraySessionAllData,
              });
            }
          } else if (child.val().Bundle) {
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

                if (sessionRry !== undefined) {
                  Object.keys(sessionRry).forEach((key1, index) => {
                    const value1 = sessionRry[key1];

                    arrayNewSession.push({
                      index,
                      session_name: value1.session_name,
                      session_img: value1.session_img,
                      session_id: value1.session_id,
                      session_description: value1.session_description,
                      meditation_audio: value1.meditation_audio,
                      meditation_audio_time: value1.meditation_audio_time,
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
              });
            } else {
              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                bundle: arrayBundleAllData,
              });
            }
          } else if (child.val().SubCategory) {
            const CategoryName = child.val().category_name;
            const CategoryDescription = child.val().category_description;
            if (child.val().Bundle === '' || child.val().Session === '') {
              let arraySubCategory = [];
              arraySubCategory = child.val().SubCategory;
              Object.keys(arraySubCategory).forEach((key) => {
                const value = arraySubCategory[key];
                const bundleRry = value.Bundle ? value.Bundle : [];
                const arrayNewBundle = [];
                if (bundleRry !== undefined) {
                  Object.keys(bundleRry).forEach((key1) => {
                    const value1 = bundleRry[key1];
                    const sessionRry = value1.Session ? value1.Session : [];
                    const arrayNewSession = [];

                    if (sessionRry !== undefined) {
                      Object.keys(sessionRry).forEach((key2, index) => {
                        const value2 = sessionRry[key2];

                        arrayNewSession.push({
                          index,

                          session_name: value2.session_name,
                          session_img: value2.session_img,
                          session_id: value2.session_id,
                          session_description: value2.session_description,
                          meditation_audio: value2.meditation_audio,
                          meditation_audio_time: value2.meditation_audio_time,
                        });
                      });
                    }

                    arrayNewBundle.push({
                      bundle_name: value1.bundle_name,
                      bundle_img: value1.bundle_img,
                      bundle_id: value1.bundle_id,
                      bundle_description: value1.bundle_description,
                      session: arrayNewSession,

                    });
                  });
                }

                arraySubCategoryAllData.push({
                  subcategory_id: value.subcategory_id,
                  subcategory_name: value.subcategory_name,
                  subcategory_img: value.subcategory_img,
                  subcategory_description: value.subcategory_description,
                  parentcategory: value.parentcategory,
                  bundle: arrayNewBundle,
                });
              });

              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                SubCategory: arraySubCategoryAllData,
              });
            } else {
              arrayCategory.push({
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                SubCategory: arraySubCategoryAllData,
              });
            }
          }
        });
        this.setState({ allData: arrayCategory });
        this.getFinalData();
      }
    });
  }

  getFinalData() {
    const finalCategory = this.state.allData;
    const finalData = [];
    finalCategory.forEach((child, index) => {
      const arrData = [];
      const CategoryName = child.cat_name;
      const CategoryDescription = child.cat_desc;
      const scrollx = new Animated.Value(0);
      if (child.session) {
        const categoryData = child.session;
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.session_id,
            img: innerchild.session_img,
            name: innerchild.session_name,
            type: 'session',
            index,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      } else if (child.bundle) {
        const categoryData = child.bundle;
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.bundle_id,
            img: innerchild.bundle_img,
            name: innerchild.bundle_name,
            type: 'bundle',
            index,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      } else if (child.SubCategory) {
        const categoryData = child.SubCategory;
        categoryData.forEach((innerchild) => {
          arrData.push({
            id: innerchild.subcategory_id,
            img: innerchild.subcategory_img,
            name: innerchild.subcategory_name,
            type: 'subcategory',
            index,
          });
        });
        const size = 6;
        this.finalarrData = arrData.slice(0, size);
      }

      finalData.push({
        cat_name: CategoryName,
        cat_desc: CategoryDescription,
        arrdata: this.finalarrData,
        scroll: scrollx,
      });
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(finalData),
    });
  }

  fetch10DayProgramData() {
    const ref = firebaseApp.database().ref('Category').child('Open Dive');
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
            meditation_audio: value.meditation_audio[0],
            meditation_audio_time: value.meditation_audio_time[0],
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

  onBegin = () => {
    if (this.state.session.length > 0) {
      if (this.state.last_conversation_id >= 8 && this.state.last_conversation_id !== 10) {
        this.setState({ isPrompted: true });
      } else if (this.state.last_conversation_id === 10) {
        this.props.navigation.navigate('SubscribeNowScreen');
      } else {
        this.redirectToPlayer();
      }
    }
  }

  redirectToPlayer() {
    if (this.state.last_conversation_id >= 8) {
      this.clearTimer();
    }
    const lastConversation = this.state.last_conversation_id;
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
    };
    this.props.navigation.navigate('Player', { returnData: this.fetchUserLastConversationData.bind(this), rowdata });
  }

  CloseModal = () => {
    this.setState({ isLearnMoreClicked: false, DeepDive: false, OpenDive: false, QuickDive: false });
  }

  onContinueWithFreeProgram = () => {
    this.setState({ isPrompted: false }, () => {
      this.timer = setInterval(() => {
        this.redirectToPlayer();
      }, 500);
    });
  }

  onContinueWithSubscription = () => {
    this.setState({ isPrompted: false }, () => {
      this.props.navigation.navigate('SubscribeNowScreen');
    });
  }

  onRefreshClicked() {
    this.onRefresh = true;
    this.setState({ refreshing: true });
    this.fetchUserLastConversationData().then(() => {
      this.fetch10DayProgramData().then(() => {
        this.fetchQuotesData().then(() => {
          this.fetchCategoryWiseDataHome().then(() => {
            this.onRefresh = false;
            this.setState({ refreshing: false });
          }).catch(() => { });
        }).catch(() => { });
      }).catch(() => { });
    }).catch(() => { });
  }

  redirectToDiveThruTab(item) {
    const i = item.index.toString();
    AsyncStorage.setItem('selectedIndex', i);
    this.props.navigation.navigate('DiveThru');
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => { this.redirectToDiveThruTab(item); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
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

            <ListView
              style={styles.SubCategoryList}
              dataSource={this.state.dataSource}
              enableEmptySections
              // cloneWithRows
              removeClippedSubviews={false}
              renderRow={data => (
                <View style={styles.MainList}>
                  <View style={styles.categoryInnerContainer}>
                    <Text style={styles.categoryTitle}>{data.cat_name}</Text>
                    <Button
                      accent
                      text="Learn more"
                      onPress={() => { this.setState({ isLearnMoreClicked: true, title: data.cat_name, description: data.cat_desc }); }}
                      upperCase={false}
                      style={learnMoreButtonStyles}
                    />
                  </View>
                  {
                    (data.arrdata.length > 0)
                    ?
                      (<View>
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
                            data={data.arrdata}
                            style={styles.FlatListViewStyle}
                            renderItem={e => this.renderItem(e)}
                          />
                        </ScrollView>
                        <PaginatedListView
                          listScrollId={data.scroll}
                          totalLength={data.arrdata.length}
                        />
                      </View>)
                    : null
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
            { this.state.isPrompted
              ? (<PromptedPopup
                onTouchUpFree={this.onContinueWithFreeProgram}
                onTouchUpSubscription={this.onContinueWithSubscription}
                title="10 day Intro program"
                description="Purchase for a subscription or continue and check out the exciting bundles and activities that can be unlocked when subscribing to the full Dive Thru account."
              />
              )
              : null
            }
            { this.state.isLearnMoreClicked
              ? (<InfoPopup
                title={this.state.title}
                description={this.state.description}
                onTouchup={this.CloseModal}
              />
                  )
              : null
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
