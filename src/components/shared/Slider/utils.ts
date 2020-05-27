export const roundNearest = (number: number, digit: number): number => {
  const rest = number % digit;
  const halfDigit = digit / 2;
  const base = number - rest;

  if (rest >= halfDigit) {
    return base + digit;
  }

  return base;
};

export const getPercentByValue = (value, maxValue, minValue): number => {
  return (value / (maxValue - minValue)) * 100;
};

export const getValueByPercent = (percent, maxValue, minValue): number => {
  return ((maxValue - minValue) * percent) / 100;
};

export const getStepPercent = ({
  minValue,
  maxValue,
  step,
}: {
  minValue: number;
  maxValue: number;
  step: number;
}): number => {
  return 100 / (maxValue - minValue) * step;
};

export const getPercentByPositionX = ({
  positionX,
  sliderWidth,
  stepPercent,
}: {
  positionX: number;
  sliderWidth: number;
  stepPercent: number;
}): number => {
  const percent = (positionX / sliderWidth) * 100;

  if (percent <= 0) {
    return 0;
  }

  if (percent >= 100) {
    return 100;
  }

  return roundNearest(
    percent,
    stepPercent,
  );
};

export const getNearestPercentByValue = ({
  value,
  minValue,
  maxValue,
  step,
}: {
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
}): number => {
  const stepPercent = getStepPercent({
    minValue,
    maxValue,
    step,
  });

  const percent = getPercentByValue(value, maxValue, minValue);

  if (percent <= 0) {
    return 0;
  }

  if (percent >= 100) {
    return 100;
  }

  return roundNearest(
    getPercentByValue(value, maxValue, minValue),
    stepPercent,
  );
};

export const getStepValueByPercent = ({
  percent,
  stepPercent,
  step,
}: {
  percent: number;
  stepPercent: number;
  step: number;
}): number => {
  return percent / stepPercent * step;
};
