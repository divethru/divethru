import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar } from 'react-native';
import { PropTypes } from 'prop-types';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import firebaseApp from '../../components/constant';
import CategoryScreen from './CategoryScreen';
import { colors } from '../../styles/theme';
import Spinner from '../../components/Spinner';
import DiveThru from '../../assets/images/ic_divethru.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
});

class DiveThruScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'DiveThru',
    tabBarIcon: ({ tintColor }) => <Image source={DiveThru} style={{ tintColor }} />,
  });
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  componentWillMount() {
    StatusBar.setHidden(false);
    this.fetchCategoryName();
    const tabs = () => (
      <Text tabLabel="Tab #1">My</Text>
    );
    this.setState({ tabs });
  }
  componentDidMount() {
    this.setState({ loading: true });
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
          const tabs = [];
          labels.forEach((item, index) => {
            tabs.push(
              <ScrollView tabLabel={item.toUpperCase()}>
                <CategoryScreen index={index} screenProps={this.props} />
              </ScrollView>,
            );
          });
          this.setState({ tabs, loading: false });
        }
      }
    });
  }
  render() {
    return (
      <Spinner isLoading={this.state.loading}>
        <View style={styles.container}>
          <ScrollableTabView
            style={{ marginTop: 20 }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
            tabBarUnderlineStyle={{ backgroundColor: colors.black, width: 130 }}
            tabBarBackgroundColor={colors.white}
            tabBarActiveTextColor="#1A1A1A"
            tabBarInactiveTextColor="#535353"
            // tabBarTextStyle={{ fontWeight: '0' }}
          >
            { this.state.tabs }
          </ScrollableTabView>
        </View>
      </Spinner>
    );
  }
}

DiveThruScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DiveThruScreen;
