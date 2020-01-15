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

export type InputWrapper = {
  on: boolean;
  width: number;
  inSets: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
};

export type RenderInputProps = {
  on: boolean;
  label: string;
  onFocus: () => void;
  onBlur: () => void;
}

export type RenderOptionProps = DummyDatum & {
  onPress: OnPressOption;
  index?: number;
  isSelected: boolean | null;
  underlayColor?: string;
};

export type RenderOptionsProps = {
  data: DummyDatum[];
  onPress: OnPressOption;
  onPressOutside: () => void;
  selectedData: DummyDatum | null;
  underlayColor?: string;
};

export type OptionWrapperProps = {
  isSelected: boolean | null;
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
