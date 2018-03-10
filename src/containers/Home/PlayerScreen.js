import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage, Modal, Platform, PanResponder, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { playerStyles, buttonStyles } from '../../styles/player';
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
      currentTime: 0,
      isPlaying: false,
      isLoaded: false,
      progress: 0,
      modalVisible: false,
      // angle: this.props.angle,
    };
    this.duration = 0;
    this.audioState = '';
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;

    this.session = new Sound(sessionData.meditation_audio, null, (e) => {
      if (e) {
        console.log('error loading track:', e);
      } else {
        this.session.setCategory('Playback');
        if (sessionData.halted > 0.0) {
          this.setState({ isLoaded: true, isResume: true });
        } else {
          this.setState({ isLoaded: true });
        }
      }
    });

    this.setState({
      sessionDesc: sessionData.session_description,
      sessionName: sessionData.session_name,
      sessionImg: sessionData.session_img,
      lastConversationId: sessionData.last_conversation_id,
      halted: sessionData.halted,
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
        // this.angle = a;
        // this.props.onValueChange(a);
      },
      // onPanResponderRelease: (e, gs) => {
      //   const xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
      //   const yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
      //   const a = this.cartesianToPolar(gs.moveX, gs.moveY);
      //   alert('callled' + a);
      //   this.props.angle = a;
      //   // this.setState({ angle: a });
      //   this.props.onValueChange(a);
      //   // this.props.angle = a;
      // },
    });
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  onClickOfInformation = () => {
    const sessionData = {
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
    this.props.navigation.state.params.returnData();
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
      AsyncStorage.getItem('user_id').then((value) => {
        if (value != null) {
          const ref = firebaseApp.database().ref('Users').child(value);
          ref.update({ halted: seconds });
          this.setState({ halted: seconds });
        }
      }).done();
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
    this.updateUserDataForFreeProgram();
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
      if (this.session.isLoaded() === true) {
        if(this.state.isResume === true){
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

  updateUserDataForFreeProgram() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.update({ last_free_conversation_id: this.state.lastConversationId + 1, halted: 0.0 });
        this.props.navigation.state.params.returnData();
        this.props.navigation.goBack();
      }
    }).done();
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
    const column = [];

    for (let i = 0; i < this.state.lastConversationId; i++) {
      column.push(
        <View key={i} style={styles.progrssBarFill} />,
      );
    }

    return (
      <View style={styles.container}>
        <ImageBackground
          // source={playerBG}
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
                10 Day Intro Program
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
              // <TouchableOpacity
              //   onPress={() => { this.changePlayState(); }}
              // >
                <View style={styles.playerContainer}>
                  <Text style={styles.text}>
                    {this.state.sessionName}
                  </Text>
                  <View style={styles.sliderContainer}>
                    {this.renderPlayer()}
                  </View>
                  {/* <Text style={[styles.topText, { marginTop: 30 }]}>
                    Tap anywhere to play
                  </Text> */}
                </View>
              // </TouchableOpacity>
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
                {/* <Text style={[styles.topText, { marginTop: 30 }]}>
                  Tap anywhere to play
                </Text> */}
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

PlayerScreen.defaultProps = {
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

PlayerScreen.propTypes = {
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

export default PlayerScreen;
