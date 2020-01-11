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

  it('calls onMarkPress with expected arguments', () => {
    const handleMarkPress = jest.fn();
    const STEP = 10;
    const MARK_COUNT = 5;

    const { getAllByTestId } = render(
      <Rail
        mark={<Mark testID={TEST_ID} />}
        customMarkWidth={10}
        step={STEP}
        markCount={MARK_COUNT}
        onMarkPress={handleMarkPress}
      />,
    );
    const marks = getAllByTestId(TEST_ID);
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
    const expectedArgumentForOnInit = Array.from({ length: MARK_COUNT }).map((_, ind) => STEP * ind);
    const actualArgumentForOnInit = onInit.mock.calls[0][0];
    expect(actualArgumentForOnInit).toStrictEqual(
      expectedArgumentForOnInit,
    );
  });
});
