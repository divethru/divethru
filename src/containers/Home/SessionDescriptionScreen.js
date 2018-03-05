import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import { Button } from 'react-native-material-ui';
import styles, { buttonStyles } from '../../styles/sessionDescription';
import IC_WHITE_CLOSE from '../../assets/images/ic_close.png';
import { colors } from '../../styles/theme';
import sessionDescBg from '../../assets/images/SessionDescBg.png';

class SessionDescriptionScreen extends Component {
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

  componentWillMount() {
    StatusBar.setHidden(true);
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;

    this.setState({
      sessionDesc: sessionData.sessionDesc,
      sessionName: sessionData.sessionName,
      // sessionCategory: sessionData.sessionCategory,
    });
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }}>
              <Image
                style={{ height: 20, width: 20, alignSelf: 'flex-end', marginRight: 20, marginTop: 20 }}
                source={IC_WHITE_CLOSE}
              />
            </TouchableOpacity>
            <View style={styles.introContainer}>
              <ImageBackground
                source={sessionDescBg}
                style={styles.backImageOfIntroContainer}
              >
                <Text style={styles.dayText}>{this.state.sessionName}</Text>
              </ImageBackground>
            </View>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.subText}>Basic</Text>
            <Text style={styles.descText}>{this.state.sessionDesc}</Text>
            <Button
              primary
              title=""
              text="D I V E  T H R U"
              onPress={() => { this.props.navigation.goBack(); }}
              style={buttonStyles}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SessionDescriptionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SessionDescriptionScreen;
