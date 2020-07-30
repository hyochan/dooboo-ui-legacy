import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  testID?: string;
  switchOn: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
  circleStyle?: ViewStyle;
  backgroundColorOn?: string;
  backgroundColorOff?: string;
  circleColorOff?: string;
  circleColorOn?: string;
  duration?: number;
  type?: number;
  buttonText?: string;
  backTextRight?: string;
  backTextLeft?: string;
  buttonTextStyle?: StyleProp<TextStyle>;
  textRightStyle?: StyleProp<TextStyle>;
  textLeftStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  rightContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  leftContainerStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  RTL?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const SwitchToggle: React.FC<Props> = (props) => {
  const [animXValue] = useState(new Animated.Value(props.switchOn ? 1 : 0));
  const getStart = (): number | Record<string, unknown> | undefined => {
    // prettier-ignore
    return props.type === undefined
      ? 0
      : props.type === 0
        ? 0
        : props.containerStyle && props.containerStyle.padding
          ? (props.containerStyle.padding as number) * 2
          : {};
  };

  const runAnimation = (): void => {
    const animValue = {
      fromValue: props.switchOn ? 0 : 1,
      toValue: props.switchOn ? 1 : 0,
      duration: props.duration,
      useNativeDriver: false,
    };
    Animated.timing(animXValue, animValue).start();
  };

  const endPos =
    props.containerStyle && props.circleStyle
      ? (props.containerStyle.width as number) -
        ((props.circleStyle.width as number) +
          (props.containerStyle.padding as number || 0) * 2)
      : 0;
  const circlePosXEnd = props.RTL ? -endPos : endPos;
  const [circlePosXStart] = useState(getStart());

  const prevSwitchOnRef = useRef<boolean>();
  const prevSwitchOn = !!prevSwitchOnRef.current;
  useEffect(() => {
    prevSwitchOnRef.current = props.switchOn;
    if (prevSwitchOn !== props.switchOn) {
      runAnimation();
    }
  }, [props.switchOn]);

  const generateRightText = (): React.ReactElement => {
    return (
      <Animated.View style={props.rightContainerStyle}>
        <Text style={props.textRightStyle}>{props.backTextRight}</Text>
      </Animated.View>
    );
  };

  const generateLeftText = (): React.ReactElement => {
    return (
      <Animated.View style={props.leftContainerStyle}>
        <Text style={props.textLeftStyle}>{props.backTextLeft}</Text>
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity
      testID={props.testID}
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
              outputRange: [
                props.backgroundColorOff as string | number,
                props.backgroundColorOn as string | number,
              ] as string[] | number[],
            }),
          },
        ]}
      >
        {generateLeftText()}
        <Animated.View
          style={[
            props.circleStyle,
            {
              backgroundColor: animXValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  props.circleColorOff as string | number,
                  props.circleColorOn as string | number,
                ] as string[] | number[],
              }),
            },
            {
              transform: [
                {
                  translateX: animXValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      circlePosXStart as string | number,
                      circlePosXEnd as string | number,
                    ] as string[] | number[],
                  }),
                },
              ],
            },
            props.buttonStyle,
          ]}
        >
          <Animated.View style={props.buttonContainerStyle}>
            <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
          </Animated.View>
        </Animated.View>
        {generateRightText()}
      </Animated.View>
    </TouchableOpacity>
  );
};

SwitchToggle.defaultProps = {
  switchOn: false,
  onPress: (): void => {},
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

export default SwitchToggle;
