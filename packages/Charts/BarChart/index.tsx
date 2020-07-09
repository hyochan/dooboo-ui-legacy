import * as d3 from 'd3';

import { G, Line, Rect, Svg, Text } from 'react-native-svg';
import React, { FC } from 'react';

import { BarChartProps } from './types';
import { Hoverable } from 'react-native-web-hooks';
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

const BarChart: FC<BarChartProps> = (props) => {
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
      barWidth: 30,
      color: '#000000',
      strokeWidth: 0,
      strokeColor: 'rgba(0,0,0,0.1)',
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

  // SVG Layout
  const SVGPadding = 30; // default padding: 30
  const SVGHeight = currentHeight;
  const SVGWidth = currentWidth;
  const indicatorSize = 5;
  const textGap = 10;

  // X-AXIS
  const xDomain = data.map((item, index) => index);
  const xRange = [SVGPadding, SVGWidth - SVGPadding];
  const xAxis = d3.scalePoint().domain(xDomain).range(xRange);

  // Y-AXIS
  const yAxisRange = getYmaxRange(data, yUnit);
  const yDomain = [0, d3.max(yAxisRange, (item) => item)];
  const yRange = [
    SVGPadding,
    SVGHeight - SVGPadding * (SVGHeight < 736 ? 2.7 : SVGHeight < 1023 ? 3 : 4.5),
  ];
  const yAxis = d3.scaleLinear().domain(yDomain).range(yRange);
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
            <G>
              {yStyle.withLine && (
                <Line
                  x1={xAxis(0)}
                  y1={yAxis(0)}
                  x2={xAxis(0)}
                  y2={yAxis(yAxisRange[yAxisRange.length - 1])}
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
                          x1={xAxis(0) - indicatorSize}
                          y1={yAxis(unit)}
                          x2={xAxis(0)}
                          y2={yAxis(unit)}
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
                          x={xAxis(0) - indicatorSize - textGap}
                          y={-yAxis(unit) + 4}
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
                  x1={xAxis(0)}
                  x2={xAxis(data.length - 1) + graphStyle.barWidth}
                  y1={yAxis(0)}
                  y2={yAxis(0)}
                  stroke={xStyle.lineColor}
                  strokeWidth={xStyle.lineStrokeWidth}
                />
              )}
              {xStyle.withLabel &&
                data.map((item, index) => {
                  return (
                    <G key={index}>
                      {xStyle.withIndicator && (
                        <Line
                          x1={xAxis(index) + graphStyle.barWidth / 2}
                          y1={yAxis(0)}
                          x2={xAxis(index) + graphStyle.barWidth / 2}
                          y2={yAxis(0) - indicatorSize}
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
                          x={xAxis(index) + graphStyle.barWidth / 2}
                          y={-yAxis(0) + 5 + indicatorSize + textGap}
                          textAnchor={'middle'}>
                          {item[xAxisKey]}
                        </Text>
                      )}
                    </G>
                  );
                })}
              {/* Graph: Text, Dots & Line */}
              {data.map((item, index) => {
                return (
                  <G key={index}>
                    <Hoverable>
                      {(isHovered): React.ReactElement =>
                        <Rect
                          x={xAxis(index)}
                          y={yAxis(0)}
                          width={graphStyle.barWidth}
                          height={yAxis(item[yAxisKey]) - SVGPadding}
                          fill={graphStyle.color}
                          opacity={isHovered ? 0.5 : 0.8}
                          strokeWidth={graphStyle.strokeWidth}
                          stroke={graphStyle.strokeColor}
                          ry={1}
                        />
                      }
                    </Hoverable>
                    <Text
                      scale={[1, -1]}
                      fill={ graphStyle.textColor}
                      stroke={graphStyle.textStrokeColor}
                      fontSize={graphStyle.fontSize}
                      fontWeight={graphStyle.fontWeight}
                      x={xAxis(index) + graphStyle.barWidth / 2}
                      y={-yAxis(item[yAxisKey]) - textGap}
                      textAnchor="middle">
                      {item[yAxisKey]}
                    </Text>
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

export default BarChart;
