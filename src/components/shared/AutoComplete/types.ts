import { Dispatch, SetStateAction } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface AutoCompleteProps {
  renderInputTestID?: string;
  caretBtnTestID?: string;
  value: string;
  onDebounceOrOnReset?: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
  debounceDelay?: number;
  placeholderText?: string;
  underlayColor?: string;
}

export type RenderOptionProps = DummyDatum & {
  onPress: (label: string) => void;
  underlayColor?: string;
};

export type InputContainerProps = {
  on: boolean;
};

export type OptionTextProps = {
  fontSize?: number;
  fontWeight?: string;
};

export type DummyDatum = {
  id: string;
  label: string;
  value: string;
};
