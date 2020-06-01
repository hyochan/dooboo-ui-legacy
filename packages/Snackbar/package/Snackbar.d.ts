import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface SnackbarProps {
    testID?: string;
    ref: React.MutableRefObject<SnackbarRef>;
}
export interface Content {
    text: string;
    actionText?: string;
    timer?: Timer;
    actionStyle?: TextStyle;
    containerStyle?: ViewStyle;
    messageStyle?: TextStyle;
    onPressAction?: () => void;
}
export interface SnackbarRef {
    show(content: Content): void;
}
export declare enum Timer {
    SHORT = 1500,
    LONG = 3000
}
declare const _default: React.ForwardRefExoticComponent<Pick<SnackbarProps, "testID"> & React.RefAttributes<SnackbarRef>>;
export default _default;
