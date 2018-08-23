import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, Image, Platform, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-material-ui';
import StarRating from 'react-native-star-rating';
import Rate from 'react-native-rate';
import firebaseApp from '../components/constant';
import diveThru from '../assets/images/divethru.png';
import styles, { NotnowButtonStyles } from '../styles/ratingPopup';
import IC_CLOSE from '../assets/images/ic_close.png';

class RatingPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      starCount: 0,
      rated: false,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });

    let STORE_LINK = '';
    if (Platform.OS === 'ios') {
      STORE_LINK = 'https://itunes.apple.com/us/app/divethru/id1383605874?ls=1&mt=8';
    } else {
      STORE_LINK = 'https://play.google.com/store/apps/details?id=com.divethru.divethru';
    }

    const options = {
      AppleAppID: '1383605874',
      GooglePackageName: 'com.divethru.divethru',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferInApp: true,
      fallbackPlatformURL: STORE_LINK,
    };

    Rate.rate(options, (success) => {
      if (success) {
        this.setState({ rated: true });
        AsyncStorage.getItem('user_id').then((value) => {
          if (value != null) {
            const Rating = {
              rating: this.state.rated,
            };
            const ref2 = firebaseApp.database().ref('Users').child(value);
            ref2.update(Rating);

            const RatingData = {
              rating: this.state.starCount,
              device_type: Platform.OS,
            };
            const ref = firebaseApp.database().ref('Rating').child(value);
            ref.push(RatingData);
          }
        });
      }
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { animationType, supportedOrientation, transparent } = this.props;
    const storename = (Platform.OS === 'ios') ? 'App Store' : 'Play Store';

    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={this.state.modalVisible}
        onRequestClose={() => { this.closeModal(); }}
        supportedOrientations={supportedOrientation}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={styles.imgcontainer}>
              <Image
                source={diveThru}
                style={styles.image}
              />
            </View>

            <Text style={styles.title}>Enjoying DiveThru?</Text>

            <Text style={styles.subTitle}>{`Tap a Star to rate it on the ${storename}.`}</Text>

            <View style={styles.seperator} />
            {
              (Platform.OS === 'ios')
              ?
                <Button
                  accent
                  text="Rate"
                  onPress={() => { this.onStarRatingPress(); }}
                  upperCase={false}
                  style={NotnowButtonStyles}
                />
              :
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                  emptyStar="ios-star-outline"
                  fullStar="ios-star"
                  halfStar="ios-star-half"
                  iconSet="Ionicons"
                  fullStarColor="#0070FF"
                  halfStarColor="#0070FF"
                  emptyStarColor="#0070FF"
                  halfStarEnabled
                  starSize={30}
                  interitemSpacing={20}
                />
            }

            <View style={styles.seperator} />

            <Button
              accent
              text="Not Now"
              onPress={() => { this.props.onTouchup(); }}
              upperCase={false}
              style={NotnowButtonStyles}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

RatingPopup.propTypes = {
  animationType: PropTypes.string,
  supportedOrientation: PropTypes.array,
  transparent: PropTypes.bool,
  onTouchup: PropTypes.func,
};

RatingPopup.defaultProps = {
  animationType: 'none',
  supportedOrientation: ['portrait', 'landscape'],
  transparent: true,
  onTouchup: undefined,
};

export default RatingPopup;
