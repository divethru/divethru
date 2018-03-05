import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, ImageBackground, Text, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { Button } from 'react-native-material-ui';
// import AudioPlayer from 'react-native-play-audio';
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
// import { G, Path } from 'react-native-svg';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Sound from 'react-native-sound';
import firebaseApp from '../components/constant';
// react-native-circle-slider
// import CircularSlider from 'react-native-circular-slider';
// import SvgUri from 'react-native-svg-uri';
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
// import SVGDraw from '../components/SVGDraw';
// import svgLogo from '../assets/images/V_Logo.svg';

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
    this.fetch10DayProgramData();
  }

  _renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={7}
      dotStyle={{ backgroundColor: '#ffffff', marginBottom: 80, opacity: 0.5 }}
      selectedDotStyle={{ backgroundColor: colors.white, marginBottom: 80 }}
    />
  )

  fetch10DayProgramData() {
    const ref = firebaseApp.database().ref('Category').child('Open Dive').child('Session');
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
    }, 0);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  sliderValueChange(value) {
    // this.setState({ progress: value, isPlaying: true });
    // const seek = value * (this.session.getDuration() / 360);
    // // alert(seek);
    // this.session.setCurrentTime(seek);
    // this.audioState = AudioStatePlay;
    // this.play();
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
          this.setState({ progress: seek });
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
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Image
          source={walkThroughBg}
          style={styles.backImage}
        /> */}

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
                onPress={() => { }}
                style={buttonStyles}
              />
            </View>
            {/* <SVGDraw /> */}
            {/* <SvgUri width="150" height="150" source={svgLogo} /> */}
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
                onPress={() => { }}
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
                onPress={() => { }}
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
                onPress={() => { }}
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
                onPress={() => { }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View >
            <TouchableHighlight
              style={styles.clearContainer}
              onPress={() => {
                this.setState({
                  count: this.state.count,
                });
                this.changePlayState();
              }}
            >
              <View style={styles.container6}>
                <ImageBackground
                  source={walkThroughBg}
                  style={styles.backImage}
                >
                  <Text style={styles.playerContainerText}>
                    Let&apos;s dive in.
                  </Text>
                  <Text style={styles.playerText}>
                    { this.state.session ? this.state.session[0].session_name : 'Conversation 1'}
                  </Text>
                  <View style={styles.PlayerView}>
                    <View style={styles.VLogoContainer}>
                      <CircularSlider
                        width={120}
                        height={120}
                        meterColor={colors.white}
                        value={this.state.progress}
                        playState={this.state.isPlaying ? 'pause' : 'play-arrow'}
                        onValueChange={(value) => { this.sliderValueChange(value); }}
                      />
                    </View>
                  </View>
                  { this.state.isLoaded
                    ? null
                    : (<Text style={[styles.loadingext, { marginTop: 10 }]}>
                      ( L O A D I N G . . . )
                      </Text>)
                  }
                </ImageBackground>
              </View>
            </TouchableHighlight>
            <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  P L A Y"
                onPress={() => { }}
                style={buttonStyles}
              />
            </View>
          </View>

          <View style={styles.container7}>
            {/* <TouchableOpacity onPress={() => { this.updatePage(0); }} style={styles.container7}> */}
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
            {/* </TouchableOpacity> */}
            {/* <View style={styles.bottomContainer}>
              <Button
                primary
                title=""
                text="T A P  A N Y W H E R E  T O  C O N T I N U E"
                onPress={() => { }}
                style={buttonStyles}
              />
            </View> */}
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

Tutorial.propTypes = {
  navigation: PropTypes.object.isRequired,
};
