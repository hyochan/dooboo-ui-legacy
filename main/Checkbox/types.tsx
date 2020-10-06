export interface CustomStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface OnChangeEvent {
  checked: boolean;
  label: string;
}

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: string | number;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: OnChangeEvent) => void;
  customStyle?: CustomStyle;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  registerValue?: (value: CheckboxValueType) => void;
  toggleOption: (option: CheckboxOptionType) => void;
  value?: CheckboxValueType[];
  disabled?: boolean;
}
