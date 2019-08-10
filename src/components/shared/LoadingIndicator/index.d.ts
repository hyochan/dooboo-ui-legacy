import * as React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';

interface Props {
  containerStyle?: ViewStyle,
  style?: ViewStyle,
  color?: string;
  size?: number | 'small' | 'large';
}

const LoadingIndicator: React.FC<Props> = (props) => {

};

export default LoadingIndicator;
