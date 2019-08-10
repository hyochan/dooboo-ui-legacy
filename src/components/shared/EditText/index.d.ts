import * as React from 'react';
import { ViewStyle, ImageSourcePropType } from 'react-native';

interface Props {
  parentTestID?: string;
  testID?: string;
  errorTestID?: string;
  style?: ViewStyle;
  label?: string;
  textStyle?: TextStyle;
  errorText?: string;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: (e: NativeSyntheticEvent<any>) => void;
  onTextChanged?: (text: string) => void;
}

const EditText: React.FC<Props> = (props) => {

};

export default EditText;
