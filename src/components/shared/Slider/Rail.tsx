import React, { FC, ReactElement, useEffect, useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import styled, { DefaultTheme, ThemeProps } from 'styled-components/native';

import { isNil } from 'lodash';

interface RailThemeType {
  backgroundColor: string;
}

interface MarkThemeType {
  backgroundColor: string;
}

interface ThemeType extends DefaultTheme {
  backgroundColor: string;
  markColor: string;
}

interface StatefulThemeType extends ThemeType {
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}

interface RailType extends ThemeProps<RailThemeType> {
  theme: RailThemeType;
}

interface MarkType extends ThemeProps<MarkThemeType>{
  theme: MarkThemeType;
}

interface MarkPositionerType {
  position: number;
}

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  markStyle?: StyleProp<ViewStyle>;
  mark?: ReactElement;
  step?: number;
  pixelPerStep?: number;
  markCount?: number;
  startMark?: boolean;
  endMark?: boolean;
  dark?: boolean;
  lightblue?: boolean;
  blue?: boolean;
  inverted?: boolean;
  disabled?: boolean;
  fit?: boolean;
  onInit?: (marks: number[], markPositions: number[]) => void | Promise<void>;
  onMarkPress?: (value: number, position: number, index: number) => void | Promise<void>;
}

const COLOR: {
  [key: string]: string;
} = {
  GRAY: '#BCC1D1',
  BALCK: '#232A3A',
  WHITE: '#ffffff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  LIGHTBLUE1: '#BCDBFB',
  LIGHTBLUE2: '#4199F4',
  BLUE1: '#90A4F9',
  BLUE2: '#4163F4',
};

const DEFAULT = {
  width: 250,
  height: 3,
  borderRadius: 1,
  MARK: {
    width: 3,
    height: 3,
  },
};

export const THEME: {
  LIGHTBLUE: StatefulThemeType;
  DARK: StatefulThemeType;
  BLUE: StatefulThemeType;
} = {
  LIGHTBLUE: {
    backgroundColor: COLOR.LIGHTBLUE1,
    markColor: COLOR.LIGHTBLUE2,
    INVERTED: {
      backgroundColor: COLOR.LIGHTBLUE2,
      markColor: COLOR.LIGHTBLUE1,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      markColor: COLOR.LIGHTGRAY,
    },
  },
  BLUE: {
    backgroundColor: COLOR.BLUE1,
    markColor: COLOR.BLUE2,
    INVERTED: {
      backgroundColor: COLOR.BLUE2,
      markColor: COLOR.BLUE1,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      markColor: COLOR.LIGHTGRAY,
    },
  },
  DARK: {
    backgroundColor: COLOR.GRAY,
    markColor: COLOR.BALCK,
    INVERTED: {
      backgroundColor: COLOR.BALCK,
      markColor: COLOR.GRAY,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      markColor: COLOR.LIGHTGRAY,
    },
  },
};

const Container = styled.View`
  display: flex;
  justify-content: center;
  height: 10;
`;

const StyledRail = styled.View<RailType>`
  width: ${`${DEFAULT.width}px`};
  height: ${`${DEFAULT.height}px`};
  border-radius: ${DEFAULT.borderRadius};
  background-color: ${({ theme }): string => theme.backgroundColor};
`;

const MarkPositioner = styled.View<MarkPositionerType>`
  position: absolute;
  left: ${({ position }): number => position};
`;

const Mark = styled.View<MarkType>`
  width: ${DEFAULT.MARK.width};
  height: ${DEFAULT.MARK.height};
  background-color: ${({ theme }): string => theme.backgroundColor};
`;

const getStatefulTheme = ({
  theme,
  inverted,
  disabled,
}: {
  theme: StatefulThemeType;
  inverted?: boolean;
  disabled?: boolean;
}): ThemeType => {
  if (disabled) {
    return theme.DISABLED;
  }

  return inverted ? theme.INVERTED : theme;
};

const getDefaultTheme = ({
  dark,
  lightblue,
  blue,
  inverted,
  disabled,
}: {
  dark?: boolean;
  lightblue?: boolean;
  blue?: boolean;
  inverted?: boolean;
  disabled?: boolean;
}): ThemeType => {
  const statefulThemeOptions = {
    inverted,
    disabled,
  };

  if (dark) {
    return getStatefulTheme({
      theme: THEME.DARK,
      ...statefulThemeOptions,
    });
  }

  if (lightblue) {
    return getStatefulTheme({
      theme: THEME.LIGHTBLUE,
      ...statefulThemeOptions,
    });
  }

  if (blue) {
    return getStatefulTheme({
      theme: THEME.BLUE,
      ...statefulThemeOptions,
    });
  }

  return getStatefulTheme({
    theme: THEME.BLUE,
    ...statefulThemeOptions,
  });
};

const getMarkCountByStep = ({
  railWidth,
  step,
  startMark,
  endMark,
}: {
  railWidth: number;
  step: number;
  startMark: boolean;
  endMark: boolean;
}): number => {
  const count = Math.floor(railWidth / step) + 1;

  return count - (startMark ? 0 : 1) - (endMark ? 0 : 1);
};

const getStepByMarkCount = ({
  railWidth,
  count,
  startMark,
  endMark,
}): number => {
  const step = railWidth / count;

  if (startMark && endMark) {
    return railWidth / (count - 1);
  }

  if (!startMark && !endMark) {
    return (railWidth - step) / count + 1;
  }

  return (railWidth - step) / (count - 1);
};

