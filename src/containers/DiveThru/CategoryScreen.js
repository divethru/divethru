import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, ListView, ImageBackground, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { PropTypes } from 'prop-types';
import styles from '../../styles/category';
import firebaseApp from '../../components/constant';

class CategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarOnPress({ jumpToIndex, scene }) {
        jumpToIndex(scene.index);
        navigation.state.params.callServer(scene.index);
      },
      header: null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }
  componentWillMount() {
    this.fetchCategoryWiseData();
    StatusBar.setHidden(false);
    // StatusBar.setTranslucent(false);
    this.props.navigation.setParams({ callServer: this.callServer });   
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
      categoryData.forEach((child) => {
        categoryFinalData.push({
          id: child.session_id,
          img: child.session_img,
          name: child.session_name,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(categoryFinalData),
      });
    } else if (categoryAllData.bundle) {
      const categoryData = categoryAllData.bundle;
      this.setState({ categoryData });
      const categoryFinalData = [];
      categoryData.forEach((child) => {
        categoryFinalData.push({
          id: child.bundle_id,
          img: child.bundle_img,
          name: child.bundle_name,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(categoryFinalData),
      });
    } else if (categoryAllData.SubCategory) {
      const categoryData = categoryAllData.SubCategory;
      this.props.navigation.navigate('SubCategory', { categoryData });
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
              this.props.navigation.navigate('Session', { sessionData, name });
            }
          }
        });
      }
    }
  }

  fetchCategoryWiseData() {
    const ref = firebaseApp.database().ref('Category');
    const arrayCategory = [];

    ref.once('value').then((dataSnapshot) => {
      if (dataSnapshot.exists()) {
        console.log(JSON.stringify(dataSnapshot));
        dataSnapshot.forEach((child) => {
          const arraySessionAllData = [];
          const arraySubCategoryAllData = [];
          const arrayBundleAllData = [];
          if (child.val().Session) {
            const CategoryName = child.val().category_name;
            const CategoryDescription = child.val().category_description;
            let arraySession = [];
            arraySession = child.val().Session;

            Object.keys(arraySession).forEach((key) => {
              const value = arraySession[key];
              arraySessionAllData.push({
                session_name: value.session_name,
                session_img: value.session_img,
                session_id: value.session_id,
                session_description: value.session_description,
                meditation_audio: value.meditation_audio[0],
              });
            });
            arrayCategory.push({
              cat_name: CategoryName,
              cat_desc: CategoryDescription,
              session: arraySessionAllData,
            });
          } else if (child.val().Bundle) {
            const CategoryName = child.val().category_name;
            const CategoryDescription = child.val().category_description;

            let arrayBundle = [];
            arrayBundle = child.val().Bundle;
            Object.keys(arrayBundle).forEach((key) => {
              let value = [];
              value = arrayBundle[key];
              const sessionRry = value.Session ? value.Session : [];
              const arrayNewSession = [];
              if (sessionRry !== undefined) {
                Object.keys(sessionRry).forEach((key1) => {
                  const value1 = sessionRry[key1];
                  arrayNewSession.push({
                    session_name: value1.session_name,
                    session_img: value1.session_img,
                    session_id: value1.session_id,
                    session_description: value1.session_description,
                    meditation_audio: value1.meditation_audio[0],
                  });
                });
              }
              arrayBundleAllData.push({
                bundle_name: value.bundle_name,
                bundle_img: value.bundle_img,
                bundle_id: value.bundle_id,
                bundle_description: value.bundle_description,
                session: arrayNewSession,
              });
            });

            arrayCategory.push({
              cat_name: CategoryName,
              cat_desc: CategoryDescription,
              bundle: arrayBundleAllData,
            });
          } else {
            const CategoryName = child.val().category_name;
            const CategoryDescription = child.val().category_description;
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
                  if (sessionRry !== undefined) {
                    Object.keys(sessionRry).forEach((key2) => {
                      const value2 = sessionRry[key2];

                      arrayNewSession.push({
                        session_name: value2.session_name,
                        session_img: value2.session_img,
                        session_id: value2.session_id,
                        session_description: value2.session_description,
                        meditation_audio: value2.meditation_audio[0],
                      });
                    });
                  }

                  arrayNewBundle.push({
                    bundle_name: value1.bundle_name,
                    bundle_img: value1.bundle_img,
                    bundle_id: value1.bundle_id,
                    bundle_description: value1.bundle_description,
                    session: arrayNewSession,
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
              });
            });

            arrayCategory.push({
              cat_name: CategoryName,
              cat_desc: CategoryDescription,
              SubCategory: arraySubCategoryAllData,
            });
          }
        });
        this.setState({ allData: arrayCategory });
        this.callServer(0);
      }
    });
    // return arrayCategory;
  }
  renderGridItem(rowdata) {
    return (
      <TouchableOpacity onPress={() => { this.getSession(rowdata.id, rowdata.name); }} style={styles.gridItem}>
        <View style={styles.gridItemImage}>
          <ImageBackground
            source={{ uri: rowdata.img }}
            style={{ width: '100%', height: '100%' }}
          >
            <Text style={styles.gridItemText}>{rowdata.name}</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
         {/* <StatusBar
            backgroundColor="rgba(0, 0, 0, 0.30)"
            animated
            hidden={false}
          /> */}
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

CategoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default CategoryScreen;
