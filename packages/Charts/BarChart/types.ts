import React from 'react';

type GraphStyle = {
  barWidth?: number | string; // default: 30
  color?: string; // default: ('#000000')
  strokeWidth?: number; // default: 2
  strokeColor?: string; // default: ('rgba(0,0,0,0.5)')
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

export interface BarChartProps {
  /* ====== [REQUIRED] ====== */
  // Dataset for the line chart
  data: Array<Record<string, number>>;
  xAxisKey: string; // X-axis parameter existing "key" in ${data}
  yAxisKey: string; // Y-axis parameter existing "key" in ${data}
  yUnit: string | number; // Y-axis unit to parse the values

  /* ====== [OPTIONAL] ====== */
  header?: React.ReactElement;
  /* *** [GRAPH STYLE] *** */
  graphStyle?: GraphStyle; // [React, Text]

  /* **** [AXIS STYLE] **** */
  xStyle?: XStyle; // [Line], [Text]
  yStyle?: YStyle; // [Line], [Text]

  /* [Style] */
  style?: React.CSSProperties;
}
