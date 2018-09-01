import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PermissionsAndroid, View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage, Modal, Platform, PanResponder, Dimensions, TextInput } from 'react-native';
import Sound from 'react-native-sound';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Button } from 'react-native-material-ui';
import { createIconSetFromFontello } from 'react-native-vector-icons';// font
import { CircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';
import RNFetchBlob from 'react-native-fetch-blob';
import styles, { playerStyles, buttonStyles, timeButtonStyles, timeButtonClickStyles, popupbuttonStyles } from '../../styles/player';
import firebaseApp from '../../components/constant';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import IC_WHITE_INFO from '../../assets/images/ic_info.png';
import IC_WHITE_REMINDER from '../../assets/images/ic_white_reminder.png';
import { colors } from '../../styles/theme';
import fontelloConfig from './../../assets/fonts/config.json'; // font

const CustomIcon = createIconSetFromFontello(fontelloConfig); // font

const AudioStatePlay = 'play';
const AudioStatePause = 'pause';
const AudioStateStop = 'stop';

class DiveThruPlayerScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    console.log(`index->${this.props.navigation.state.params.audioIndex}`);
    this.state = {
      loading: true,
      fill: 10,
      slider: 0,
      currentTime: 0,
      isPlaying: false,
      isLoaded: true,
      isTimeDisable: false,
      isPlayerDisable: true,
      progress: 0,
      modalVisible: false,
      // angle: this.props.angle,
      bgTimeOne: 'transparent',
      bgTimeTwo: 'transparent',
      bgTimeThree: 'transparent',
      // meditation_audio_time: [],
      playermodalvisible: false,
      chatBox: 'As I read what I wrote, I was connected with...',
      index: this.props.navigation.state.params ? this.props.navigation.state.params.audioIndex : 0,
    };
    this.duration = 0;
    this.audioState = '';
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    // console.log('DiveThruPlayerScreen666 rowdata: ' + JSON.stringify(params.rowdata));
    const sessionData = params ? params.rowdata : undefined;
    const bundleName = params ? params.bundleName : undefined;
    const budle = params ? params.budle : undefined;
    const bundleID = params ? params.bundleId : undefined;
    const sessionId = params ? params.sessionId : undefined;
    const category = params ? params.category : undefined;
    const catId = params ? params.catId : undefined;
    const sessionType = params ? params.sessionType : undefined;
    const subcategoryId = params ? params.subcategoryId : undefined;
    const membershipType = params ? params.membershipType : undefined;
    this.setState({
      category_Id: catId,
      title: bundleName,
      budle,
      bundleID,
      category,
      meditation_audio: sessionData.meditation_audio,
      meditation_audio_time: sessionData.meditation_audio_time,
      sessionDesc: sessionData.session_description,
      sessionName: sessionData.session_name,
      session_id: sessionData.session_id,
      sessionImg: sessionData.session_img,
      session_quote_description: sessionData.session_quote_description,
      session_quote_img: sessionData.session_quote_img,
      sessionType,
      subcategoryId,
      sessionId,
      sessionData,
      membershipType,
    });
    // this.state.sessionType = sessionType;
    // this.state.budle = budle;

    this._panResponder = PanResponder.create({
       // eslint-disable-next-line no-unused-vars
      onStartShouldSetPanResponder: (e, gs) => true,
       // eslint-disable-next-line no-unused-vars
      onStartShouldSetPanResponderCapture: (e, gs) => true,
       // eslint-disable-next-line no-unused-vars
      onMoveShouldSetPanResponder: (e, gs) => true,
       // eslint-disable-next-line no-unused-vars
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        const xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
        const yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
        const a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
        this.setState({ progress: a });
        this.sliderValueChange(a);
      },
    });
  }

  componentDidMount() {
    let haltedSessionId = '';
    let halted = '';
    let haltedSlot = '';
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value).child('sessionHalted');
        ref.once('value').then((dataSnapshot) => {
          const sessionHalted = dataSnapshot.val();
          // console.log('HALTED SESSION D PLAYER-->' + JSON.stringify(sessionHalted))
          if (sessionHalted !== undefined && sessionHalted !== null && sessionHalted !== '') {
            Object.keys(sessionHalted).forEach((key) => {
              const data = sessionHalted[key];
              // console.log('data-->' + data.halted);
              // console.log('key' + key);
              if (key === this.state.session_id) {
                haltedSessionId = key;
                halted = data.halted;
                haltedSlot = data.slot;
                this.setState({
                  haltedSessionId,
                  halted,
                  haltedSlot,
                });
              }
            });
          }

          if (this.state.category === 'Deep Dive') {
            console.log(`${this.state.index}->didmount---timeButtonClicked->${this.state.meditation_audio}`);
            this.timeButtonClicked(this.state.index);
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this.stop();
    StatusBar.setHidden(false);
  }

  onClickOfInformation = () => {
    const sessionData = {
      title: this.state.title,
      sessionName: this.state.sessionName,
      sessionDesc: this.state.sessionDesc,
    };
    this.setState({ isPlaying: false });
    this.pause();
    this.props.navigation.navigate('SessionDescription', { sessionData });
  }

  onClickOfCalendar = () => {
    this.props.navigation.navigate('CalenderReminderScreen');
  }

  onClickOfClose = () => {
    this.setState({ isPlaying: false });
    this.pause();
    // this.props.navigation.state.params.returnData();
    this.props.navigation.goBack();
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  getCategoryWiseCurrentStreak() {
    const category = this.state.category;
    // const category = 'Deep Dive';
    const bundleId = this.state.bundleID;
    // const bundleId = '-LBZJN47IWOZfkM14HSK';
    const subcategoryId = this.state.subcategoryId;
    // const subcategoryId = '-L8Cj9NoDisM_ej0g1Ln';
    const sessionId = this.state.session_id;
    // const sessionId = '-L8pVvP8iDIoX1Cy-5to';
    let Streak = '';

    AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null) {
        if (this.state.sessionType === 'Session') {
          const refcat = firebaseApp.database().ref(`/Category/${category}/Session`);
          refcat.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              const arrSessionId = [];
              dataSnapshot.forEach((child) => {
                arrSessionId.push(child.key);
              });
              Streak = arrSessionId.indexOf(sessionId) + 1;
              this.setState({ Streak });
              this.updateCurrentStreakData();
            }
          });
        } else if (this.state.sessionType === 'Bundle') {
          const refcat = firebaseApp.database().ref(`/Category/${category}/Bundle/${bundleId}/Session/`);
          refcat.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              const arrSessionId = [];
              dataSnapshot.forEach((child) => {
                arrSessionId.push(child.key);
              });
              Streak = arrSessionId.indexOf(sessionId) + 1;
              this.setState({ Streak });
              this.updateCurrentStreakData();
            }
          });
        } else if (this.state.sessionType === 'SubCategoryBundle') {
          const refcat = firebaseApp.database().ref(`/Category/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}/Session/`);
          refcat.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              const arrSessionId = [];
              dataSnapshot.forEach((child) => {
                arrSessionId.push(child.key);
              });
              Streak = arrSessionId.indexOf(sessionId) + 1;
              this.setState({ Streak });
              this.updateCurrentStreakData();
            }
          });
        } else if (this.state.sessionType === 'SubCategorySession') {
          const refcat = firebaseApp.database().ref(`/Category/${category}/SubCategory/${subcategoryId}/Session`);
          refcat.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              const arrSessionId = [];
              dataSnapshot.forEach((child) => {
                arrSessionId.push(child.key);
              });
              Streak = arrSessionId.indexOf(sessionId) + 1;
              this.setState({ Streak });
              this.updateCurrentStreakData();
            }
          });
        }
      }
    });
  }

  polarToCartesian = (angle) => {
    const r = this.props.dialRadius;
    const hC = this.props.dialRadius + this.props.btnRadius;
    // eslint-disable-next-line no-mixed-operators
    const a = (angle - 90) * Math.PI / 180.0;

    const x = hC + (r * Math.cos(a));
    const y = hC + (r * Math.sin(a));
    return { x, y };
  }

  cartesianToPolar(x, y) {
    const hC = this.props.dialRadius + this.props.btnRadius;

    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    }
    // eslint-disable-next-line no-mixed-operators
    return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
  }

  closeModal() {
    this.setState({ playermodalvisible: false });
  }

  play() {
    this.setState({ isTimeDisable: true });
    if (this.session !== undefined && this.session !== null) {
      if (this.session && !this.state.isPlaying) {
        this.session.getCurrentTime((seconds) => {
          this.session.setCurrentTime(seconds);
          this.duration = this.session.getDuration();
          this.session.play((success) => {
            if (success) {
              this.stop();
            }
          });
          this.audioState = AudioStatePlay;
          this.playProgress();
        });
      }
    }
  }

  pause() {
    this.audioState = AudioStatePause;
    if (!this.session) return;
    this.session.pause();
    this.clearTimer();
    if (this.session && this.state.isPlaying) {
      this.session.getCurrentTime((seconds) => {
        AsyncStorage.getItem('user_id').then((value) => {
          if (value != null) {
            const sessionId = this.state.session_id;
            const ref = firebaseApp.database().ref('Users').child(value).child(`sessionHalted/${sessionId}`);
            const userHalted = {
              halted: seconds,
              slot: this.state.slot,
            };
            ref.update(userHalted);
            this.setState({ halted: seconds });
          }
        }).done();
      });
    }
  }

  stop() {
    this.audioState = AudioStateStop;
    if (!this.session) return;
    this.session.stop();
    this.session.release();
    this.session = null;
    this.clearTimer();
    this.setState({ isPlaying: false, playermodalvisible: true });
    // this.updateUserDataForPaidCategory();
  }

  playProgress() {
    if (this.session !== undefined && this.session !== null) {
      this.timer = setInterval(() => {
        if (this.session) {
          this.session.getCurrentTime((seconds) => {
            if (this.duration >= seconds && this.audioState === AudioStatePlay) {
              const seek = seconds * (360 / this.session.getDuration());
              this.setState({ progress: seek });
            } else if (this.audioState === AudioStateStop) {
              this.setState({ progress: 0 });
            }
          });
        }
      }, 1000);
    }
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  sliderValueChange(value) {
    if (this.session !== undefined && this.session !== null) {
      this.setState({ progress: value, isPlaying: true });
      if (this.session.getDuration() !== undefined || this.session.getDuration() !== null) {
        const seek = value * (this.session.getDuration() / 360);
        this.session.setCurrentTime(seek);
      }
      this.audioState = AudioStatePlay;
      this.play();
    }
  }

  changePlayState() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.pause();
    } else if (this.session) {
      if (this.session !== undefined && this.session !== null) {
        if (this.session.isLoaded() === true) {
          if (this.state.isResume === true) {
            if (this.state.session_id === this.state.haltedSessionId
              && this.state.slot === this.state.haltedSlot) {
              this.setState({ modalVisible: true, isResume: false });
            }
          } else if (this.state.halted > 0.0 && this.state.slot === this.state.haltedSlot) {
            this.session.setCurrentTime(this.state.halted);
            const seek = this.state.halted * (360 / this.session.getDuration());
            this.setState({ progress: seek, isPlaying: true });
            this.play();
          } else {
            this.setState({ isPlaying: true });
            this.play();
          }
        }
      }
    }
  }

  repeatSession() {
    this.setState({ modalVisible: false, isPlaying: true });
    this.play();
  }

  lastSession = () => {
    // console.log('lastsession-->' + this.state.halted);
    if (this.session !== undefined && this.session !== null) {
      this.session.setCurrentTime(this.state.halted);
      const seek = this.state.halted * (360 / this.session.getDuration());
      // console.log('seek-->' + seek);
      this.setState({ modalVisible: false, progress: seek, halted: 0.0, isPlaying: true });
      this.play();
    }
  }

  updateCurrentStreakData() {
    const category = this.state.category;
    // const category = 'Deep Dive';
    const bundleId = this.state.bundleID;
    // const bundleId = '-L8ns8Mw6vmSjrzPITKt';
    const sessionId = this.state.session_id;
    // const sessionId = '-L8pcM8Y2z-_N9nDx9SW';
    const subcategoryId = this.state.subcategoryId;

    AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null) {
        // console.log('sessionType-->' + this.state.sessionType);
        const userStreak = {
          session: sessionId,
        };
        const Streak = {
          streak: this.state.Streak,
        };
        if (this.state.sessionType === 'Session') {
          const ref = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session`);
          ref.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              let finalSessions = {};
              dataSnapshot.forEach((child) => {
                const LastSessions = child.val();
                const key = child.key;
                const val1 = {
                  session: sessionId,
                };
                finalSessions = {
                  [key]: LastSessions,
                  [sessionId]: val1,
                };
              });
              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session`);
              ref1.update(finalSessions);
            } else {
              const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
              refRemove.remove();

              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session/${sessionId}`);
              ref1.update(userStreak);
            }
          });
        } else if (this.state.sessionType === 'Bundle') {
          // alert('Bundle--->')
          const ref = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle`);
          ref.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              let finalSessions = {};
              dataSnapshot.forEach((child) => {
                if (child.key === bundleId) {
                  if (child.exists) {
                    let LastSessions = {};
                    child.forEach((data) => {
                      LastSessions = data.val();
                      Object.keys(LastSessions).forEach((key) => {
                        let val = [];
                        val = LastSessions[key];
                        const val1 = {
                          session: sessionId,
                        };
                        finalSessions = {
                          [key]: val,
                          [sessionId]: val1,
                        };
                      });
                      const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}`);
                      ref2.update(Streak);

                      const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}/Session/`);
                      ref1.update(finalSessions);
                    });
                  }
                } else {
                  const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
                  refRemove.remove();

                  const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}`);
                  ref2.update(Streak);

                  const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}/Session/${sessionId}`);
                  ref1.update(userStreak);
                }
              });
            } else {
              const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
              refRemove.remove();

              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Bundle/${bundleId}/Session/${sessionId}`);
              ref1.update(userStreak);
            }
          });
        } else if (this.state.sessionType === 'SubCategoryBundle') {
          // alert('SubCategoryBundle--->')
          const ref = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle`);
          ref.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              let finalSessions = {};
              dataSnapshot.forEach((child) => {
                if (child.key === bundleId) {
                  if (child.exists) {
                    let LastSessions = {};
                    child.forEach((data) => {
                      LastSessions = data.val();
                      Object.keys(LastSessions).forEach((key) => {
                        let val = [];
                        val = LastSessions[key];
                        const val1 = {
                          session: sessionId,
                        };
                        finalSessions = {
                          [key]: val,
                          [sessionId]: val1,
                        };
                      });
                      const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}`);
                      ref2.update(Streak);

                      const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}/Session`);
                      ref1.update(finalSessions);
                    });
                  }
                } else {
                  const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
                  refRemove.remove();

                  const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}`);
                  ref2.update(Streak);

                  const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}/Session/${sessionId}`);
                  ref1.update(userStreak);
                }
              });
            } else {
              const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
              refRemove.remove();

              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Bundle/${bundleId}/Session/${sessionId}`);
              ref1.update(userStreak);
            }
          });
        } else if (this.state.sessionType === 'SubCategorySession') {
          // alert('SubCategorySession--->')
          const ref = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory`);
          ref.once('value').then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              let finalSessions = {};
              dataSnapshot.forEach((child) => {
                if (child.key === subcategoryId) {
                  if (child.exists) {
                    let LastSessions = {};
                    child.forEach((data) => {
                      LastSessions = data.val();
                      Object.keys(LastSessions).forEach((key) => {
                        let val = [];
                        val = LastSessions[key];
                        const val1 = {
                          session: sessionId,
                        };
                        finalSessions = {
                          [key]: val,
                          [sessionId]: val1,
                        };
                      });

                      // alert('IF')
                      // alert('IF DATA-->' + JSON.stringify(finalSessions))
                      const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}`);
                      ref2.update(Streak);

                      const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Session/`);
                      ref1.update(finalSessions);
                      // alert('IF DATA UPDATEd-->')
                    });
                  }
                } else {
                  const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
                  refRemove.remove();

                  const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}`);
                  ref2.update(Streak);

                  const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Session/${sessionId}`);
                  ref1.update(userStreak);
                }
              });
            } else {
              // alert('ELSE IF')
              const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
              refRemove.remove();

              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/SubCategory/${subcategoryId}/Session/${sessionId}`);
              ref1.update(userStreak);
            }
          });
        }
        // this.getDataFromCategory();
      }
    });
  }

  saveJournal = () => {
    const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
    const category = this.state.category === '10 Day Intro Program' ? '10 Day' : this.state.category;
    const re = /^[a-zA-Z0-9]{1}/;
    if (this.state.chatBox === 'As I read what I wrote, I was connected with...' || this.state.chatBox === '' || re.test(this.state.chatBox) === false) {
      this.showErrorAlertView('Please write your journal');
    } else {
      AsyncStorage.getItem('user_id').then((value) => {
        const JournalData = {
          journal_text: this.state.chatBox,
          date: CurrentDate,
          category_name: category,
          session_name: this.state.sessionName,
          bundle_name: this.state.budle === undefined ? '' : this.state.budle,
        };
        const ref = firebaseApp.database().ref('Journal').child(value);
        ref.push(JournalData);
        this.updateUserDataForPaidCategory();
      });
      // this.setState({ playermodalvisible: false });
    }
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  updateTotalConversationInDB(value) {
    const meditationAudioTime = parseInt(this.state.meditation_audio_time[this.state.index], 10);
    const ref = firebaseApp.database().ref('Users').child(value);
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const totalConversation = dataSnapshot.val().completed_conversation;
        const totalCount = totalConversation + 1;
        const totalTime = dataSnapshot.val().total_time_divethru + meditationAudioTime;
        ref.update({ completed_conversation: totalCount, total_time_divethru: totalTime });
        // this.props.navigation.state.params.returnData();
        this.props.navigation.navigate('FinishedConversation', {
          quote_image: this.state.session_quote_img,
          quote_desc: this.state.session_quote_description,
          showsubscribe: false,
          onplayer: false,
        });
      }
    });
  }

  updateUserDataForPaidCategory() {
    this.getCategoryWiseCurrentStreak();
    // this.updateCurrentStreakData();
    let bundleId = '';
    // console.log(`cat->${this.state.category_Id}`);
    // console.log(`bundle->${this.state.bundleID}`);
    // console.log(`subcat->${this.state.subcategoryId}`);
    if (this.state.category_Id !== undefined) {
      bundleId = this.state.category_Id;
    } else if (this.state.bundleID !== undefined) {
      bundleId = this.state.bundleID;
    } else {
      bundleId = this.state.subcategoryId;
    }
    const sessionId = this.state.session_id;

    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ playermodalvisible: false });
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value).child(`streak/${bundleId}/Session/${sessionId}`);
        const meditationAudioTime = parseInt(
          this.state.meditation_audio_time[this.state.index], 10,
        );
        ref.once('value').then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const totalVisited = dataSnapshot.val().total_visited;
            const totalCount = totalVisited + 1;
            const totalTime = dataSnapshot.val().total_taken_time + meditationAudioTime;
            ref.update({ total_visited: totalCount, total_taken_time: totalTime });
            this.updateTotalConversationInDB(value);
          } else {
            ref.update({ total_visited: 1, total_taken_time: meditationAudioTime });
            this.updateTotalConversationInDB(value);
          }
        });
        const refRemove = firebaseApp.database().ref('Users').child(value).child(`sessionHalted/${sessionId}`);
        refRemove.remove();
        // const ref1 = firebaseApp.database().ref('Users').child(value).child('sessionHalted/'
        // + sessionId);
        // const userHalted = {
        //   halted: 0.0,
        //   slot: this.state.slot,
        // };
        // ref1.update(userHalted);
      }
    }).done();
  }

  playAudio = (url, tryAgainCount) => {
    console.log('Downloaded: start download: ' + tryAgainCount);
    RNFetchBlob
      .config({
        path: `${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`,
        appendExt: 'mp3',
      })
      .fetch('GET', url, {
        'Cache-Control': 'no-store',
      })
      .progress({ interval: 0.000000001 }, (received, total) => {
        // console.log('Downloaded progress: ' + received + '   ' + total);
      })
      .then((res) => {
        console.log('Downloaded res: ' + JSON.stringify(res));

        console.log("response info from download", res.respInfo.status, url);
        this.setState({ isLoaded: true, isPlayerDisable: false });
        if (res.respInfo.status === 200) {
          this.session = new Sound(res.data, Sound.DocumentDir, (e) => {
            if (e) {
              // alert('failed to load the sound: ' + e);
              console.log('error loading track:', e);
            } else if (this.session !== null || this.session !== undefined) {
              // this.session.setCategory('Playback');
              Sound.setCategory('Playback');
              if (this.state.halted > 0.0 && this.state.slot === this.state.haltedSlot) {
                this.setState({
                  isLoaded: true,
                  isResume: true,
                  isTimeDisable: false,
                  isPlayerDisable: false,
                });
              } else {
                this.setState({ isLoaded: true, isTimeDisable: false, isPlayerDisable: false });
              }
            }
          });
        } else {
            // this is mean its not a 200 response from server, do not link the file to the cache
          RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);
        }
      })
      .catch((e) => {
        console.log('Downloaded error: ' + e.toString());

        if (tryAgainCount < 2) {
          setTimeout(() => {
            tryAgainCount = tryAgainCount + 1;
            this.playAudio(url, tryAgainCount);
          }, 2000);
        } else {
          this.setState({ isLoaded: true });
          RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);

          try {
            if (e.toString().contains('Failed to connect') || e.toString().contains('Unable to resolve host')) {
              alert('Error: The Internet connection appears to be offline.');
            } else {
              alert(e);
            }
          } catch (err) {
            alert(e);
          }
        }
      });
  }

  timeButtonClicked = async (index) => {
    console.log(`${index}...timeButtonClicked: ${JSON.stringify(this.state.meditation_audio)}`);
    this.setState({ isLoaded: false, isTimeDisable: true, slot: index, isPlayerDisable: true });
    // this.session = new Sound(this.state.meditation_audio[index], null, (e) => {
    //   if (e) {
    //     // alert('failed to load the sound: ' + e);
    //     console.log('error loading track:', e);
    //   } else if (this.session !== null || this.session !== undefined) {
    //     // this.session.setCategory('Playback');
    //     Sound.setCategory('Playback');
    //     if (this.state.halted > 0.0 && this.state.slot === this.state.haltedSlot) {
    //       this.setState({ isLoaded: true, isResume: true, isTimeDisable: false, isPlayerDisable: false });
    //     } else {
    //       this.setState({ isLoaded: true, isTimeDisable: false, isPlayerDisable: false });
    //     }
    //   }
    // });

    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
        },
      );
    } catch (err) {
      console.warn(err);
    }

    this.playAudio(this.state.meditation_audio[index], 0);

    // console.log('Downloaded: start download');
    // RNFetchBlob
    //   .config({
    //     path: `${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`,
    //     appendExt: 'mp3',
    //   })
    //   .fetch('GET', this.state.meditation_audio[index], {
    //     'Cache-Control': 'no-store',
    //   })
    //   .progress({ interval: 0.000000001 }, (received, total) => {
    //     // console.log('Downloaded progress: ' + received + '   ' + total);
    //   })
    //   .then((res) => {
    //     console.log('Downloaded res: ' + JSON.stringify(res));

    //     console.log("response info from download", res.respInfo.status, this.state.meditation_audio[index]);
    //     this.setState({ isLoaded: true, isPlayerDisable: false });
    //     if (res.respInfo.status === 200) {
    //       this.session = new Sound(res.data, Sound.DocumentDir, (e) => {
    //         if (e) {
    //           // alert('failed to load the sound: ' + e);
    //           console.log('error loading track:', e);
    //         } else if (this.session !== null || this.session !== undefined) {
    //           // this.session.setCategory('Playback');
    //           Sound.setCategory('Playback');
    //           if (this.state.halted > 0.0 && this.state.slot === this.state.haltedSlot) {
    //             this.setState({
    //               isLoaded: true,
    //               isResume: true,
    //               isTimeDisable: false,
    //               isPlayerDisable: false,
    //             });
    //           } else {
    //             this.setState({ isLoaded: true, isTimeDisable: false, isPlayerDisable: false });
    //           }
    //         }
    //       });
    //     } else {
    //         // this is mean its not a 200 response from server, do not link the file to the cache
    //       RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);
    //     }
    //   })
    //   .catch((e) => {
    //     console.log('Downloaded error: ' + e.toString());
    //     this.setState({ isLoaded: true });
    //     RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);

    //     try {
    //       if (e.toString().contains('Failed to connect')
    //         || e.toString().contains('Unable to resolve host')) {
    //         alert('Error: The Internet connection appears to be offline.');
    //       } else {
    //         alert(e);
    //       }
    //     } catch (err) {
    //       alert(e);
    //     }
    //   });
  }

  renderPlayer() {
    const width = (this.props.dialRadius + this.props.btnRadius) * 2;
    const bR = this.props.btnRadius;
    const dR = this.props.dialRadius;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(this.state.progress);
    let lock = null;
    if (this.state.membershipType !== undefined && this.state.category === 'Quick Dive') {
      if (this.state.sessionData.isSessionAvailable === true && this.state.membershipType === 'Paid') {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.playerIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false ? styles.playerIcon : { color: '#cccccc', position: 'absolute' }}
              />
            )
        );
      } else if (this.state.membershipType === 'Free' && this.state.sessionData.sessionSubscription === true
        && this.state.sessionData.isSessionAvailable === true) {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.playerIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false ? styles.playerIcon : { color: '#cccccc', position: 'absolute' }}
              />
            )
          );
      } else if (this.state.membershipType === 'Free' && this.state.sessionData.isSessionAvailable === true) {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.playerIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false ? styles.playerIcon : { color: '#cccccc', position: 'absolute' }}
              />
            )
        );
      } else {
        lock = (
          <Icon
            onPress={() => { this.changePlayState(); }}
            name={this.state.isPlaying ? 'pause' : 'play-arrow'}
            size={50}
            style={this.state.isPlayerDisable === false
              ? styles.pauseIcon
              : styles.pauseDisableIcon
            }
          />
        );
      }
    }

    return (<Svg
      width={150}
      height={150}
      style={styles.playerSvgBack}
    >
      <Circle
        cx={width / 2}
        cy={width / 2}
        r={dR}
        stroke={colors.white}
        strokeWidth={16}
        fill="none"
        opacity="0.2"
      />
      <Circle
        cx={width / 2}
        cy={width / 2}
        r={52}
        stroke="#eee"
        strokeWidth={0}
        fill={colors.white}
      />
      {Platform.OS === 'ios'
        ? (
          <View style={styles.playerView} >
            {
              this.state.category === 'Quick Dive'
              ?
                lock
              :
                <Icon
                  onPress={() => { this.changePlayState(); }}
                  name={this.state.isPlaying ? 'pause' : 'play-arrow'}
                  size={50}
                  style={this.state.isPlayerDisable === false
                    ? styles.pauseIcon
                    : styles.pauseDisableIcon
                  }
                />
            }
          </View>
        )
        : null}
      <Path
        stroke={colors.white}
        opacity="0.5"
        strokeWidth={16}
        fill="none"
        d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${this.state.progress > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
      />
      <G x={endCoord.x - bR} y={endCoord.y - bR}>
        <Circle
          r={bR}
          cx={bR}
          cy={bR}
          fill={colors.transparent}
          {...this._panResponder.panHandlers}
        />
      </G>
    </Svg>);
  }

  render() {
    let lock = null;
    if (this.state.membershipType !== undefined && this.state.category === 'Quick Dive') {
      if (this.state.sessionData.isSessionAvailable === true && this.state.membershipType === 'Paid') {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.pauseIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false
                  ? styles.playerIcon
                  : styles.pauseDisableIcon
                }
              />
            )
        );
      } else if (this.state.membershipType === 'Free' && this.state.sessionData.sessionSubscription === true
        && this.state.sessionData.isSessionAvailable === true) {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.pauseIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false
                  ? styles.playerIcon
                  : styles.pauseDisableIcon
                }
              />
            )
          );
      } else if (this.state.membershipType === 'Free' && this.state.sessionData.isSessionAvailable === true) {
        lock = (
          this.state.isPlaying
          ?
            <Icon onPress={() => { this.changePlayState(); }} name={'pause'} size={50} style={styles.pauseIcon} />
          :
            (
              <CustomIcon
                onPress={() => { this.changePlayState(); }}
                name="ok" size={26} color="#bf1313"
                style={this.state.isPlayerDisable === false
                  ? styles.playerIcon
                  : styles.pauseDisableIcon
                }
              />
            )
        );
      } else {
        lock = (
          <Icon
            onPress={() => { this.changePlayState(); }}
            name={this.state.isPlaying ? 'pause' : 'play-arrow'}
            size={50}
            style={this.state.isPlayerDisable === false
              ? styles.playerIcon
              : styles.pauseDisableIcon
            }
          />
        );
      }
    }
    const { animationType, supportedOrientation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          // source={Dashboard}
          // backgroundColor={colors.red700}
          source={{ uri: this.state.sessionImg }}
          style={styles.backImage}
          resizeMethod="resize"
        >
          <View style={styles.iconContainer}>
            <View style={styles.iconLeftContainer}>
              <TouchableOpacity onPress={() => { this.onClickOfInformation(); }}>
                <Image
                  style={styles.icon}
                  source={IC_WHITE_INFO}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.onClickOfCalendar(); }}>
                <Image
                  style={styles.icon}
                  source={IC_WHITE_REMINDER}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.centerText}>
              {this.state.title}
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
            {Platform.OS === 'ios'
              ? (
                <View style={styles.playerContainer}>
                  <Text style={styles.text}>
                    {this.state.sessionName}
                  </Text>
                  {(this.state.meditation_audio !== undefined) ?
                    <View pointerEvents={this.state.isPlayerDisable === false ? undefined : 'none'} style={styles.sliderContainer}>
                      {this.renderPlayer()}
                    </View>
                  : null
                  }
                  <View style={styles.timeContainer}>
                    <View style={styles.timeInnerContainer}>
                      {(this.state.meditation_audio !== undefined) ?
                        this.state.meditation_audio.map((data, index) => {
                          return (
                          this.state.meditation_audio_time[index] !== undefined
                          ?
                            <Button
                              primary
                              title=""
                              text={`${this.state.meditation_audio_time[index]}${'\n'}min`}
                              upperCase={false}
                              disabled={this.state.isTimeDisable}
                              onPress={() => {
                                this.timeButtonClicked(index, this.setState({ index }));
                              }}
                              style={
                                this.state.index === index
                                  ? timeButtonClickStyles
                                  : timeButtonStyles
                              }
                            />
                          : null
                          );
                        })
                      : null
                      }
                    </View>
                  </View>

                  {this.state.isLoaded
                    ? null
                    : (<Text style={[styles.topText, { marginTop: 10 }]}>
                      ( L O A D I N G . . . )
                      </Text>)
                  }
                </View>
              )
              : (
                <View style={styles.playerContainer}>
                  <Text style={styles.text}>
                    {this.state.sessionName}
                  </Text>
                  <View pointerEvents={this.state.isPlayerDisable === false ? undefined : 'none'} style={styles.sliderContainer}>
                    {this.renderPlayer()}
                    {
                      this.state.category === 'Quick Dive'
                    ?
                      lock
                    :
                      <Icon
                        onPress={() => { this.changePlayState(); }}
                        name={this.state.isPlaying ? 'pause' : 'play-arrow'}
                        size={50}
                        style={this.state.isPlayerDisable === false
                          ? styles.pauseIcon
                          : styles.pauseDisableIcon
                        }
                      />
                    }
                  </View>
                  <View style={styles.timeContainer}>
                    <View style={styles.timeInnerContainer}>
                      {this.state.meditation_audio.map((data, index) => {
                        return (
                          <Button
                            primary
                            title=""
                            // text={data + ' min'}
                            text={`${this.state.meditation_audio_time[index]}${'\n'}min`}
                            upperCase={false}
                            disabled={this.state.isTimeDisable}
                            onPress={() => {
                              this.timeButtonClicked(index, this.setState({ index }));
                            }}
                            style={this.state.index === index
                              ? timeButtonClickStyles
                              : timeButtonStyles}
                          />
                        );
                      })}
                    </View>
                  </View>

                  {this.state.isLoaded
                    ? null
                    : (<Text style={[styles.topText, { marginTop: 10 }]}>
                      ( L O A D I N G . . . )
                      </Text>)
                  }
                </View>
              )
            }
          </View>
        </ImageBackground>

        <Modal
          animationType="none"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => { }}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={playerStyles.container}>
            <View style={playerStyles.innerContainer}>
              <Button
                primary
                title=""
                text="Continue from last session"
                onPress={() => { this.lastSession(); }}
                style={buttonStyles}
                upperCase={false}
              />
              <Text style={playerStyles.text}>OR</Text>
              <Button
                primary
                title=""
                text="Repeat session from the top"
                onPress={() => { this.repeatSession(); }}
                style={buttonStyles}
                upperCase={false}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType={animationType}
          transparent
          visible={this.state.playermodalvisible}
          onRequestClose={() => { this.closeModal(); }}
          supportedOrientations={supportedOrientation}
          backButtonClose={false}
        >
          <View style={styles.popupcontainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.innerContainer}>
                <Text style={styles.headingtext}>Write your Journal</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    maxLength={500}
                    placeholder="As I read what I wrote, I was connected with..."
                    numberOfLines={3}
                    onChangeText={(e) => { this.setState({ chatBox: e }); }}
                    value={this.state.chatBox}
                    style={styles.textinput}
                    underlineColorAndroid="transparent"
                    autoFocus
                  />
                </View>
                <View style={styles.addJournal}>
                  <Button
                    accent
                    text="A D D  I N  M Y  J O U R N A L"
                    onPress={() => { this.saveJournal(); }}
                    upperCase={false}
                    style={popupbuttonStyles}
                  />
                  <View style={styles.circleView}>
                    <CircularProgress
                      size={26}
                      width={3}
                      rotation={0}
                      fill={((this.state.chatBox.length) * 100) / 500}
                      tintColor="#7dd3d5"
                      backgroundColor="#8a8a8a6e"
                    >
                      {() => (
                        <Text style={{ fontSize: 10, color: '#7dd3d5' }}>
                          {
                            (500 - this.state.chatBox.length) <= 20 ? 500 - this.state.chatBox.length : ''
                          }
                        </Text>
                        )}
                    </CircularProgress>
                  </View>
                </View>
              </View>
              <DropdownAlert
                updateStatusBar={false} ref={(ref) => { this.dropdown = ref; }}
                onClose={data => this.onClose(data)}
              />
            </KeyboardAwareScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

DiveThruPlayerScreen.defaultProps = {
  // meterColor: colors.red100,
  // textColor: colors.blue100,
  // onTouchUp: undefined,
  // playState: 'play-arrow',
  btnRadius: 15,
  dialRadius: 60,
  // dialWidth: 5,
  // textSize: 10,
  // value: 0,
  angle: 0,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
};

DiveThruPlayerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  // dialWidth: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  // onValueChange: PropTypes.func,
  // onTouchUp: PropTypes.func,
  // width: PropTypes.number,
  // textSize: PropTypes.number,
  // height: PropTypes.number,
  // value: PropTypes.number,
  // angle: PropTypes.number,
  // meterColor: PropTypes.string,
  // textColor: PropTypes.string,
  // playState: PropTypes.string,
  animationType: PropTypes.string,
  supportedOrientation: PropTypes.array,
  // transparent: PropTypes.bool,
};

export default DiveThruPlayerScreen;
