import * as React from 'react';
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  viewStyle?: ViewStyle;
  selectedViewStyle?: ViewStyle;
  textStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  data?: string[],
  onPress?: (i: number) => void;
}

const ButtonGroup: React.SFC<Props> = (props) => {

};

export default ButtonGroup;
