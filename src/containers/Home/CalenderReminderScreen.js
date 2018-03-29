import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import FCM from 'react-native-fcm';
import { View, Text, Image, Switch, TextInput, TouchableOpacity, StatusBar, Platform, AsyncStorage, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-material-ui';
import DropdownAlert from 'react-native-dropdownalert';
import DatePicker from 'react-native-datepicker';
import RNCalendarEvents from 'react-native-calendar-events';
import firebaseApp from '../../components/constant';
import styles, { buttonStyles } from '../../styles/calenderreminder';
import Spinner from '../../components/Spinner';
import { colors } from '../../styles/theme';
import IC_BACK from '../../assets/images/ic_back.png';
import IC_PREVIOUS from '../../assets/images/ic_previous.png';

class CalenderReminderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft:
  <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
    <Image
      style={{ height: 20, width: 20, margin: 10 }}
      source={IC_BACK}
    />
  </TouchableOpacity>,
    title: 'R E M I N D E R S  T O  D I V E',
    headerStyle: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 5,
    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: colors.grey500,
      fontSize: 12,
    },
    headerRight: (<View />),
    tabBarVisible: false,
  });

  constructor() {
    super();
    this.state = {
      SwitchOnValueHolder: false,
      // time: '00:00 AM',
      // date: new Date(),
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
      });
    }
    this.setState({ date, dateText: date });
  }

  onTimeChange(time) {
    if (!time) {
      this.setState({
      });
    } else {
      this.setState({
        time,
        timeText: time,
      });
    }
    this.setState({ time, timeText: time });
  }

  setEventToCalendar(reminderDate) {
    RNCalendarEvents.saveEvent('DiveThru', {
      notes: this.state.description,
      description: this.state.description,
      startDate: reminderDate,
      endDate: reminderDate,
    })
    .then(id => {
      this.dropdown.alertWithType('success', '', 'Your reminder is set. You will be notified at ' + this.state.time + ' On ' + this.state.date);
      console.log('success');
    })
    .catch((error) => {
      // handle error
      console.log('error' + error);
    });
  }

  ShowAlert = (value) => {
    this.setState({
      SwitchOnValueHolder: value,
    });
  }

  addEventInCalendar() {
    const date = Moment(this.state.date+ " "+this.state.time, "MMM D, YYYY LT").format("YYYY-MM-DDTHH:mm:ssZ")
    const reminderDate = new Date(date);

    RNCalendarEvents.authorizationStatus()
    .then((status) => {
      if (status === 'authorized') {
        this.setEventToCalendar(reminderDate);
      } else if (status === 'undetermined') {
        // if we made it this far, we need to ask the user for access 
        RNCalendarEvents.authorizeEventStore()
        .then((out) => {
          if (out === 'authorized') {
            this.setEventToCalendar(reminderDate);
          }
        });
      }
    })
    .catch((error) => {
      console.log('error' + error);
    });
  }

  onSubmitReminder() {
    if (this.state.date !== undefined && this.state.time !== undefined && this.state.description !== '') {
      FCM.requestPermissions().then(() => {
        this.setState({ loading: true });
        const date = Moment(this.state.date + " " + this.state.time, 'MMM D, YYYY LT').format('YYYY-MM-DDTHH:mm:ssZ');
        const reminderDate = new Date(date);
        const rDate = Moment.utc(reminderDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD HH:mm');
        // const rDate = Moment.utc(reminderDate, "YYYY-MM-DDTHH:mm:ssZ").format()
        // const rd = new Date(rDate);
        // const timestamp = Moment(rd).format("X");

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
      
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/Reminder/' + ref] = data;
      
            firebaseApp.database().ref().update(updates).then((dataSnapshot) => {
              this.setState({ loading: false });
              if (this.state.SwitchOnValueHolder === true) {
                this.addEventInCalendar();
              } else {
                this.dropdown.alertWithType('success', '', 'Your reminder is set. You will be notified at ' + this.state.time + ' On ' + this.state.date );
              }
            })
            .catch((error) => {
              console.log('Error' + JSON.stringify(error));
              this.setState({ loading: false });
            });
          }
        });
      })
      .catch(() => {
        this.dropdown.alertWithType('error', '', 'To set reminder please allow notification from Settings. By enabling notifications, you will receive notifications on your device for all the alerts.');
      });
    }
  }

  render() {
    const width = Dimensions.get('window').width;
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <StatusBar
              backgroundColor="rgba(0, 0, 0, 0.30)"
              animated
              hidden={false}
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
              <Text style={styles.txt}>Put it on my calender</Text>
              <Switch
                onValueChange={(value) => { this.ShowAlert(value); }}
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
          <DropdownAlert ref={(ref) => { this.dropdown = ref; }} />
        </View>
      </Spinner>
    );
  }
}

CalenderReminderScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CalenderReminderScreen;
