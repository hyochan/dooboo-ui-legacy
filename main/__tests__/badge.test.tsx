// Library Import
import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
// Test 대상 import
import { Badge } from '../Badge';

interface BadgeProps {
  count?: number;
  color?: string;
  maximumValue?: number;
  showZero?: boolean;
  opacityVisible?: boolean;
}

let props: BadgeProps;
let component: ReactElement;
let testingLib: RenderResult;

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[Badge] render', () => {
  it('should render without crashing', () => {
    props = createTestProps();
    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render when count is over than max count', () => {
    props = createTestProps({
      maximumValue: 300,
      count: 500,
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });
});
