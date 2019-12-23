import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

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
  imgSource?: string | ImageSourcePropType;
}

function LoadingIndicator(props: Props): React.ReactElement {
  const { containerStyle, style, size, color, imgSource } = props;
  const handleImgSize = (size: number | string | undefined): ImageStyle => {
    if (size === 'large') {
      return {
        width: 80,
        height: 80,
      };
    }
    if (size === 'small') {
      return {
        width: 50,
        height: 50,
      };
    }
    if (size === undefined) {
      return {};
    }

    return {
      width: size,
      height: size,
    };
  };

  const handleImgSourceType = (src: string | ImageSourcePropType): ImageSourcePropType => {
    if (typeof src === 'string') {
      return {
        uri: src,
      };
    }

    return src;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!props.imgSource ? (
        <ActivityIndicator
          style={style}
          size={size}
          color={color}
        />
      ) : (
        <Image source={handleImgSourceType(imgSource)} style={handleImgSize(size)} />
      )}
    </View>
  );
}

LoadingIndicator.defaultProps = {
  size: 'large',
  color: '#969696',
};

export default LoadingIndicator;
