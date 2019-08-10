import * as React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';

interface Props {
  contentVisible?: boolean;
  backgroundColor?: string;
  titleBackground?: string;
  contentBackground?: string;
  underlineColor?: string;
  visibleImage?: ImageSourcePropType;
  invisibleImage?: ImageSourcePropType;
  header: React.ReactElement;
  style?: ViewStyle;
  children: React.ReactElement;
}

const DropdownItem: React.FC<Props> = (props) => {

};

export default DropdownItem;
