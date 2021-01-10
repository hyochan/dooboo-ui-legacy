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
import React, { useRef, useState } from 'react';

import { useHover } from 'react-native-web-hooks';

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
    borderRadius: 4,
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
  activeOpacity?: number;
  text?: string;
  onPress?: () => void;
  touchableOpacityProps?: Partial<TouchableOpacityProps>;
  textProps?: Partial<TextProps>;
}

function Button({
  testID,
  disabled,
  loading,
  styles: style,
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
      style={[
        isHovered && !disabled && [defaultStyles.hovered, style?.hovered],
        disabled && [defaultStyles.disabledButton, style?.disabledButton],
      ]}
      {...touchableOpacityProps}>
      {loading ? (
        <View
          style={[
            defaultStyles.container,
            style?.container,
            {
              width: layout?.width,
              height: layout?.height,
            },
          ]}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </View>
      ) : (
        <View
          style={[defaultStyles.container, style?.container]}
          onLayout={(e) => setLayout(e.nativeEvent.layout)}>
          {leftElement}
          <Text
            style={[
              defaultStyles.text,
              style?.text,
              disabled && [defaultStyles.disabledText, style?.disabledText],
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

export { Button };
