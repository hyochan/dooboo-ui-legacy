import * as React from 'react';

import { RenderResult, render } from '@testing-library/react-native';

import { LineChart } from '../Charts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[LineChart] renders', () => {
  it('should render without crashing', () => {
    props = createTestProps();
    component = <LineChart {...props} />;
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render when custom props given', () => {
    jest.useFakeTimers();

    props = createTestProps({
      isAnimated: true,
      visible: true,
    });
    component = <LineChart {...props} />;

    testingLib = render(component);
    expect(testingLib.baseElement).toMatchSnapshot();
  });
});
