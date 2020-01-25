import { Dispatch, ReactText, SetStateAction } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

export interface AutoCompleteProps {
  renderInputTestID?: string;
  caretBtnTestID?: string;
  value: string;
  onDebounceOrOnReset?: Dispatch<SetStateAction<string>>;
  style?: ViewStyle;
  debounceDelay?: number;
  placeholderText?: string;
  underlayColor?: string;
}

type OnPressOption = (data: DummyDatum) => void;

export type InputWrapper = {
  focused: boolean;
  width: number;
  inSets: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
};

export type RenderInputProps = TextInputProps & {
  focused: boolean;
  placeholderLabel: string;
  bgColor?: ReactText;
  onDebounceOrOnReset?: (params?: any) => any;
  onFocus: () => void;
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
  selectedData: DummyDatum | null;
  underlayColor?: string;
};

export type OptionWrapperProps = {
  isSelected: boolean | null;
};

export type InputContainerProps = {
  focus: boolean;
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
