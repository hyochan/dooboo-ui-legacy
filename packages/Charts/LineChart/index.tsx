import * as d3 from 'd3';

import { Circle, G, Line, Svg, Text } from 'react-native-svg';
import React, { FC } from 'react';

import { LineChartProps } from './types';
import styled from 'styled-components/native';

// Styled component declaration
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;
const HeaderContainer = styled.View`
  width: 100%;
  background-color: transparent;
  margin: 0;
  padding: 0;
`;
const ChartContainer = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  flex-direction: row;
`;
const GraphWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  transform: scale(1,-1);
`;

const LineChart: FC<LineChartProps> = (props) => {
  // Destructuring props & Declaring default values
  const {
    /* ====== [REQUIRED] ====== */
    data = [],
    xAxisKey = 'key3',
    yAxisKey = 'key6',
    yUnit = '100',
    /* ====== [OPTIONAL] ====== */
    header = undefined,
    graphStyle = {
      withLine: true,
      lineColor: '#000000',
      lineWidth: 2,
      withDots: true,
      dotColor: '#ffffff',
      dotStrokeColor: '#000000',
      dotStrokeWidth: 2,
      withText: true,
      textColor: '#000000',
      textStrokeColor: 'none',
      fontSize: '12',
      fontWeight: 'bold',
    },
    /* **** [Y-AXIS PARAMETERS] **** */
    yStyle = {
      withLabel: true,
      withIndicator: true,
      withLine: true,
      lineColor: '#000000',
      lineStrokeWidth: 1,
      withText: true,
      textColor: '#000000',
      textStrokeColor: 'none',
      fontSize: '12',
      fontWeight: 'normal',
    },
    /* **** [X-AXIS PARAMETERS] ====== **** */
    xStyle = {
      withLabel: true,
      withIndicator: true,
      withLine: true,
      lineColor: '#000000',
      lineStrokeWidth: 1,
      withText: true,
      textColor: '#000000',
      textStrokeColor: 'none',
      fontSize: '12',
      fontWeight: 'bold',
    },
  } = props;
  // Initialize
  const [currentHeight, setCurrentHeight] = React.useState<number>(400);
  const [currentWidth, setCurrentWidth] = React.useState<number>(500);

  const dataLen = data.length;
  const dataWithIdx = data.map((item, index) => ({
    ...item,
    idx: dataLen - index,
  }));
  const SVGPadding = 30; // default padding: 30
  const SVGHeight = currentHeight;
  const SVGWidth = currentWidth;
  // X-AXIS
  const xDomain = dataWithIdx.map((item) => item.idx);
  const xRange = [SVGPadding, SVGWidth - SVGPadding * 4];
  const xAxis = d3.scalePoint().domain(xDomain).range(xRange);

  // Y-AXIS
  const yDomain = [0, d3.max(data, (item) => item[yAxisKey])];
  const yRange = [
    SVGPadding,
    SVGHeight - SVGPadding * (SVGHeight < 768 ? 4.5 : 5),
  ];
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  // get Y axis values range
  const getYmaxRange = (
    data: Array<Record<string, any>>,
    yUnit: string | number,
  ): Array<number> => {
    const range: number[] = [];
    const unit = typeof yUnit === 'string' ? Number(yUnit) : yUnit;
    const yMaxValue =
      Math.trunc(
        Math.max(...data.map((current) => current[yAxisKey]), 0) / unit,
      ) *
        unit +
      unit;
    for (let i = 0; i <= yMaxValue; i += unit) {
      i <= yMaxValue && range.push(i);
    }
    return range;
  };

  const yAxisRange = getYmaxRange(data, yUnit);

  return (
    <Container
      onLayout={(e): void => {
        setCurrentHeight(e.nativeEvent.layout.height);
        setCurrentWidth(e.nativeEvent.layout.width);
      }}>
      {/* Header */}
      {header && <HeaderContainer>{header}</HeaderContainer>}
      {/* Graph view */}
      <ChartContainer>
        <GraphWrapper>
          <Svg
            height={SVGHeight}
            width={SVGWidth}
            preserveAspectRatio="xMidYMid slice">
            {/* Graph Y-axis labels view */}
            <G x={SVGPadding} y={SVGPadding}>
              {yStyle.withLine && (
                <Line
                  x1={25}
                  y1={yAxis(yAxisRange[yAxisRange.length - 1]) + 25}
                  x2={25}
                  y2={0}
                  stroke={yStyle.lineColor}
                  strokeWidth={yStyle.lineStrokeWidth}
                />
              )}
              {yStyle.withLabel &&
                yAxisRange.map((unit, index) => {
                  return (
                    <G key={index}>
                      {yStyle.withIndicator && (
                        <Line
                          x1={20}
                          y1={yAxis(unit) + 10}
                          x2={25}
                          y2={yAxis(unit) + 10}
                          stroke={yStyle.lineColor}
                          strokeWidth={yStyle.lineStrokeWidth}
                        />
                      )}
                      {yStyle.withText && (
                        <Text
                          scale={[1, -1]}
                          fill={yStyle.textColor}
                          stroke={yStyle.textStrokeColor}
                          fontSize={yStyle.fontSize}
                          fontWeight={yStyle.fontWeight}
                          x={xAxis(0)}
                          y={-yAxis(unit) - 5}
                          textAnchor="middle">
                          {unit}
                        </Text>
                      )}
                    </G>
                  );
                })}
              {/* Graph X-axis labels view */}
              {xStyle.withLabel && xStyle.withLine && (
                <Line
                  x1={xAxis(dataLen) - SVGPadding / 2}
                  y1={10}
                  x2={xAxis(dataLen - dataLen + 1) + SVGPadding * 2}
                  y2={10}
                  stroke={xStyle.lineColor}
                  strokeWidth={xStyle.lineStrokeWidth}
                />
              )}
              {xStyle.withLabel &&
                dataWithIdx.map((item, index) => {
                  return (
                    <G key={index}>
                      {xStyle.withIndicator && (
                        <Line
                          x1={xAxis(dataLen - index) + 20}
                          y1={10}
                          x2={xAxis(dataLen - index) + 20}
                          y2={5}
                          stroke={xStyle.lineColor}
                          strokeWidth={xStyle.lineStrokeWidth}
                        />
                      )}
                      {xStyle.withText && (
                        <Text
                          scale={[1, -1]}
                          fill={xStyle.textColor}
                          stroke={xStyle.textStrokeColor}
                          fontSize={xStyle.fontSize}
                          fontWeight={xStyle.fontWeight}
                          x={xAxis(dataLen - index) + 20}
                          y={10}
                          textAnchor="middle">
                          {item[xAxisKey]}
                        </Text>
                      )}
                    </G>
                  );
                })}
              {/* Graph: Text, Dots & Line */}
              {dataWithIdx.map((item, index) => {
                const xStart = dataLen - index;
                const yStart = item[yAxisKey];
                let xEnd: number;
                let yEnd: number;

                if (index === dataLen - 1) {
                  xEnd = xStart;
                  yEnd = yStart;
                } else {
                  xEnd = dataLen - index - 1;
                  yEnd = dataWithIdx[index + 1][yAxisKey];
                }
                return (
                  <G key={index}>
                    {graphStyle.withLine && (
                      <Line
                        x1={xAxis(xStart) + 20}
                        y1={yAxis(yStart) + 10}
                        x2={xAxis(xEnd) + 20}
                        y2={yAxis(yEnd) + 10}
                        stroke={graphStyle.lineColor}
                        strokeWidth={graphStyle.lineWidth}
                      />
                    )}
                    {graphStyle.withText && (
                      <Text
                        scale={[1, -1]}
                        fill={graphStyle.textColor}
                        stroke={graphStyle.textStrokeColor}
                        fontSize={graphStyle.fontSize}
                        fontWeight={graphStyle.fontWeight}
                        x={xAxis(dataLen - index) + 20}
                        y={-yAxis(item[yAxisKey]) - 20}
                        textAnchor="middle">
                        {item[yAxisKey]}
                      </Text>
                    )}
                    {graphStyle.withDots && (
                      <Circle
                        cx={xAxis(dataLen - index) + 20}
                        cy={yAxis(item[yAxisKey]) + 10}
                        r="4"
                        fill={graphStyle.dotColor}
                        stroke={graphStyle.dotStrokeColor}
                        strokeWidth={graphStyle.dotStrokeWidth}
                      />
                    )}
                  </G>
                );
              })}
            </G>
          </Svg>
        </GraphWrapper>
      </ChartContainer>
    </Container>
  );
};

export default LineChart;
