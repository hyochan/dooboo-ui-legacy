import {
  Animated,
  MeasureOnSuccessCallback,
  PanResponderCallbacks,
  PanResponderInstance,
  View,
} from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import {
  getNearestPercentByValue,
  getPercentByPositionX,
  getPercentByValue,
  getStepValueByPercent,
  getValueByPercent,
  roundNearest,
} from '../Slider/utils';

import Label from '../Slider/Label';
import Marks from '../Slider/Marks';
import Rail from '../Slider/Rail';
import React from 'react';
import { Slider } from '../../main';
import Thumb from '../Slider/Thumb';
import Track from '../Slider/Track';
import { act } from 'react-test-renderer';

const TEST_ID = {
  RAIL: 'rail-test-id',
  TRACK: 'track-test-id',
  MARKS: 'marks-test-id',
  THUMB: 'thumb-test-id',
  LABEL: 'label-test-id',
  THUMBPOSITIONER: 'thumb-positioner-test-id',
  THUMB_ANIMATED: 'thumb-animated',
};

let testResponder: PanResponderCallbacks = null;

jest.mock('react-native/Libraries/Interaction/PanResponder', () => {
  return {
    create: (responder: PanResponderCallbacks): PanResponderInstance => {
      testResponder = responder;

      return {
        panHandlers: {},
      };
    },
  };
});

describe('[Slider] render', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Slider
        hideMark={false}
        defaultValue={10}
        minValue={0}
        maxValue={100}
        step={10}
        onChange={(): void => {}}
      />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[Slider] slider.current.measure', () => {
    const measure = jest.fn();

    beforeEach(() => {
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });

    it('Should not have slider.current.measure called when current does not exist', () => {
      const useRefSpy = jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: null });

      render(<Slider />);

      expect(useRefSpy).toBeCalledTimes(1);
      expect(measure).not.toBeCalled();
    });

    it('Should have slider.current.measure called when current exist', () => {
      const useRefSpy = jest
        .spyOn(React, 'useRef')
        .mockReturnValueOnce({ current: { measure } });

      render(<Slider />);

      expect(useRefSpy).toBeCalledTimes(1);
      expect(measure).toBeCalledTimes(1);
    });

    it('Should have slider position updated if measure callback called', () => {
      const mockRef: {
        current: any;
        callback: MeasureOnSuccessCallback | null;
      } = {
        current: {
          measure: (callback: MeasureOnSuccessCallback): void => {
            mockRef.callback = callback;
          },
        },
        callback: null,
      };

      jest.spyOn(React, 'useRef').mockReturnValueOnce(mockRef);

      render(<Slider />);

      jest.spyOn(React, 'useRef').mockReturnValueOnce(mockRef);

      act(() => {
        mockRef.callback(0, 0, 100, 100, 0, 0);
      });
    });
  });

  describe('required components', () => {
    it('should have a [Rail].', () => {
      const { queryByTestId } = render(<Slider />);

      const rail = queryByTestId(TEST_ID.RAIL);

      expect(rail).not.toBeNull();
    });

    it('should have a [Track].', () => {
      const { queryByTestId } = render(<Slider />);

      const track = queryByTestId(TEST_ID.TRACK);

      expect(track).not.toBeNull();
    });

    it('should have a [Marks].', () => {
      const { queryByTestId } = render(<Slider />);

      const marks = queryByTestId(TEST_ID.MARKS);

      expect(marks).not.toBeNull();
    });

    it('should have a [Thumb].', () => {
      const { queryByTestId } = render(<Slider />);

      const thumb = queryByTestId(TEST_ID.THUMB);

      expect(thumb).not.toBeNull();
    });

    it('should hide [Label].', () => {
      const { queryByTestId } = render(<Slider />);

      const label = queryByTestId(TEST_ID.LABEL);

      expect(label).toBeNull();
    });

    it('should have a [Label].', () => {
      const { queryByTestId } = render(<Slider hideLabel={false} />);

      const label = queryByTestId(TEST_ID.LABEL);

      expect(label).not.toBeNull();
    });
  });

  it('should hide [Marks] when hideMark is true.', () => {
    const { queryByTestId } = render(<Slider hideMark={true} />);

    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });

  it('should hide [Marks] when step is less than 0.', () => {
    const { queryByTestId } = render(<Slider step={-1} />);

    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });

  it('should hide [Marks] when step is equal to 0.', () => {
    const { queryByTestId } = render(<Slider step={0} />);

    const marks = queryByTestId(TEST_ID.MARKS);

    expect(marks).toBeNull();
  });

  it('should respond to the touch and move of the user.', () => {
    const rendered = render(<Slider onChange={(): void => {}} />);

    const thumb = rendered.getByTestId(TEST_ID.THUMB_ANIMATED);

    jest.useFakeTimers();
    expect(thumb.props.style.transform[0].scale).toEqual(0.01);

    rendered.rerender(
      <Slider hideLabel={false} autoLabel onChange={(): void => {}} />,
    );

    act(() => {
      if (
        testResponder &&
        testResponder.onStartShouldSetPanResponder(null, null)
      )
        testResponder.onPanResponderGrant(null, null);
    });

    jest.runAllTimers();
    expect(thumb.props.style.transform[0].scale).toEqual(1);

    act(() => {
      if (
        testResponder &&
        testResponder.onStartShouldSetPanResponder(null, null) &&
        testResponder.onMoveShouldSetPanResponder(null, null)
      ) {
        // @ts-ignore
        testResponder.onPanResponderMove(null, { moveX: 10 });
        testResponder.onPanResponderRelease(null, null);
      }

      testResponder.onPanResponderTerminationRequest(null, null);
    });

    jest.runAllTimers();
    expect(thumb.props.style.transform[0].scale).toEqual(0);
  });
});

