import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StatusBar, AsyncStorage, ImageBackground } from 'react-native';
import { Button } from 'react-native-material-ui';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import walkThroughBg1 from '../../assets/images/walk_through_bg1.png';
import walkThroughBg2 from '../../assets/images/walk_through_bg2.png';
import walkThroughBg3 from '../../assets/images/walk_through_bg3.png';
import walkThroughBg4 from '../../assets/images/walk_through_bg4.png';
import logo from '../../assets/images/walk_through_logo.png';
import styles, { buttonStyles } from '../../styles/walkThrough';

export default class WalkThroughScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    Text.defaultProps.allowFontScaling = false;
    this.state = {
      token: '',
    };
  }

  componentWillMount() {
    StatusBar.setHidden(false);
    AsyncStorage.getItem('wasAlreadyLoggedIn').then((value) => {
      if (value != null) {
        this.setState({ loginText: 'true' });
      }
    });
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    AsyncStorage.getItem('Logout').then((value) => {
      if (value != null) {
        alert(value);
        AsyncStorage.removeItem('Logout');
        AsyncStorage.removeItem('Reload');
        return false;
      }
    });
  }

  onPageSelected = (e) => {
    if (e.position === 4) {
      // this.props.navigation.navigate('RegistrationScreen');
    }
  }

  renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={4}
      dotStyle={{ backgroundColor: '#fff', marginBottom: 80 }}
      selectedDotStyle={{ backgroundColor: '#7dd3d5', marginBottom: 80 }}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', height: '100%' }}>
        <IndicatorViewPager
          style={styles.pagerContainer}
          onPageSelected={this.onPageSelected}
          indicator={this.renderDotIndicator()}
        >
          <View style={styles.container}>
            <ImageBackground
              source={walkThroughBg2}
              style={styles.backImage}
            >
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>

              <Text style={styles.text}>
                DiveThru helps you live life connected.
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.container}>
            <ImageBackground
              source={walkThroughBg3}
              style={styles.backImage}
            >
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>

              <Text style={styles.text}>
                An introspection app to help you answer life’s questions.
                You know, the questions the internet can’t answer for you.
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.container}>
            <ImageBackground
              source={walkThroughBg1}
              style={styles.backImage}
            >
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>

              <Text style={styles.text}>
                We combine the power of mindfulness with journaling to bring you ‘conversations’
                that help you connect with yourself.
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.container}>
            <ImageBackground
              source={walkThroughBg4}
              style={styles.backImage}
            >
              <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
              </View>
              <Text style={styles.text}>
                Tackle life’s challenges, boost your self-confidence, and feel at home
                within yourself by practicing self-awareness and acceptance.
              </Text>
            </ImageBackground>
          </View>
        </IndicatorViewPager>

        <View style={styles.bottomContainer}>
          <Button
            primary
            title=""
            text="S I G N  U P"
            onPress={() => { this.props.navigation.navigate('RegistrationScreen'); }}
            style={buttonStyles}
          />
          <Button
            primary
            title=""
            text="S I G N  I N"
            onPress={() => { this.props.navigation.navigate('LoginScreen', { loginText: this.state.loginText }); }}
            style={buttonStyles}
          />
        </View>
      </View>
    );
  }
}

WalkThroughScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
