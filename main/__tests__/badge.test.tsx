// Library Import
import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
// Test 대상 import
import { Badge } from '../Badge';
import { BadgeProps } from '../Badge/index';

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

  it('should render with + when count is over than max count', () => {
    props = createTestProps({
      maximumValue: 300,
      count: 500,
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should not render opacity when count is over than max count', () => {
    props = createTestProps({
      maximumValue: 300,
      count: 500,
      opacityVisible: false,
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render dot badge', () => {
    props = createTestProps({
      variant: 'dot',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render left badge', () => {
    props = createTestProps({
      position: 'left',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render badge when wrong variant', () => {
    props = createTestProps({
      variant: 'dott',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });
});
