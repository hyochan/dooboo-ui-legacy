import { BarChart, LineChart } from '../../packages/Charts/lib';
import { Dimensions, Text } from 'react-native';
import React, { ReactElement } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const CustomContainer = styled.View`
  height: 50%;
  width: 50%;
  text-align: center;
`;
const CustomHeaderContainer = styled.View`
  height: 40px;
  width: 100%;
  padding: 10px;
  background-color: rgba(245, 245, 245, 1);
  text-align: center;
`;

const mockData = [
  {
    id: 'abcd1234efgh5674',
    key1: 'D-6',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/30',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'A',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5675',
    key1: 'D-5',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/29',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'B',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5676',
    key1: 'D-4',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/28',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'C',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5677',
    key1: 'D-3',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/27',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'D',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5678',
    key1: 'D-2',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/26',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'E',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5677',
    key1: 'D-1',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/25',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'F',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5678',
    key1: 'D-day',
    key2: Math.trunc(Math.random() * 10),
    key3: '06/24',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'G',
    key6: Math.trunc(Math.random() * 10000),
  },
];

const LineChartComponent = (): React.ReactElement => {
  const [currentWidth, setCurrentWidth] = React.useState<number>(Dimensions.get('window').width * 0.8);
  return (
    <CustomContainer
      onLayout={(e): void => {
        setCurrentWidth(e.nativeEvent.layout.width);
      }}
      style={{
        width: currentWidth > 768 ? '50%' : currentWidth > 1024 ? '40%' : '50%',
      }}>
      <LineChart
        data={mockData}
        xAxisKey={'key5'}
        yAxisKey={'key2'}
        yUnit={'2'}
        header={
          <CustomHeaderContainer>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#000',
              }}>
              {'My Line-chart'}
            </Text>
          </CustomHeaderContainer>
        }
        graphStyle={{
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
        }}
        xStyle={{
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
        }}
        yStyle={{
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
        }}
      />
    </CustomContainer>
  );
};

const BarChartComponent = (): React.ReactElement => {
  const [currentWidth, setCurrentWidth] = React.useState<number>(500);
  return (
    <CustomContainer
      onLayout={(e): void => {
        setCurrentWidth(e.nativeEvent.layout.width);
      }}
      style={{
        width: currentWidth > 768 ? '50%' : currentWidth > 1024 ? '40%' : '50%',
      }}>
      <BarChart
        data={mockData}
        xAxisKey={'key5'}
        yAxisKey={'key2'}
        yUnit={'2'}
        header={
          <CustomHeaderContainer>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#000',
              }}>
              {'My Bar-chart'}
            </Text>
          </CustomHeaderContainer>
        }
        // graphStyle={{
        //   barWidth: 30,
        //   color: '#000000',
        //   strokeWidth: 2,
        //   strokeColor: 'rgba(0,0,0,0.1)',
        //   fontSize: '12',
        //   fontWeight: 'bold',
        // }}
        xStyle={{
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
        }}
        yStyle={{
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
        }}
      />
    </CustomContainer>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Charts',
};

export const toStorybook1 = (): ReactElement => <LineChartComponent />;
export const toStorybook2 = (): ReactElement => <BarChartComponent />;

toStorybook1.story = {
  name: 'LineChart',
};
toStorybook2.story = {
  name: 'BarChart',
};

/**
 * Below are stories for app
 */
storiesOf('Charts2', module)
  .addDecorator(ContainerDeco)
  .add('LineChart', () => <LineChartComponent />)
  .add('BarChart', () => <BarChartComponent />);
