import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, Animated } from 'react-native';

const width = Dimensions.get('window').width;

class PaginatedListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
    };
  }

  render() {
    const DivePages = [];

    if (this.props.totalLength > 3) {
      const position = Animated.divide(this.props.listScrollId, width);
      for (let k = 0; k < 2; k += 1) {
        const opacity = position.interpolate({
          inputRange: [k - 1, k, k + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        DivePages.push(
          <Animated.View
            key={k}
            style={{ opacity, height: 6, width: 6, backgroundColor: '#595959', margin: 4, borderRadius: 4 }}
          />,
        );
      }
    }
    return (
      <View
        style={{ flexDirection: 'row', marginTop: '-3%', justifyContent: 'center' }}
      >
        { DivePages }
      </View>
    );
  }
  }

PaginatedListView.propTypes = {
  listScrollId: PropTypes.object.isRequired,
  totalLength: PropTypes.number.isRequired,
};

export default PaginatedListView;
