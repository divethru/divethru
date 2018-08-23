import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Modal,
  Platform,
  PanResponder,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Sound from 'react-native-sound';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';
import { CircularProgress } from 'react-native-circular-progress';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { playerStyles, buttonStyles, popupbuttonStyles, timeButtonStyles, timeButtonClickStyles } from '../../styles/player';
import firebaseApp from '../../components/constant';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import IC_WHITE_INFO from '../../assets/images/ic_info.png';
import IC_WHITE_REMINDER from '../../assets/images/ic_white_reminder.png';
import { colors } from '../../styles/theme';

const AudioStatePlay = 'play';
const AudioStatePause = 'pause';
const AudioStateStop = 'stop';

class PlayerScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      fill: 10,
      slider: 0,
      isPlaying: false,
      isLoaded: false,
      isTimeDisable: false,
      progress: 0,
      modalVisible: false,
      isPlayerDisable: true,
      playermodalvisible: false,
      chatBox: 'As I read what I wrote, I connected with...',
    };
    this.duration = 0;
    this.audioState = '';
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.rowdata : undefined;
    const title = params.bundleName ? params.bundleName : '10 Day Intro Program';
    const category = params.category ? params.category : '10 Day Intro Program';
    const lastAudioNo = params.lastAudioNo ? params.lastAudioNo : 0;
    const AccesstoCommon = params.AccesstoCommon ? params.AccesstoCommon : undefined;

    this.setState({
      title,
      categoryName: category,
      sessionDesc: sessionData.session_description,
      sessionName: sessionData.session_name,
      session_id: sessionData.session_id,
      sessionImg: sessionData.session_img,
      sessionTime: sessionData.meditation_audio_time,
      sessionAudio: sessionData.meditation_audio,
      lastAudioNo,
      lastConversationId: sessionData.last_conversation_id,
      session_quote_description: sessionData.session_quote_description,
      session_quote_img: sessionData.session_quote_img,
      AccesstoCommon,
    });

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
    if (Object.keys(this.state.sessionAudio).length > 1) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isLoaded: true, isPlayerDisable: true });
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isLoaded: false, isPlayerDisable: true });
      this.session = new Sound(this.state.sessionAudio[0], null, (e) => {
        if (this.session !== null || this.session !== undefined) {
          if (e) {
            console.log('error loading track:', e);
          } else {
            Sound.setCategory('Playback');
            if (this.state.halted > 0.0) {
              this.setState({ isLoaded: true, isResume: true, isPlayerDisable: false });
            } else {
              this.setState({ isLoaded: true, isPlayerDisable: false });
            }
          }
        }
      });
    }

    let haltedSessionId = '';
    let halted = '';
    let haltedSlot = '';
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value).child('sessionHalted');
        ref.once('value').then((dataSnapshot) => {
          const sessionHalted = dataSnapshot.val();
          if (sessionHalted !== undefined && sessionHalted !== null && sessionHalted !== '') {
            Object.keys(sessionHalted).forEach((key) => {
              const data = sessionHalted[key];
              if (key === this.state.session_id) {
                haltedSessionId = key;
                halted = data.halted;
                if (data.slot !== '' && data.slot !== undefined) {
                  haltedSlot = data.slot;
                }
              }
              this.setState({
                halted,
                haltedSessionId,
                haltedSlot,
              });
            });
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

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  onClickOfClose = () => {
    this.setState({ isPlaying: false });
    this.pause();
    this.props.navigation.state.params.returnData();
    this.props.navigation.goBack();
  }

  getCategoryWiseCurrentStreak() {
    const sessionId = this.state.session_id;
    const category = '10 Day Intro Program';
    let Streak = '';
    AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null) {
        const refcat = firebaseApp.database().ref(`/Category/${category}/Session`);
        refcat.once('value').then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const arrSessionId = [];
            dataSnapshot.forEach((child) => {
              arrSessionId.push(child.key);
            });
            Streak = arrSessionId.indexOf(sessionId) + 1;
            this.setState({ Streak });
            // console.log('Streak-->'+ Streak);
            this.updateCurrentStreakData();
          }
        });
      }
    });
  }

  timeButtonClicked(index) {
    this.setState({ isLoaded: false, isTimeDisable: true, slot: index, isPlayerDisable: true });

    this.session = new Sound(this.state.sessionAudio[index], null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.session !== null || this.session !== undefined) {
          Sound.setCategory('Playback');
          if (this.state.halted > 0.0 && this.state.slot === this.state.haltedSlot) {
            this.setState({ isLoaded: true, isResume: true, isPlayerDisable: false });
          } else {
            this.setState({ isLoaded: true, isPlayerDisable: false });
          }
        }
      }
    });
  }

  polarToCartesian(angle) {
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
    return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) + (x > hC ? 90 : 270));
  }

  play() {
    if (this.session !== undefined && this.session !== null) {
      if (this.session && !this.state.isPlaying) {
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
            let userHalted = '';
            const ref = firebaseApp.database().ref('Users').child(value).child(`sessionHalted/${sessionId}`);
            // console.log('slot-->' + this.state.slot);
            if (this.state.slot !== '' && this.state.slot !== undefined) {
              userHalted = {
                halted: seconds,
                slot: this.state.slot,
              };
            } else {
              userHalted = {
                halted: seconds,
              };
            }
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
    this.setState({ isPlaying: false, playermodalvisible: true, isTimeDisable: false });
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
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.session !== null && this.session !== undefined) {
        if (this.session.isLoaded() === true) {
          if (this.state.slot !== '' && this.state.slot !== undefined) {
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
          } else {
          // eslint-disable-next-line no-lonely-if
            if (this.state.isResume === true) {
              if (this.state.session_id === this.state.haltedSessionId) {
                this.setState({ modalVisible: true, isResume: false });
              }
            } else {
            // eslint-disable-next-line no-lonely-if
              if (this.state.halted > 0.0) {
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
    }
  }

  repeatSession() {
    this.setState({ modalVisible: false, isPlaying: true });
    this.play();
  }

  lastSession = () => {
    if (this.session !== undefined && this.session !== null) {
      this.session.setCurrentTime(this.state.halted);
      try {
        const seek = this.state.halted * (360 / this.session.getDuration());
        this.setState({ modalVisible: false, progress: seek, halted: 0.0, isPlaying: true });
      } catch (err) {
        console.log(`DiveThruScreen componentDidMount err: ${err}`);
      }
      this.play();
    }
  }

  updateUserDataForFreeProgram() {
    this.getCategoryWiseCurrentStreak();
    const sessionId = this.state.session_id;
    AsyncStorage.getItem('user_id').then((value) => {
      this.setState({ playermodalvisible: false });
      if (value != null) {
        const meditationAudioTime = parseInt(this.state.sessionTime, 10);
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const totalConversation = dataSnapshot.val().completed_conversation;
            const totalCount = totalConversation + 1;
            const totalTime = dataSnapshot.val().total_time_divethru + meditationAudioTime;
            if (this.state.lastConversationId === 9) {
              ref.update({
                last_free_conversation_id: 0,
                completed_conversation: totalCount,
                total_time_divethru: totalTime,
              });
            } else {
              ref.update({
                last_free_conversation_id: this.state.lastConversationId + 1,
                completed_conversation: totalCount,
                total_time_divethru: totalTime,
              });
            }

            const refRemove = firebaseApp.database().ref('Users').child(value).child(`sessionHalted/${sessionId}`);
            refRemove.remove();
            if (this.state.lastConversationId === 3
              || this.state.lastConversationId === 7
              || this.state.lastConversationId === 9) {
              if (dataSnapshot.val().membership_type === 'Free' && this.state.AccesstoCommon !== 'all') {
                this.props.navigation.navigate('FinishedConversation', {
                  quote_image: this.state.session_quote_img,
                  quote_desc: this.state.session_quote_description,
                  showsubscribe: true,
                  onplayer: true,
                });
              } else {
                this.props.navigation.navigate('FinishedConversation', {
                  quote_image: this.state.session_quote_img,
                  quote_desc: this.state.session_quote_description,
                  showsubscribe: false,
                  onplayer: true,
                });
              }
            } else {
              this.props.navigation.navigate('FinishedConversation', {
                quote_image: this.state.session_quote_img,
                quote_desc: this.state.session_quote_description,
                showsubscribe: false,
                onplayer: true,
              });
            }
          }
        });
      }
    }).done();
  }

  closeModal() {
    this.setState({ playermodalvisible: false });
  }

  saveJournal = () => {
    const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
    const category = this.state.categoryName === '10 Day Intro Program'
      ? '10 Day'
      : this.state.categoryName;
    const re = /^[a-zA-Z0-9]{1}/;
    if (this.state.chatBox === 'As I read what I wrote, I connected with...'
      || this.state.chatBox === ''
      || re.test(this.state.chatBox) === false) {
      this.showErrorAlertView('Please write your journal');
    } else {
      AsyncStorage.getItem('user_id').then((value) => {
        const JournalData = {
          journal_text: this.state.chatBox,
          date: CurrentDate,
          category_name: category,
          session_name: this.state.sessionName,
          bundle_name: '',
        };
        const ref = firebaseApp.database().ref('Journal').child(value);
        ref.push(JournalData);
        this.updateUserDataForFreeProgram();
      });
    }
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
  }

  updateCurrentStreakData() {
    const sessionId = this.state.session_id;
    const category = '10 Day Intro Program';
    AsyncStorage.getItem('user_id').then((value) => {
      if (value !== null) {
        const userStreak = {
          session: sessionId,
        };
        const Streak = {
          streak: this.state.Streak,
        };
        const ref = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session`);
        ref.once('value').then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            if (Object.keys(dataSnapshot.val()).length === 10) {
              const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
              refRemove.remove();

              const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}`);
              ref2.update(Streak);

              const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session/${sessionId}`);
              ref1.update(userStreak);
            } else {
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
            }
          } else {
            const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
            refRemove.remove();

            const ref2 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}`);
            ref2.update(Streak);

            const ref1 = firebaseApp.database().ref('Users').child(value).child(`currentStreak/${category}/Session/${sessionId}`);
            ref1.update(userStreak);
          }
        });
      }
    });
  }

  checkingMethod(value) {
    this.setState({ progress: value });
  }

  renderPlayer() {
    const width = (this.props.dialRadius + this.props.btnRadius) * 2;
    const bR = this.props.btnRadius;
    const dR = this.props.dialRadius;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(this.state.progress);
    return (<Svg
      width={150}
      height={150}
      style={styles.playerSvg}
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
          <View style={styles.iosViewContainer} >
            <Icon
              onPress={() => { this.changePlayState(); }}
              name={this.state.isPlaying ? 'pause' : 'play-arrow'}
              size={50}
              style={this.state.isPlayerDisable === false ? styles.iosViewIcon : styles.iosViewIconEnable}
            />
          </View>
        ) : null
      }

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
    const column = [];
    for (let i = 0; i < this.state.lastConversationId; i++) { // eslint-disable-line no-plusplus
      column.push(
        <View key={i} style={styles.progrssBarFill} />,
      );
    }
    // console.log('time->'+this.state.isTimeDisable);
    const { animationType, supportedOrientation } = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: this.state.sessionImg }}
          style={styles.backImage}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.progrssBarContainer} />
            { column }
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
            <View style={styles.progressBarUnFill} />
          </View>

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

            <View>
              <Text style={styles.topText}>
                {this.state.title}
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
            { Platform.OS === 'ios'
              ? (
                <View style={styles.playerContainer}>
                  <Text style={styles.text}>
                    {this.state.sessionName}
                  </Text>

                  <View pointerEvents={this.state.isPlayerDisable === false ? undefined : 'none'} style={styles.sliderContainer}>
                    {this.renderPlayer()}
                  </View>
                  {
                    (Object.keys(this.state.sessionAudio).length > 1)
                    ?
                      <View style={styles.timeContainer}>
                        <View style={styles.timeInnerContainer}>
                          {this.state.sessionAudio.map((data, index) => {
                            return (
                              <Button
                                primary
                                title=""
                                text={`${this.state.sessionTime[index]}${'\n'}min`}
                                upperCase={false}
                                disabled={this.state.isTimeDisable}
                                onPress={() => {
                                  this.timeButtonClicked(index, this.setState({ index }));
                                }}
                                style={(this.state.index === index)
                                  ? timeButtonClickStyles
                                  : timeButtonStyles
                                }
                              />
                            );
                          })
                          }
                        </View>
                      </View>
                    :
                      null
                  }
                  { this.state.isLoaded
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
                    <Icon
                      onPress={() => { this.changePlayState(); }}
                      name={this.state.isPlaying ? 'pause' : 'play-arrow'}
                      size={50}
                      style={this.state.isPlayerDisable === false ? { color: colors.grey700, position: 'absolute', alignItems: 'center' } : { color: '#cccccc', position: 'absolute', alignItems: 'center' }}
                    />
                  </View>
                  {
                    (Object.keys(this.state.sessionAudio).length > 1)
                    ?
                      <View style={styles.timeContainer}>
                        <View style={styles.timeInnerContainer}>
                          {this.state.sessionAudio.map((data, index) => {
                            return (
                              <Button
                                primary
                                title=""
                                // text={data + ' min'}
                                text={`${this.state.sessionTime[index]}${'\n'}min`}
                                upperCase={false}
                                disabled={this.state.isTimeDisable}
                                onPress={() => {
                                  this.timeButtonClicked(index, this.setState({ index }));
                                }}
                                style={(this.state.index === index)
                                  ? timeButtonClickStyles
                                  : timeButtonStyles
                                }
                              />
                            );
                          })
                          }
                        </View>
                      </View>
                    :
                      null
                  }
                  { this.state.isLoaded
                    ? null
                    : (<Text style={[styles.topText, { marginTop: 20 }]}>
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
        >
          <View style={styles.popupcontainer}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.innerContainer}>
                <Text style={styles.headingtext}>Write your Journal</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    multiline
                    maxLength={500}
                    placeholder="As I read what I wrote, I connected with..."
                    numberOfLines={5}
                    onChangeText={(e) => { this.setState({ chatBox: e }); }}
                    value={this.state.chatBox}
                    style={styles.textinput}
                    underlineColorAndroid="transparent"
                    autoFocus
                  />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Button
                    accent
                    text="A D D  I N  M Y  J O U R N A L"
                    onPress={() => { this.saveJournal(); }}
                    upperCase={false}
                    style={popupbuttonStyles}
                  />
                  <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', height: Platform.OS === 'iosl' ? 50 : 55 }}>
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
                        {/* { Math.round(500 - ((500 * fill) / 100)) } */
                          (500 - this.state.chatBox.length) <= 20 ? 500 - this.state.chatBox.length : ''
                        }
                      </Text>
                      )}
                      </CircularProgress>
                  </View>
                </View>
              </View>
              <DropdownAlert
                updateStatusBar={false}
                ref={(ref) => { this.dropdown = ref; }}
                onClose={data => this.onClose(data)}
              />
            </KeyboardAwareScrollView>

          </View>
        </Modal>
      </View>
    );
  }
}

PlayerScreen.defaultProps = {
  meterColor: colors.red100,
  textColor: colors.blue100,
  playState: 'play-arrow',
  btnRadius: 15,
  dialRadius: 60,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
};

PlayerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  animationType: PropTypes.string.isRequired,
  supportedOrientation: PropTypes.array.isRequired,
};

export default PlayerScreen;
