import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground, ListView, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-material-ui';
import Pagination from 'react-native-pagination';
import * as Progress from 'react-native-progress';
import firebaseApp from '../../components/constant';
import InfoPopup from '../../components/InfoPopup';
import PromptedPopup from '../../components/PromptedPopup';
import Spinner from '../../components/Spinner';
import styles, { learnMoreButtonStyles, buttonStyles } from '../../styles/home';
import dashboardBG from '../../assets/images/Dashboard_bg.png';
import dashboardQuotesBG from '../../assets/images/Dashboard_QuotesBG.png';
import subscribeNowBG from '../../assets/images/SubscribeNow_bg.png';
import Home from '../../assets/images/ic_home.png';
import walkThroughBg2 from '../../assets/images/reminder_button_2.png';

const width = Dimensions.get('window').width;

const data = [
  {
    imageUrl: 'http://wallpapercave.com/wp/pwQMS6f.jpg',
    title: 'Breath',
    subTitle: '1 min',
    color: '#66348b',
  },
  {
    imageUrl: 'http://all4desktop.com/data_images/original/4236532-background-images.jpg',
    title: 'Unwind',
    subTitle: '1 min',
    color: '#139e8c',
  },
  {
    imageUrl: 'http://wallpapercave.com/wp/pwQMS6f.jpg',
    title: 'Restore',
    subTitle: '1 min',
    color: '#b679d3',
  },
  {
    imageUrl: 'http://all4desktop.com/data_images/original/4236532-background-images.jpg',
    title: 'Smile',
    subTitle: '1 min',
    color: '#5fb399',
  },
  {
    imageUrl: 'http://wallpapercave.com/wp/pwQMS6f.jpg',
    title: 'Sad',
    subTitle: '1 min',
    color: '#66348b',
  },
  {
    imageUrl: 'http://all4desktop.com/data_images/original/4236532-background-images.jpg',
    title: 'Calm',
    subTitle: '1 min',
    color: '#139e8c',
  },
];

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
      dataSourceForDeepDive: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSourceFor10Day: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSourceForQuickDive: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.fetchUserLastConversationData().then(() => {
      this.fetch10DayProgramData().then(() => {
        this.fetchQuotesData().then(() => {
          this.fetchQuickDiveData().then(() => {
            this.fetchDeepDiveData().then(() => {
              this.setState({ loading: false });
            }).catch(() => { });
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
          });
        });
        const size = 6;
        const items = sessionData.slice(0, size);
        this.setState({
          session: sessionData, dataSourceFor10Day: this.state.dataSourceFor10Day.cloneWithRows(items),
        });
      }
    }).catch(() => { });
  }

  fetchQuickDiveData() {
    const ref = firebaseApp.database().ref('Category').child('Quick Dive');
    return ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const sessionData = [];
        let ArrBundle = [];
        const CategoryName = dataSnapshot.val().category_name;
        const CategoryDescription = dataSnapshot.val().category_description;
        ArrBundle = dataSnapshot.val().Bundle;
        this.setState({
          QuickDiveTitle: CategoryName,
          QuickDiveDescription: CategoryDescription,
        });

        Object.keys(ArrBundle).forEach((key) => {
          const value = ArrBundle[key];
          sessionData.push({
            session_name: value.bundle_name,
            session_img: value.bundle_img,
            session_id: value.bundle_id,
            session_description: value.bundle_description,
          });
        });
        const size = 6;
        const items = sessionData.slice(0, size);
        this.setState({
          dataSourceForQuickDive: this.state.dataSourceForQuickDive.cloneWithRows(items),
        });
      }
    }).catch(() => { });
  }

  fetchDeepDiveData() {
    const ref = firebaseApp.database().ref('Category').child('Deep Dive');
    return ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const sessionData = [];
        let ArrBundle = [];
        const CategoryName = dataSnapshot.val().category_name;
        const CategoryDescription = dataSnapshot.val().category_description;
        ArrBundle = dataSnapshot.val().SubCategory;
        this.setState({
          DeepDiveTitle: CategoryName,
          DeepDiveDescription: CategoryDescription,
        });

        Object.keys(ArrBundle).forEach((key) => {
          const value = ArrBundle[key];
          sessionData.push({
            session_name: value.subcategory_name,
            session_img: value.subcategory_img,
            session_id: value.subcategory_id,
            session_description: value.subcategory_description,
          });
        });
        const size = 6;
        const items = sessionData.slice(0, size);
        this.setState({
          dataSourceForDeepDive: this.state.dataSourceForDeepDive.cloneWithRows(items),
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

  redirectToPlayer() {
    if (this.state.last_conversation_id >= 8) {
      this.clearTimer();
    }
    const lastConversation = this.state.last_conversation_id;
    const session = this.state.session[lastConversation];
    const sessionData = {
      session_name: session.session_name,
      session_img: session.session_img,
      session_id: session.session_id,
      session_description: session.session_description,
      meditation_audio: session.meditation_audio,
      last_conversation_id: this.state.last_conversation_id,
      halted: this.state.halted,
    };
    this.props.navigation.navigate('Player', { returnData: this.fetchUserLastConversationData.bind(this), sessionData });
  }

  onBegin = () => {
    if (this.state.session.length > 0) {
      if (this.state.last_conversation_id >= 8) {
        this.setState({ isPrompted: true });
      } else {
        this.redirectToPlayer();
      }
    }
  }

  CloseModal = () => {
    this.setState({ isLearnMoreClicked: false, DeepDive: false, OpenDive: false, QuickDive: false });
  }

  onContinueWithFreeProgram = () => {
    this.setState({ isPrompted: false }, () => {
      this.timer = setInterval(() => {
        this.redirectToPlayer();
      }, 1000);
      // this.redirectToPlayer();
    });
    // this.setState({ isPrompted: false });
  }

  onContinueWithSubscription = () => {
    this.setState({ isPrompted: false });
  }

  renderProgram(category) {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={[styles.listViewContainer, { backgroundColor: '#139e8c' }]}>
          <ImageBackground
            source={{ uri: category.session_img }}
            style={styles.backImageOfIntroContainer}
          >
            <Text style={styles.listViewText}>{category.session_name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const day = this.state.last_conversation_id + 1;
    const progress = day / 10;
    let title = '';
    let description = '';
    if (this.state.QuickDive === true) {
      title = this.state.QuickDiveTitle;
      description = this.state.QuickDiveDescription;
    } else if (this.state.DeepDive === true) {
      title = this.state.DeepDiveTitle;
      description = this.state.DeepDiveDescription;
    } else if (this.state.OpenDive === true) {
      title = this.state.OpenDiveTitle;
      description = this.state.OpenDiveDescription;
    }

    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.introContainer}>
              <ImageBackground
                source={dashboardBG}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.dayText}>{'Day ' + day + ' of 10'}</Text>
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

            <View style={styles.categoryContainer}>
              <View style={styles.categoryInnerContainer}>
                <Text style={styles.categoryTitle}>Q U I C K  D I V E S</Text>
                <Button
                  accent
                  text="Learn more"
                  onPress={() => { this.setState({ isLearnMoreClicked: true, QuickDive: true }); }}
                  upperCase={false}
                  style={learnMoreButtonStyles}
                />
              </View>

              <View style={styles.diveContainer}>
                <View style={styles.diveInnerContainer}>
                  <ListView
                    horizontal
                    dataSource={this.state.dataSourceForQuickDive}
                    renderRow={category => this.renderProgram(category)}
                    style={styles.listView}
                  />
                </View>
              </View>

              <View style={styles.categoryInnerContainer}>
                <Text style={styles.categoryTitle}>D E E P  D I V E S</Text>
                <Button
                  accent
                  text="Learn more"
                  onPress={() => { this.setState({ isLearnMoreClicked: true, DeepDive: true }); }}
                  upperCase={false}
                  style={learnMoreButtonStyles}
                />
              </View>

              <View style={styles.diveContainer}>
                <View style={styles.diveInnerContainer}>
                  <ListView
                    horizontal
                    dataSource={this.state.dataSourceForDeepDive}
                    renderRow={category => this.renderProgram(category)}
                    style={styles.listView}
                  />
                </View>
              </View>

              <View style={styles.categoryInnerContainer}>
                <Text style={styles.categoryTitle}>O P E N  D I V E S</Text>
                <Button
                  accent
                  text="Learn more"
                  onPress={() => { this.setState({ isLearnMoreClicked: true, OpenDive: true }); }}
                  upperCase={false}
                  style={learnMoreButtonStyles}
                />
              </View>

              <View style={styles.diveContainer}>
                <View style={styles.diveInnerContainer}>
                  <ListView
                    horizontal
                    dataSource={this.state.dataSourceFor10Day}
                    renderRow={category => this.renderProgram(category)}
                    style={styles.listView}
                  />
                </View>
              </View>
            </View>

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
                  onPress={() => { }}
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
                title={title}
                description={description}
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
