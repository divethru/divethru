import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Image,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-material-ui';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
import PropTypes from 'prop-types';
import styles, { buttonStyles } from '../../styles/share';
import IC_CLOSE from '../../assets/images/ic_close.png';
import walkThroughBg from '../../assets/images/walk_through_bg.png';

class ShareScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      quote_image: '',
      quote_desc: '',
      onplayer: '',
    };
  }

  async componentWillMount() {
    const { params } = this.props.navigation.state;
    const quoteImage = params.quote_image ? params.quote_image : '';
    const quoteDesc = params.quote_desc ? params.quote_desc : '';
    const onplayer = params.onplayer ? params.onplayer : '';
    this.setState({
      quoteImage,
      quoteDesc,
      disabled: true,
      onplayer,
    });

    this.downloadFile(quoteImage);
  }

  componentDidMount = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    } catch (err) {
      console.log(`ShareScreen Error: ${err}`);
    }
  }

  onCancel() {
    this.setState({ visible: false });
  }

  onOpen() {
    this.setState({ visible: true });
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
          });
        }
      });
  }

  restart() {
    if (this.state.onplayer === true) {
      this.props.navigation.pop(3);
    } else {
      this.props.navigation.pop(5);
    }
    // if (this.state.onplayer === true) {
    //   this.props.navigation.navigate('Home');
    // } else {
    //   Promise.all([
    //     this.props.navigation.dispatch(
    //         NavigationActions.reset({
    //           index: 0,
    //           // TabNav is a TabNavigator nested in a StackNavigator
    //           actions: [NavigationActions.navigate({ routeName: 'DiveThru' })],
    //         }),
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
      <View style={styles.container}>
        <ImageBackground
          source={walkThroughBg}
          style={styles.backImage}
        >
          <View style={styles.iconContainer}>
            <View>
              <Text style={styles.topText}>
                Share
              </Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
                <Image
                  style={styles.icon}
                  source={IC_CLOSE}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.imageContainer}>
              <Image style={{ width: 300, height: 300 }} source={{ uri: this.state.base64Image }} />
            </View>

            <Text style={styles.text}>Show your friends how wise you are</Text>
          </View>

          <View style={styles.bottomContainer}>
            <Button
              primary
              title=""
              text="S H A R E"
              onPress={() => { Share.open(shareImageBase64); }}
              style={buttonStyles}
            />

            <Button
              primary
              title=""
              text="N E X T"
              onPress={() => { this.restart(); }}
              style={buttonStyles}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
ShareScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default ShareScreen;
