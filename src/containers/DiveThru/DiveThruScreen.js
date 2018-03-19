import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StatusBar, View } from 'react-native';
import { TabNavigator, TabBarTop, StackNavigator } from 'react-navigation';
import firebaseApp from '../../components/constant';
import SessionScreen from './SessionScreen';
import DiveThruPlayerScreen from '../DiveThru/DiveThruPlayerScreen';
import CategoryScreen from './CategoryScreen';
import DefaultCategory from './DefaultCategory';
import SubCategoryScreen from './SubCategoryScreen';
import { colors } from '../../styles/theme';
import DiveThru from '../../assets/images/ic_divethru.png';
import Spinner from '../../components/Spinner';

class DiveThruScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarIcon: ({ tintColor }) => <Image source={DiveThru} style={{ tintColor }} />,
    tabBarVisible: true,
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isTabVisible: true,
    };
  }
  componentWillMount() {
    const components = {
      DiveThru: { screen: StackNavigator({
        Quickdive: { screen: DefaultCategory },
      }, {
        headerMode: 'none',
      }) },
    };
    this.setState({ components });
    this.fetchCategoryName();
  }
  componentDidMount() {
    this.setState({ loading: true });
  }

  saveState(isTab) {
    this.setState({ isTabVisible: isTab });
  }

  fetchCategoryName() {
    const labels = [];
    const ref = firebaseApp.database().ref('Category');
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        dataSnapshot.forEach((child) => {
          labels.push(child.key);
        });
        if (labels.length > 0) {
          const tabs = {};
          labels.forEach((item, index) => {
            tabs[`Tab${index}`] = {
              screen: StackNavigator({
                CategoryScreen: { screen: CategoryScreen },
                // Session: { screen: StackNavigator({
                //   Session: { screen: props => <SessionScreen {...props} screenProps={{ tab: this.props.navigation }} /> },
                // }, {
                //   headerMode: 'none',
                // }) },
                Session: { screen: SessionScreen },
                // Session: { screen: props => <SessionScreen {...props} screenProps={{ tab: this.props.navigation }} /> },
                SubCategory: { screen: SubCategoryScreen },
                DiveThruPlayer: { screen: DiveThruPlayerScreen },
                // DiveThruPlayer: { screen: DiveThruPlayerScreen,
                //   navigationOptions: {
                //     tabBarVisible: true,
                //     header: null,
                //   },
                // },
              }),
              navigationOptions: ({ navigation }) => ({
                title: item,
              }),
            };
          });
          // alert(JSON.stringify(tabs));
          this.setState({ components: tabs, loading: false });
        }
      }
    });
  }
  render() {
    const TabNavScreen = TabNavigator(this.state.components, {
      lazy: true,
      swipeEnabled: false,
      tabBarComponent: TabBarTop,
      tabBarOptions: {
        activeTintColor: '#535353',
        inactiveBackgroundColor: '#f3f3f3',
        inactiveTintColor: colors.black,
        indicatorStyle: {
          backgroundColor: colors.black,
        },
        upperCaseLabel: true,
        labelStyle: {
          fontWeight: '200',
          marginTop: 8,
          marginBottom: 8,
          fontSize: 12,
          // letterSpacing: 5,
        },
        scrollEnabled: true,
        showIcon: false,
        showLabel: true,
        style: {
          backgroundColor: '#f3f3f3',
          borderBottomWidth: 2,
          borderBottomColor: '#939393',
        },
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarPosition: 'top',
    });

    // const AppNavigatorForTab = StackNavigator({
    //   TabNavScreen: { screen: TabNavScreen },
    //   DiveThruPlayer: { screen: DiveThruPlayerScreen,
    //     navigationOptions: {
    //       tabBarVisible: true,
    //       header: null,
    //     },
    //   },
    // }, {
    //   headerMode: 'none',
    // });

    return (
      <Spinner isLoading={this.state.loading}>
        {/* <View style={{ marginTop: 10, backgroundColor: '#f3f3f3', flex: 1 }}> */}
          {/* <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.30)"
            animated
            hidden={false}
          /> */}
          <TabNavScreen />
          {/* <AppNavigatorForTab /> */}
          {/* <DiveThruPlayerScreen navigation={this.props.navigation} /> */}
        {/* </View> */}
      </Spinner>);
  }
}

DiveThruScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DiveThruScreen;
