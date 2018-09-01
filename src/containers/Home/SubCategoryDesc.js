import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity, Image, ImageBackground, ScrollView, AsyncStorage } from 'react-native';
import { Button } from 'react-native-material-ui';
import firebaseApp from '../../components/constant';
import styles, { buttonStyles } from '../../styles/sessionDescription';
import IC_WHITE_CLOSE from '../../assets/images/ic_close.png';
import sessionDescBg from '../../assets/images/SessionDescBg.png';

class sessionDescriptionScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    const { params } = this.props.navigation.state;
    const sessionType = params ? params.sessionType : undefined;
    const subcategoryId = params ? params.subcategoryId : undefined;
    const SubCategoryData = params ? params.subCategoryData : undefined;
    const selectedIndexOfCategory = params ? params.selectedIndexOfCategory : undefined;

    AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const type = convo.membership_type;
          this.setState({ membershipType: type });
        });
      }
    });

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      SubcategoryDesc: SubCategoryData.subcategory_description,
      SubcategoryName: SubCategoryData.subcategory_name,
      title: SubCategoryData.parentcategory,
      selectedIndexOfCategory,
    });

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      sessionData: SubCategoryData.session,
      name: SubCategoryData.subcategory_name,
      backGroundImage: SubCategoryData.subcategory_img,
      sessionType,
      subcategoryId,
    });
  }

  componentWillUnmount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.010)"
            animated
            hidden={false}
          />

          <View style={styles.container}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
              <Image
                style={styles.closeIcon}
                source={IC_WHITE_CLOSE}
              />
            </TouchableOpacity>

            <View style={styles.introContainer}>
              <ImageBackground
                source={sessionDescBg}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.dayText}>{this.state.SubcategoryName}</Text>
              </ImageBackground>
            </View>
          </View>

          <View style={styles.descContainer}>
            <Text style={styles.subText}>{this.state.title}</Text>
            <Text style={styles.descText}>{this.state.SubcategoryDesc}</Text>
            {
              (this.state.membershipType === 'Paid')
              ?
                <Button
                  primary
                  title=""
                  text="D I V E  T H R U"
                  onPress={() => {
                    this.props.navigation.navigate('Session',
                      {
                        sessionData: this.state.sessionData,
                        subcategoryId: this.state.subcategoryId,
                        name: this.state.name,
                        item: this.state.item,
                        bundleId: this.state.bundleId,
                        bundleImage: this.state.bundleImage,
                        purchasedBundle: this.state.purchaseBundle,
                        sessionType: this.state.sessionType,
                        selectedIndexOfCategory: this.state.selectedIndexOfCategory,
                      });
                  }}
                  style={buttonStyles}
                />
              :
                <View>
                  <Button
                    primary
                    title=""
                    text="Unlock the Dive Thru library"
                    onPress={() => { this.props.navigation.navigate('SubscribeNowScreen'); }}
                    style={buttonStyles}
                  />

                  <Button
                    primary
                    title=""
                    text="Get only this Quick Dive Session"
                    onPress={() => {

                    }}
                    style={buttonStyles}
                  />
                </View>
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

sessionDescriptionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default sessionDescriptionScreen;
