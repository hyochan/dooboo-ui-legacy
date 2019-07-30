import React, { Component } from 'react';

import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

class Item extends Component {
  static defaultProps = {
    switchOn: false,
    onPress: () => {},
    containerStyle: {
      width: 72,
      height: 36,
      borderRadius: 18,
      backgroundColor: 'rgb(227,227,227)',
      padding: 3,
    },
    circleStyle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'white', // rgb(102,134,205)
    },
    backgroundColorOn: 'rgb(227,227,227)',
    backgroundColorOff: 'rgb(215,215,215)',
    circleColorOff: 'white',
    circleColorOn: 'rgb(102,134,205)',
    duration: 300,
  };

  static propTypes = {
    switchOn: PropTypes.bool,
    onPress: PropTypes.func,
    containerStyle: PropTypes.any,
    circleStyle: PropTypes.any,
    backgroundColorOff: PropTypes.string,
    backgroundColorOn: PropTypes.string,
    circleColorOff: PropTypes.string,
    circleColorOn: PropTypes.string,
    duration: PropTypes.number,
    type: PropTypes.number,

    buttonText: PropTypes.string,
    backTextRight: PropTypes.string,
    backTextLeft: PropTypes.string,

    buttonTextStyle: PropTypes.any,
    textRightStyle: PropTypes.any,
    textLeftStyle: PropTypes.any,

    buttonStyle: PropTypes.any,
    buttonContainerStyle: PropTypes.any,
    rightContainerStyle: PropTypes.any,
    leftContainerStyle: PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.switchOn !== this.props.switchOn) {
      this.runAnimation();
    }
    return true;
  }

  onPress = () => {
    this.props.onPress();
  };

  getStart = () => {
    return this.props.type === undefined ? 0 : this.props.type === 0 ? 0 : this.props.containerStyle.padding * 2;
  };

  runAnimation = () => {
    // this.state.anim.setValue(0);
    const animValue: any = {
      fromValue: this.props.switchOn ? 1 : 0,
      toValue: this.props.switchOn ? 0 : 1,
      duration: this.props.duration,
    };
    Animated.timing(this.state.animXValue, animValue).start();
    // Animated.timing(this.state.anim, animValue).start(() => this.runAnimation());
  };

  constructor(props) {
    super(props);
    const endPos = this.props.containerStyle.width - (this.props.circleStyle.width + this.props.containerStyle.padding * 2);
    this.state = {
      circlePosXStart: this.getStart(),
      circlePosXEnd: endPos,
      animXValue: new Animated.Value(this.props.switchOn ? 1 : 0),
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.5}
      >
        <Animated.View
          style={[
            styles.container,
            this.props.containerStyle,
            {
              backgroundColor: this.state.animXValue.interpolate({
                inputRange: [ 0, 1 ],
                outputRange: [ this.props.backgroundColorOff, this.props.backgroundColorOn ],
              }),
            },
          ]}
        >
          {
            this.generateLeftText()
          }
          <Animated.View
            style={[
              this.props.circleStyle,
              {
                backgroundColor: this.state.animXValue.interpolate({
                  inputRange: [ 0, 1 ],
                  outputRange: [ this.props.circleColorOff, this.props.circleColorOn ],
                }),
              },
              {
                transform: [
                  {
                    translateX: this.state.animXValue.interpolate({
                      inputRange: [ 0, 1 ],
                      outputRange: [ this.state.circlePosXStart, this.state.circlePosXEnd ],
                    }),
                  },
                ],
              },
              this.props.buttonStyle,
            ]}>
            <Animated.View style={this.props.buttonContainerStyle}>
              <Text style={this.props.buttonTextStyle}>{this.props.buttonText}</Text>
            </Animated.View>
          </Animated.View>
          {
            this.generateRightText()
          }
        </Animated.View>
      </TouchableOpacity>
    );
  }

  generateRightText() {
    return (
      <Animated.View style={this.props.rightContainerStyle}>
        <Text style={this.props.textRightStyle}>{this.props.backTextRight}</Text>
      </Animated.View>
    );
  }

  generateLeftText() {
    return (
      <Animated.View style={this.props.leftContainerStyle}>
        <Text style={this.props.textLeftStyle}>{this.props.backTextLeft}</Text>
      </Animated.View>
    );
  }
}

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Item;
