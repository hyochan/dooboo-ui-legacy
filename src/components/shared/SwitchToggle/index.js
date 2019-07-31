import React, {
  Component,
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

function Item(props) {
  const getStart = () => {
    return props.type === undefined
      ? 0 : props.type === 0
        ? 0 : props.containerStyle.padding * 2;
  };

  const runAnimation = () => {
    const animValue = {
      fromValue: props.switchOn ? 0 : 1,
      toValue: props.switchOn ? 1 : 0,
      duration: props.duration,
    };
    Animated.timing(animXValue, animValue).start();
  };

  const [endPos, setEndPos] = useState(props.containerStyle.width -
    (props.circleStyle.width + props.containerStyle.padding * 2));
  const [circlePosXEnd, setCirclePosXEnd] = useState(endPos);
  const [animXValue, setAnimXValue] = useState(
    new Animated.Value(props.switchOn ? 1 : 0),
  );
  const [circlePosXStart, setCirclePosXStart] = useState(getStart());

  const prevSwitchOnRef = useRef();
  useEffect(() => {
    prevSwitchOnRef.current = props.switchOn;
    if (prevSwitchOn !== props.switchOn) {
      runAnimation();
    }
  }, [props.switchOn]);
  const prevSwitchOn = !!prevSwitchOnRef.current;

  const generateRightText = () => {
    return (
      <Animated.View style={props.rightContainerStyle}>
        <Text style={props.textRightStyle}>{props.backTextRight}</Text>
      </Animated.View>
    );
  };

  const generateLeftText = () => {
    return (
      <Animated.View style={props.leftContainerStyle}>
        <Text style={props.textLeftStyle}>{props.backTextLeft}</Text>
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.5}
    >
      <Animated.View
        style={[
          styles.container,
          props.containerStyle,
          {
            backgroundColor: animXValue.interpolate({
              inputRange: [0, 1],
              outputRange: [props.backgroundColorOff, props.backgroundColorOn],
            }),
          },
        ]}
      >
        { generateLeftText() }
        <Animated.View
          style={[
            props.circleStyle,
            {
              backgroundColor: animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [props.circleColorOff, props.circleColorOn],
              }),
            },
            {
              transform: [
                {
                  translateX: animXValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      circlePosXStart,
                      circlePosXEnd,
                    ],
                  }),
                },
              ],
            },
            props.buttonStyle,
          ]}>
          <Animated.View style={props.buttonContainerStyle}>
            <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
          </Animated.View>
        </Animated.View>
        { generateRightText() }
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles: any = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

Item.defaultProps = {
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

Item.propTypes = {
  switchOn: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  circleStyle: ViewPropTypes.style,
  backgroundColorOff: PropTypes.string,
  backgroundColorOn: PropTypes.string,
  circleColorOff: PropTypes.string,
  circleColorOn: PropTypes.string,
  duration: PropTypes.number,
  type: PropTypes.number,

  buttonText: PropTypes.string,
  backTextRight: PropTypes.string,
  backTextLeft: PropTypes.string,

  buttonTextStyle: Text.propTypes.style,
  textRightStyle: Text.propTypes.style,
  textLeftStyle: Text.propTypes.style,

  buttonStyle: ViewPropTypes.style,
  buttonContainerStyle: ViewPropTypes.style,
  rightContainerStyle: ViewPropTypes.style,
  leftContainerStyle: ViewPropTypes.style,
};

export default Item;
