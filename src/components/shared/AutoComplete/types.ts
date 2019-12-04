import { StyleProp, ViewStyle } from 'react-native';

export interface SearchInputProps {
  testID?: string;
  value: string;
  onDebounceOrOnReset?: (value: string) => string;
  style?: StyleProp<ViewStyle>;
  debounceDelay?: number;
  customIcon?: React.ReactNode;
  placeholderText?: string;
}
