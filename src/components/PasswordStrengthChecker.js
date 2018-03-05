/**
 * Created by dungtran on 8/20/17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';

const { width: wWidth } = Dimensions.get('window');

const widthByPercent = (percentage, containerWidth = wWidth) => {
  const value = (percentage * containerWidth) / 100;
  return Math.round(value);
};

const regex = {
  digitsPattern: /\d/,
  lettersPattern: /[a-zA-Z]/,
  lowerCasePattern: /[a-z]/,
  upperCasePattern: /[A-Z]/,
  wordsPattern: /\w/,
  symbolsPattern: /\W/,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
  input: {
    fontSize: 14,
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    fontFamily: 'Roboto',
  },
  passwordStrengthWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  passwordStrengthBar: {
    height: 8,
    position: 'relative',
    top: 5,
    bottom: 5,
    left: 10,
    borderRadius: 5,
  },
  innerPasswordStrengthBar: {
    height: 10,
    borderRadius: 5,
    width: 0,
  },
  strengthDescription: {
    color: '#fff',
    backgroundColor: 'transparent',
    textAlign: 'right',
    position: 'absolute',
    right: 5,
    top: 1,
    fontSize: 14,
  },
});

export default class PasswordStrengthChecker extends Component {
  static defaultProps = {
    minLevel: 2,
    minLength: 0,
    ruleNames: 'lowerCase|upperCase|digits|symbols',
    strengthLevels: [
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: 33,
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Weak',
        labelColor: '#fff',
        widthPercent: 33,
        innerBarColor: '#fe6c6c',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: 67,
        innerBarColor: '#feb466',
      },
      {
        label: 'Fair',
        labelColor: '#fff',
        widthPercent: 67,
        innerBarColor: '#feb466',
      },
      {
        label: 'Strong',
        labelColor: '#fff',
        widthPercent: 100,
        innerBarColor: '#6cfeb5',
      },
    ],
    tooShort: {
      enabled: false,
      labelColor: '#fff',
      label: 'Too short',
      widthPercent: 33,
      innerBarColor: '#fe6c6c',
    },
    barColor: '#ffffff',
    barWidthPercent: 70,
    showBarOnEmpty: true,
  };

  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    minLength: PropTypes.number,
    ruleNames: PropTypes.string,
    strengthLevels: PropTypes.array,
    tooShort: PropTypes.object,
    minLevel: PropTypes.number,
    inputWrapperStyle: PropTypes.style,
    inputStyle: PropTypes.style,
    strengthWrapperStyle: PropTypes.style,
    strengthBarStyle: PropTypes.style,
    innerStrengthBarStyle: PropTypes.style,
    strengthDescriptionStyle: PropTypes.style,
    barColor: PropTypes.string,
    barWidthPercent: PropTypes.number,
    showBarOnEmpty: PropTypes.bool,
    send: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.animatedInnerBarWidth = new Animated.Value(0);
    this.animatedBarWidth = new Animated.Value(0);
    this.state = {
      level: -1,
      isTooShort: false,
    };
  }

  componentDidMount() {
    const { showBarOnEmpty } = this.props;
    if (showBarOnEmpty) {
      this.showFullBar();
    }
  }

  onChangeText(password) {
    const level = this.getPasswordStrengthLevel(password);
    this.setState({
      level,
    });
    const isValid = this.isMatchingRules(password) && level >= this.props.minLevel;
    this.props.onChangeText(password, isValid);
  }

  getPasswordStrengthLevel(password) {
    return this.calculateScore(password);
  }

  calculateScore(text) {
    if (!text) {
      this.setState({
        isTooShort: false,
      });
      return -1;
    }

    if (this.isTooShort(text)) {
      this.setState({
        isTooShort: true,
      });
      return 0;
    }

    this.setState({
      isTooShort: false,
    });

    if (!this.isMatchingRules(text)) {
      return 0;
    }

    return zxcvbn(text).score;
  }

  isTooShort(password) {
    const { minLength } = this.props;
    if (!minLength) {
      return true;
    }
    return password.length < minLength;
  }

  isMatchingRules(password) {
    const { ruleNames } = this.props;
    if (!ruleNames) {
      return true;
    }

    const rules = _.chain(ruleNames)
      .split('|')
      .filter(rule => !!rule)
      .map(rule => rule.trim())
      .value();

    for (const rule of rules) {
      if (!this.isMatchingRule(password, rule)) {
        return false;
      }
    }
    return true;
  }

  isMatchingRule(password, rule) {
    switch (rule) {
      case 'symbols':
        return regex.symbolsPattern.test(password);
      case 'words':
        return regex.wordsPattern.test(password);
      case 'digits':
        return regex.digitsPattern.test(password);
      case 'letters':
        return regex.lettersPattern.test(password);
      case 'lowerCase':
        return regex.lowerCasePattern.test(password);
      case 'upperCase':
        return regex.upperCasePattern.test(password);
      default:
        return true;
    }
  }

  showFullBar(isShow = true) {
    const { barWidthPercent } = this.props;
    const barWidth = isShow ? widthByPercent(barWidthPercent) : 0;
    Animated.timing(this.animatedBarWidth, {
      toValue: barWidth,
      duration: 20,
    }).start();
  }

  renderPasswordInput() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
          underlineColorAndroid="transparent"
          {...this.props}
          onChangeText={text => this.onChangeText(text)}
        />
      </View>
    );
  }

  renderPasswordStrength() {
    const {
      barWidthPercent,
      tooShort,
      strengthLevels,
      barColor,
      strengthWrapperStyle,
      strengthBarStyle,
      innerStrengthBarStyle,
      strengthDescriptionStyle,
      showBarOnEmpty,
    } = this.props;

    const barWidth = widthByPercent(barWidthPercent);

    const { level } = this.state;

    let strengthLevelBarStyle = {};
    let strengthLevelLabelStyle = {};
    let strengthLevelLabel = '';
    let innerBarWidth = 0;

    if (level !== -1) {
      if (!showBarOnEmpty) {
        this.showFullBar();
      }

      innerBarWidth = widthByPercent(strengthLevels[level].widthPercent, barWidth);
      strengthLevelBarStyle = {
        backgroundColor: strengthLevels[level].innerBarColor,
      };

      strengthLevelLabelStyle = {
        color: strengthLevels[level].labelColor,
      };
      strengthLevelLabel = strengthLevels[level].label;

      if (tooShort.enabled && this.state.isTooShort) {
        innerBarWidth = widthByPercent(tooShort.widthPercent, barWidth) ||
                        widthByPercent(strengthLevels[level].widthPercent, barWidth);
        strengthLevelBarStyle = {
          backgroundColor: tooShort.innerBarColor || strengthLevels[level].innerBarColor,
        };
        strengthLevelLabelStyle = {
          color: tooShort.labelColor || strengthLevels[level].labelColor,
        };
        strengthLevelLabel = tooShort.label || strengthLevels[level].label;
      }
    } else {
      if (!showBarOnEmpty) {
        this.showFullBar(false);
      }
    }

    Animated.timing(this.animatedInnerBarWidth, {
      toValue: innerBarWidth,
      duration: 800,
    }).start();

    return (
      <View style={[styles.passwordStrengthWrapper, strengthWrapperStyle]}>
        <Animated.View
          style={
          [styles.passwordStrengthBar,
            strengthBarStyle,
            { backgroundColor: barColor, width: this.animatedBarWidth }
          ]}
        >
          <Animated.View
            style={
            [styles.innerPasswordStrengthBar,
              innerStrengthBarStyle,
              { ...strengthLevelBarStyle, width: this.animatedInnerBarWidth }
            ]}
          />
        </Animated.View>
        <Text
          style={
          [styles.strengthDescription,
            strengthDescriptionStyle,
            { ...strengthLevelLabelStyle },
          ]}
        >
          {strengthLevelLabel}
        </Text>
      </View>
    );
  }

  render() {
    const isSet = (this.props.send) ? this.renderPasswordStrength() : null;
    return (
      <View style={styles.wrapper}>
        {this.renderPasswordInput()}
        {isSet}
      </View>
    );
  }
}
