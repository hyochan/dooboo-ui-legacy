import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import Accordion from '../Accordion';
import React from 'react';

// eslint-disable-next-line
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj?: Record<string, unknown>): Record<string, unknown> => ({
  ...obj,
});

describe('[Accordion] renders', () => {
  it('should render without crashing', () => {
    props = createTestProps();
    component = <Accordion {...props} />;
    testingLib = render(component);
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render when custom props given', () => {
    jest.useFakeTimers();

    props = createTestProps({
      isAnimated: true,
      visible: true,
    });
    component = <Accordion {...props} />;

    testingLib = render(component);
    expect(testingLib.baseElement).toMatchSnapshot();
  });
});

describe('[Accordion] events', () => {
  beforeEach(() => {
    props = createTestProps();
    component = <Accordion {...props} />;
    testingLib = render(component);
  });

  it('should trigger onLayout when header height changes', () => {
    const { getByTestId } = testingLib;
    const header = getByTestId('header');

    act(() => {
      fireEvent.layout(header, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(header, {
        nativeEvent: {
          layout: {
            height: 0,
          },
        },
      });
    });
  });

  it('should trigger onLayout when content height changes', () => {
    const { getByTestId } = testingLib;
    const content = getByTestId('content');

    act(() => {
      fireEvent.layout(content, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(content, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });
  });

  it('should set [animValue] when header and content is mounted', () => {
    const { getByTestId } = testingLib;
    const header = getByTestId('header');
    const content = getByTestId('content');

    act(() => {
      fireEvent.layout(header, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(header, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(content, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(content, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });
  });

  it('should trigger press event when clicking header', () => {
    act(() => {
      fireEvent.press(testingLib.getByTestId('header'));
    });

    expect(props.onPress).toBeFalsy();

    props = createTestProps({
      onPress: jest.fn(),
    });
    component = <Accordion {...props} />;
    testingLib = render(component);

    const { getByTestId } = testingLib;
    const header = getByTestId('header');

    act(() => {
      fireEvent.press(header);
    });

    expect(props.onPress).toHaveBeenCalled();
  });

  it('should trigger after custom props given', () => {
    jest.useFakeTimers();

    props = createTestProps({
      isAnimated: true,
      contentVisible: true,
    });
    component = <Accordion {...props} />;

    testingLib = render(component);

    jest.runAllTimers();

    const { getByTestId } = testingLib;
    const header = getByTestId('header');
    const content = getByTestId('content');

    act(() => {
      fireEvent.layout(header, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });

    act(() => {
      fireEvent.layout(content, {
        nativeEvent: {
          layout: {
            height: 300,
          },
        },
      });
    });
  });
});
