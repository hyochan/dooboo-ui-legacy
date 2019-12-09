import { Text, View } from 'react-native';

import * as React from 'react';

import Slider from '../Slider';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react-native';
import Rail from '../Slider/Rail';

let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[Slider] render', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = <Slider {...props} />;
  });

  // it('renders without crashing', () => {
  //   const rendered: renderer.ReactTestRendererJSON | null = renderer
  //     .create(component)
  //     .toJSON();
  //   expect(rendered).toMatchSnapshot();
  //   expect(rendered).toBeTruthy();
  // });

  // describe('interactions', () => {
  //   beforeEach(() => {
  //     testingLib = render(component);
  //   });

  //   it('should simulate onClick', () => {
  //     const btn = testingLib.queryByTestId('btn');
  //     act(() => {
  //       fireEvent.press(btn);
  //     });
  //     expect(cnt).toBe(3);
  //   });
  // });
});

describe('[Rail]', () => {
  const TEST_ID = 'TEST_ID_FOR_MARK';
  const Mark: React.FC<{ testID: string }> = ({ testID }) => {
    return <View testID={testID} />;
  };

  it('calls onMarkPress when first or last mark is pressed ', () => {
    const onMarkPress = jest.fn();
    const { getAllByTestId } = render(
      <Rail
        mark={<Mark testID={TEST_ID} />}
        customMarkWidth={1}
        onMarkPress={onMarkPress}
      />,
    );
    const marks = getAllByTestId(TEST_ID);
    fireEvent.press(marks[0]);
    fireEvent.press(marks[marks.length - 1]);
    expect(onMarkPress).toBeCalledTimes(2);
  });

  it('calls onMarkPress with correct value, and index', () => {
    const onMarkPress = jest.fn();
    const STEP = 10;
    const MARK_COUNT = 5;
    const { getAllByTestId } = render(
      <Rail
        mark={<Mark testID={TEST_ID} />}
        customMarkWidth={10}
        step={STEP}
        markCount={MARK_COUNT}
        onMarkPress={onMarkPress}
      />,
    );
    const marks = getAllByTestId(TEST_ID);
    for (let i = 0; i < MARK_COUNT; i += 1) {
      fireEvent.press(marks[i]);
    }
    for (let i = 0; i < MARK_COUNT; i += 1) {
      expect(onMarkPress.mock.calls[i][0]).toBe(i * STEP);
      expect(onMarkPress.mock.calls[i][2]).toBe(i);
    }
  });
});
