import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2,
    width: 320,
    height: 52,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    borderColor: 'rgb(200,200,200)',
  },
  text: {
    fontSize: 14,
    color: '#069ccd',
  },
  textDisabled: {
    color: '#969696',
  },
  image: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

interface Props {
  testID?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  imgLeftSrc?: ImageSourcePropType;
  imgLeftStyle?: ImageStyle;
  indicatorColor?: string;
  activeOpacity?: number;
  text?: string;
}

function Button(props: Props) {
  if (props.isDisabled) {
    return (
      <View
        testID={props.testID}
        style={[
          styles.button,
          props.style,
          styles.disabledButton,
          props.disabledStyle,
        ]}
      >
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    );
  }
  if (props.isLoading) {
    return (
      <View testID={props.testID} style={[styles.button, props.style]}>
        <ActivityIndicator size='small' color={props.indicatorColor} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      testID={props.testID}
      activeOpacity={props.activeOpacity}
      onPress={props.onClick}
    >
      <View style={[styles.button, props.style]}>
        {props.imgLeftSrc ? (
          <Image
            style={[styles.image, props.imgLeftStyle]}
            source={props.imgLeftSrc}
          />
        ) : null}
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
