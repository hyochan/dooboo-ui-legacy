import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT = {
  width: 250,
  height: 3,
  borderRadius: 1,
};

const StyledRail = styled.View`
  width: ${`${DEFAULT.width}px`};
  height: ${`${DEFAULT.height}px`};
  border-radius: ${DEFAULT.borderRadius};
  background-color: #BCDBFB;
`;

const Rail: FC<Props> = ({
  testID,
  style,
}) => {
  return (
    <StyledRail
      testID={testID}
      style={style}
    />
  );
};

export default Rail;
