import { Dispatch, ReactChild, SetStateAction } from 'react';
import { TextInputProps, ViewStyle } from 'react-native';

export interface AutoCompleteProps {
  renderInputTestID?: string;
  caretBtnTestID?: string;
  value: string;
  data: Datum[];
  onDebounceOrOnReset?: Dispatch<SetStateAction<string>>;
  style?: ViewStyle;
  debounceDelay?: number;
  placeholderText?: string;
  underlayColor?: string;
}

type OnPressOption = (data: Datum) => void;

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
  bgColor?: string;
  onDebounceOrOnReset?: (params?: any) => any;
  onFocus: () => void;
}

export type RenderOptionProps = Datum & {
  onPress: OnPressOption;
  index?: number;
  isSelected: boolean | null;
  underlayColor?: string;
};

export type RenderOptionsProps = {
  data: Datum[];
  onPress: OnPressOption;
  selectedData: Datum | null;
  underlayColor?: string;
  bgColor?: string;
};

export type OptionWrapperProps = {
  isSelected: boolean | null;
};

export type InputContainerProps = {
  focus: boolean;
};

export enum Direction {
  left = 'left',
  right = 'right'
}

export type MarginSpaceProps = {
  location: Direction;
}

export type OptionTextProps = {
  fontSize?: number;
  fontWeight?: string;
};

export type Datum = {
  id: string;
  label: string;
  value: string;
  leftIcon?: ReactChild;
  rightIcon?: ReactChild;
};
