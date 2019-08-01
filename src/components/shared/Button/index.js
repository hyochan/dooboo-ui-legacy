import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Image,
  Text,
  ViewStyle,
  ViewPropTypes,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

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

function Button(props) {
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
      <View
        testID={props.testID}
        style={[
          styles.button,
          props.style,
        ]}
      >
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
      <View style={[
        styles.button,
        props.style,
      ]}>
        {
          props.imgLeftSrc
            ? <Image
              style={props.imgLeftStyle}
              source={props.imgLeftSrc}
            />
            : null
        }
        <Text style={props.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
  imgLeftStyle: styles.image,
  textStyle: styles.text,
  disabledStyle: styles.disabledStyle,
};

Button.propTypes = {
  testID: PropTypes.string,
  onClick: PropTypes.func,
  style: ViewPropTypes.style,
  disabledStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  imgLeftSrc: Image.propTypes.source,
  imgLeftStyle: Image.propTypes.style,
  indicatorColor: PropTypes.string,
  activeOpacity: PropTypes.number,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default Button;
