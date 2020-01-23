import * as React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import Marks from '../Slider/Marks';
import Slider from '../Slider';
import { View } from 'react-native';

describe('[Slider] render', () => {
  it('renders without crashing', () => {
    const rendered = render(<Slider />).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Marks]', () => {
  const TEST_ID_MARK = 'TEST_ID_FOR_MARK';
  const Mark: React.FC<{ testID: string }> = ({ testID }) => {
    return <View testID={testID} />;
  };

  it('renders without crashing', () => {
    const rendered = render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID_MARK} />}
        customMarkWidth={1}
        step={10}
        minValue={0}
        maxValue={100}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('calls onMarkPress with expected arguments', () => {
    const handleMarkPress = jest.fn();
    const STEP = 10;
    const MARK_COUNT = 10;

    const { getAllByTestId } = render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID_MARK} />}
        customMarkWidth={10}
        step={STEP}
        minValue={0}
        maxValue={100}
        onMarkPress={handleMarkPress}
      />,
    );
    const marks = getAllByTestId(TEST_ID_MARK);
    for (let i = 0; i < MARK_COUNT; i += 1) {
      fireEvent.press(marks[i]);
    }
    for (let i = 0; i < MARK_COUNT; i += 1) {
      const [value, position, index] = handleMarkPress.mock.calls[i];
      expect(value).toBe(i * STEP);
      expect(index).toBe(i);
    }
  });

  it('calls onInit with expected arguments', () => {
    const onInit = jest.fn();
    const STEP = 8;
    const MIN_VALUE = 0;
    const MAX_VALUE = 96;
    const MARK_COUNT = Math.floor((MAX_VALUE - MIN_VALUE) / STEP);

    render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID_MARK} />}
        customMarkWidth={12}
        style={{ width: 240 }}
        step={STEP}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
        onInit={onInit}
      />,
    );
    expect(onInit).toHaveBeenCalledTimes(1);
    const expectedArgumentForOnInit = Array.from({ length: MARK_COUNT + 1 }).map((_, idx) => STEP * idx);
    const actualArgumentForOnInit = onInit.mock.calls[0][0];

    expect(actualArgumentForOnInit).toStrictEqual(
      expectedArgumentForOnInit,
    );
  });
});
