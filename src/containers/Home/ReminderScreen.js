import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-material-ui';
import Reminder from '../../assets/images/ic_reminder.png';
import { colors } from '../../styles/theme';
import styles, { buttonStyles, reminderButtonStyles } from '../../styles/reminder';
import walkThroughBg from '../../assets/images/TransperantBG.png';
import walkThroughBg1 from '../../assets/images/reminder_button_1.png';
import walkThroughBg2 from '../../assets/images/reminder_button_2.png';
import walkThroughBg3 from '../../assets/images/reminder_button_3.png';
import walkThroughBg4 from '../../assets/images/reminder_button_4.png';
import walkThroughBg5 from '../../assets/images/reminder_button_5.png';

class ReminderScreen extends Component {
  static navigationOptions = () => ({
    title: 'R E M I N D E R',
    headerStyle: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: colors.black,
    },
    headerRight: (<View />),
    headerLeft: (<View />),
    tabBarLabel: 'Reminder',
    tabBarIcon: ({ tintColor }) => <Image source={Reminder} style={{ tintColor }} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.reminderContainer}>
          <View style={styles.reminderInnerView}>
            <View style={styles.diveReminderContainer}>
              <ImageBackground
                source={walkThroughBg1}
                style={styles.backImage1}
              >
                <Button
                  primary
                  title=""
                  text="Reminders to Dive"
                  onPress={() => { }}
                  style={reminderButtonStyles}
                  upperCase={false}
                />
              </ImageBackground>
            </View>
            <View style={styles.PlayerSubView}>
              <ImageBackground
                source={walkThroughBg2}
                style={styles.secondBlock}
              >
                <Button
                  primary
                  title=""
                  text="Breath Reminder"
                  onPress={() => { }}
                  style={reminderButtonStyles}
                  upperCase={false}
                />
              </ImageBackground>
              <ImageBackground
                source={walkThroughBg3}
                style={styles.thirdBlock}
              >
                <Button
                  primary
                  title=""
                  text="Gratitude List Reminder"
                  onPress={() => { }}
                  style={reminderButtonStyles}
                  upperCase={false}
                />
              </ImageBackground>
            </View>
            <View style={styles.PlayerSubView}>
              <ImageBackground
                source={walkThroughBg4}
                style={styles.forthBlock}
              >
                <Button
                  primary
                  title=""
                  text="Check-in Reminder"
                  onPress={() => { }}
                  style={reminderButtonStyles}
                  upperCase={false}
                />
              </ImageBackground>
              <ImageBackground
                source={walkThroughBg5}
                style={styles.fifthBlock}
              >
                <Button
                  primary
                  title=""
                  text="Complete Dive Reminder"
                  onPress={() => { }}
                  style={reminderButtonStyles}
                  upperCase={false}
                />
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ReminderScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ReminderScreen;
