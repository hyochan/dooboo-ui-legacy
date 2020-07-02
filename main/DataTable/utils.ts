export const isHasValue = (hasValue: any): any => {
  if (typeof hasValue === 'boolean') {
    return hasValue ? 'O' : 'X';
  }
  return hasValue;
};
