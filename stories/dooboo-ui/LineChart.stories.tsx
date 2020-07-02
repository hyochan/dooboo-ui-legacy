import { Dimensions, Text } from 'react-native';
import React, { ReactElement } from 'react';
import { ContainerDeco } from '../../storybook/decorators';
import LineChart from '../../main/LineChart';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CustomHeaderContainer = styled.View`
  width: 100%;
  padding: 10px;
  background-color: rgba(245, 245, 245, 1);
  text-align: center;
`;

const mockData = [
  {
    id: 'abcd1234efgh5674',
    key1: '6일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-30',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'A',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5675',
    key1: '5일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-29',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'B',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5676',
    key1: '4일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-28',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'C',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5677',
    key1: '3일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-27',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'D',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5678',
    key1: '2일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-26',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'E',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5677',
    key1: '1일차',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-25',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'F',
    key6: Math.trunc(Math.random() * 10000),
  },
  {
    id: 'abcd1234efgh5678',
    key1: '금일',
    key2: Math.trunc(Math.random() * 10),
    key3: '06-24',
    key4: Math.trunc(Math.random() * 1000),
    key5: 'G',
    key6: Math.trunc(Math.random() * 10000),
  },
];

const Default = (): React.ReactElement => {
  const [currentWidth, setCurrentWidth] = React.useState<number>(
    Dimensions.get('window').width,
  );
  const [currentHeight, setCurrentHeight] = React.useState<number>(
    Dimensions.get('window').height,
  );

  return (
    <Container
      onLayout={(e): void => {
        setCurrentWidth(e.nativeEvent.layout.width);
        setCurrentHeight(e.nativeEvent.layout.height);
      }}>
      <LineChart
        screenHeight={currentHeight}
        screenWidth={currentWidth}
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
              {'My chart'}
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
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'LineChart',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('LineChart', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
