import React, { Component } from 'react';
import { View, Text, ListView, TouchableOpacity, ImageBackground, FlatList, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import styles from '../../styles/subCategory';

export default class SubCategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarFocus({ jumpToIndex, scene }) {
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
  componentDidMount() {
    const { params } = this.props.navigation.state;
    const categoryData = params ? params.categoryData : undefined;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(categoryData),
    });
  }

  getSessionData(item) {
    if (item.session !== null) {
      sessionData = item.session;
      name = item.bundle_name;
      this.props.navigation.navigate('Session', { sessionData, name });
    }
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={() => { this.getSessionData(item); }}>
        <View>
          <ImageBackground
            source={{ uri: item.bundle_img }}
            style={styles.FlatListImage}
          >
            <Text style={styles.FlatListText}>{item.bundle_name}</Text>
            <Text style={styles.FlatListSessionText}>{item.session.length} Sessions</Text>
            <Progress.Bar
              color={'white'}
              progress={0.3}
              style={styles.FlatListSessionProgres}
              unfilledColor={'#ffffff5e'}
              borderWidth={0}
            />
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={styles.SubCategoryList}
          dataSource={this.state.dataSource}
          enableEmptySections
          cloneWithRows
          renderRow={data => (
            <View style={styles.MainList}>
              <Text style={styles.MainListText}>{data.subcategory_name.toUpperCase()}</Text>
              {
                    (data.bundle.length > 0)
                    ?
                      <ScrollView horizontal>
                        <FlatList
                          horizontal
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
      </View>
    );
  }
}

SubCategoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
