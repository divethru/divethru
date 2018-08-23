import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PanResponder, View, Platform, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { colors } from '../styles/theme';

class CircularSlider extends Component {
  constructor(props) {
    super(props);
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

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderMove: (e, gs) => {
        const xOrigin = this.props.xCenter - (this.props.dialRadius + this.props.btnRadius);
        const yOrigin = this.props.yCenter - (this.props.dialRadius + this.props.btnRadius);
        const a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
        this.props.onValueChange(a);
      },
    });
  }

  polarToCartesian(angle) {
    const r = this.props.dialRadius;
    const hC = this.props.dialRadius + this.props.btnRadius;
    const a = (angle - 90) * Math.PI / 180.0;

    const x = hC + (r * Math.cos(a));
    const y = hC + (r * Math.sin(a));
    return { x, y };
  }

  cartesianToPolar(x, y) {
    const hC = this.props.dialRadius + this.props.btnRadius;

    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    }
    return (Math.round((Math.atan((y - hC) / (x - hC))) * 180 / Math.PI) + (x > hC ? 90 : 270));
  }

  render() {
    const width = (this.props.dialRadius + this.props.btnRadius) * 2;
    const bR = this.props.btnRadius;
    const dR = this.props.dialRadius;
    const startCoord = this.polarToCartesian(0);
    const endCoord = this.polarToCartesian(this.props.angle);

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        <Svg
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
            >
              {this.props.onValueChange(this.state.angle)}
            </Text>
          </G>
        </Svg>
      </View>
    );
  }
}

CircularSlider.defaultProps = {
  meterColor: colors.red100,
  textColor: colors.blue100,
  onTouchUp: undefined,
  playState: 'play-arrow',
  btnRadius: 15,
  dialRadius: 60,
  dialWidth: 5,
  width: 0,
  height: 0,
  textSize: 10,
  value: 0,
  angle: 0,
  xCenter: Dimensions.get('window').width / 2,
  yCenter: Dimensions.get('window').height / 2,
  onValueChange: undefined,
};

CircularSlider.propTypes = {
  dialRadius: PropTypes.number,
  btnRadius: PropTypes.number,
  xCenter: PropTypes.number,
  yCenter: PropTypes.number,
  onValueChange: PropTypes.func,
  width: PropTypes.number,
  textSize: PropTypes.number,
  height: PropTypes.number,
  angle: PropTypes.number,
  meterColor: PropTypes.string,
  textColor: PropTypes.string,
  playState: PropTypes.string,
};

export default CircularSlider;
