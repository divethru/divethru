import React, { Component } from 'react';
import { Modal, ImageBackground, Linking, Platform, AsyncStorage, View, Image, PermissionsAndroid, ScrollView, TouchableOpacity, ActivityIndicator, Text, Alert, StatusBar, FlatList } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
import Share, { ShareSheet, Button } from 'react-native-share';
import { Button as Butom, colors } from 'react-native-material-ui';
// import { validateReceiptAndroid } from 'react-native-iap';
import SmsAndroid from 'react-native-sms-android';
import { CheckBox } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';
import Contacts from 'react-native-contacts';
import * as SendSMS from 'react-native-sms';
import TextfieldPopup from '../../components/TextfieldPopup';
import firebaseApp from '../../components/constant';
import backgroundImages from '../../assets/images/SessionPlayerBG.png';
import stylesOfModel, { nextButtonStyles } from '../../styles/profile';
import styles from '../../styles/invite';
import IC_BACK from '../../assets/images/ic_back.png';
// import plus from '../../assets/images/ic_close.png';
import plus from '../../assets/images/ic_plus.png';
import down from '../../assets/images/ic_down.png';
import Profile from '../../assets/images/ic_profile.png';
import IC_WHITE_CLOSE from '../../assets/images/ic_white_close.png';

const FBSDK = require('react-native-fbsdk');

const {
  MessageDialog, AccessToken, LoginManager,
} = FBSDK;

class InviteScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => <Image source={Profile} style={{ tintColor }} />,
    headerLeft: (
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Image
          style={{ height: 20, width: 20, margin: 10 }}
          source={IC_BACK}
        />
      </TouchableOpacity>
    ),
    title: 'D I V E  W I T H  F R I E N D S',
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0.3,
      borderBottomColor: 'grey',
    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: 'grey',
      fontSize: 14,
      fontWeight: '300',
    },
    headerRight: (<View />),
    tabBarVisible: false,
  })

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      shareVisible: false,
      checked: false,
      checkedItem: [],
      preSelected: [],
      newList: [],
      itemDisplayToModel: [],
      emailListDisplay: false,
      googleListDisplay: false,
      phoneListDisplay: false,
      personalizedModal: false,
      facebookListDisplay: false,
      contacts: [],
      loader: false,
      clicked: false,
    };
  }

  componentWillMount = () => {
    StatusBar.setHidden(false);
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      iosClientId: '5071479695-r7nemrqv9msoh45ebdc0vrif39ghoivl.apps.googleusercontent.com',
    });
    AsyncStorage.getItem('full_name').then((value1) => {
      this.setState({ profileName: value1 });
    });
  }

  getInvitedContacts = (type) => {
    AsyncStorage.getItem('user_id').then((userId) => {
      firebaseApp.database().ref(`/Users/${userId}/Invitations/${type}`)
        .on('value', (snapshot) => {
          if (snapshot.exists()) {
            if (type === 'phone') {
              const newData = [];
              Object.keys(snapshot.val()).map((key) => {
                newData.push({ phone: key, status: snapshot.val()[key] });
              });
              this.setState({ preSelected: Object.keys(snapshot.val()), newList: newData });
            } else {
              const newData = [];
              Object.keys(snapshot.val()).map((key) => {
                newData.push({ email: key.replace(/\*/g, '.'), status: snapshot.val()[key] });
              });
              this.setState({ preSelected: Object.keys(snapshot.val()), newList: newData });
            }
          }
        })
        .catch((error) => {
          // this.setState({ loader: false });
          console.log(error);
        });
    });
  }

  requestContactsPermission = async () => {
    this.setState({ loader: true });
    if (Platform.OS === 'ios') {
      Contacts.getAll((err, contacts) => {
        if (err && err.type === 'permissionDenied') {
          this.setState({ loader: false });
          alert('Contact permission is denied');
        } else {
          const Newcontacts = [];
          for (let i = 0; i < contacts.length; i += 1) {
            for (let j = 0; j < contacts[i].phoneNumbers.length; j += 1) {
              Newcontacts.push(`${contacts[i].givenName}\n${contacts[i].phoneNumbers[j].number}`);
            }
          }
          this.setState({
            contacts: Newcontacts,
            personalizedModal: true,
            loader: false });
        }
      });
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (PermissionsAndroid.RESULTS.GRANTED === granted) {
          Contacts.getAll((err, contacts) => {
            if (err && err.type === 'permissionDenied') {
              alert('Contact permission is denied');
              this.setState({ loader: false });
            } else {
              const Newcontacts = [];
              for (let i = 0; i < contacts.length; i += 1) {
                for (let j = 0; j < contacts[i].phoneNumbers.length; j += 1) {
                  Newcontacts.push(`${contacts[i].givenName}\n${contacts[i].phoneNumbers[j].number}`);
                }
              }
              this.setState({ contacts: Newcontacts, personalizedModal: true, loader: false });
            }
          });
        } else {
          this.setState({ loader: false });
          if (Platform.Version < 23) {
            Contacts.getAll((err, contacts) => {
              if (err && err.type === 'permissionDenied') {
                alert('Contact permission is denied');
                this.setState({ loader: false });
              } else {
                const Newcontacts = [];
                for (let i = 0; i < contacts.length; i += 1) {
                  for (let j = 0; j < contacts[i].phoneNumbers.length; j += 1) {
                    Newcontacts.push(`${contacts[i].givenName}\n${contacts[i].phoneNumbers[j].number}`);
                  }
                }
                this.setState({ contacts: Newcontacts, personalizedModal: true, loader: false });
              }
            });
          } else {
            alert('Contact permission denied');
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  async closePersonalizedModal(type) {
    // this.setState({ loader: true });
    const checkedItem = [];
    for (let i = 0; i < this.state.checkedItem.length; i += 1) {
      checkedItem.push(this.state.checkedItem[i].value);
    }
    if (checkedItem.length < 1) {
      Alert.alert(
        'Alert',
        'Select at least one contact.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true },
      );
    } else {
      this.setState({ personalizedModal: false });
      this.setState({ loader: true });
      const sendContacts = [];
      const onlyNumberArray = [];
      if (type !== 'phone') {
        for (let i = 0; i < checkedItem.length; i += 1) {
          sendContacts.push(checkedItem[i].replace(/\./g, '*'));
        }
      } else {
        for (let i = 0; i < checkedItem.length; i += 1) {
          sendContacts.push(checkedItem[i]);
          onlyNumberArray.push(checkedItem[i].substring(checkedItem[i].indexOf('\n') + 1));
        }
      }
      const tags = checkedItem.toString();
      AsyncStorage.getItem('full_name').then((fullname) => {
        AsyncStorage.getItem('user_id').then((value) => {
          if (type === 'phone') {
            const body = `${fullname} invites you to DiveThru.\nhttp://test.divethru.com//registration.php?referby=${value}`;
            if (Platform.OS === 'ios') {
              SendSMS.send({
                body,
                recipients: onlyNumberArray,
                successTypes: ['sent', 'queued'],
              }, (completed, cancelled, error) => {
                console.log(`SMS Callback: completed: ${completed} cancelled: ${cancelled }error: ${error}`);
                this.setState({ loader: false });
                if (completed === true) {
                  for (let i = 0; i < sendContacts.length; i += 1) {
                    const newContact = sendContacts[i];
                    const newNumber = newContact.substring(newContact.indexOf('\n') + 1);
                    const userData = {
                      [newNumber]: 'Invited',
                    };
                    firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData).then(() => {
                      this.setState({ checkedItem: [] });
                      this.setState({ loader: false });
                    })
                  .catch((e) => {
                    console.log(e);
                    // this.setState({ loader: false });
                    // alert(error);
                  });
                  }
                } else {
                  alert('Invitation is not send.');
                }
              });
            } else {
              try {
                PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
              ).then((permission) => {
                if (permission === 'granted') {
                  for (let i = 0; i < onlyNumberArray.length; i += 1) {
                    SmsAndroid.sms(
                          `${onlyNumberArray[i]}`, // phone number to send sms to
                      `${body}`, // sms body
                      'sendDirect', // sendDirect or sendIndirect
                      (err, message) => {
                        if (err) {
                          console.log('error');
                        } else {
                          console.log(message); // callback message
                        }
                      },
                    );
                  }
                  for (let i = 0; i < sendContacts.length; i += 1) {
                    const newContact = sendContacts[i];
                    const newNumber = newContact.substring(newContact.indexOf('\n') + 1);
                    const userData = {
                      [newNumber]: 'Invited',
                    };
                    firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData).then(() => {
                      this.setState({ checkedItem: [] });
                      this.setState({ loader: false });
                    })
                    .catch((error) => {
                      console.log(error);
                      // this.setState({ loader: false });
                      // alert(error);
                    });
                  }
                } else {
                  this.setState({ loader: false });
                  if (Platform.Version < 23) {
                    for (let i = 0; i < onlyNumberArray.length; i += 1) {
                      SmsAndroid.sms(
                        `${onlyNumberArray[i]}`, // phone number to send sms to
                        `${body}`, // sms body
                        'sendDirect', // sendDirect or sendIndirect
                        (err, message) => {
                          if (err) {
                            console.log('error');
                          } else {
                            console.log(message); // callback message
                          }
                        },
                      );
                    }
                    for (let i = 0; i < sendContacts.length; i += 1) {
                      const newContact = sendContacts[i];
                      const newNumber = newContact.substring(newContact.indexOf('\n') + 1);
                      const userData = {
                        [newNumber]: 'Invited',
                      };
                      firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData).then(() => {
                        this.setState({ checkedItem: [] });
                        this.setState({ loader: false });
                      })
                      .catch((error) => {
                        // this.setState({ loader: false });
                        // alert(error);
                      });
                    }
                  } else {
                    this.setState({ checkedItem: [] });
                    alert('Send SMS permission denied');
                  }
                }
              });
              } catch (err) {
                console.log(err);
              }
            }
          } else {
            for (let i = 0; i < sendContacts.length; i += 1) {
              const newContact = sendContacts[i];
              let userData = '';
              const email = checkedItem[i];
              const password = '111111';
              // const newNumber = newContact.substring(newContact.indexOf('\n') + 1);
              firebaseApp.auth().signInWithEmailAndPassword(email, password)
              .then((user) => {
                console.log(`user->${user}`);
              }).catch((error) => {
                console.log(`error google->${error.message}`);
                if (error.message === 'The password is invalid or the user does not have a password.') {
                  userData = {
                    [newContact]: 'Exist',
                  };
                  firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData);
                  this.setState({ loader: false });
                } else {
                  userData = {
                    [newContact]: 'Invited',
                  };
                  firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData).then(() => {
                    this.setState({ checkedItem: [] });
                    this.setState({ loader: false });
                  })
                  .catch((error) => {
                    // this.setState({ loader: false });
                    // alert(error);
                  });
                  fetch('http://34.215.40.163/SendInviteMail.php', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      sid: value,
                      invite_email: tags,
                    }),
                  })
                  .then(response => response.json())
                  .then((responseJson) => {
                  }).catch((error) => {
                    console.log(`${error}mail no sent..`);
                  });
                }
              });
            }
          }
        // for (let i = 0; i < sendContacts.length; i += 1) {
        //   const newContact = sendContacts[i];
        //   const newNumber = newContact.substring(newContact.indexOf('\n') + 1);
        //   const userData = {
        //     [newNumber]: 'Invited',
        //   };
        //   firebaseApp.database().ref(`/Users/${value}/Invitations/${type}`).update(userData).then(() => {
        //     this.setState({ checkedItem: [] });
        //     this.setState({ loader: false });
        //   })
        //   .catch((error) => {
        //     // this.setState({ loader: false });
        //     // alert(error);
        //   });
        // }
        });
      });
    }
  }

  emailInviteSubmit= () => (
    <Butom
      accent
      text="I N V I T E"
      onPress={() => {
        const type = this.state.phoneListDisplay === true ? 'phone' : 'google';
        this.closePersonalizedModal(type);
        this.getInvitedContacts(type);
      }}
      upperCase={false}
      style={nextButtonStyles}
    />
  );

  CloseModal = () => {
    this.setState({ modalVisible: false });
  }

  closeModal() {
    // const checkedItem = this.state.userTagsArray !== undefined ? this.state.userTagsArray.split(',') : '';
    this.setState({
      personalizedModal: false,
      checkedItem: [],
      contacts: [],
      loader: false,
    });
  }

  inviteEmailClicked = (email) => {
    AsyncStorage.getItem('user_id').then((value) => {
      this.getInvitedContacts('email');
      const newEmail = email.replace(/\./g, '*');
      const password = '111111';
      let userData = '';
      firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(`user->${user}`);
      }).catch((error) => {
        console.log(`error->${error.message}`);
        if (error.message === 'The password is invalid or the user does not have a password.') {
          userData = {
            [newEmail]: 'Exist',
          };
          if (this.state.preSelected.includes(email.replace(/\./g, '*')) === true) {
            alert('This email already invited');
          } else {
            firebaseApp.database().ref(`/Users/${value}/Invitations/email`).update(userData);
          }
        } else {
          userData = {
            [newEmail]: 'Invited',
          };
          if (this.state.preSelected.includes(email.replace(/\./g, '*')) === true) {
            alert('This email already invited');
          } else {
            // this.setState({ loader: true });
            console.log('user->'+value);
            firebaseApp.database().ref(`/Users/${value}/Invitations/email`).update(userData)
            .then(() => {
              // this.setState({ loader: false });
              fetch('http://34.215.40.163/SendInviteMail.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sid: value,
                  invite_email: email,
                }),
              })
              .then(response => response.json())
              .then((responseJson) => {
                console.log('email send log' + JSON.stringify(responseJson));
              }).catch((error1) => {
                console.log(`${error1} email send log`);
              });
            })
            .catch((error2) => { console.log(error2); });
          }
        }
      });
    });
  }

  clickOnItems = (item) => {
    this.setState({ checkedItem: item });
  }

  removeContactsfromList = () => {
    const type = this.state.phoneListDisplay === true ? 'phone' : 'google';
    this.getInvitedContacts(type);
    const tags = this.state.contacts;
    if (type === 'google') {
      for (let i = 0; i < this.state.preSelected.length; i += 1) {
        const index = tags.indexOf(this.state.preSelected[i].replace(/\*/g, '.'));
        if (index > -1) {
          tags.splice(index, 1);
        }
      }
      this.setState({ contacts: tags });
    } else {

    }
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        {this.state.loader === true ?
          <View
            style={styles.indicatorview}
          >
            <ActivityIndicator animating={this.state.loader} style={[{ height: 80, width: 80, backgroundColor: '#56565666', borderRadius: 10 }]} size="large" />
          </View> : null }
        <Modal  // modle for options for category wise
          transparent
          visible={this.state.personalizedModal}
          supportedOrientations={['portrait', 'landscape']}
        >
          <View style={stylesOfModel.popcontainer}>
            <ImageBackground
              source={backgroundImages}
              style={stylesOfModel.backImage}
            >
              <View style={stylesOfModel.popinnerContainer}>
                <TouchableOpacity
                  style={stylesOfModel.closebtn}
                  onPress={() => { this.closeModal(); }}
                >
                  <Image
                    style={stylesOfModel.image}
                    source={IC_WHITE_CLOSE}
                  />
                </TouchableOpacity>

                <View style={stylesOfModel.iconContainer}>
                  <Text style={stylesOfModel.topText}>
                    {this.state.contacts.length < 1 ? '' : 'Select emails from the options below to send invitation:'}
                  </Text>
                </View>

                <View style={stylesOfModel.centerContainer}>
                  <SelectMultiple
                    items={this.state.contacts}
                    style={{ showsVerticalScrollIndicator: false }}
                    rowStyle={{ backgroundColor: 'transparent', borderBottomWidth: 0, padding: 4 }}
                    labelStyle={{ color: 'white' }}
                    checkboxStyle={{ tintColor: 'white' }}
                    selectedItems={this.state.checkedItem}
                    onSelectionsChange={this.clickOnItems}
                  />
                </View>

                <View style={stylesOfModel.bottomContainer}>
                  {this.emailInviteSubmit()}
                </View>
              </View>
            </ImageBackground>
          </View>
        </Modal>

        <ScrollView >
          <View style={styles.subViewStyle} >
            <Text style={styles.Text}>Email address</Text>
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => {
                this.getInvitedContacts('email');
                this.setState({
                  googleListDisplay: false,
                  phoneListDisplay: false,
                  facebookListDisplay: false,
                  emailListDisplay: this.state.emailListDisplay === false,
                  newList: this.state.emailListDisplay === true ? [] : undefined,
                });
              }}
            >
              <Image
                source={down}
                style={[styles.plusImg, { transform: [{ rotate: '0deg' }] }]}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: this.state.emailListDisplay === true ? undefined : 0,
            }}
          >
            <FlatList
              data={this.state.newList}
              renderItem={({ item }) =>
                <View style={{ paddingVertical: 15, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#00000030' }}>
                  <Text>{item.email}</Text>
                  <Text style={{ color: item.status === 'Invited' ? '#7dd3d5' : '#65348a' }}>
                    {item.status}
                  </Text>
                </View>
              }
            />
            <View style={{ paddingVertical: 18, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5 }}>
              <Text style={{ color: '#34495e', fontWeight: '800' }}color="grey" fontWeight="800">Add email address</Text>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
              >
                <Image
                  source={plus}
                  style={styles.plusImg}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.subViewStyle} >
            <Text style={styles.Text}>Google contacts</Text>

            <TouchableOpacity
              style={styles.Buttons} onPress={() => {
                this.getInvitedContacts('google');
                this.setState({
                  emailListDisplay: false,
                  phoneListDisplay: false,
                  facebookListDisplay: false,
                  newList: this.state.googleListDisplay === true ? [] : undefined,
                  googleListDisplay: this.state.googleListDisplay === false,
                });
              }}
            >
              <Image
                source={down}
                style={[styles.plusImg, { transform: [{ rotate: '0deg' }] }]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: this.state.googleListDisplay === true ? undefined : 0 }}>
            <FlatList
              data={this.state.newList}
              renderItem={({ item }) =>
                <View style={{ paddingVertical: 15, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#00000030' }}>
                  <Text>{item.email}</Text>
                  <Text style={{ color: item.status === 'Invited' ? '#7dd3d5' : '#65348a' }}>
                    {item.status}
                  </Text>
                </View>
                }
            />
            <View style={{ paddingVertical: 15, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#00000030' }}>
              <Text style={{ color: '#34495e', fontWeight: '800' }}color="grey" fontWeight="800">Add google contacts</Text>
              <TouchableOpacity
                style={styles.Buttons} onPress={() => {
                  this.getInvitedContacts('google');
                  this.setState({ loader: true });
                  GoogleSignin.signOut().then(() => {
                    console.log('google log out');
                  });
                  GoogleSignin.signIn().then((user) => {
                    fetch(`https://www.google.com/m8/feeds/contacts/default/full?alt=json&v=3.0&oauth_token=${user.accessToken}`)
                          .then(response => response.json())
                          .then((responseJson) => {
                            const newContacts = [];
                            responseJson.feed.entry.forEach((contact) => {
                              newContacts.push(contact.gd$email ? contact.gd$email[0].address : '');
                            });
                            this.setState({
                              loader: false,
                              personalizedModal: true,
                              contacts: newContacts.filter(Boolean),
                            });
                            this.removeContactsfromList();
                          })
                          .catch((error) => {
                            // alert(error + 'this err for get response from google for get cotact');
                            this.setState({ loader: false });
                            console.log(`access token ${error}`);
                          });
                  })
                  .catch((error) => {
                    // alert(error + 'this err for google login');
                    this.setState({ loader: false });
                    console.log(`access token ${error}`);
                  });
                }}
              >
                <Image
                  source={plus}
                  style={styles.plusImg}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.subViewStyle} >
            <Text style={styles.Text}>Mobile contacts</Text>

            <TouchableOpacity
              style={styles.Buttons} onPress={() => {
                this.getInvitedContacts('phone');
                this.setState({
                  emailListDisplay: false,
                  googleListDisplay: false,
                  facebookListDisplay: false,
                  newList: this.state.phoneListDisplay === true ? [] : undefined,
                  phoneListDisplay: this.state.phoneListDisplay === false,
                });
              }}
            >
              <Image
                source={down}
                style={[styles.plusImg, { transform: [{ rotate: '0deg' }] }]}
              />
            </TouchableOpacity>
          </View>

          <View style={{ display: this.state.phoneListDisplay === true ? undefined : 'none' }}>
            <FlatList
              data={this.state.newList}
              renderItem={({ item }) =>
                <View style={{ paddingVertical: 15, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#00000030' }}>
                  <Text>{item.phone}</Text>
                  <Text style={{ color: item.status === 'Invited' ? '#7dd3d5' : '#65348a' }}>
                    {item.status}
                  </Text>
                </View>
                }
            />
            <View style={{ paddingVertical: 15, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#00000030' }}>
              <Text style={{ color: '#34495e', fontWeight: '800' }}color="grey" fontWeight="800">Add phone contacts</Text>
              <TouchableOpacity
                style={styles.Buttons} onPress={() => {
                  this.requestContactsPermission();
                }}
              >
                <Image
                  source={plus}
                  style={styles.plusImg}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 1 }} />
        </ScrollView>

        <TextfieldPopup
          modalVisible={this.state.modalVisible}
          title={'Invite your buddy'}
          onTouchup={this.CloseModal}
          onInvite={this.inviteEmailClicked}
        />
      </View>
    );
  }
}

export default InviteScreen;
