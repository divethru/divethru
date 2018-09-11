import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import { COLOR as colors } from 'react-native-material-ui';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ReminderScreen from '../Reminder/ReminderScreen';
import DiveThruScreen from '../DiveThru/DiveThruScreen';
import DiveThruPlayerScreen from '../DiveThru/DiveThruPlayerScreen';
import InviteScreen from '../Profile/InviteScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import HomeScreen from './HomeScreen';
import PlayerScreen from './PlayerScreen';
import SessionDescriptionScreen from './SessionDescriptionScreen';
import SubscribeNowScreen from './SubscribeNowScreen';
import CalenderReminderScreen from '../Reminder/CalenderReminderScreen';
import SessionScreen from '../DiveThru/SessionScreen';
import CategoryScreen from '../DiveThru/CategoryScreen';
import FinishedConversation from '../Home/FinishedConversation';
// import ShareScreen from '../Home/ShareScreen';
import EditProfileScreen from '../Profile/EditProfile';
import AccessCode from '../Startup/AccessCodeScreen';
// import SubCategoryDescriptionScreen from '../Home/SubCategoryDesc';
import BundleDescriptionScreen from './BundleDescription';
// import SubCategoryScreen from '../DiveThru/SubCategoryScreen';

// eslint-disable-next-line no-unused-vars
const transitionConfig = () => {
  return {
    // transitionSpec: {
    //   duration: 0,
    // },
    screenInterpolator: (sceneProps) => {
      // const { layout, position, scene } = sceneProps;

      // const thisSceneIndex = scene.index;
      // const width = layout.initWidth;

      // const translateX = position.interpolate({
      //   inputRange: [thisSceneIndex - 1, thisSceneIndex],
      //   outputRange: [width, 0],
      // });

      // return { transform: [{ translateX }] };

      // console.log('Routename: ' + sceneProps.scene.route.routeName);
      if (
        sceneProps.scene.route.routeName === 'DiveThruPlayer'
      // ) return CardStackStyleInterpolator.forFade(sceneProps);
      ) return null;

      // Otherwise, use the usual horizontal animation.
      return CardStackStyleInterpolator.forHorizontal(sceneProps);
    },
  };
};

const components = {
  Home: { screen: StackNavigator({
    Home: { screen: HomeScreen },
    Player: { screen: PlayerScreen },
    SessionDescription: { screen: SessionDescriptionScreen },
    SubscribeNowScreen: { screen: SubscribeNowScreen },
    CalenderReminderScreen: { screen: CalenderReminderScreen },
    DiveThruPlayer: { screen: DiveThruPlayerScreen },
    FinishedConversation: { screen: FinishedConversation },
    // ShareScreen: { screen: ShareScreen },
    AccessCode: { screen: AccessCode },
    BundleDescription: { screen: BundleDescriptionScreen },
    Session: { screen: SessionScreen },
    // SubCategory: { screen: SubCategoryScreen },
  }, {
    // headerMode: 'none',
  }) },
  Reminder: { screen: ReminderScreen },
  DiveThru: { screen: StackNavigator({
    DiveThru: { screen: DiveThruScreen },
    CategoryScreen: { screen: CategoryScreen },
    Session: { screen: SessionScreen },
    // SubCategory: { screen: SubCategoryScreen },
    DiveThruPlayer: { screen: DiveThruPlayerScreen },
    SessionDescription: { screen: SessionDescriptionScreen },
    // SubCategoryDescription: { screen: SubCategoryDescriptionScreen },
    BundleDescription: { screen: BundleDescriptionScreen },
    CalenderReminderScreen: { screen: CalenderReminderScreen },
    Player: { screen: PlayerScreen },
    FinishedConversation: { screen: FinishedConversation },
    // ShareScreen: { screen: ShareScreen },
    SubscribeNowScreen: { screen: SubscribeNowScreen },
  }, {
    // transition: (fromRoute, toRoute) => {
    //   const routeNames = [fromRoute.SubCategory, toRoute.DiveThruPlayer];
    //   return (routeNames.includes('SubCategoryScreen') && routeNames.includes('DiveThruPlayerScreen')
    //     ? null
    //     : null);
    // },
    transitionConfig,
    // transitions: crossFade,
    // headerMode: 'none',
    // mode: 'modal',
    // headerMode: 'none',
    // transitionConfig: sceneProps => ({
    //   // transitionSpec: {
    //   //   duration: sceneProps.scene.route.routeName === 'DiveThruPlayer' ? 0 : 260,
    //   // },
    //   screenInterpolator: () => {
    //     if (
    //       sceneProps.scene.route.routeName === 'DiveThruPlayer'
    //     ) return null;
    //     return CardStackStyleInterpolator.forHorizontal(sceneProps);
    //   },
    // }),
  }) },
  Profile: { screen: StackNavigator({
    Profile: { screen: ProfileScreen },
    Invite: { screen: InviteScreen },
    EditProfile: { screen: EditProfileScreen },
    AccessCode: { screen: AccessCode },
  }, {
    // headerMode: 'none',
  }) },
};

const TabScreen = TabNavigator(components, {
  initialRouteName: 'Home',
  lazy: true,
  swipeEnabled: false,
  tabBarComponent: TabBarTop,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#9f5dbc',
    inactiveBackgroundColor: colors.black,
    inactiveTintColor: colors.black,
    iconStyle: {
      marginTop: 5,
    },
    indicatorStyle: {
      opacity: 0,
    },
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 10,
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
