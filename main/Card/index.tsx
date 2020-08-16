import React, { FC } from 'react';
import { View } from 'react-native';

interface Props {
  testID?: string;
}

const Card: FC<Props> = (/* props */) => {
  return <View></View>;
};

Card.defaultProps = {};

export { Card };