const getMarkPositions = ({
  railWidth,
  markWidth,
  startMark,
  endMark,
  count,
  step,
}: {
  railWidth: number;
  markWidth: number;
  startMark: boolean;
  endMark: boolean;
  count: number;
  step?: number;
}): number[] => {
  const getPositionFineTunedStepByMark = ({
    markWidth,
    markCount,
    step,
  }: {
    markWidth: number;
    markCount: number;
    step: number;
  }): number => {
    const fineTunerToFitMark = markWidth / markCount;

    return step - fineTunerToFitMark;
  };

  const stepToApply = isNil(step) ? getStepByMarkCount({
    railWidth,
    count,
    startMark,
    endMark,
  }) : step as number;
  const fineTunedStep = getPositionFineTunedStepByMark({
    markWidth,
    markCount: count,
    step: stepToApply,
  });
  const startAt = startMark ? 0 : fineTunedStep;

  return Array.from({ length: count }).map((_, index: number) => startAt + (fineTunedStep * index));
};

const getMarkPositionsByStep = ({
  railWidth,
  markWidth,
  step,
  startMark,
  endMark,
  fitToRailWidth,
}: {
  railWidth: number;
  markWidth: number;
  step: number;
  startMark: boolean;
  endMark: boolean;
  fitToRailWidth: boolean;
}): number[] => {
  const getPositionFineTunedStepByRailWidth = ({
    railWidth,
    markCount,
    step,
  }: {
    railWidth: number;
    markCount: number;
    step: number;
  }): number => {
    const railWidthByStep = (step * (markCount - 1));
    const fineTunerToFitRailWidth = (railWidth - railWidthByStep) / markCount;

    return step + fineTunerToFitRailWidth;
  };
  const count = getMarkCountByStep({
    railWidth,
    step,
    startMark,
    endMark,
  });
  const stepToApply = fitToRailWidth ? getPositionFineTunedStepByRailWidth({
    railWidth,
    markCount: count,
    step,
  }) : step;

  return getMarkPositions({
    railWidth,
    markWidth,
    step: stepToApply,
    startMark,
    endMark,
    count,
  });
};

const getMarkValue = (step: number, markIndex: number): number => step * markIndex;
const getMarkValues = (
  step: number,
  markPositions: number[],
): number[] => markPositions.map((_, index) => getMarkValue(step, index));

const createMarks = ({
  positions,
  step,
  style,
  theme,
  onMarkPress,
}: {
  positions: number[];
  step: number;
  style: ViewStyle;
  theme: MarkThemeType;
  onMarkPress?: (value: number, position: number, index: number) => void | Promise<void>;
}): React.ReactElement[] => {
  return positions.map((position: number, index: number): React.ReactElement => {
    const handlePress = (): void => {
      const value = getMarkValue(step, index);
      if (onMarkPress) {
        onMarkPress(value, position, index);
      }
    };

    return (
      <TouchableWithoutFeedback key={position} onPress={handlePress}>
        <MarkPositioner position={position}>
          <Mark style={style} theme={theme} />
        </MarkPositioner>
      </TouchableWithoutFeedback>
    );
  });
};

const Rail: FC<Props> = ({
  testID,
  style = {},
  markStyle = {},
  step = 1,
  pixelPerStep = 20,
  markCount,
  startMark = true,
  endMark = true,
  dark,
  lightblue,
  blue,
  inverted,
  disabled,
  fit = true,
  onInit,
  onMarkPress,
}) => {
  const handleInit = (markValues: number[], markPositions: number[]): void => {
    if (onInit) {
      onInit(markValues, markPositions);
    }
  };
  const railStyleToApply = StyleSheet.flatten(style);
  const markStyleToApply = StyleSheet.flatten(markStyle);

  const defaultTheme = getDefaultTheme({
    dark,
    lightblue,
    blue,
    inverted,
    disabled,
  });

  const railThemeToApply: RailThemeType = {
    backgroundColor: railStyleToApply.backgroundColor || defaultTheme.backgroundColor,
  };

  const markThemeToApply: MarkThemeType = {
    backgroundColor: markStyleToApply.backgroundColor || defaultTheme.markColor,
  };

  const railWidth = isNil(railStyleToApply.width) ? DEFAULT.width : railStyleToApply.width as string | number;
  const railWidthInt = parseInt(railWidth.toString());

  const markWidth = isNil(markStyleToApply.width) ? DEFAULT.MARK.width : markStyleToApply.width as string | number;
  const markWidthInt = parseInt(markWidth.toString());

  const markOptions = {
    railWidth: railWidthInt,
    markWidth: markWidthInt,
    startMark,
    endMark,
    fit,
  };
  const stepByPixel = step * pixelPerStep;
  const markPositions = useMemo(() => isNil(markCount) ? getMarkPositionsByStep({
    ...markOptions,
    step: stepByPixel,
    fitToRailWidth: fit,
  }) : getMarkPositions({
    ...markOptions,
    count: markCount as number,
  }), Object.values(markOptions));
  const marks = createMarks({
    positions: markPositions,
    step,
    style: markStyleToApply,
    theme: markThemeToApply,
    onMarkPress,
  });

  useEffect(() => {
    const markValues = getMarkValues(step, markPositions);

    handleInit(markValues, markPositions);
  }, []);

  return (
    <Container>
      <StyledRail
        testID={testID}
        style={railStyleToApply}
        theme={railThemeToApply}
      >
      </StyledRail>
      {marks}
    </Container>
  );
};

export default Rail;
