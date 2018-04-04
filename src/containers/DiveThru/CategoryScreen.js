import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ListView, ImageBackground, FlatList, ScrollView, AsyncStorage, Image, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { PropTypes } from 'prop-types';
import styles from '../../styles/category';
import firebaseApp from '../../components/constant';
import IC_LOCK from '../../assets/images/ic_lock_white.png';
import IC_DONE from '../../assets/images/ic_done.png';
import { colors } from '../../styles/theme';

const width = Dimensions.get('window').width;

class CategoryScreen extends Component {
  static navigationOptions = () => ({
    header: null,
    tabBarVisible: false,
  });
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.arrStreak = [];
    this.arrStreakHasData = false;
  }

  componentWillMount() {
    this.fetchUserLastConversationData().then(() => {
    });
  }

  componentDidMount() {
    StatusBar.setHidden(false);
  }

  fetchUserLastConversationData() {
    const userData = AsyncStorage.getItem('user_id').then((value) => {
      if (value != null) {
        const ref = firebaseApp.database().ref('Users').child(value);
        ref.once('value').then((dataSnapshot) => {
          const convo = dataSnapshot.val();
          const lastConversation = convo.last_free_conversation_id;
          const halted = convo.halted;
          const type = convo.membership_type;
          let streakData = [];
          if (convo.streak !== '') {
            streakData = convo.streak;
            this.arrStreak = streakData;
            this.arrStreakHasData = true;
          }
          this.setState({ last_conversation_id: lastConversation, halted, membershipType: type });
          this.fetchCategoryWiseData();
        });
      }
    }).catch(() => { });
    return userData;
  }

  callServer = (index) => {
    const categoryAllData = this.state.allData[index];
    const categoryName = categoryAllData.cat_name;
    this.setState({ categoryAllData });
    this.setState({ categoryName });
    if (categoryAllData.session) {
      const categoryData = categoryAllData.session;
      this.setState({ categoryData });
      const categoryFinalData = [];
      categoryData.forEach((child, i) => {
        categoryFinalData.push({
          id: child.session_id,
          img: child.session_img,
          name: child.session_name,
          index: i,
          type: 'session',
          cat_subcription_type: child.cat_subcription_type,
          isSessionAvailable: child.isSessionAvailable,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(categoryFinalData),
        tabscreen: 'Category',
      });
    } else if (categoryAllData.bundle) {
      const categoryData = categoryAllData.bundle;
      this.setState({ categoryData });
      // const categoryFinalData = [];
      // categoryData.forEach((child, i) => {
      //   categoryFinalData.push({
      //     id: child.bundle_id,
      //     img: child.bundle_img,
      //     name: child.bundle_name,
      //     streakVisitedSessionCount: child.streakVisitedSessionCount,
      //     index: i,
      //     type: 'bundle',
      //     sessionCount: Object.keys(child.session).length,
      //     cat_subcription_type: child.cat_subcription_type,
      //   });
      // });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(categoryData),
        tabscreen: 'Bundle',
      });
    } else if (categoryAllData.SubCategory) {
      const categoryData = categoryAllData.SubCategory;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(categoryData),
        tabscreen: 'subCategory',
      });
      // this.props.screenProps.navigation.navigate('SubCategory', { categoryData });
    }
  }
  getSession = (id, name) => {
    let sessionData = [];
    if (this.state.categoryName === this.state.categoryAllData.cat_name) {
      if (this.state.categoryAllData.bundle) {
        const categoryData = this.state.categoryAllData.bundle;
        categoryData.forEach((data) => {
          if (id === data.bundle_id) {
            if (data.session) {
              sessionData = data.session;
              this.props.screenProps.navigation.navigate('Session', { sessionData, name, item: this.props.item, bundleId: data.bundle_id, returnData: this.fetchUserLastConversationData.bind(this) });
            }
          }
        });
      } else if (this.state.categoryAllData.session) {
        const categoryData = this.state.categoryAllData.session;
        // const rowdata = [];
        const bundleName = this.state.categoryAllData.cat_name;
        const catId = this.state.categoryAllData.cat_Id;
        categoryData.forEach((data) => {
          if (id === data.session_id) {
            const rowdata = {
              session_name: data.session_name,
              session_img: data.session_img,
              session_id: data.session_id,
              session_description: data.session_description,
              meditation_audio: data.meditation_audio,
              meditation_audio_time: data.meditation_audio_time,
              last_conversation_id: this.state.last_conversation_id,
              halted: this.state.halted,
            };
            // this.props.screenProps.navigation.navigate('DiveThruPlayer', { rowdata, bundleName });
            this.props.screenProps.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this) });
            // this.props.screenProps.navigation.navigate('Player', { rowdata, bundleName, isFromDiveThru: true, returnData: this.fetchUserLastConversationData.bind(this) });
          }
        });
      }
    }
  }
  getSessionData(item) {
    let sessionData = '';
    let name = '';
    if (item.session !== null) {
      sessionData = item.session;
      name = item.bundle_name;
      this.props.screenProps.navigation.navigate('Session', { sessionData, name, item: this.props.item, bundleId: item.bundle_id, returnData: this.fetchUserLastConversationData.bind(this) });
    }
  }
  fetchCategoryWiseData() {
    const ref = firebaseApp.database().ref('Category');
    const arrayCategory = [];
    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        dataSnapshot.forEach((child) => {
          if (child.key !== '10 Day Intro Program') {
            const arraySessionAllData = [];
            const arraySubCategoryAllData = [];
            const arrayBundleAllData = [];
            
            if (child.val().Session) {
              const CategoryName = child.val().category_name;
              const CategoryID = child.val().category_id;
              const CategoryDescription = child.val().category_description;
              let streakVisitedSessionCount = 0;
              let isSessionAvailable = false;

              if (child.val().Bundle === '' || child.val().SubCategory === '') {
                let arraySession = [];
                arraySession = child.val().Session ? child.val().Session : [];
    
                Object.keys(arraySession).forEach((key, i) => {
                  const value = arraySession[key];

                  if (this.arrStreakHasData === true) {
                    if (Object.keys(this.arrStreak).length > 0) {
                      Object.keys(this.arrStreak).forEach((streakKey) => {
                        let streakValue = [];
                        streakValue = this.arrStreak[streakKey];
                        if (CategoryID === streakKey) {
                          streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                          if (streakVisitedSessionCount > 0) {
                            isSessionAvailable = Object.keys(streakValue.Session).includes(value.session_id);
                          }
                        }
                      });
                    }
                  }

                  arraySessionAllData.push({
                    index: i,
                    isSessionAvailable,
                    session_name: value.session_name,
                    session_img: value.session_img,
                    session_id: value.session_id,
                    session_description: value.session_description,
                    meditation_audio: value.meditation_audio,
                    meditation_audio_time: value.meditation_audio_time,
                    cat_subcription_type: child.val().session_subcription_type,
                  });
                });
                arrayCategory.push({
                  cat_Id: child.val().category_id,
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_Id: child.val().category_id,
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  session: arraySessionAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else if (child.val().Bundle) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              if (child.val().Session === '' || child.val().SubCategory === '') {
                let arrayBundle = [];
                arrayBundle = child.val().Bundle;
                Object.keys(arrayBundle).forEach((key) => {
                  let value = [];
                  value = arrayBundle[key];
                  const sessionRry = value.Session ? value.Session : [];
                  const arrayNewSession = [];
                  let streakVisitedSessionCount = 0;
                  let isSessionAvailable = false;
                  if (sessionRry !== undefined) {
                    Object.keys(sessionRry).forEach((key1, index) => {
                      const value1 = sessionRry[key1];
                      if (this.arrStreakHasData === true) {
                        if (Object.keys(this.arrStreak).length > 0) {
                          Object.keys(this.arrStreak).forEach((streakKey) => {
                            let streakValue = [];
                            streakValue = this.arrStreak[streakKey];
                            if (value.bundle_id === streakKey) {
                              streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                              if (streakVisitedSessionCount > 0) {
                                isSessionAvailable = Object.keys(streakValue.Session).includes(value1.session_id);
                              }
                            }
                          });
                        }
                      }
                      
                      arrayNewSession.push({
                        index,
                        isSessionAvailable,
                        session_name: value1.session_name,
                        session_img: value1.session_img,
                        session_id: value1.session_id,
                        session_description: value1.session_description,
                        meditation_audio: value1.meditation_audio,
                        meditation_audio_time: value1.meditation_audio_time,
                        cat_subcription_type: child.val().session_subcription_type,
                        bundle_name: value.bundle_name,
                      });
                    });
                  }

                  arrayBundleAllData.push({
                    bundle_name: value.bundle_name,
                    bundle_img: value.bundle_img,
                    bundle_id: value.bundle_id,
                    bundle_description: value.bundle_description,
                    session: arrayNewSession,
                    streakVisitedSessionCount,
                    cat_subcription_type: child.val().session_subcription_type,
                  });
                });

                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  bundle: arrayBundleAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else if (child.val().SubCategory) {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              if (child.val().Bundle === '' || child.val().Session === '') {
                let arraySubCategory = [];
                arraySubCategory = child.val().SubCategory;
                Object.keys(arraySubCategory).forEach((key) => {
                  const value = arraySubCategory[key];
                  const bundleRry = value.Bundle ? value.Bundle : [];
                  const arrayNewBundle = [];
                  if (bundleRry !== undefined) {
                    Object.keys(bundleRry).forEach((key1) => {
                      const value1 = bundleRry[key1];
                      const sessionRry = value1.Session ? value1.Session : [];
                      const arrayNewSession = [];
                      let streakVisitedSessionCount = 0;
                      let isSessionAvailable = false;
                      if (sessionRry !== undefined) {
                        Object.keys(sessionRry).forEach((key2, index) => {
                          const value2 = sessionRry[key2];
                          if (this.arrStreakHasData === true) {
                            if (Object.keys(this.arrStreak).length > 0) {
                              Object.keys(this.arrStreak).forEach((streakKey) => {
                                let streakValue = [];
                                streakValue = this.arrStreak[streakKey];
                                if (value1.bundle_id === streakKey) {
                                  streakVisitedSessionCount = Object.keys(streakValue.Session).length;
                                  if (streakVisitedSessionCount > 0) {
                                    isSessionAvailable = Object.keys(streakValue.Session).includes(value2.session_id);
                                  }
                                }
                              });
                            }
                          }
                          arrayNewSession.push({
                            index,
                            isSessionAvailable,
                            session_name: value2.session_name,
                            session_img: value2.session_img,
                            session_id: value2.session_id,
                            session_description: value2.session_description,
                            meditation_audio: value2.meditation_audio,
                            meditation_audio_time: value2.meditation_audio_time,
                            cat_subcription_type: child.val().session_subcription_type,
                          });
                        });
                      }

                      arrayNewBundle.push({
                        bundle_name: value1.bundle_name,
                        bundle_img: value1.bundle_img,
                        bundle_id: value1.bundle_id,
                        bundle_description: value1.bundle_description,
                        session: arrayNewSession,
                        streakVisitedSessionCount,
                        cat_subcription_type: child.val().session_subcription_type,
                      });
                    });
                  }

                  arraySubCategoryAllData.push({
                    subcategory_id: value.subcategory_id,
                    subcategory_name: value.subcategory_name,
                    subcategory_img: value.subcategory_img,
                    subcategory_description: value.subcategory_description,
                    parentcategory: value.parentcategory,
                    bundle: arrayNewBundle,
                    cat_subcription_type: child.val().session_subcription_type,
                  });
                });

                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              } else {
                arrayCategory.push({
                  cat_name: CategoryName,
                  cat_desc: CategoryDescription,
                  SubCategory: arraySubCategoryAllData,
                  cat_subcription_type: child.val().session_subcription_type,
                });
              }
            } else {
              const CategoryName = child.val().category_name;
              const CategoryDescription = child.val().category_description;
              arrayCategory.push({
                cat_Id: child.val().category_id,
                cat_name: CategoryName,
                cat_desc: CategoryDescription,
                session: [],
                cat_subcription_type: child.val().session_subcription_type,
              });
            }
          }
        });
        this.setState({ allData: arrayCategory });
        this.callServer(this.props.index);
      }
    });
  }

  onClickOfRowItem(id, name, index, type, catSubcriptionType) {
    if (type === 'session' && catSubcriptionType === 'Paid' && this.state.membershipType === 'Free') {
      if (index !== undefined) {
        if (index === 0) {
          this.getSession(id, name);
        }
      } else {
        this.getSession(id, name);
      }
    } else {
      this.getSession(id, name);
    }
  }

  freeBundleView(rowdata) {
    let sessionView = null;
    let seek = 0;
    if (rowdata.streakVisitedSessionCount === 0) {
      seek = 0;
    } else {
      seek = rowdata.streakVisitedSessionCount / rowdata.sessionCount;
    }
    sessionView = (
      <View style={{ marginTop: width > 300 ? '68%' : '65%' }}>
        <Text style={styles.freeText}>{rowdata.streakVisitedSessionCount} of {rowdata.sessionCount} Sessions</Text>
        <Progress.Bar
          color={'white'}
          progress={seek}
          style={styles.FlatListSessionProgres}
          unfilledColor={'#ffffff5e'}
          borderWidth={0}
        />
      </View>
    );
    return sessionView;
  }

  renderGridItem(rowdata) {
    let lock = null;
    if (rowdata.index !== undefined) {
      if (rowdata.index === 0 && rowdata.isSessionAvailable === false) {
        lock = null;
      } else if (rowdata.index === 0 && rowdata.isSessionAvailable === true) {
        lock = (
          <Image
            source={IC_DONE}
            style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
          />
        );
      } else {
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
      // if (this.state.last_conversation_id > 0) {
      //   if (rowdata.index < this.state.last_conversation_id) {
      //     lock = (
      //       <Image
      //         source={IC_DONE}
      //         style={{ width: 20, height: 20, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
      //       />
      //     );
      //   } else if (rowdata.index === this.state.last_conversation_id) {
      //     lock = null;
      //   } else {
      //     lock = (
      //       <View>
      //         <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
      //         <Image
      //           source={IC_LOCK}
      //           style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
      //         />
      //       </View>
      //     );
      //   }
      // } else {
      //   if (rowdata.index === 0) {
      //     lock = null;
      //   } else {
      //     lock = (
      //       <View>
      //         <View style={{ backgroundColor: colors.black, opacity: 0.4, width: '100%', height: '100%' }} />
      //         <Image
      //           source={IC_LOCK}
      //           style={{ width: 17, height: 17, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5 }}
      //         />
      //       </View>
      //     );
      //   }
      // }
    }

    let sessionView = null;
    if (this.state.membershipType === 'Free' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle' && rowdata.streakVisitedSessionCount === 0) {
      sessionView = (
        <View style={{ marginTop: width > 300 ? '67%' : '65%' }}>
          <Text style={styles.freeText}>Try a free session</Text>
          <Text style={styles.sessionCountText}>{rowdata.sessionCount} Sessions</Text>
        </View>
      );
    } else if (this.state.membershipType === 'Free' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle' && rowdata.streakVisitedSessionCount > 0) {
      sessionView = this.freeBundleView(rowdata);
    } else if (this.state.membershipType === 'Paid' && rowdata.cat_subcription_type === 'Paid' && rowdata.type === 'bundle') {
      sessionView = this.freeBundleView(rowdata);
    }

    return (
      <TouchableOpacity onPress={() => { this.onClickOfRowItem(rowdata.id, rowdata.name, rowdata.index, rowdata.type, rowdata.cat_subcription_type); }} style={styles.gridItem} activeOpacity={1}>
        <View style={styles.gridItemImage}>
          <ImageBackground
            source={{ uri: rowdata.img }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.gridItemText}>{rowdata.name}</Text>
            {sessionView}
            { rowdata.type === 'session' && rowdata.cat_subcription_type === 'Paid' && this.state.membershipType === 'Free' ? lock : null }
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  paidBundleView(item) {
    let sessionView = null;
    let seek = 0;
    if (item.streakVisitedSessionCount === 0) {
      seek = 0;
    } else {
      seek = item.streakVisitedSessionCount / Object.keys(item.session).length;
    }
    sessionView = (
      <View style={{ bottom: '15%', marginTop: '85%' }}>
        <Text style={styles.freeText}>{item.streakVisitedSessionCount} of {Object.keys(item.session).length} Sessions</Text>
        <Progress.Bar
          color={'white'}
          progress={seek}
          style={styles.FlatListSessionProgres}
          unfilledColor={'#ffffff5e'}
          borderWidth={0}
        />
      </View>
    );
    return sessionView;
  }

  renderItem({ item }) {
    let sessionView = null;
    if (this.state.membershipType === 'Free' && item.streakVisitedSessionCount === 0) {
      sessionView = (
        <View style={{ bottom: '10%', marginTop: '80%' }}>
          <Text style={styles.freeText}>Try a free session</Text>
          <Text style={styles.sessionCountText}>{Object.keys(item.session).length} Sessions</Text>
        </View>
      );
    } else if (this.state.membershipType === 'Free' && item.streakVisitedSessionCount > 0) {
      sessionView = this.paidBundleView(item);
    } else {
      sessionView = this.paidBundleView(item);
    }

    return (
      <TouchableOpacity onPress={() => { this.getSessionData(item); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.bundle_img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.bundle_name}</Text>
            {sessionView}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  goToDiveThruPlayer(item) {
    const bundleName = item.bundle_name;
    const catId = this.state.categoryAllData.cat_Id;
    const rowdata = {
      session_name: item.session_name,
      session_img: item.session_img,
      session_id: item.session_id,
      session_description: item.session_description,
      meditation_audio: item.meditation_audio,
      meditation_audio_time: item.meditation_audio_time,
      last_conversation_id: this.state.last_conversation_id,
      halted: this.state.halted,
    };
    if (this.state.membershipType === 'Paid') {
      this.props.screenProps.navigation.navigate('DiveThruPlayer', { rowdata, bundleName, catId, category: this.props.item, returnData: this.fetchUserLastConversationData.bind(this) });
    }
  }

  renderBundleItem({ item }) {
    let lock = null;
    if (this.state.membershipType === 'Free') {
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

    return (
      <TouchableOpacity onPress={() => { this.goToDiveThruPlayer(item); }} activeOpacity={1}>
        <View>
          <ImageBackground
            source={{ uri: item.session_img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.session_name}</Text>
            {lock}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let category = null;
    if (this.state.tabscreen === 'Category') {
      category = (<ListView
        dataSource={this.state.dataSource}
        enableEmptySections
        // cloneWithRows
        removeClippedSubviews={false}
        renderRow={rowdata => this.renderGridItem(rowdata)}
        contentContainerStyle={styles.listView}
      />);
    } else if (this.state.tabscreen === 'Bundle') {
      category = (<ListView
        style={styles.SubCategoryList}
        dataSource={this.state.dataSource}
        enableEmptySections
        // cloneWithRows
        removeClippedSubviews={false}
        renderRow={data => (
          <View style={styles.MainList}>
            <Text style={styles.MainListText}>{data.bundle_name.toUpperCase()}</Text>
            {
              (data.session.length > 0)
              ?
                <ScrollView horizontal>
                  <FlatList
                    horizontal
                    removeClippedSubviews={false}
                    data={data.session}
                    style={styles.FlatListViewStyle}
                    renderItem={e => this.renderBundleItem(e)}
                  />
                </ScrollView>
              : null
            }
          </View>
        )}
      />);
    } else {
      category = (<ListView
        style={styles.SubCategoryList}
        dataSource={this.state.dataSource}
        enableEmptySections
        // cloneWithRows
        removeClippedSubviews={false}
        renderRow={data => (
          <View style={styles.MainList}>
            <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
            {
              (data.bundle.length > 0)
              ?
                <ScrollView horizontal>
                  <FlatList
                    horizontal
                    removeClippedSubviews={false}
                    data={data.bundle}
                    style={styles.FlatListViewStyle}
                    renderItem={e => this.renderItem(e)}
                  />
                </ScrollView>
              : null
            }
          </View>
        )}
      />);
    }
    return (
      <View style={styles.container}>
        {category}
        { /*
          (this.state.tabscreen === 'Category')
          ?
            <ListView
              dataSource={this.state.dataSource}
              enableEmptySections
              // cloneWithRows
              removeClippedSubviews={false}
              renderRow={rowdata => this.renderGridItem(rowdata)}
              contentContainerStyle={styles.listView}
            />
          :
            <ListView
              style={styles.SubCategoryList}
              dataSource={this.state.dataSource}
              enableEmptySections
              // cloneWithRows
              removeClippedSubviews={false}
              renderRow={data => (
                <View style={styles.MainList}>
                  <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
                  {
                    (data.bundle.length > 0)
                    ?
                      <ScrollView horizontal>
                        <FlatList
                          horizontal
                          removeClippedSubviews={false}
                          data={data.bundle}
                          style={styles.FlatListViewStyle}
                          renderItem={e => this.renderItem(e)}
                        />
                      </ScrollView>
                    : null
                  }
                </View>
              )}
            />
            */ }
      </View>
    );
  }
}

CategoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  index: PropTypes.number,
  item: PropTypes.string,
  screenProps: PropTypes.object.isRequired,
};
export default CategoryScreen;
