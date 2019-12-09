import * as React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import Rail from '../Slider/Rail';
import Slider from '../Slider';
import { View } from 'react-native';

describe('[Slider] render', () => {
  it('renders without crashing', () => {
    const rendered = render(<Slider />).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Rail]', () => {
  const TEST_ID = 'TEST_ID_FOR_MARK';
  const Mark: React.FC<{ testID: string }> = ({ testID }) => {
    return <View testID={testID} />;
  };

  it('renders without crashing', () => {
    const rendered = render(
      <Rail mark={<Mark testID={TEST_ID} />} customMarkWidth={1} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('calls onMarkPress with correct value and index', () => {
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

  it('calls onInit', () => {
    const onInit = jest.fn();
    const STEP = 8;
    const MARK_COUNT = 4;

    render(
      <Rail
        mark={<Mark testID={TEST_ID} />}
        customMarkWidth={12}
        style={{ width: 240 }}
        step={STEP}
        markCount={MARK_COUNT}
        onInit={onInit}
      />,
    );
    expect(onInit).toHaveBeenCalledTimes(1);
    expect(onInit.mock.calls[0][0]).toStrictEqual(
      Array.from({ length: MARK_COUNT }).map((_, ind) => STEP * ind),
    );
  });
});
