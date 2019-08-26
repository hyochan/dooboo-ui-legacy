import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import React from 'react';

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

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number | 'small' | 'large';
}

function LoadingIndicator(props: Props) {
  return (
    <View style={[styles.container, props.containerStyle]}>
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

export default LoadingIndicator;