describe('[Marks]', () => {
  const Mark: React.FC<{ testID: string }> = ({ testID }) => {
    return <View testID={testID} />;
  };

  it('renders without crashing', () => {
    const rendered = render(
      <Marks
        sliderWidth={100}
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={1}
        step={10}
        minValue={0}
        maxValue={100}
      />,
    ).toJSON();

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
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={10}
        step={STEP}
        minValue={0}
        maxValue={100}
        onMarkPress={handleMarkPress}
      />,
    );

    const marks = getAllByTestId(TEST_ID.MARKS);

    for (let i = 0; i < MARK_COUNT; i += 1) fireEvent.press(marks[i]);

    for (let i = 0; i < MARK_COUNT; i += 1) {
      const [value, , index] = handleMarkPress.mock.calls[i];

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
        mark={<Mark testID={TEST_ID.MARKS} />}
        customMarkWidth={12}
        style={{ width: 240 }}
        step={STEP}
        minValue={MIN_VALUE}
        maxValue={MAX_VALUE}
        onInit={onInit}
      />,
    );

    expect(onInit).toHaveBeenCalledTimes(1);

    const expectedArgumentForOnInit = Array.from({
      length: MARK_COUNT + 1,
    }).map((_, idx) => STEP * idx);

    const actualArgumentForOnInit = onInit.mock.calls[0][0];

    expect(actualArgumentForOnInit).toStrictEqual(expectedArgumentForOnInit);
  });
});

describe('[Rail]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Rail testID="RailTestID" style={{ backgroundColor: 'red' }} />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Label]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Label
        percentValue={new Animated.Value(0)}
        testID="LabelTestID"
        value={0}
      />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Track]', () => {
  it('renders without crashing', () => {
    const rendered = render(
      <Track
        testID="TrackTestID"
        style={{ backgroundColor: 'red' }}
        percent={50}
      />,
    ).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[Track]', () => {
    it('renders without crashing', () => {
      const rendered = render(
        <Track
          testID="TrackTestID"
          style={{ backgroundColor: 'red' }}
          percent={50}
        />,
      ).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });

  describe('[Thumb]', () => {
    it('renders without crashing', () => {
      const rendered = render(
        <Thumb
          testID="ThumbTestID"
          opacityValue={new Animated.Value(0.12)}
          scaleValue={new Animated.Value(0.01)}
          percent={50}
          size={10}
        />,
      ).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });

  describe('utils', () => {
    describe('roundNearest', () => {
      it('should return floored when the number is smaller than half of the digit.', () => {
        const result = roundNearest(12, 5);

        expect(result).toBe(10);
      });

      it('should return ceiled when the number is smaller than half of the digit.', () => {
        const result = roundNearest(13, 5);

        expect(result).toBe(15);
      });
    });

    describe('getPercentByValue', () => {
      it('should return the rate of value between minValue and maxValue.', () => {
        const result = getPercentByValue(5, 60, 10);

        expect(result).toBe(10);
      });
    });

    describe('getValueByPercent', () => {
      it('should return the value of rate between minValue and maxValue.', () => {
        const result = getValueByPercent(10, 60, 10);

        expect(result).toBe(5);
      });
    });

    describe('getPercentByPositionX', () => {
      it('should return 0 when the rate of positionX is equal or smaller than 0.', () => {
        const result = getPercentByPositionX({
          positionX: -1,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(0);
      });

      it('should return 100 when the rate of positionX is equal or smaller than 100.', () => {
        const result = getPercentByPositionX({
          positionX: 110,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(100);
      });

      it('should return the floored rate of positionX according to step.', () => {
        const result = getPercentByPositionX({
          positionX: 12,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(10);
      });

      it('should return the ceiled rate of positionX according to step.', () => {
        const result = getPercentByPositionX({
          positionX: 13,
          sliderWidth: 100,
          stepPercent: 5,
        });

        expect(result).toBe(15);
      });
    });

    describe('getNearestPercentByValue', () => {
      it('should return 0 when the rate of value is equal or smaller than 0.', () => {
        const result = getNearestPercentByValue({
          value: 1,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(0);
      });

      it('should return 100 when the rate of value is equal or smaller than 100.', () => {
        const result = getNearestPercentByValue({
          value: 70,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(100);
      });

      it('should return the floored rate according to value between minValue and maxValue.', () => {
        const result = getNearestPercentByValue({
          value: 12,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(20);
      });

      it('should return the ceiled rate according to value between minValue and maxValue.', () => {
        const result = getNearestPercentByValue({
          value: 13,
          minValue: 10,
          maxValue: 60,
          step: 5,
        });

        expect(result).toBe(30);
      });
    });

    describe('getStepValueByPercent', () => {
      it('should return value of step according to percent.', () => {
        const result = getStepValueByPercent({
          percent: 10,
          stepPercent: 40,
          step: 5,
        });

        expect(result).toBe(1.25);
      });
    });
  });
});
