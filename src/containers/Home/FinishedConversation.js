import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    AsyncStorage,
    Image,
    PermissionsAndroid,
} from 'react-native';
import Moment from 'moment';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseApp from '../../components/constant';
import styles from '../../styles/finishedConv';
import backgroundImages from '../../assets/images/SessionPlayerBG.png';
import Home from '../../assets/images/home.png';
import IcShare from '../../assets/images/Icshare.png';
import Loader from '../../components/Loader';

class FinishedConversation extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      total_time: 0,
      completed_convo: 0,
      quote_image: '',
      quote_desc: '',
      showsubscribe: '',
      onplayer: '',
      loader: true,
      daysInRow: 0,
      lastPlayedon: '',
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const quoteImage = params.quote_image ? params.quote_image : '';
    const quoteDesc = params.quote_desc ? params.quote_desc : '';
    const showsubscribe = params.showsubscribe ? params.showsubscribe : '';
    const onplayer = params.onplayer ? params.onplayer : '';
    const onCategory = params.onCategory ? params.onCategory : '';
    AsyncStorage.getItem('user_id').then((value) => {
      firebaseApp.database().ref(`/Users/${value}`).once('value', (snapshot) => {
        const lastPlayedon = snapshot.val().lastPlayed_on ? snapshot.val().lastPlayed_on : '';
        let daysInRow = snapshot.val().days_in_row ? snapshot.val().days_in_row : 0;
        const CurrentOnlyDate = Moment().format('YYYY-MM-DD');
        const difference = Moment(CurrentOnlyDate).diff(lastPlayedon, 'days');
        if (difference > 1) {
          daysInRow = 0;
        }
        this.setState({
          quoteImage,
          quoteDesc,
          showsubscribe,
          onplayer,
          daysInRow,
          onCategory,
          total_time: (snapshot.val().total_time_divethru),
          completed_convo: (snapshot.val().completed_conversation),
        });
        this.convertMinsToHrsMins(snapshot.val().total_time_divethru);
      }, (error) => {
        console.log(`CategoryScreen componentDidMount error: ${error}`);
      });
    });
  }

  componentDidMount = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          // title: 'Cool Photo App Camera Permission',
          // message: 'Cool Photo App needs access to
          // your camera so you can take awesome pictures.',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission You can use the camera');
        // const { params } = this.props.navigation.state;
        // const quoteImage = params.quote_image ? params.quote_image : '';
        // this.downloadFile(quoteImage);
      } else {
        console.log('Permission Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    const { params } = this.props.navigation.state;
    const quoteImage = params.quote_image ? params.quote_image : '';
    this.downloadFile(quoteImage);
  }

  convertMinsToHrsMins(min) {
    console.log('min->' + min);
    const hours = Math.trunc(min / 60);
    const minutes = min % 60;
    console.log('hours->' + hours);
    console.log('minutes->' + minutes);
    
    if (hours > 0 && minutes > 0) {
      this.setState({
        hourmin: `${hours}:${minutes}`,
        hourmintag: 'min',
      });
    } else if (hours > 1 && minutes === 0) {
      this.setState({
        hourmin: hours,
        hourmintag: 'hrs',
      });
    } else if (hours > 0 && minutes === 0) {
      this.setState({
        hourmin: hours,
        hourmintag: 'hr',
      });
    } else {
      this.setState({
        hourmin: minutes,
        hourmintag: 'min',
      });
    }

    // if (hours > 1) {
    //   this.setState({
    //     hourmin: (hours > 0) ? hours : minutes,
    //     hourmintag: 'hrs',
    //   });
    // } else if (hours > 0) {
    //   this.setState({
    //     hourmin: (hours > 0) ? hours : minutes,
    //     hourmintag: 'hr',
    //   });
    // } else {
    //   this.setState({
    //     hourmin: (hours > 0) ? hours : minutes,
    //     hourmintag: 'min',
    //   });
    // }
  }

  downloadFile(quoteImage) {
    RNFetchBlob.config({ fileCache: true })
      .fetch('GET', quoteImage)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        const base64Image = `data:image/png;base64,${base64Data.trim()}`;
        if (base64Image != null || base64Image !== undefined) {
          this.setState({
            base64Image,
            disabled: false,
            loader: false,
          });
        }
      });
  }

  redirectToShare() {
    this.props.navigation.navigate('ShareScreen', {
      quote_image: this.state.quote_image,
      quote_desc: this.state.quote_desc,
      onplayer: this.state.onplayer,
    });
  }

  restart() {
    if (this.state.showsubscribe === true) {
      this.props.navigation.navigate('SubscribeNowScreen', { onDescription: false, onCategory: this.state.onCategory });
    } else if (this.state.onplayer === true) {
      this.props.navigation.pop(2);
    } else {
      this.props.navigation.pop(4);
    }

    // if (this.state.showsubscribe === true) {
    //   this.props.navigation.navigate('SubscribeNowScreen', { onDescription: false });
    // } else if (this.state.onplayer === true) {
    //   this.props.navigation.navigate('Home');
    // } else {
    //   Promise.all([
    //     this.props.navigation.dispatch(
    //       NavigationActions.reset({
    //         index: 0,
    //         // TabNav is a TabNavigator nested in a StackNavigator
    //         actions: [NavigationActions.navigate({ routeName: 'DiveThru' })],
    //       }),
    //     ),
    //   ]).then(() => this.props.navigation.navigate('Home'));
    // }
  }

  render() {
    const shareImageBase64 = {
      url: this.state.base64Image,
      type: 'application/png',
      showAppsToView: true,
    };

    return (
      <View style={{ flex: 1 }}>
        {
          this.state.loader === false
          ?
          null
          :
          <Loader />
        }
        <View style={{ height: '30%' }}>
          <ImageBackground
            source={backgroundImages}
            style={styles.profilebcImage}
          >
            <View style={styles.betweenView}>
              <View style={styles.betweenSubView}>
                <View style={styles.betweenTimeView}>
                  <Text style={styles.betweenViewEndText}>{this.state.daysInRow}</Text>

                  <Text style={[styles.betweenViewEndText, { fontSize: 10, marginTop: 20 }]} />
                </View>
                <Text style={styles.betweenViewText}>DAY IN</Text>
                <Text style={styles.betweenViewText}>A ROW</Text>
              </View>

              <View style={styles.betweenSubView}>
                <View style={styles.betweenTimeView}>
                  <Text style={styles.betweenViewEndText}>{this.state.hourmin}</Text>

                  <Text style={[styles.betweenViewEndText, { fontSize: 10, marginTop: 20 }]}>
                    {this.state.hourmintag}
                  </Text>
                </View>

                <Text style={styles.betweenViewText}>MINUTES</Text>
                <Text style={styles.betweenViewText}>MEDITATED</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.centerContainer}>
          <Image style={styles.centerImage} source={{ uri: this.state.base64Image }} />

          <Text style={styles.text}>Show your friends how wise you are</Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.betweenView}>
            <View style={styles.betweenSubView}>
              <TouchableOpacity onPress={() => { Share.open(shareImageBase64); }}>
                <Image
                  source={IcShare}
                  style={styles.shareViewImg}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.betweenSubView}>
              <TouchableOpacity onPress={() => this.restart()}>
                <Image
                  source={Home}
                  style={styles.shareViewImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


FinishedConversation.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FinishedConversation;
