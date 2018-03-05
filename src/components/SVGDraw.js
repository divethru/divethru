import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import Svg, { G, Path, Circle, ClipPath, Defs, LinearGradient, Stop } from 'react-native-svg';
import path from './svg';

const distancePerPoint = 1;
const drawFPS = 60;
const MetricsPath = require('art/metrics/path');

let length;
let timer;

class SVGDraw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      // scale: new Animated.Value(0),
    };
    // this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this._animateEntrance();
    // this.startDrawingPath();
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  increaseLength() {
    // const pathLength = (<Path d={path} />).getTotalLength();
    const pathMetrics = new MetricsPath(path);
    const pathLength = pathMetrics.length;
    // const pathLength = path.getTotalLength();
    length += distancePerPoint;
    // // path.style.strokeDasharray = [length, pathLength].join(' ');
    return (<Path
      d={path}
      stroke="white"
      stroke-width="2"
      fill="none"
      strokeDasharray={[length, pathLength].join(' ')}
      // strokeDashoffset="91.09"
      // strokeLinecap='round'
      // opacity='0.5'
      // strokeDashoffset={0}
      // animationName='draw'
    />);

    // if (length >= pathLength) {
    //   clearInterval(timer);
    // }
  }

  startDrawingPath() {
    length = 0;
    // path.style.stroke = '#000';
    timer = setInterval(() => {
      console.log('I do not leak!');
    }, (this.increaseLength(), 1000 / drawFPS));
    // timer = setInterval(3, 1000 / drawFPS);
    // alert(timer);
  }

  _animateEntrance() {
    requestAnimationFrame(() => {
      this.setState({value: this.state.value + 15});
      // This is some random number that I guessed to be the length of the Shape
      if (this.state.value <= 700) {
        requestAnimationFrame(this._animateEntrance.bind(this));
      }
    });
  }

  // animate() {
  //   Animated.sequence([
  //     Animated.timing(this.state.scale,
  //       {
  //         toValue: 1,
  //         duration: 2000,
  //       }),
  //     Animated.timing(this.state.scale,
  //       {
  //         toValue: 0,
  //         duration: 2000,
  //       }),
  //   ]).start(this.animate);
  // }

  render() {
    return (
      <View>
        <Svg height="400" width="400">
          <Path d={path}
            stroke="deeppink"
            strokeWidth="1"
            fill="#276015"
            // strokeDasharray={[this.state.value, 700]}
            // strokeDashoffset="91.09"
            strokeLinecap='round'
            // opacity='0.5'
            // strokeDashoffset={0}
            // animationName='draw'
          />
        </Svg>
      </View>
    );
  }
}

export default SVGDraw;
