import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { View, Text, Image, Switch, TextInput, TouchableOpacity, StatusBar, Platform, AsyncStorage, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FCM from 'react-native-fcm';
import { Button } from 'react-native-material-ui';
import DropdownAlert from 'react-native-dropdownalert';
import DatePicker from 'react-native-datepicker';
import RNCalendarEvents from 'react-native-calendar-events';
import firebaseApp from '../../components/constant';
import styles, { buttonStyles } from '../../styles/calenderreminder';
import Spinner from '../../components/Spinner';
import { colors } from '../../styles/theme';
import IC_PREVIOUS from '../../assets/images/ic_previous.png';
import Reminder from '../../assets/images/ic_reminder.png';

class ReminderScreen extends Component {
  static navigationOptions = () => ({
    title: 'R E M I N D E R',
    headerStyle: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 10,
    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: colors.black,
      fontSize: 18,
    },
    headerRight: (<View />),
    headerLeft: (<View />),
    tabBarLabel: 'Reminder',
    tabBarIcon: ({ tintColor }) => <Image source={Reminder} style={{ tintColor }} />,
  });

  constructor() {
    super();
    this.state = {
      SwitchOnValueHolder: false,
      timeText: '00:00 AM',
      dateText: '',
      description: '',
      loading: false,
    };
  }

  componentWillMount() {
    StatusBar.setHidden(false);
  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  onDateChange(date) {
    if (!date) {
      this.setState({
      });
    } else {
      this.setState({
        date,
        dateText: date,
        time: undefined,
        timeText: '00:00 AM',
      });
    }
    this.setState({
      date,
      dateText: date,
      time: undefined,
      timeText: '00:00 AM',
    });
  }

  onTimeChange(time) {
    console.log(`date->${this.state.date}`);
    const currentdate = new Date().toDateString();
    const newdate = currentdate.slice(4);
    const finaldate = [newdate.slice(0, 6), ',', newdate.slice(6)].join('');

    if (!time) {
      this.setState({
      });
    } else {
      let timez;
      if (this.state.date === finaldate) {
        this.Clock = this.GetTime();

        const len = time.slice(0, time.indexOf(':')).length;
        if (len === 1) {
          const newtime = ['0', time.slice(0)].join('');
          console.log(`newtime->${newtime}`);
          timez = newtime;
        }
        if (Moment(time, 'h:mma').isBefore(Moment(this.Clock, 'h:mma')) || time === this.Clock) {
          console.log('in if');
          this.dropdown.alertWithType('error', '', 'Please select valid time!');
          return false;
        }
        this.setState({
          time: timez,
          timeText: timez,
        });
      }
      this.setState({
        time: timez,
        timeText: timez,
      });
    }
    this.setState({ time, timeText: time });
  }

  GetTime() {
    // const date;
    let TimeType;
    let hour;
    let minutes;
    let seconds;

    const date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      TimeType = 'PM';
    }

    if (hour > 12) {
      hour -= 12;
    }

    if (hour === 0) {
      hour = 12;
    }

    minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes.toString()}`;
    }

    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds.toString()}`;
    }
    return `${hour.toString()}:${minutes.toString()} ${TimeType.toString()}`;
  }

  setEventToCalendar(reminderDate) {
    RNCalendarEvents.saveEvent('DiveThru', {
      notes: this.state.description,
      description: this.state.description,
      startDate: reminderDate,
      endDate: reminderDate,
    })
    .then(() => {
      this.dropdown.alertWithType('success', '', `Your reminder is set. You will be notified at ${this.state.time} On ${this.state.date}`);
      this.setState({
        date: undefined,
        time: undefined,
        // timeText: '00:00 AM',
        // dateText: '',
        description: '',
      });
      console.log('success');
    })
    .catch((error) => {
      console.log(`error${error}`);
    });
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value,
    });
  }

  addEventInCalendar() {
    const date = Moment(`${this.state.date} ${this.state.time}`, 'MMM D, YYYY LT').format('YYYY-MM-DDTHH:mm:ssZ');
    const reminderDate = new Date(date);

    RNCalendarEvents.authorizationStatus()
    .then((status) => {
      if (status === 'authorized') {
        this.setEventToCalendar(reminderDate);
      } else if (status === 'undetermined') {
        RNCalendarEvents.authorizeEventStore()
        .then((out) => {
          if (out === 'authorized') {
            this.setEventToCalendar(reminderDate);
          }
        });
      }
    })
    .catch((error) => {
      console.log(`error${error}`);
    });
  }

  onSubmitReminder() {
    if (this.state.date !== undefined && this.state.time !== undefined && this.state.description !== '') {
      FCM.requestPermissions().then(() => {
        this.setState({ loading: true });
        const date = Moment(`${this.state.date} ${this.state.time}`, 'MMM D, YYYY LT').format('YYYY-MM-DDTHH:mm:ssZ');
        const reminderDate = new Date(date);
        const rDate = Moment.utc(reminderDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD HH:mm');

        let userID = '';
        AsyncStorage.getItem('user_id').then((value) => {
          if (value != null) {
            userID = value;
            const data = {
              userId: userID,
              datewithTime: rDate,
              message: this.state.description,
            };
            const ref = firebaseApp.database().ref().child('Reminder').push().key;
            const updates = {};
            updates[`/Reminder/${ref}`] = data;

            firebaseApp.database().ref().update(updates).then(() => {
              this.setState({ loading: false });
              if (this.state.SwitchOnValueHolder === true) {
                this.addEventInCalendar();
              } else {
                this.dropdown.alertWithType('success', '', `Your reminder is set. You will be notified at ${this.state.time} On ${this.state.date}`);
                this.setState({
                  date: undefined,
                  time: undefined,
                  // timeText: '00:00 AM',
                  // dateText: '',
                  description: '',
                });
              }
            })
            .catch(() => {
              this.setState({ loading: false });
            });
          }
        });
      })
      .catch(() => {
        this.dropdown.alertWithType(
          'error',
          '',
          'To set reminder please allow notification from Settings. By enabling notifications, you will receive notifications on your device for all the alerts.',
        );
      });
    } else {
      this.dropdown.alertWithType(
        'error',
        '',
        'To set reminder please fill required fields.',
      );
    }
  }

  render() {
    const width = Dimensions.get('window').width;
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <StatusBar
              hidden={false}
              animated
              barStyle="dark-content"
            />

            <View style={styles.innercontainer}>
              <Text style={styles.textrem}>Remind me to</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textrem}>Dive Thru at </Text>

                <Text style={styles.txtunderline}>{this.state.timeText}</Text>
              </View>

              {this.state.dateText
                ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textrem}>On </Text>

                    <Text style={styles.txtunderline}>{this.state.dateText}</Text>
                  </View>
                  )
                : null
              }
            </View>

            <View style={styles.seperator} />

            <Text style={styles.headtext}>D A T E</Text>

            <View style={{ margin: 10 }}>
              <DatePicker
                ref={(datepicker) => { this.date = datepicker; }}
                date={this.state.date}
                mode="date"
                style={styles.datePickerBox}
                placeholder="Select Date"
                format={'MMM D, YYYY'}
                minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: colors.transparent,
                    borderWidth: 0.0,
                    alignItems: 'flex-start',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: colors.black,
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'flex-start',
                  },
                }}
                onDateChange={(date) => { this.onDateChange(date); }}
              />
            </View>

            <View style={styles.seperatorprev} />

            <View style={{ marginTop: 25 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '90%' }}>
                  <Text style={styles.headtext}>S T A R T  T I M E</Text>

                  <View style={{ margin: 10 }}>
                    <DatePicker
                      ref={(datepicker) => { this.time = datepicker; }}
                      date={this.state.time}
                      mode="time"
                      style={styles.timePickerBox}
                      placeholder="Start Time"
                      format={'LT'}
                      // minDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderColor: colors.transparent,
                          borderWidth: 0.0,
                          alignItems: 'flex-start',
                        },
                        btnTextConfirm: {
                          color: '#7dd3d5',
                          height: 30,
                          marginTop: 30,
                          marginBottom: 20,
                        },
                        btnTextCancel: {
                          color: colors.black,
                          height: 30,
                          marginTop: 30,
                          marginBottom: 20,
                        },
                        dateText: {
                          alignItems: 'flex-start',
                        },
                      }}
                      onDateChange={(time) => { this.onTimeChange(time); }}
                    />
                  </View>
                </View>

                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { }}>
                  <Image
                    style={styles.imageprev}
                    source={IC_PREVIOUS}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.seperator} />

            <Text style={styles.headtext}>D E S C R I P T I O N</Text>

            <View style={{ marginLeft: width > 320 ? 15 : 20 }}>
              <TextInput
                ref={(input) => { this.descInput = input; }}
                style={styles.input}
                placeholder="Set your message here"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                clearButtonMode="while-editing"
                editable
                value={this.state.description}
                onChangeText={(description) => { this.setState({ description }); }}
                blurOnSubmit
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.seperator} />

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.txt}>Put it on my calendar</Text>

              <Switch
                onValueChange={value => this.ShowAlert(value)}
                style={{ justifyContent: 'center' }}
                value={this.state.SwitchOnValueHolder}
              />
            </View>

            <View style={styles.seperator} />

            <Button
              primary
              title=""
              text="S U B M I T"
              onPress={() => { this.onSubmitReminder(); }}
              style={buttonStyles}
            />
          </KeyboardAwareScrollView>

          <DropdownAlert
            updateStatusBar={false}
            ref={(ref) => { this.dropdown = ref; }}
            messageNumOfLines={4}
          />
        </View>
      </Spinner>
    );
  }
}

ReminderScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ReminderScreen;
