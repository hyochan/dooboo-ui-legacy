import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

const DEFAULT = {
  height: 3,
};

const StyledTrack = styled.View<any>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }): string => `${width}%`};
  height: ${DEFAULT.height};
  background-color: #0B21E8;
`;

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  percent: number;
}

const Track: FC<Props> = ({
  testID,
  style,
  percent,
}) => {
  return (
    <StyledTrack
      testID={testID}
      style={style}
      width={percent}
    />
  );
};

export default Track;
