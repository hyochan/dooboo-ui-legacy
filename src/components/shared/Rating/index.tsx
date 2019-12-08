import React, { useState } from 'react';

import styled from 'styled-components/native';

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  BACKGROUND: '#EFF0F1',
  ACTIVE: '#FFB402',
  INACTIVE: '#BDBDBD',
};
interface Props {
  children?: any;
}
const ContainerWrapper = styled.View`
  width: 200px;
  height: 40px;
  background-color: ${COLOR.BACKGROUND};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const StarComponent = styled.TouchableOpacity`
  width: 20%;
  height: 100%;
  background-color: ${(props: Props) =>
    props.on ? COLOR.ACTIVE : COLOR.INACTIVE};
  border: 1px solid white;
`;

function Rating(props: Props): React.ReactElement {
  const [stars, setStars] = useState([false, false, false, false, false]);
  const _handlePress = (index: number): void => {
    const result = [false, false, false, false, false];
    let i = 0;
    while (i < index + 1) {
      result[i] = true;
      i++;
    }
    setStars(result);
  };
  return (
    <ContainerWrapper total={props.total}>
      {stars.map((item, index) => (
        <StarComponent
          key={index}
          onPress={(): void => _handlePress(index)}
          on={stars[index]}
        />
      ))}
    </ContainerWrapper>
  );
}

export default Rating;
