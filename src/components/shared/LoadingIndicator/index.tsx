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

// import { IC_GOOGLE } from '../Icons';
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
  isImg?: boolean;
  imgSource?: string | ImageSourcePropType;
}

function LoadingIndicator(props: Props): React.ReactElement {
  const handleImgSize = (size: number | string | null): ImageStyle => {
    if (size === 'large') {
      return {
        width: 100,
        height: 100,
      };
    }
    if (size === 'small') {
      return {
        width: 50,
        height: 50,
      };
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
    <View style={[styles.container, props.containerStyle]}>
      {!props.isImg ? (
        <ActivityIndicator
          style={props.style}
          size={props.size}
          color={props.color}
        />
      ) : (
        <Image source={handleImgSourceType(props.imgSource)} style={handleImgSize(props.size)} />
      )}
    </View>
  );
}

LoadingIndicator.defaultProps = {
  size: 'large',
  color: '#969696',
  isImg: false,
};

export default LoadingIndicator;
