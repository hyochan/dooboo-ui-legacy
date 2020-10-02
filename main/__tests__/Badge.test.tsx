import { Badge, BadgeProps } from '../Badge';
import React, { ReactElement } from 'react';
import { RenderAPI, render } from '@testing-library/react-native';

let props: BadgeProps;
let component: ReactElement;
let testingLib: RenderAPI;

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

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render with + when count is over than max count', () => {
    props = createTestProps({
      maximumCount: 300,
      count: 500,
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should not render opacity when count is over than max count', () => {
    props = createTestProps({
      maximumCount: 300,
      count: 500,
      opacityVisible: false,
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render dot badge', () => {
    props = createTestProps({
      variant: 'dot',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render left badge', () => {
    props = createTestProps({
      position: 'left',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });

  it('should render badge when wrong variant', () => {
    props = createTestProps({
      variant: 'dott',
    });

    component = <Badge {...props} />;
    testingLib = render(component);

    const json = testingLib.toJSON();

    expect(json).toMatchSnapshot();
  });
});
