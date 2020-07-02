/* eslint-disable sort-imports */
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Circle, G, Line, Svg, Text } from 'react-native-svg';
import * as d3 from 'd3';

import { LineChartProps } from './types';

// Styled component declaration
const Container = styled.View`
  width: 100%;
  height: 320;
  background-color: 'transparent';
`;
const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ChartContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
const GraphWrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;

const LineChart: FC<LineChartProps> = (props) => {
  // Destructuring props & Declaring default values
  const {
    screenHeight,
    screenWidth,
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
  } = props;
  // Initialize
  const dataLen = data.length;
  const dataWithIdx = data.map((item, index) => ({
    ...item,
    idx: dataLen - index,
  }));
  const SVGHeight = screenHeight * 0.2;
  const SVGWidth = screenWidth * 0.75;

  // X-AXIS
  const xDomain = dataWithIdx.map((item) => item.idx);
  const xRange = [0, SVGWidth];
  const xAxis = d3.scalePoint().domain(xDomain).range(xRange);

  // Y-AXIS
  const yDomain = [0, d3.max(data, (item) => item[yAxisKey])];
  const yRange = [0, SVGHeight];
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);

  // get Y axis values range
  const getYmaxRange = (data: any, yUnit: string): Array<number> => {
    const range: number[] = [];
    const max =
      Math.trunc(
        Math.max(...data.map((current) => current[yAxisKey]), 0) /
          Number(yUnit),
      ) *
        Number(yUnit) +
      Number(yUnit);
    for (let i = 0; i <= max; i += Number(yUnit)) {
      i <= max && range.push(i);
    }
    return range;
  };

  return (
    <Container>
      {/* Header */}
      <HeaderContainer>{header}</HeaderContainer>
      {/* Graph view */}
      <ChartContainer>
        {/* Graph Y-axis labels view */}
        <Svg height="100%" width={50}>
          {yStyle.withLabel && (
            <G x={24} y={200}>
              {yStyle.withLine && (
                <Line
                  x1={25}
                  y1={25}
                  x2={25}
                  y2={-170}
                  stroke={yStyle.lineColor}
                  strokeWidth={yStyle.lineStrokeWidth}
                />
              )}
              {getYmaxRange(data, yUnit).map((unit, index) => {
                return (
                  <>
                    {yStyle.withIndicator && (
                      <Line
                        key={index}
                        x1={20}
                        y1={yAxis(unit) * -1 + 20}
                        x2={30}
                        y2={yAxis(unit) * -1 + 20}
                        stroke={yStyle.lineColor}
                        strokeWidth={yStyle.lineStrokeWidth}
                      />
                    )}
                    {yStyle.withText && (
                      <Text
                        fill={yStyle.textColor}
                        stroke={yStyle.textStrokeColor}
                        fontSize={yStyle.fontSize}
                        fontWeight={yStyle.fontWeight}
                        x={5}
                        y={yAxis(unit) * -1 + 24}
                        textAnchor="middle">
                        {unit}
                      </Text>
                    )}
                  </>
                );
              })}
            </G>
          )}
        </Svg>
        <GraphWrapper style={{ width: 'auto', height: 'auto' }}>
          {/* Graph X-axis labels view */}
          <Svg id={'graph-svg'} height="100%" width={screenWidth * 0.9}>
            <G x={10} y={210}>
              {/* Graph X-axis labels view */}
              {xStyle.withLabel && xStyle.withLine && (
                <Line
                  x1={xAxis(dataLen) - 30}
                  y1={10}
                  x2={xAxis(dataLen - dataLen + 1) + 35}
                  y2={10}
                  stroke={xStyle.lineColor}
                  strokeWidth={xStyle.lineStrokeWidth}
                />
              )}
              {xStyle.withLabel &&
                dataWithIdx.map((item, index) => {
                  return (
                    <>
                      {xStyle.withIndicator && (
                        <Line
                          x1={xAxis(dataLen - index) + 10}
                          y1={10}
                          x2={xAxis(dataLen - index) + 10}
                          y2={15}
                          stroke={xStyle.lineColor}
                          strokeWidth={xStyle.lineStrokeWidth}
                        />
                      )}
                      {xStyle.withText && (
                        <Text
                          fill={xStyle.textColor}
                          stroke={xStyle.textStrokeColor}
                          fontSize={xStyle.fontSize}
                          fontWeight={xStyle.fontWeight}
                          x={xAxis(dataLen - index) + 10}
                          y={30}
                          textAnchor="middle">
                          {item[xAxisKey]}
                        </Text>
                      )}
                    </>
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
                  <>
                    {graphStyle.withLine && (
                      <Line
                        key={index}
                        x1={xAxis(xStart) + 10}
                        y1={yAxis(yStart) * -1 + 10}
                        x2={xAxis(xEnd) + 10}
                        y2={yAxis(yEnd) * -1 + 10}
                        stroke={graphStyle.lineColor}
                        strokeWidth={graphStyle.lineWidth}
                      />
                    )}
                    {graphStyle.withText && (
                      <Text
                        fill={graphStyle.textColor}
                        stroke={graphStyle.textStrokeColor}
                        fontSize={graphStyle.fontSize}
                        fontWeight={graphStyle.fontWeight}
                        x={xAxis(dataLen - index) + 10}
                        y={-yAxis(item[yAxisKey])}
                        textAnchor="middle">
                        {item[yAxisKey]}
                      </Text>
                    )}
                    {graphStyle.withDots && (
                      <Circle
                        cx={xAxis(dataLen - index) + 10}
                        cy={yAxis(item[yAxisKey]) * -1 + 10}
                        r="4"
                        fill={graphStyle.dotColor}
                        stroke={graphStyle.dotStrokeColor}
                        strokeWidth={graphStyle.dotStrokeWidth}
                      />
                    )}
                  </>
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
