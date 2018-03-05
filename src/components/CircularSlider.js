import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, View, Platform, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { colors } from '../styles/theme';
// import IC_PLAY from '../assets/images/ic_close.png';

class CircularSlider extends Component {
  constructor(props) {
    super(props);
    // this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.cartesianToPolar = this.cartesianToPolar.bind(this);
    this.polarToCartesian = this.polarToCartesian.bind(this);
    const { width, height } = props;
    const smallestSide = (Math.min(width, height));
    this.state = {
      cx: (width / 2) + 15,
      cy: (height / 2) + 15,
      r: (smallestSide / 2) * 0.85,

      c1x: width / 2,
      c1y: height / 2,
      r1: (smallestSide / 2) * 0.76,
      angle: this.props.angle,
    };
  }
  componentWillMount = () => {
    // this._panResponder = PanResponder.create({
    //   onStartShouldSetPanResponder: () => true,
    //   onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    //   onMoveShouldSetPanResponder: () => true,
    //   onPanResponderMove: this.handlePanResponderMove,
    //   onPanResponderEnd: (e, gestureState) => {
    //     console.log(gestureState);
    //     return true;
    //   },
    // });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        const xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
        const yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
        const a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
        // this.setState({ angle: a });
        // this.angle = a;
        this.props.onValueChange(a);
      },
      // onPanResponderRelease: (e, gs) => {
      //   const xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
      //   const yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
      //   const a = this.cartesianToPolar(gs.moveX, gs.moveY);
      //   alert('callled' + a);
      //   this.props.angle = a;
      //   // this.setState({ angle: a });
      //   this.props.onValueChange(a);
      //   // this.props.angle = a;
      // },
    });
  }

  polarToCartesian(angle) {
    let r = this.props.dialRadius;
    let hC = this.props.dialRadius + this.props.btnRadius;
    let a = (angle - 90) * Math.PI / 180.0;

    let x = hC + (r * Math.cos(a));
    let y = hC + (r * Math.sin(a));
    return {x, y};
  }

  cartesianToPolar(x, y) {
    let hC = this.props.dialRadius + this.props.btnRadius;

    if (x === 0) {
      return y>hC ? 0 : 180;
    }
    else if (y === 0) {
      return x>hC ? 90 : 270;
    }
    else {
      return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) +
        (x > hC ? 90 : 270));
    }
  }

  // polarToCartesian(angle) {
  //   const { cx, cy, r } = this.state;
  //   const a = (angle - 90) * (Math.PI / 180.0);
  //   const x = cx + (r * Math.cos(a));
  //   const y = cy + (r * Math.sin(a));
  //   return { x, y };
  // }

  // cartesianToPolar(x, y) {
  //   const { cx, cy } = this.state;
  //   return Math.round((Math.atan(((y - cy) / (x - cx))) / (Math.PI / 180)) + ((x > cx) ? 90 : 270));
  // }

  // handlePanResponderMove({ nativeEvent: { locationX, locationY } }) {
  //   this.props.onValueChange(this.cartesianToPolar(locationX, locationY));
  // }

  render() {
    // const { width, height, value, meterColor } = this.props;
    const { cx, cy, r, c1x, c1y, r1 } = this.state;
    // const startCoord = this.polarToCartesian(0);
    // const endCoord = this.polarToCartesian(value);

    let width = (this.props.dialRadius + this.props.btnRadius) * 2;
    let bR = this.props.btnRadius;
    let dR = this.props.dialRadius;
    let startCoord = this.polarToCartesian(0);
    let endCoord = this.polarToCartesian(this.props.angle);

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
      <Svg
        // onLayout={this.onLayout}
        width={150}
        height={150}
        style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 35, marginBottom: 40, backgroundColor: colors.transparent }}
      >
        <Circle
          cx={width / 2}
          cy={width / 2}
          r={dR}
          stroke={colors.white}
          strokeWidth={16}
          fill="none"
          opacity="0.2"
        />
        <Circle
          cx={width / 2}
          cy={width / 2}
          r={52}
          stroke="#eee"
          strokeWidth={0}
          fill={colors.white}
        />
        { Platform.OS === 'ios'
           ? (
             <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 70, height: 70, backgroundColor: colors.transparent }} >
               <Icon name={this.props.playState} size={50} style={{ color: colors.grey700, position: 'absolute' }} />
             </View>
            )
          : null }
        <Path
          stroke={colors.white}
          opacity="0.5"
          strokeWidth={16}
          fill="none"
          d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${this.state.angle > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
          // d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${endCoord.y}`}
        />
        <G x={endCoord.x - bR} y={endCoord.y - bR}>
          <Circle
            r={bR}
            cx={bR}
            cy={bR}
            fill={this.props.meterColor}
            {...this._panResponder.panHandlers}
          />
          <Text
            x={bR}
            y={bR - (this.props.textSize / 2)}
            fontSize={this.props.textSize}
            fill={this.props.textColor}
            textAnchor="middle"
          >{this.props.onValueChange(this.state.angle)+''}</Text>
        </G>
        {/* <G
          x={endCoord.x - 6.5}
          y={endCoord.y - 6.5}
        >
          <Circle
            cx={6.5}
            cy={6.5}
            r={15}
            fill={colors.transparent}
            {...this._panResponder.panHandlers}
            // onTouchUp={() => { this.props.onTouchUp(); }}
          />
        </G> */}
      </Svg>
        {/* { Platform.OS === 'ios'
          ? null
          : (
            // <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 70, height: 70, backgroundColor: colors.transparent }} >
              <Icon name={this.props.playState} size={50} style={{ color: colors.grey700, position: 'absolute' }} />
            // </View>
           )} */}
      </View>
    );
  }
}

CircularSlider.defaultProps = {
  // width: 120,
  // height: 120,
  // value: 0,
  meterColor: colors.red100,
  textColor: colors.blue100,
  // onValueChange: undefined,
  onTouchUp: undefined,
  playState: 'play-arrow',

  btnRadius: 15,
  dialRadius: 60,
  dialWidth: 5,
  textSize: 10,
  value: 0,
  angle: 0,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
  // onValueChange: x => x,
};

CircularSlider.propTypes = {
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  dialWidth: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  onValueChange: PropTypes.func,
  onTouchUp: PropTypes.func,
  width: PropTypes.number,
  textSize: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.number,
  angle: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  playState: PropTypes.string,
};

export default CircularSlider;
