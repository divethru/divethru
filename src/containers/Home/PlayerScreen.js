import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, AsyncStorage, Modal, Platform, PanResponder, Dimensions } from 'react-native';
import Sound from 'react-native-sound';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Button } from 'react-native-material-ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import RNAudioStreamer from 'react-native-audio-streamer';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles, { playerStyles, buttonStyles } from '../../styles/player';
import firebaseApp from '../../components/constant';
import playerBG from '../../assets/images/SessionPlayerBG.png';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';
import IC_WHITE_INFO from '../../assets/images/ic_info.png';
import IC_WHITE_REMINDER from '../../assets/images/ic_white_reminder.png';
import vlogo from '../../assets/images/V_Logo.png';
import CircularSlider from '../../components/CircularSlider';
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
    const { width, height } = props;
    const smallestSide = (Math.min(width, height));
    this.state = {
      loading: false,
      fill: 10,
      slider: 0,
      // count: 1,
      currentTime: 0,
      isPlaying: false,
      isLoaded: false,
      progress: 0,
      modalVisible: false,
      cx: (width / 2) + 15,
      cy: (height / 2) + 15,
      r: (smallestSide / 2) * 0.85,

      c1x: width / 2,
      c1y: height / 2,
      r1: (smallestSide / 2) * 0.76,
      angle: this.props.angle,
    };
    this.duration = 0;
    this.audioState = '';
    // this.enable = true;
    // this.session = new Sound(' ');
    // this.session = new Sound('http://www.buddhanet.net/filelib/mp3/mental.mp3');
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;
    // this.session = new Sound(sessionData.meditation_audio);
    // RNAudioStreamer.setUrl('http://34.215.40.163/Admin/uploads/meditation/DAY%20-%2001.mp3');
    // RNAudioStreamer.status((err, status) => {
    //   if (!err) console.log(status);
    //   alert(status);
    // });
      // this.session.setCategory('Playback');
        // if (sessionData.halted > 0.0) {
        //   this.setState({ isLoaded: true, isInfoEnable: true });
        // } else {
        //   this.setState({ isLoaded: true });
        // }
        // 'https://d3jyalop6jpmn2.cloudfront.net/private/encoded/pack_brave_regret_s1_10m_en_170627__1502058983114_vbr_1ch_high_quality_mp3.mp3?Expires=1520231269&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kM2p5YWxvcDZqcG1uMi5jbG91ZGZyb250Lm5ldC9wcml2YXRlL2VuY29kZWQvcGFja19icmF2ZV9yZWdyZXRfczFfMTBtX2VuXzE3MDYyN19fMTUwMjA1ODk4MzExNF92YnJfMWNoX2hpZ2hfcXVhbGl0eV9tcDMubXAzIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNTIwMjMxMjY5fX19XX0_&Signature=qGEoa0Gb~D7QRIJoFTuUDw~tTlWqtESN19vPk9Ieo8tYFU26u0yQQcBBXhpLoZCJ2E1KwFRKMxSibVdQK3GiTi88n-uc-EdG10gN9gmU3Am136zJGpMHL-Egxi2AuqfNaZ2XNYAAA2rIPXsguQQ3uTDEnHG1clbRE7edcMSUExyb~NOe25ZkxRzfQt9GyVE49AWICeoj4cFFSB83a-yAqHpWWn5ikbHubib2C7qcjOqMiHeFRtrCTBg6-zicyMcrauM3ng7VrzKfQDb24hnZCgZ5~KsZSuwJ4l3JcM5QT7z5xbJYUYEQYpb4G5vnQOQgY2BkVlJgvSrytb538hXfvA__&Key-Pair-Id=APKAJ2I2NJLNDMXV3PZA
      
    this.session = new Sound(sessionData.meditation_audio, null, (e) => {
      alert(JSON.stringify(this.session));
      if (e) {
        console.log('error loading track:', e);
      } else {
        this.session.setCategory('Playback');
        if (sessionData.halted > 0.0) {
          this.setState({ isLoaded: true, modalVisible: true, isInfoEnable: true });
        } else {
          this.setState({ isLoaded: true });
        }
      }
    });

    this.setState({
      // session: new Sound(sessionData.meditaion_audio),
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
    if (this.state.isInfoEnable) {
      const sessionData = {
        sessionName: this.state.sessionName,
        sessionDesc: this.state.sessionDesc,
      };
      this.setState({ isPlaying: false });
      this.pause();
      this.props.navigation.navigate('SessionDescription', { sessionData });
    }
  }

  onClickOfClose = () => {
    this.setState({ isPlaying: false });
    this.pause();
    this.props.navigation.state.params.returnData();
    this.props.navigation.goBack();
  }

  polarToCartesian(angle) {
    let r = this.props.dialRadius;
    let hC = this.props.dialRadius + this.props.btnRadius;
    let a = (angle - 90) * Math.PI / 180.0;

    let x = hC + (r * Math.cos(a));
    let y = hC + (r * Math.sin(a));
    return {x, y};
  }

  cartesianToPolar(x, y) {
    let hC = this.props.dialRadius + this.props.btnRadius;

    if (x === 0) {
      return y>hC ? 0 : 180;
    }
    else if (y === 0) {
      return x>hC ? 90 : 270;
    }
    else {
      return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
    }
  }

  play() {
    if (this.session && !this.state.isPlaying) {
      this.session.getCurrentTime((seconds) => {
        this.session.setCurrentTime(seconds);
        this.duration = this.session.getDuration();
        // this.session.play();
        this.session.play((success) => {
          if (success) {
            this.stop();
          }
        });
        this.audioState = AudioStatePlay;
        this.playProgress();
      });
      // return;
    }
  }

  pause() {
    this.audioState = AudioStatePause;
    if (!this.session) return;
    this.session.pause();
    this.clearTimer();
    this.session.getCurrentTime((seconds) => {
      console.log('HAULT' + seconds);
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

  test = (seek) => {
    this.setState({ progress: seek });
  }

  playProgress() {
    this.timer = setInterval(() => {
      this.session.getCurrentTime((seconds) => {
        if (this.duration >= seconds && this.audioState === AudioStatePlay) {
          const seek = seconds * (360 / this.session.getDuration());
          // this.test(seek);
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
    // this.whoosh.play();
    // this.session.play((success) => {
    //   // alert(success);
    //   if (success) {
    //     // this.setState({ isPlaying: false });
    //     this.stop();
    //   }
    // });
    // this.playProgress();
  }

  changePlayState() {
    // if (!this.enable) return;
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false });
      this.pause();
    } else {
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
    // this.enable = false;
    // setTimeout(() => {
    //   this.enable = true;
    // }, 500);
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
    let width = (this.props.dialRadius + this.props.btnRadius) * 2;
    let bR = this.props.btnRadius;
    let dR = this.props.dialRadius;
    let startCoord = this.polarToCartesian(0);
    let endCoord = this.polarToCartesian(this.state.progress);
    return (<Svg
        // onLayout={this.onLayout}
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
               <Icon name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute' }} />
             </View>
            )
          : null }
        <Path
          stroke={colors.white}
          opacity="0.5"
          strokeWidth={16}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${this.state.progress > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
          // d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
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
        {/* <G
          x={endCoord.x - 6.5}
          y={endCoord.y - 6.5}
        >
          <Circle
            cx={6.5}
            cy={6.5}
            r={15}
            fill={colors.transparent}
            {...this._panResponder.panHandlers}
            // onTouchUp={() => { this.props.onTouchUp(); }}
          />
        </G> */}
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
              <TouchableOpacity onPress={() => { }}>
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
              <TouchableOpacity
                onPress={() => { this.changePlayState(); }}
              >
                <View style={styles.playerContainer}>
                  <Text style={styles.text}>
                    {this.state.sessionName}
                  </Text>
                  {/* <ImageBackground
                    source={vlogo}
                    style={styles.VLogo}
                  /> */}
                  <View style={styles.sliderContainer}>
                    {this.renderPlayer()}
                    {/* <CircularSlider
                      width={120}
                      height={120}
                      meterColor={colors.white}
                      value={this.state.progress}
                      playState={this.state.isPlaying ? 'pause' : 'play-arrow'}
                      onValueChange={(value) => { this.sliderValueChange(value); }}
                      // onTouchUp={() => { this.changePlayState(); }}
                    /> */}
                  </View>
                  <Text style={[styles.topText, { marginTop: 30 }]}>
                    Tap anywhere to play
                  </Text>
                </View>
              </TouchableOpacity>
            )
            : (
              // <TouchableOpacity
              //   onPress={() => { this.changePlayState(); }}
              // >
              <View style={styles.playerContainer}>
                <Text style={styles.text}>
                  {this.state.sessionName}
                </Text>
                <View style={styles.sliderContainer}>
                  {/* <CircularSlider
                    width={120}
                    height={120}
                    meterColor={colors.white}
                    value={this.state.progress}
                    playState={this.state.isPlaying ? 'pause' : 'play-arrow'}
                    onValueChange={(value) => { this.sliderValueChange(value); }}
                  /> */}
                  {this.renderPlayer()}
                  <Icon onPress={() => { this.changePlayState(); }} name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute', alignItems: 'center' }} />
                </View>
                <Text style={[styles.topText, { marginTop: 30 }]}>
                  Tap anywhere to play
                </Text>
              </View>
              // </TouchableOpacity>
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
  // width: 120,
  // height: 120,
  // value: 0,
  meterColor: colors.red100,
  textColor: colors.blue100,
  // onValueChange: undefined,
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
  // onValueChange: x => x,
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
  width: PropTypes.number,
  textSize: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.number,
  angle: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  playState: PropTypes.string,
};

export default PlayerScreen;
