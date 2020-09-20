import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, { useRef } from 'react';

import { useHover } from 'react-native-web-hooks';

const defaultStyles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    alignSelf: 'center',
    width: 320,
    height: 52,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 6,
  },
  text: {
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
});

type StylesType = Partial<StyleSheet.NamedStyles<typeof defaultStyles>>;

interface Props {
  testID?: string;
  indicatorColor?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StylesType;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  activeOpacity?: number;
  text?: string;
  onPress?: () => void;
  touchableOpacityProps?: Partial<TouchableOpacityProps>;
}

function Button({
  testID,
  disabled,
  loading,
  style,
  indicatorColor = '#ffffff',
  leftElement,
  rightElement,
  activeOpacity = 0.7,
  text,
  onPress,
  touchableOpacityProps,
}: Props): React.ReactElement {
  const ref = useRef(null);
  const isHovered = useHover(ref);

  return (
    <View
      style={[
        defaultStyles.root,
        style?.root,
      ]}
    >
      <TouchableOpacity
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={onPress}
        delayPressIn={30}
        disabled={disabled}
        ref={ref}
        style={[
          defaultStyles.button,
          style?.button,
          isHovered && !disabled && [
            defaultStyles.hovered,
            style?.hovered,
          ],
          disabled && [
            defaultStyles.disabledButton,
            style?.disabledButton,
          ],
        ]}
        {...touchableOpacityProps}
      >
        {loading
          ? <ActivityIndicator size="small" color={indicatorColor} />
          : (
            <>
              {leftElement}
              <Text
                style={[
                  defaultStyles.text,
                  style?.text,
                  disabled && [
                    defaultStyles.disabledText,
                    style?.disabledText,
                  ],
                ]}
              >
                {text}
              </Text>
              {rightElement}
            </>
          )
        }
      </TouchableOpacity>
    </View>
  );
}

export { Button };
