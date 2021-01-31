import {
  ActivityIndicator,
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {useHover} from 'react-native-web-hooks';

const defaultStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 12,
    fontSize: 14,
    color: '#069ccd',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: 'rgb(200, 200, 200)',
  },
  disabledText: {
    color: '#969696',
  },
  hovered: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 10,
  },
});

type StylesType = Partial<StyleSheet.NamedStyles<typeof defaultStyles>>;

interface Props {
  testID?: string;
  indicatorColor?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styles?: StylesType;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
  text?: string;
  onPress?: TouchableOpacityProps['onPress'];
  touchableOpacityProps?: Partial<TouchableOpacityProps>;
  textProps?: Partial<TextProps>;
}

function Button({
  testID,
  disabled,
  loading,
  style,
  styles,
  indicatorColor = '#ffffff',
  leftElement,
  rightElement,
  activeOpacity = 0.7,
  text,
  onPress,
  touchableOpacityProps,
  textProps,
}: Props): React.ReactElement {
  const ref = useRef<TouchableOpacity>(null);
  const isHovered = useHover(ref);
  const [layout, setLayout] = useState<LayoutRectangle>();

  return (
    <TouchableOpacity
      testID={testID}
      ref={ref}
      activeOpacity={activeOpacity}
      onPress={onPress}
      delayPressIn={50}
      disabled={disabled}
      style={style}
      {...touchableOpacityProps}>
      {loading ? (
        <View
          style={[
            defaultStyles.container,
            styles?.container,
            {
              width: layout?.width,
              height: layout?.height,
            },
            isHovered && !disabled && [defaultStyles.hovered, styles?.hovered],
            disabled && [defaultStyles.disabledButton, styles?.disabledButton],
          ]}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </View>
      ) : (
        <View
          style={[
            defaultStyles.container,
            styles?.container,
            isHovered && !disabled && [defaultStyles.hovered, styles?.hovered],
            disabled && [defaultStyles.disabledButton, styles?.disabledButton],
          ]}
          onLayout={(e) => setLayout(e.nativeEvent.layout)}>
          {leftElement}
          <Text
            style={[
              defaultStyles.text,
              styles?.text,
              disabled && [defaultStyles.disabledText, styles?.disabledText],
            ]}
            {...textProps}>
            {text}
          </Text>
          {rightElement}
        </View>
      )}
    </TouchableOpacity>
  );
}

export {Button};
