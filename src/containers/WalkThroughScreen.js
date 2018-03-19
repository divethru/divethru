import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StatusBar, AsyncStorage, Platform } from 'react-native';
import { Button } from 'react-native-material-ui';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import walkThroughBg from '../assets/images/walk_through_bg.png';
import logo from '../assets/images/walk_through_logo.png';
import styles, { buttonStyles } from '../styles/walkThrough';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.local_notification) {
    //this is a local notification
  }
  if (notif.opened_from_tray) {
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  // await someAsyncCall();

  if (Platform.OS === 'ios') {
    if (notif._actionIdentifier === 'com.meditation.divethru') {
      // handle notification action here
      // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
    }
    //optional
    //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
    //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //notif._notificationType is available for iOS platfrom
    switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData); // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All); // other types available: WillPresentNotificationResult.None
        break;
    }
  }
});

FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log(token);
  // fcm token may not be available on first load, catch it here
});

export default class WalkThroughScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  _renderDotIndicator = () => (
    <PagerDotIndicator
      pageCount={5}
      dotStyle={{ backgroundColor: '#1134495e' }}
      selectedDotStyle={{ backgroundColor: '#34495e' }}
    />
  )

  componentDidMount() {
    StatusBar.setHidden(true);
    FCM.requestPermissions().then(() => {
      console.log('granted');
      AsyncStorage.setItem('notification_allow', 'true');
    })
    .catch(() => {
      AsyncStorage.setItem('notification_allow', 'false');
      console.log('notification permission rejected');
    });
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
