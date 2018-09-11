import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

class Loader extends Component {
  render() {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          position: 'absolute',
          backgroundColor: '#56565666',
          zIndex: 1,
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator animating style={[{ height: 80, width: 80, backgroundColor: '#565656', opacity: 0.8, borderRadius: 10 }]} size="large" />
      </View>
    );
  }
}

export default Loader;
