import * as React from 'react';
import { GestureResponderEvent } from 'react-native'

interface IProps {
    switchOn: boolean;
    onPress: (event: GestureResponderEvent) => {};
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

declare class SwitchToggle extends React.Component<IProps, any> {

}

export default SwitchToggle;
