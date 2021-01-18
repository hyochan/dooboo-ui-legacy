import React, {FC, useEffect, useMemo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import styled from 'styled-components/native';

interface MarkPositionerType {
  width: number;
  position: number;
}

interface Props {
  testID?: string;
  sliderWidth: number;
  style?: StyleProp<ViewStyle>;
  mark?: React.ReactElement;
  customMarkWidth?: number;
  step: number;
  startMark?: boolean;
  endMark?: boolean;
  disabled?: boolean;
  onInit?: (
    markValues: number[],
    markPositions: number[],
  ) => void | Promise<void>;
  onMarkPress?: (
    value: number,
    position: number,
    index: number,
  ) => void | Promise<void>;
  minValue: number;
  maxValue: number;
}

const DEFAULT = {
  width: 3,
  height: 3,
};

const Container = styled.View`
  display: flex;
  justify-content: center;
  position: absolute;
`;

const MarkPositioner = styled.View<MarkPositionerType>`
  position: absolute;
  display: flex;
  align-items: center;
  width: ${({width}): number => width}px;
  left: ${({position}): number => position}px;
`;

const Mark = styled.View`
  width: ${DEFAULT.width}px;
  height: ${DEFAULT.height}px;
  background-color: #4163f4;
`;

// Checks if null or undefined. temporary until using othe library like 'lodash'.
const isNil = (value: any): boolean => value == null;

const getMarkCountByStep = ({
  step,
  startMark,
  endMark,
  minValue,
  maxValue,
}: {
  step: number;
  startMark: boolean;
  endMark: boolean;
  minValue: number;
  maxValue: number;
}): number => {
  const count = Math.floor((maxValue - minValue) / step);
  const countToApply = count <= 0 ? 2 : count + 1;

  return countToApply - (startMark ? 0 : 1) - (endMark ? 0 : 1);
};

const getStepByMarkCount = ({
  railWidth,
  count,
  startMark,
  endMark,
}: {
  railWidth: number;
  count: number;
  startMark: boolean;
  endMark: boolean;
}): number => {
  const step = railWidth / count;

  if (startMark && endMark) return railWidth / (count - 1);

  if (!startMark && !endMark) return (railWidth - step) / count;

  return (railWidth - step) / (count - 1);
};

const getStepDistanceByMarkCount = ({
  railWidth,
  markWidth,
  startMark,
  endMark,
  count,
}: {
  railWidth: number;
  markWidth: number;
  startMark: boolean;
  endMark: boolean;
  count: number;
}): number => {
  const getStepFineTunedStepByMark = ({
    markWidth: currentMarkWidth,
    markCount,
    step,
  }: {
    markWidth: number;
    markCount: number;
    step: number;
  }): number => {
    const fineTunerToFitMark = currentMarkWidth / markCount;

    return step - fineTunerToFitMark;
  };

  const stepToApply = getStepByMarkCount({
    railWidth,
    count,
    startMark,
    endMark,
  });

  return getStepFineTunedStepByMark({
    markWidth,
    markCount: count,
    step: stepToApply,
  });
};

const getStepDistanceByStep = ({
  railWidth,
  markWidth,
  markCount,
  startMark,
  endMark,
}: {
  railWidth: number;
  markWidth: number;
  markCount: number;
  startMark: boolean;
  endMark: boolean;
}): number => {
  return getStepDistanceByMarkCount({
    railWidth,
    markWidth,
    startMark,
    endMark,
    count: markCount,
  });
};

const getStepDistance = ({
  railWidth,
  markWidth,
  step,
  startMark,
  endMark,
  minValue,
  maxValue,
}: {
  railWidth: number;
  markWidth: number;
  step: number;
  startMark: boolean;
  endMark: boolean;
  minValue: number;
  maxValue: number;
}): {
  markCount: number;
  stepDistance: number;
} => {
  const options = {
    railWidth,
    markWidth,
    startMark,
    endMark,
  };

  const count = getMarkCountByStep({
    step,
    startMark,
    endMark,
    minValue,
    maxValue,
  });

  return {
    markCount: count,
    stepDistance: getStepDistanceByStep({
      ...options,
      markCount: count,
    }),
  };
};

const getMarkPositions = ({
  startMark,
  count,
  stepDistance,
}: {
  startMark: boolean;
  count: number;
  stepDistance: number;
}): number[] => {
  const startAt = startMark ? 0 : stepDistance;

  return Array.from({length: count}).map(
    (_, index: number) => startAt + stepDistance * index,
  );
};

const getMarkValue = (step: number, markIndex: number): number =>
  step * markIndex;

const getMarkValues = (step: number, markPositions: number[]): number[] =>
  markPositions.map((_, index) => getMarkValue(step, index));

const createMarks = ({
  positions,
  step,
  stepDistance,
  style,
  mark,
  markWidth,
  disabled,
  onMarkPress,
}: {
  positions: number[];
  step: number;
  stepDistance: number;
  style: ViewStyle;
  mark?: React.ReactElement;
  markWidth: number;
  disabled?: boolean;
  onMarkPress?: (
    value: number,
    position: number,
    index: number,
  ) => void | Promise<void>;
}): React.ReactElement[] => {
  const halfStepDistance = stepDistance / 2;
  const fineTunedHalfStepDistance = halfStepDistance - markWidth / 2;

  return positions.map(
    (position: number, index: number): React.ReactElement => {
      const handlePress = (): void => {
        if (disabled) return;

        const value = getMarkValue(step, index);

        if (onMarkPress) onMarkPress(value, position, index);
      };

      return (
        <TouchableWithoutFeedback key={position} onPress={handlePress}>
          <MarkPositioner
            width={stepDistance}
            position={position - fineTunedHalfStepDistance}>
            {mark || <Mark style={style} />}
          </MarkPositioner>
        </TouchableWithoutFeedback>
      );
    },
  );
};

const getMarkWidth = (markStyle: ViewStyle): number => {
  const {width} = markStyle;

  if (isNil(width)) return DEFAULT.width;

  // eslint-disable-next-line radix
  return parseInt((width as string | number).toString());
};

const Marks: FC<Props> = ({
  testID,
  sliderWidth,
  style = {},
  mark,
  customMarkWidth,
  step,
  startMark = true,
  endMark = true,
  disabled = false,
  onInit,
  onMarkPress,
  minValue,
  maxValue,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInit = (markValues: number[], markPositions: number[]): void => {
    if (onInit) onInit(markValues, markPositions);
  };

  if (mark && isNil(customMarkWidth))
    throw Error('Must have customMarkWidth prop if it uses a cutsom mark.');

  const markStyleToApply = StyleSheet.flatten(style);

  const railWidth = sliderWidth;

  const markWidth = isNil(mark)
    ? getMarkWidth(markStyleToApply)
    : (customMarkWidth as number);

  const markOptions = {
    railWidth,
    markWidth,
    step,
    startMark,
    endMark,
    minValue,
    maxValue,
  };

  const {markCount: markCountToApply, stepDistance} = useMemo(
    () => getStepDistance(markOptions),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(markOptions),
  );

  const markPositions = useMemo(
    () =>
      getMarkPositions({
        startMark,
        count: markCountToApply,
        stepDistance,
      }),
    [startMark, markCountToApply, stepDistance],
  );

  const marks = createMarks({
    positions: markPositions,
    step,
    stepDistance,
    style: markStyleToApply,
    mark,
    markWidth,
    disabled,
    onMarkPress,
  });

  useEffect(() => {
    const markValues = getMarkValues(step, markPositions);

    handleInit(markValues, markPositions);
  }, [handleInit, markPositions, step]);

  return (
    <Container testID={testID} style={style}>
      {marks}
    </Container>
  );
};

export default Marks;
