import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  testID?: string;
  switchOn: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
  circleStyle?: ViewStyle;
  backgroundColorOn?: string;
  backgroundColorOff?: string;
  backgroundImageOn?: React.ReactElement;
  backgroundImageOff?: React.ReactElement;
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
  // limitation: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12202
  buttonContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  RTL?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

function SwitchToggle(props: Props): React.ReactElement {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          ((props.containerStyle.padding as number) || 0) * 2)
      : 0;

  const circlePosXEnd = props.RTL ? -endPos : endPos;
  const [circlePosXStart] = useState(getStart());

  const prevSwitchOnRef = useRef<boolean>();
  const prevSwitchOn = !!prevSwitchOnRef.current;

  useEffect(() => {
    prevSwitchOnRef.current = props.switchOn;

    if (prevSwitchOn !== props.switchOn) runAnimation();
  }, [prevSwitchOn, props.switchOn, runAnimation]);

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

  const generateLeftIcon = (): React.ReactElement => {
    return (
      <View style={{ position: 'absolute', left: 5 }}>
        {props.backgroundImageOn}
      </View>
    );
  };

  const generateRightIcon = (): React.ReactElement => {
    return (
      <View style={{ position: 'absolute', right: 5 }}>
        {props.backgroundImageOff}
      </View>
    );
  };

  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={props.onPress}
      activeOpacity={0.5}>
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
        ]}>
        {generateLeftText()}
        {props.switchOn && generateLeftIcon()}
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
          ]}>
          <Animated.View style={props.buttonContainerStyle}>
            <Text style={props.buttonTextStyle}>{props.buttonText}</Text>
          </Animated.View>
        </Animated.View>
        {generateRightText()}
        {!props.switchOn && generateRightIcon()}
      </Animated.View>
    </TouchableOpacity>
  );
}

export { SwitchToggle };
