import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

function LoadingIndicator(props) {
  return (
    <View style={[
      styles.container,
      props.containerStyle,
    ]}>
      <ActivityIndicator
        style={props.style}
        size={props.size}
        color={props.color}
      />
    </View>
  );
}

LoadingIndicator.defaultProps = {
  size: 'large',
  color: '#969696',
};

LoadingIndicator.propTypes = {
  containerStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['small', 'large']),
  ]),
};

export default LoadingIndicator;
