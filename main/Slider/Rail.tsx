import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

import styled from '@emotion/native';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT = {
  height: 3,
  borderRadius: 1,
};

const StyledRail = styled.View`
  width: 100%;
  height: ${`${DEFAULT.height}px`};
  border-radius: ${DEFAULT.borderRadius}px;
  background-color: #bcdbfb;
`;

const Rail: FC<Props> = ({testID, style}) => {
  return <StyledRail testID={testID} style={style} />;
};

export default Rail;
