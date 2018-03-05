import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-material-ui';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import walkThroughBg from '../assets/images/walk_through_bg.png';
import logo from '../assets/images/walk_through_logo.png';
import styles, { buttonStyles } from '../styles/walkThrough';

export default class WalkThroughScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  _renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={5}
      dotStyle={{ backgroundColor: '#1134495e' }}
      selectedDotStyle={{ backgroundColor: '#34495e' }}
    />
  )

  componentWillMount() {
    StatusBar.setHidden(true);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={walkThroughBg}
          style={styles.backImage}
        />

        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <IndicatorViewPager
          style={styles.pagerContainer}
          indicator={this._renderDotIndicator()}
        >
          <View style={styles.container}>
            <Text style={styles.text}>
              Dive Thru combiness the power
              of guided meditation and
              journaling to help you
              reconnect with yourself.
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>
              Access 100s of conversations
              that will boost your self
              confidence and leave you
              feeling at peace with who you are.
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>
              Dive Thru what you go thru
              and gain the self awareness
              required to move through life
              effortlessly.
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>
              Learn to better handle stressful
              experiences and release what’s
              holding you back.
            </Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>
              It’s time to Dive Thru.
            </Text>
          </View>
        </IndicatorViewPager>

        <View style={styles.bottomContainer}>
          <Button
            primary
            title=""
            text="S I G N  U P"
            onPress={() => { this.props.navigation.navigate('RegistrationScreen') }}
            style={buttonStyles}
          />
          <Button
            primary
            title=""
            text="S I G N  I N"
            onPress={() => { this.props.navigation.navigate('LoginScreen') }}
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
