import * as React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';

interface Props {
  contentVisible?: bool;
  backgroundColor?: string;
  titleBackground?: string;
  contentBackground?: string;
  underlineColor?: string;
  visibleImage?: ImageSourcePropType;
  invisibleImage?: ImageSourcePropType;
  header?: React.ReactElement;
  style?: ViewStyle;
  children: any;
}

const DropdownItem: React.SFC<Props> = (props) => {

};

export default DropdownItem;
