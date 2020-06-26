import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import Accordion from '../Accordion';

let props: any;
let component: ReactElement;
let testingLib: RenderResult;
const data = [
  {
    itemTitle: 'test data1',
    itemBodies: ['test data', 'test data', 'test data'],
  },
  {
    itemTitle: 'test data2',
    itemBodies: ['test data', 'test data', 'test data', 'test data'],
  },
];

const createTestProps = (obj?: Record<string, unknown>): Record<string, unknown> => ({
  ...obj,
});

describe('[Accordion] render test', () => {
  it('should render without crasing', () => {
    props = createTestProps({ data: data });
    component = <Accordion {...props}/>;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render collapsed when collapsedWhenRendered props is false', () => {
    props = createTestProps({
      collapsedWhenRendered: false,
      data: data,
    });
    component = <Accordion {...props}/>;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should operate animation when isAnimated is true', () => {
    jest.useFakeTimers();
    props = createTestProps({
      isAnimated: true,
      data: data,
    });
    component = <Accordion {...props}/>;
    testingLib = render(component);
    jest.runAllTimers();

    expect(testingLib.baseElement).toMatchSnapshot();
  });
});

describe('[Accordion] event test', () => {
  beforeEach(() => {
    props = createTestProps({
      data: data,
    });
    component = <Accordion {...props}/>;
    testingLib = render(component);
  });

  it('should trigger onLayout event when itemTitle rendered', () => {
    const { getByTestId } = testingLib;
    const itemTitle = getByTestId('itemTitle_0');

    act(() => {
      fireEvent.layout(itemTitle, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });
  });

  it('should trigger onLayout event when itemBody rendered', () => {
    const { getByTestId } = testingLib;
    const itemBody = getByTestId('itemBody_0');

    act(() => {
      fireEvent.layout(itemBody, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });
  });

  it('should trigger press event when clicking title', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('itemTitle_0'));
    });
  });
});
