import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import { COLOR as colors } from 'react-native-material-ui';
import ReminderScreen from './ReminderScreen';
import DiveThruScreen from './DiveThruScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';
import SessionDescriptionScreen from './SessionDescriptionScreen';
import SubscribeNowScreen from './SubscribeNowScreen';
import CalenderReminderScreen from './CalenderReminderScreen';
import { uiTheme } from '../../styles/theme';

const components = {
  Home: { screen: StackNavigator({
    Home: { screen: HomeScreen },
    Player: { screen: PlayerScreen },
    SessionDescription: { screen: SessionDescriptionScreen },
    SubscribeNowScreen: { screen: SubscribeNowScreen },
    CalenderReminderScreen: { screen: CalenderReminderScreen },
  }, {
    headerMode: 'none',
  }) },
  Reminder: { screen: ReminderScreen },
  DiveThru: { screen: DiveThruScreen },
  Profile: { screen: ProfileScreen },
};

const TabScreen = TabNavigator(components, {
  initialRouteName: 'Home',
  lazy: true,
  swipeEnabled: false,
  tabBarComponent: TabBarTop,
  tabBarOptions: {
    activeTintColor: '#9f5dbc',
    inactiveBackgroundColor: colors.black,
    inactiveTintColor: colors.black,
    iconStyle: {
      height: 20,
      width: 20,
      marginTop: 8,
    },
    indicatorStyle: {
      opacity: 0,
    },
    upperCaseLabel: false,
    labelStyle: {
      fontWeight: '200',
      marginTop: 9,
      marginBottom: 0,
      fontSize: 12,
    },
    scrollEnabled: false,
    showIcon: true,
    showLabel: true,
    style: {
      backgroundColor: '#f9f9f9',
    },
  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarPosition: 'bottom',
});

export default TabScreen;
