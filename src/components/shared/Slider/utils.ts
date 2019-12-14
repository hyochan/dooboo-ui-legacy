export const valueToPercent = (value, maxValue, minValue): number => {
  return (value / (maxValue - minValue)) * 100;
};

export const percentToValue = (percent, maxValue, minValue): number => {
  return ((maxValue - minValue) * percent) / 100;
};

export const getPercent = (positionX: number, sliderLength: number): number => {
  const percent = (positionX / sliderLength) * 100;
  if (percent <= 0) return 0;
  else if (percent >= 100) return 100;
  else return percent;
};
