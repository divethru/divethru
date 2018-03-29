import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ListView, ImageBackground, Dimensions, AsyncStorage, Platform, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import firebaseApp from '../../components/constant';
import styles from '../../styles/session';
import { colors } from '../../styles/theme';
import IC_BACK from '../../assets/images/ic_back.png';
import IC_LOCK from '../../assets/images/ic_lock_white.png';
import IC_DONE from '../../assets/images/ic_done.png';

const width = Dimensions.get('window').width;
class SessionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const name = params ? params.name : undefined;
    return {
      headerLeft: (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.state.params.handleBack()}>
          <Image
            style={{ height: 20, width: 20, margin: 10 }}
            source={IC_BACK}
          />
        </TouchableOpacity>
      ),
      title: name,
      headerStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 5,
      },
      headerTitleStyle: {
        alignSelf: 'center',
        color: colors.grey700,
        fontSize: 18,
        fontWeight: '300',
      },
      headerRight: (<View />),
      tabBarVisible: false,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

  componentWillMount() {
    this.fetchUserSubscriptionType();
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleBack: this.handleBack.bind(this) });
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;
    const name = params ? params.name : undefined;
    const item = params ? params.item : undefined;
    const bundleId = params ? params.bundleId : undefined;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sessionData),
      bundleName: name,
      bundleId,
      mainCategoryName: item,
    });
  }

  handleBack() {
    this.props.navigation.state.params.returnData();
    this.props.navigation.goBack();
  }

  fetchUserSubscriptionType() {
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          const membership = dataSnapshot.val();
          const type = membership.membership_type;
          this.setState({ membershipType: type });
        });
      }
    }).catch(() => { });
    return userData;
  }

  onClickOfRowItem(rowdata, bundleName, bundleId) {
    if (this.state.membershipType !== undefined) {
      if (this.state.membershipType === 'Free' && rowdata.isSessionAvailable === false) {
        if (rowdata.index === 0) {
          this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this) });
        }
      } else if (this.state.membershipType === 'Free' && rowdata.isSessionAvailable === true) {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this) });
      } else {
        this.props.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, category: this.state.mainCategoryName, bundleId, returnData: this.fetchUserSubscriptionType.bind(this) });
      }
    }
  }

  renderGridItem(rowdata) {
    let lock = null;
    if (this.state.membershipType !== undefined) {
      if (this.state.membershipType === 'Free' && rowdata.isSessionAvailable === false) {
        if (rowdata.index !== 0) {
          lock = (
            <View>
              <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
              <Image
                source={IC_LOCK}
                style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
              />
            </View>
          );
        }
      } else if (this.state.membershipType === 'Free' && rowdata.isSessionAvailable === true) {
        lock = (
          <Image
            source={IC_DONE}
            style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
          />
        );
      }
    }

    const bundleName = this.state.bundleName;
    const bundleId = this.state.bundleId;
    return (
      <TouchableOpacity onPress={() => { this.onClickOfRowItem(rowdata, bundleName, bundleId); }} style={styles.gridItem} activeOpacity={1}>
        <View style={styles.gridItemImage}>
          <ImageBackground
            source={{ uri: rowdata.session_img }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.gridItemText}>{rowdata.session_name}</Text>
            {lock}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <ListView
              removeClippedSubviews={false}
              dataSource={this.state.dataSource}
              renderRow={rowdata => this.renderGridItem(rowdata)}
              contentContainerStyle={styles.listView}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

SessionScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired,
};

export default SessionScreen;
