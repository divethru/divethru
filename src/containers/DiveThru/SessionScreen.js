import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ListView, ImageBackground, Dimensions } from 'react-native';
import { TabNavigator, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import styles from '../../styles/session';
import { colors } from '../../styles/theme';
import IC_BACK from '../../assets/images/ic_back.png';
// import firebaseApp from '../../components/constant';

const width = Dimensions.get('window').width;

class SessionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const name = params ? params.name : undefined;
    return {
      headerLeft: (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
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

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const sessionData = params ? params.sessionData : undefined;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(sessionData),
    });
  }

  goToPLayerClicked(rowdata) {
    // const setParamsAction = NavigationActions.setParams({
    //   params: { hideTabBar: true },
    //   key: 'DiveThru',
    // });
    // this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.navigate('DiveThruPlayer', { rowdata });
  }

  renderGridItem= (rowdata) => {
    return (
      <TouchableOpacity onPress={() => { this.goToPLayerClicked(rowdata); }} style={styles.gridItem}>
        <View style={styles.gridItemImage}>
          <ImageBackground
            source={{ uri: rowdata.session_img }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.gridItemText}>{rowdata.session_name}</Text>
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
};

export default SessionScreen;
