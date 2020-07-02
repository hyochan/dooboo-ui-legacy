/* eslint-disable sort-imports */
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type GraphLStyle = {
  withLine?: boolean; // default: true
  lineColor?: string; // default: ('#000000')
  lineWidth?: number; // default: 2
  withDots?: boolean; // default: true
  dotColor?: string; // default: ('#ffffff')
  dotStrokeWidth?: number; // default: 2
  dotStrokeColor?: string; // default: ('#000000')
  withText?: boolean; // default: true
  textColor?: string; // default: ('#000000')
  textStrokeColor?: string; // default: ('none')
  fontSize?: string; // default: ('12')
  fontWeight?: string; // default: ('bold')
};

type XStyle = {
  withLabel?: boolean; // default: true
  withIndicator?: boolean; // default: true
  withLine?: boolean; // default: true
  lineColor?: string; // default: ('#000000')
  lineStrokeWidth?: number; // 1
  withText?: boolean; // default: true
  textColor?: string; // default: ('#000000')
  textStrokeColor?: string; // default: ('none')
  fontSize?: string; // default: ('12')
  fontWeight?: string; // default: ('bold')
};
type YStyle = {
  withLabel?: boolean; // default: true
  withIndicator?: boolean; // default: true
  withLine?: boolean; // default: true
  lineColor?: string; // default: ('#000000')
  lineStrokeWidth?: number; // 1
  withText?: boolean; // default: true
  textColor?: string; // default: ('#000000')
  textStrokeColor?: string; // default: ('none')
  fontSize?: string; // default: ('12')
  fontWeight?: string; // default: ('bold')
};

export interface LineChartProps {
  screenHeight: number;
  screenWidth: number;
  /* ====== [REQUIRED] ====== */
  // Dataset for the line chart
  data: Array<any>;
  // X-axis parameter existing "key" in ${data}
  xAxisKey: string;
  // Y-axis parameter existing "key" in ${data}
  yAxisKey: string;
  yUnit: string;

  /* ====== [OPTIONAL] ====== */
  header?: React.ReactElement;
  /* *** [GRAPH STYLE] *** */
  graphStyle?: GraphLStyle; // [Line, Dot, Text]

  /* **** [AXIS STYLE] **** */
  xStyle?: XStyle; // [Line], [Text]
  yStyle?: YStyle; // [Line], [Text]

  /* [Style] */
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
}
