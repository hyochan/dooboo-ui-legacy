import * as React from 'react';
import {
  ViewStyle,
  ImageSourcePropType,
  TextStyle,
  ImageStyle,
} from 'react-native';

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

const Button: React.SFC<Props> = (props) => {

};

export default Button;
