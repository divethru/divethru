import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground, Text, TouchableOpacity, AsyncStorage, Platform, PanResponder, Dimensions, StatusBar, Modal, TextInput } from 'react-native';
import Moment from 'moment';
import DropdownAlert from 'react-native-dropdownalert';
import VideoPlayer from 'react-native-video-player';
// import Orientation from 'react-native-orientation';
// import Video from 'react-native-af-video-player';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CircularProgress } from 'react-native-circular-progress';
import { Button } from 'react-native-material-ui';
import Svg, { Path, Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseApp from '../../components/constant';
import walkThroughBg from '../../assets/images/TransperantBG.png';
import styles, { buttonStyles, reminderButtonStyles, popupbuttonStyles } from '../../styles/tutorial';
import { colors } from '../../styles/theme';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import INTRO_IMAGE from '../../assets/images/intro_image.jpg';
import INTRO_IMAGE_PLAY from '../../assets/images/intro_image_play.png';

const AudioStatePlay = 'play';
const AudioStatePause = 'pause';
const AudioStateStop = 'stop';

export default class Tutorial extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      startAngle: Math.PI * (10 / 6),
      angleLength: Math.PI * (7 / 6),
      slider: 0,
      currentTime: 0,
      isPlaying: false,
      isLoaded: false,
      progress: 0,
      playermodalvisible: false,
      chatBox: 'As I read what I wrote, I was connected with...',
      lastConversation: 0,
      fullScreen: false,
      isPlayerDisable: true,
    };
    this.duration = 0;
    this.audioState = '';
    this.enable = true;
  }

  componentWillMount() {
    StatusBar.setHidden(true);
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
    this.fetch10DayProgramData();
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  onFullScreen(status) {
    // if (Platform.OS === 'ios') {
    //   if (status === false) {
    //     Orientation.lockToPortrait();
    //   } else {
    //     Orientation.lockToLandscape();
    //   }
    // } else {
    //   Orientation.lockToPortrait();
    // }
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status,
    });
    this.setState({ fullScreen: status });
  }

  onPageSelected = (e) => {
    // Orientation.lockToPortrait();
    if (e.position !== 5) {
      if (this.state.isPlaying) {
        this.setState({ isPlaying: false });
        this.pause();
      }
    }
    if (e.position !== 4) {
      if (this.player !== undefined && this.player !== null) {
        this.player.pause();
      }
    }
  }

  onClose(data) {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  }

  getCategoryWiseCurrentStreak() {
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
            Streak = 1;
            this.setState({ Streak });
            this.updateCurrentStreakData();
          }
        });
      }
    });
  }

  fetch10DayProgramData() {
    const ref = firebaseApp.database().ref('Category').child('10 Day Intro Program').child('Session');
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const sessionData = [];
        let sessionTime = '';
        let sessionId = '';
        dataSnapshot.forEach((child) => {
          sessionData.push({
            session_name: child.val().session_name,
            session_img: child.val().session_img,
            session_id: child.val().session_id,
            session_description: child.val().session_description,
            meditation_audio: child.val().meditation_audio[0],
            meditation_audio_time: child.val().meditation_audio_time[0],
          });
          sessionTime = sessionData[0].meditation_audio_time;
          sessionId = sessionData[0].session_id;
        });
        this.setState({ session: sessionData, sessionTime, sessionId });
        // console.log('meditation_audio: ' + this.state.session[0].meditation_audio);
        // this.session = new Sound(this.state.session[0].meditation_audio, null, (e) => {
        //   if (e) {
        //     // alert('failed to load the sound: ' + e);
        //     console.log('error loading track:', e);
        //   } else if (this.session !== null || this.session !== undefined) {
        //     console.log('meditation_audio: ELSE IFFF');
        //     Sound.setCategory('Playback');
        //     this.setState({ isLoaded: true, isPlayerDisable: false });
        //   } else {
        //     console.log('meditation_audio: ELSE');
        //   }
        // });

        console.log('Downloaded: start download');
        RNFetchBlob
          .config({
            path: `${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`,
            appendExt: 'mp3',
          })
          .fetch('GET', this.state.session[0].meditation_audio, {
            'Cache-Control': 'no-store',
          })
          .progress({ interval: 0.000000001 }, (received, total) => {
            // console.log('Downloaded progress: ' + received + '   ' + total);
          })
          .then((res) => {
            console.log('Downloaded res: ' + JSON.stringify(res));

            console.log("response info from download", res.respInfo.status, this.state.session[0].meditation_audio);
            this.setState({ isLoaded: true, isPlayerDisable: false });
            if (res.respInfo.status === 200) {
              // eslint-disable-next-line react/no-did-mount-set-state
              this.setState({ isLoaded: false, isPlayerDisable: true });
              console.log('Downloaded start PLAYING');
              this.session = new Sound(res.data, null, (e) => {
                if (e) {
                  // alert('failed to load the sound: ' + e);
                  console.log('error loading track:', e);
                } else if (this.session !== null || this.session !== undefined) {
                  console.log('meditation_audio: ELSE IFFF');
                  Sound.setCategory('Playback');
                  this.setState({ isLoaded: true, isPlayerDisable: false });
                } else {
                  console.log('meditation_audio: ELSE');
                }
              });
            } else {
                // this is mean its not a 200 response from server, do not link the file to the cache
              RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);
            }
          })
          .catch((e) => {
            console.log('Downloaded error: ' + e.toString());
            this.setState({ isLoaded: true });
            RNFetchBlob.fs.unlink(`${RNFetchBlob.fs.dirs.DocumentDir}/abc.mp3`);

            try {
              if (e.toString().contains('Failed to connect')) {
                alert('Error: The Internet connection appears to be offline.');
              } else {
                alert(e);
              }
            } catch (err) {
              alert(e);
            }
          });
      }
    });

    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref1 = firebaseApp.database().ref('Users').child(value);
        ref1.once('value').then((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const lastConversation = convo.last_free_conversation_id;
          this.setState({ lastConversation });
        });
      }
    }).catch(() => { });
  }

  play() {
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

  videoFinished() {
    this.setState({ fullScreen: false });
    // Orientation.lockToPortrait();
    this.viewPager.setPage(5);
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
            const ref = firebaseApp.database().ref('Users').child(value);
            ref.update({ halted: seconds });
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
    this.setState({ isPlaying: false });

    if (this.state.lastConversation > 0) {
      this.setState({ playermodalvisible: false });
    } else {
      this.setState({ playermodalvisible: true });
    }
  }

  updateUserDataForFreeProgram() {
    this.getCategoryWiseCurrentStreak();
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          if (dataSnapshot.exists()) {
            const meditationAudioTime = parseInt(this.state.sessionTime, 10);
            const totalConversation = dataSnapshot.val().completed_conversation;
            const lastConversationId = dataSnapshot.val().last_free_conversation_id;
            const totalTime = dataSnapshot.val().total_time_divethru + meditationAudioTime;
            const totalCount = totalConversation + 1;
            const ref1 = firebaseApp.database().ref('Users').child(value);
            ref1.update({
              last_free_conversation_id: lastConversationId + 1,
              halted: 0.0,
              completed_conversation: totalCount,
              total_time_divethru: totalTime,
            });
            this.updatePage(6);
          }
        });
      }
    }).done();
  }

  _renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={7}
      dotStyle={{ backgroundColor: '#ffffff', marginBottom: 80, opacity: 0.5 }}
      selectedDotStyle={{ backgroundColor: colors.white, marginBottom: 80 }}
    />
  )

  updateCurrentStreakData() {
    const sessionId = this.state.sessionId;
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
      }
    });
  }

  playProgress() {
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

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  sliderValueChange(value) {
    this.setState({ progress: value, isPlaying: true });
    if (this.session && (this.session.getDuration !== null || this.session.getDuration !== undefined)) {
      const seek = value * (this.session.getDuration() / 360);
      this.session.setCurrentTime(seek);
    }
    this.audioState = AudioStatePlay;
    this.play();
  }

  updatePage(myPage) {
    if (myPage > 0) {
      this.viewPager.setPage(myPage);
    } else {
      AsyncStorage.setItem('isMarketingLaunched', 'yes');
      this.props.navigation.navigate('TabScreen');
    }
  }

  redirectToDashboardView() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.pause();
    }
    AsyncStorage.setItem('isMarketingLaunched', 'yes');
    this.props.navigation.navigate('TabScreen');
  }

  changePlayState() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.pause();
    } else if (this.session !== null) {
      if (this.session.isLoaded() !== null || this.session.isLoaded() !== undefined) {
        if (this.session.isLoaded() === true) {
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
    // }
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
    return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
  }

  closeModal() {
    this.setState({ playermodalvisible: false });
  }

  saveJournal = () => {
    const CurrentDate = Moment().format('YYYY-MM-DD HH:mm:ss');
    const category = '10 Day';
    const re = /^[a-zA-Z0-9]{1}/;
    if (this.state.chatBox === 'As I read what I wrote, I was connected with...' || this.state.chatBox === '' || re.test(this.state.chatBox) === false) {
      this.showErrorAlertView('Please write your journal');
    } else {
      AsyncStorage.getItem('user_id').then((value) => {
        const JournalData = {
          journal_text: this.state.chatBox,
          date: CurrentDate,
          category_name: category,
          session_name: this.state.session[0].session_name,
          bundle_name: '',
        };
        const ref = firebaseApp.database().ref('Journal').child(value);
        ref.push(JournalData);
        this.updateUserDataForFreeProgram();
      });
      this.setState({ playermodalvisible: false });
    }
  }

  showErrorAlertView(message) {
    this.dropdown.alertWithType('error', '', message);
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
      style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: colors.transparent }}
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
      { Platform.OS === 'ios'
          ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 70, height: 70, backgroundColor: colors.transparent }} >
              <Icon
                name={this.state.isPlaying ? 'pause' : 'play-arrow'}
                size={50}
                style={this.state.isPlayerDisable === false ? { color: colors.grey700, position: 'absolute' } : { color: '#cccccc', position: 'absolute' }}
              />
            </View>
          )
        : null }
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
    const { animationType, supportedOrientation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          ref={(viewPager) => { this.viewPager = viewPager; }}
          style={styles.pagerContainer}
          onPageSelected={this.onPageSelected}
          indicator={this.state.fullScreen === true ? null : this._renderDotIndicator()}
          horizontalScroll={!this.state.fullScreen === true}
          scrollEnabled={!this.state.fullScreen === true}
        >
          <View style={styles.container1}>
            <TouchableOpacity onPress={() => { this.updatePage(1); }} style={styles.container1}>
              <ImageBackground
                source={walkThroughBg}
                style={styles.backImage}
              >
                <Text style={styles.text}>
                  Congratulations!{'\n'}
                  You are now ready to{'\n'}
                  DIVE THRU
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { this.updatePage(1); }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View style={styles.container2}>
            <TouchableOpacity onPress={() => { this.updatePage(2); }} style={styles.container2}>
              <ImageBackground
                source={walkThroughBg}
                style={styles.backImage}
              >
                <Text style={styles.text}>
                  Dive Thru will help you{'\n'}
                  Dive Thru what you go thru.{'\n'}
                  Here&apos;s How:
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { this.updatePage(2); }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View style={styles.container3}>
            <TouchableOpacity onPress={() => { this.updatePage(3); }} style={styles.container3}>
              <ImageBackground
                source={walkThroughBg}
                style={styles.backImage}
              >
                <Text style={styles.text}>
                  We combine the power of{'\n'}
                  guided meditation with{'\n'}
                  journaling to create{'\n'}
                  CONVERSATIONS{'\n'}
                  that will help you{'\n'}
                  reconnect with yourself.
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { this.updatePage(3); }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View style={styles.container4}>
            <TouchableOpacity onPress={() => { this.updatePage(4); }} style={styles.container4}>
              <ImageBackground
                source={walkThroughBg}
                style={styles.backImage}
              >
                <Text style={styles.text}>
                  Never meditated or journaled?{'\n'}
                  Dive Thru makes it simple.{'\n'}
                  All you need is a quiet space,{'\n'}
                  a journal and time for yourself.
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { this.updatePage(4); }}
                style={buttonStyles}
              />
            </View>
          </View>

          {this.state.fullScreen === true
            ?
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => { this.videoFinished(); }} style={styles.videoPlayerClose}>
                  <Image source={IC_WHITE_CLOSE} style={{ width: 20, height: 20, resizeMode: 'stretch' }} />
                  {/* <Image style={styles.closeButton} source={IC_WHITE_CLOSE} /> */}
                </TouchableOpacity>
                <VideoPlayer
                  endWithThumbnail
                  style={{ width: '100%', height: '100%' }}
                  video={{ uri: 'https://s3-us-west-2.amazonaws.com/divethruweb2/video/Get%2BTo%2BKnow%2BDiveThru.mp4' }}
                  onEnd={() => this.videoFinished()}
                  disableFullscreen
                  // resizeMode="stretch"
                  autoplay
                  ref={(r) => { this.player = r; }}
                />
              </View>
            :
              <View style={styles.container5}>
                <TouchableOpacity onPress={() => { this.updatePage(5); }} style={styles.container5}>
                  <ImageBackground
                    source={walkThroughBg}
                    style={styles.videoBackImage}
                  >
                    <Text style={this.state.fullScreen === false ? styles.videoText : styles.hide}>
                      Here&apos;s everything you{'\n'}
                      need to know:
                    </Text>
                    <ImageBackground source={INTRO_IMAGE} style={styles.thumbilVideoPlayer}>
                      {/* <Image source={INTRO_IMAGE} style={{ height: '100%', width: '100%', resizeMode: 'stretch' }} /> */}
                      <TouchableOpacity onPress={() => this.setState({ fullScreen: true })}>
                        <Image source={INTRO_IMAGE_PLAY} style={{ height: 80, width: 80, resizeMode: 'stretch' }} />
                      </TouchableOpacity>
                    </ImageBackground>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={this.state.fullScreen === false ? styles.bottomContainer : styles.hide}>
                  <Button
                    primary
                    title=""
                    text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                    onPress={() => { this.updatePage(5); }}
                    style={buttonStyles}
                  />
                </View>
              </View>
          }

          <View style={styles.container6}>
            <ImageBackground
              source={walkThroughBg}
              style={styles.backImage}
            >
              <View style={{ backgroundColor: colors.transparent, width: '100%', height: '100%' }}>
                <TouchableOpacity
                  style={{ backgroundColor: colors.transparent, width: '100%', height: '100%' }}
                  onPress={() => {
                    this.setState({
                      count: this.state.count,
                    });
                    this.updatePage(6);
                  }}
                >
                  <View>
                    <View style={{ marginTop: '30%' }}>
                      <Text style={styles.playerContainerText}>
                        Let&apos;s dive in.
                      </Text>

                      <Text style={styles.playerText}>
                        { this.state.session ? this.state.session[0].session_name : 'Conversation 1'}
                      </Text>

                      { this.state.isLoaded
                          ? null
                          : (<Text style={[styles.loadingext, { marginTop: '78%' }]}>
                            ( L O A D I N G . . . )
                            </Text>)
                        }
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.PlayerView}>
                  <View style={styles.VLogoContainer}>
                    { Platform.OS === 'ios'
                      ? (
                        <TouchableOpacity
                          onPress={() => { this.changePlayState(); }}
                        >
                          <View style={styles.playerContainer}>
                            <Text style={styles.text}>
                              {this.state.sessionName}
                            </Text>

                            <View pointerEvents={this.state.isPlayerDisable === false ? undefined : 'none'} style={styles.sliderContainer}>
                              {this.renderPlayer()}
                            </View>
                          </View>
                        </TouchableOpacity>
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
                        </View>
                      )
                    }
                  </View>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <Button
                  primary
                  title=""
                  text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                  onPress={() => { this.updatePage(6); }}
                  style={buttonStyles}
                />
              </View>
            </ImageBackground>
          </View>

          <View style={styles.container7}>
            <ImageBackground
              source={walkThroughBg}
              style={styles.backImage}
            >
              <Button
                primary
                title=""
                text="Start to DiveThru"
                onPress={() => { this.updatePage(0); }}
                style={reminderButtonStyles}
              />
            </ImageBackground>
          </View>
        </IndicatorViewPager>

        <TouchableOpacity
          onPress={() => { this.redirectToDashboardView(); }}
          style={this.state.fullScreen === false ? '' : styles.hide}
        >
          <Image style={styles.closeButton} source={IC_WHITE_CLOSE} />
        </TouchableOpacity>

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
                    placeholder="As I read what I wrote, I was connected with..."
                    numberOfLines={5}
                    onChangeText={(e) => { this.setState({ chatBox: e }); }}
                    value={this.state.chatBox}
                    style={styles.textinput}
                    underlineColorAndroid="transparent"
                    autoFocus
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                  }}
                >
                  <Button
                    accent
                    text="ADD IN MY JOURNAL"
                    onPress={() => { this.saveJournal(); }}
                    upperCase={false}
                    style={popupbuttonStyles}
                  />
                  <View
                    style={{
                      marginTop: 20,
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: Platform.OS === 'ios' ? 50 : 55,
                    }}
                  >
                    <CircularProgress
                      size={20}
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

Tutorial.defaultProps = {
  meterColor: colors.red100,
  textColor: colors.blue100,
  playState: 'play-arrow',
  btnRadius: 15,
  dialRadius: 60,
  angle: 0,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
  animationType: 'none',
  supportedOrientation: ['portrait', 'landscape'],
};

Tutorial.propTypes = {
  navigation: PropTypes.object.isRequired,
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  animationType: PropTypes.string,
  supportedOrientation: PropTypes.array,
};
