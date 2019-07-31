import * as React from 'react';

interface Props {
  switchOn: boolean;
  onPress: () => void;
  containerStyle?: object;
  circleStyle?: object;
  backgroundColorOn?: string;
  backgroundColorOff?: string;
  circleColorOff?: string;
  circleColorOn?: string;
  duration?: number;
  type?: number,
  buttonText?: string,
  backTextRight?: string,
  backTextLeft?: string,
  buttonTextStyle?: any,
  textRightStyle?: any,
  textLeftStyle?: any,
  buttonStyle?: any,
  buttonContainerStyle?: any,
  rightContainerStyle?: any,
  leftContainerStyle?: any
}

declare class SwitchToggle extends React.Component<Props> {

}

export default SwitchToggle;
