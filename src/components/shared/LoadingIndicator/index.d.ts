import * as React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';

interface Props {
  containerStyle?: ViewStyle,
  style?: ViewStyle,
  color?: string;
  size?: number | 'small' | 'large';
  children?: any;
}

const LoadingIndicator: React.SFC<Props> = (props) => {

};

export default LoadingIndicator;
