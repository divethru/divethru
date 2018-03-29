import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage, Modal, Platform, PanResponder, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { playerStyles, buttonStyles, timeButtonStyles, timeButtonClickStyles } from '../../styles/player';
import firebaseApp from '../../components/constant';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import IC_WHITE_INFO from '../../assets/images/ic_info.png';
import IC_WHITE_REMINDER from '../../assets/images/ic_white_reminder.png';
import Dashboard from '../../assets/images/Dashboard_bg.png';
import { colors } from '../../styles/theme';

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
    this.state = {
      loading: true,
      fill: 10,
      slider: 0,
      currentTime: 0,
      isPlaying: false,
      isLoaded: true,
      isTimeDisable: false,
      progress: 0,
      modalVisible: false,
      // angle: this.props.angle,
      bgTimeOne: 'transparent',
      bgTimeTwo: 'transparent',
      bgTimeThree: 'transparent',
      // meditation_audio_time: [],
    };
    this.duration = 0;
    this.audioState = '';
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.rowdata : undefined;
    const bundleName = params ? params.bundleName : undefined;
    const bundleID = params ? params.bundleId : undefined;
    const category = params ? params.category : undefined;

    // let audioTime = [];
    // let audios = [];
    // if (sessionData.meditation_audio_time) {
    //   audioTime = sessionData.meditation_audio_time;
    // }

    // if (sessionData.meditation_audio) {
    //   if (bundleName === '10 Day Program') {
    //     audios = sessionData.meditation_audio[0];
    //   } else {
    //     audios = sessionData.meditation_audio;
    //   }
    // }

    this.setState({
      title: bundleName,
      bundleID,
      category,
      meditation_audio: sessionData.meditation_audio,
      meditation_audio_time: sessionData.meditation_audio_time,
      sessionDesc: sessionData.session_description,
      sessionName: sessionData.session_name,
      session_id: sessionData.session_id,
      sessionImg: sessionData.session_img,
      halted: 0,
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
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

  componentWillUnmount() {
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

  polarToCartesian(angle) {
    const r = this.props.dialRadius;
    const hC = this.props.dialRadius + this.props.btnRadius;
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
    } else {
      return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
    }
  }

  play() {
    this.setState({ isTimeDisable: true });
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

  pause() {
    this.audioState = AudioStatePause;
    if (!this.session) return;
    this.session.pause();
    this.clearTimer();
    this.session.getCurrentTime((seconds) => {
      // AsyncStorage.getItem('user_id').then((value) => {
      //   if (value != null) {
      //     const ref = firebaseApp.database().ref('Users').child(value);
      //     ref.update({ halted: seconds });
      //     this.setState({ halted: seconds });
      //   }
      // }).done();
    });
  }

  stop() {
    this.audioState = AudioStateStop;
    if (!this.session) return;
    this.session.stop();
    this.session.release();
    this.session = null;
    this.clearTimer();
    this.setState({ isPlaying: false });
    this.updateUserDataForPaidCategory();
  }

  playProgress() {
    this.timer = setInterval(() => {
      this.session.getCurrentTime((seconds) => {
        if (this.duration >= seconds && this.audioState === AudioStatePlay) {
          const seek = seconds * (360 / this.session.getDuration());
          this.setState({ progress: seek });
        } else if (this.audioState === AudioStateStop) {
          this.setState({ progress: 0 });
        }
      });
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
    const seek = value * (this.session.getDuration() / 360);
    this.session.setCurrentTime(seek);
    this.audioState = AudioStatePlay;
    this.play();
  }

  changePlayState() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.pause();
    } else {
      if (this.session) {
        if (this.session.isLoaded() === true) {
          if (this.state.isResume === true) {
            this.setState({ modalVisible: true, isResume: false });
          } else {
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

  repeatSession() {
    this.setState({ modalVisible: false, isPlaying: true });
    this.play();
  }

  lastSession = () => {
    this.session.setCurrentTime(this.state.halted);
    const seek = this.state.halted * (360 / this.session.getDuration());
    this.setState({ modalVisible: false, progress: seek, halted: 0.0, isPlaying: true });
    this.play();
  }

  // updateCurrentStreakData() {
  //   const category = this.state.category;
  //   const bundleId = this.state.bundleID;
  //   const sessionId = this.state.session_id;

  //   AsyncStorage.getItem('user_id').then((value) => {
  //     if (value != null) {
  //       const userStreak = {
  //         session: sessionId,
  //       };
  //       const refRemove = firebaseApp.database().ref('Users').child(value).child('currentStreak');
  //       refRemove.remove();
  //       const ref = firebaseApp.database().ref('Users').child(value).child('currentStreak/' + category + '/Bundle/' + bundleId + '/Session/' + sessionId);
  //       ref.set(userStreak);
  //     }
  //   });
  // }

  updateTotalConversationInDB(value) {
    const meditationAudioTime = parseInt(this.state.meditation_audio_time[this.state.index], 10);
    const ref = firebaseApp.database().ref('Users').child(value);
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const totalConversation = dataSnapshot.val().completed_conversation;
        const totalCount = totalConversation + 1;
        const totalTime = dataSnapshot.val().total_time_divethru + meditationAudioTime;
        ref.update({ completed_conversation: totalCount, total_time_divethru: totalTime });
        this.props.navigation.goBack();
      }
    });
  }

  updateUserDataForPaidCategory() {
   // this.updateCurrentStreakData();
    const bundleId = this.state.bundleID;
    const sessionId = this.state.session_id;

    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value).child('streak/' + bundleId + '/Session/' + sessionId);
        const meditationAudioTime = parseInt(this.state.meditation_audio_time[this.state.index], 10);
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
      }
    }).done();
  }

  timeButtonClicked(index) {
    this.setState({ isLoaded: false, isTimeDisable: true });
    this.session = new Sound(this.state.meditation_audio[index], null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        this.session.setCategory('Playback');
        this.setState({ isLoaded: true, isTimeDisable: false });
      }
    });
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
      style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 35, marginBottom: 40, backgroundColor: colors.transparent }}
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
              <Icon onPress={() => { this.changePlayState(); }} name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute' }} />
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
    return (
      <View style={styles.container}>
        <ImageBackground
          // source={Dashboard}
          // backgroundColor={colors.red700}
          source={{ uri: this.state.sessionImg }}
          style={styles.backImage}
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
                <View style={styles.sliderContainer}>
                  {this.renderPlayer()}
                </View>
                <View style={styles.timeContainer}>
                  <View style={styles.timeInnerContainer}>
                    { this.state.meditation_audio_time.map((data, index) => {
                      return (
                        <Button
                          primary
                          title=""
                          text={data + `${'\n'}min`}
                          upperCase={false}
                          disabled={this.state.isTimeDisable}
                          onPress={() => { this.timeButtonClicked(index, this.setState({ index })); }}
                          style={this.state.index === index ? timeButtonClickStyles : timeButtonStyles}
                        />
                      );
                    })
                    }
                    {/* <Button
                      primary
                      title=""
                      text={this.state.meditation_audio_time[0]}
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(1, this.setState({ Title: '3 min' })); }}
                      style={this.state.Title === '3 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    />
                    <Button
                      primary
                      title=""
                      text={this.state.meditation_audio_time[1]}
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(2, this.setState({ Title: '5 min' })); }}
                      style={this.state.Title === '5 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    />
                    <Button
                      primary
                      title=""
                      text={this.state.meditation_audio_time[2]}
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(3, this.setState({ Title: '10 min' })); }}
                      style={this.state.Title === '10 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    /> */}
                  </View>
                </View>
              </View>
            )
            : (
              <View style={styles.playerContainer}>
                <Text style={styles.text}>
                  {this.state.sessionName}
                </Text>
                <View style={styles.sliderContainer}>
                  {this.renderPlayer()}
                  <Icon onPress={() => { this.changePlayState(); }} name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute', alignItems: 'center' }} />
                </View>
                <View style={styles.timeContainer}>
                  <View style={styles.timeInnerContainer}>
                    { this.state.meditation_audio_time.map((data, index) => {
                      return (
                        <Button
                          primary
                          title=""
                          // text={data + ' min'}
                          text={data + `${'\n'}min`}
                          upperCase={false}
                          disabled={this.state.isTimeDisable}
                          onPress={() => { this.timeButtonClicked(index, this.setState({ index })); }}
                          style={this.state.index === index ? timeButtonClickStyles : timeButtonStyles}
                        />
                      );
                    })
                    }
                    {/* <Button
                      primary
                      title=""
                      text="5" // {this.state.meditation_audio_time[0]}
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(1, this.setState({ Title: '3 min' })); }}
                      style={this.state.Title === '3 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    />
                    <Button
                      primary
                      title=""
                      text="6" 
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(2, this.setState({ Title: '5 min' })); }}
                      style={this.state.Title === '5 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    />
                    <Button
                      primary
                      title=""
                      text="7"
                      upperCase={false}
                      onPress={() => { this.timeButtonClicked(3, this.setState({ Title: '10 min' })); }}
                      style={this.state.Title === '10 min' ? timeButtonClickStyles : timeButtonStyles}
                      // style={timeButtonStyles}
                    /> */}
                  </View>
                </View>
              </View>
            )
            }
            { this.state.isLoaded
              ? null
              : (<Text style={[styles.topText, { marginTop: 10 }]}>
                ( L O A D I N G . . . )
                </Text>)
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
      </View>
    );
  }
}

DiveThruPlayerScreen.defaultProps = {
  meterColor: colors.red100,
  textColor: colors.blue100,
  onTouchUp: undefined,
  playState: 'play-arrow',
  btnRadius: 15,
  dialRadius: 60,
  dialWidth: 5,
  textSize: 10,
  value: 0,
  angle: 0,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
};

DiveThruPlayerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  dialWidth: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  onValueChange: PropTypes.func,
  onTouchUp: PropTypes.func,
  // width: PropTypes.number,
  textSize: PropTypes.number,
  // height: PropTypes.number,
  value: PropTypes.number,
  // angle: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  playState: PropTypes.string,
};

export default DiveThruPlayerScreen;
