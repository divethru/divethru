import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground, Text, TouchableOpacity, TouchableHighlight, AsyncStorage, Platform, PanResponder, Dimensions, StatusBar } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { Button } from 'react-native-material-ui';
import Svg, { Path, Circle, G } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Sound from 'react-native-sound';
import firebaseApp from '../components/constant';
import CircularSlider from '../components/CircularSlider';
import walkThroughBg from '../assets/images/TransperantBG.png';
import walkThroughBg1 from '../assets/images/reminder_button_1.png';
import walkThroughBg2 from '../assets/images/reminder_button_2.png';
import walkThroughBg3 from '../assets/images/reminder_button_3.png';
import walkThroughBg4 from '../assets/images/reminder_button_4.png';
import walkThroughBg5 from '../assets/images/reminder_button_5.png';
import vlogo from '../assets/images/V_Logo.png';
import styles, { buttonStyles, reminderButtonStyles } from '../styles/tutorial';
import { colors } from '../styles/theme';
import IC_WHITE_CLOSE from '../assets/images/ic_white_close.png';

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
    };
    this.duration = 0;
    this.audioState = '';
    this.enable = true;
  }

  componentWillMount() {
    StatusBar.setHidden(true);
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
    this.fetch10DayProgramData();
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  _renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={7}
      dotStyle={{ backgroundColor: '#ffffff', marginBottom: 80, opacity: 0.5 }}
      selectedDotStyle={{ backgroundColor: colors.white, marginBottom: 80 }}
    />
  )

  fetch10DayProgramData() {
    const ref = firebaseApp.database().ref('Category').child('10 Day Intro Program').child('Session');
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        const sessionData = [];
        dataSnapshot.forEach((child) => {
          sessionData.push({
            session_name: child.val().session_name,
            session_img: child.val().session_img,
            session_id: child.val().session_id,
            session_description: child.val().session_description,
            meditation_audio: child.val().meditation_audio[0],
          });
        });
        this.setState({ session: sessionData });
        this.session = new Sound(this.state.session[0].meditation_audio, null, (e) => {
          if (e) {
            console.log('error loading track:', e);
          } else {
            this.session.setCategory('Playback');
            this.setState({ isLoaded: true });
          }
        });
      }
    });
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

  updateUserDataForFreeProgram() {
    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.update({ last_free_conversation_id: 1, halted: 0.0 });
        this.updatePage(6);
      }
    }).done();
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

  updatePage(myPage) {
    if (myPage > 0) {
      this.viewPager.setPage(myPage);
    } else {
      AsyncStorage.setItem('isMarketingLaunched', 'yes');
      this.props.navigation.navigate('TabScreen');
    }
  }

  redirectToDashboardView() {
    this.pause();
    AsyncStorage.setItem('isMarketingLaunched', 'yes');
    this.props.navigation.navigate('TabScreen');
  }

  onPageSelected(e) {
    if (e.position === 6) {
      this.setState({ isPlaying: false });
      this.pause();
    } else if (e.position === 5) {
      this.player.pause();
    }
  }

  changePlayState() {
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
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          ref={viewPager => { this.viewPager = viewPager; }}
          style={styles.pagerContainer}
          onPageSelected={this.onPageSelected.bind(this)}
          indicator={this._renderDotIndicator()}
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

          <View style={styles.container5}>
            <TouchableOpacity onPress={() => { this.updatePage(5); }} style={styles.container5}>
              <ImageBackground
                source={walkThroughBg}
                style={styles.videoBackImage}
              >
                <Text style={styles.videoText}>
                    Here&apos;s everything you{'\n'}
                    need to know:
                </Text>
                <View style={styles.IntroVideoView}>
                  <View style={styles.videoView}>
                    <VideoPlayer
                      endWithThumbnail
                      // thumbnail={{ uri: 'http://www.fsnursing.com/wp-content/uploads/2017/06/guided-meditaiton.jpg' }}
                      video={{ uri: 'http://techslides.com/demos/sample-videos/small.mp4' }}
                      videoWidth={320}
                      videoHeight={230}
                      ref={(r) => { this.player = r; }}
                    />
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { this.updatePage(5); }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View style={styles.container6}>
            <ImageBackground
              source={walkThroughBg}
              style={styles.backImage}
            >
              <View style={{ backgroundColor: colors.transparent, width: '100%', height: '100%' }}>
                <TouchableOpacity
                  style={{ backgroundColor: colors.transparent, width: '100%', height: '100%' }}
                      // style={styles.container6}
                  onPress={() => {
                    this.setState({
                      count: this.state.count,
                    });
                    // this.changePlayState();
                    this.updatePage(6);
                  }}
                >
                  <View>
                    <View style={{ marginTop: '40%' }}>
                      {/* <ImageBackground
                        source={walkThroughBg}
                        style={styles.backImage}
                      > */}
                      <Text style={styles.playerContainerText}>
                        Let&apos;s dive in.
                      </Text>
                      <Text style={styles.playerText}>
                        { this.state.session ? this.state.session[0].session_name : 'Conversation 1'}
                      </Text>

                      { this.state.isLoaded
                          ? null
                          : (<Text style={[styles.loadingext, { marginTop: '70%' }]}>
                            ( L O A D I N G . . . )
                            </Text>)
                        }

                      {/* <View style={styles.PlayerView}>
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
                                <View style={styles.sliderContainer}>
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
                              <View style={styles.sliderContainer}>
                                {this.renderPlayer()}
                                <Icon onPress={() => { this.changePlayState(); }} name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute', alignItems: 'center' }} />
                              </View>
                            </View>
                          )
                        }
                        </View>
                      </View> */}
                      {/* </ImageBackground> */}
                    </View>
                    {/* <View style={{ backgroundColor: colors.yellow100, marginTop: '40%' }}>
                    
                  </View> */}
                    {/* </TouchableOpacity> */}
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
                            <View style={styles.sliderContainer}>
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
                          <View style={styles.sliderContainer}>
                            {this.renderPlayer()}
                            <Icon onPress={() => { this.changePlayState(); }} name={this.state.isPlaying ? 'pause' : 'play-arrow'} size={50} style={{ color: colors.grey700, position: 'absolute', alignItems: 'center' }} />
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

        <TouchableOpacity onPress={() => { this.redirectToDashboardView(); }}>
          <Image
            style={{ height: 20, width: 20, alignSelf: 'flex-end', marginRight: 20, marginTop: 20 }}
            source={IC_WHITE_CLOSE}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Tutorial.defaultProps = {
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

Tutorial.propTypes = {
  navigation: PropTypes.object.isRequired,
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  dialWidth: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  onValueChange: PropTypes.func,
  onTouchUp: PropTypes.func,
  textSize: PropTypes.number,
  value: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  playState: PropTypes.string,
};
