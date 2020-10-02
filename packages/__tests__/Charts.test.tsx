import * as React from 'react';

import { BarChart, LineChart } from '../Charts/lib';
import {
  RenderAPI,
  render,
} from '@testing-library/react-native';

let props: any;
let component: React.ReactElement;
let testingLib: RenderAPI;

const testingData = [
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

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[LineChart] renders', () => {
  it('should render without crashing', () => {
    props = createTestProps({
      data: testingData,
      xAxisKey: 'key5',
      yAxisKey: 'key2',
      yUnit: '2',
    });

    component = <LineChart {...props} />;
    testingLib = render(component);
    expect(testingLib.toJSON()).toBeTruthy();
  });

  it('[BarChart] should render when custom props given', () => {
    jest.useFakeTimers();

    props = createTestProps({
      data: testingData,
      xAxisKey: 'key1',
      yAxisKey: 'key4',
      yUnit: '100',
    });

    component = <LineChart {...props} />;

    testingLib = render(component);
    jest.runAllTimers();
    expect(testingLib.toJSON()).toBeTruthy();
  });
});

describe('[BarChart] renders', () => {
  it('should render without crashing', () => {
    props = createTestProps({
      data: testingData,
      xAxisKey: 'key3',
      yAxisKey: 'key4',
      yUnit: '10',
    });

    component = <BarChart {...props} />;
    testingLib = render(component);
    expect(testingLib.toJSON()).toBeTruthy();
  });

  it('[BarChart] should render when custom props given', () => {
    jest.useFakeTimers();

    props = createTestProps({
      data: testingData,
      xAxisKey: 'key5',
      yAxisKey: 'key6',
      yUnit: '1000',
    });

    component = <BarChart {...props} />;

    testingLib = render(component);
    jest.runAllTimers();
    expect(testingLib.toJSON()).toBeTruthy();
  });
});
