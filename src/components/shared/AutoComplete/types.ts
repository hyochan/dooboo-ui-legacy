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

type OnPressOption = (data: DummyDatum) => void;

export type RenderOptionProps = DummyDatum & {
  onPress: OnPressOption;
  index: number;
  isSelected: boolean;
  underlayColor?: string;
};

export type RenderOptionsProps = {
  data: DummyDatum[];
  onPress: OnPressOption;
  selectedData: DummyDatum | null;
  underlayColor?: string;
};

export type OptionWrapperProps = {
  isSelected: boolean;
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
