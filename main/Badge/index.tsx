import React, { FC, useRef } from 'react';
import styled from 'styled-components/native';

interface badgeProps {
  count?: number;
  color?: string;
  maximumValue?: number;
  showZero?: boolean;
};

// TODO: Android , IOS 스타일 매기는 기준이 달라서 조사하는 것도 좋을듯!
const StyledView = styled.View`
  position: absolute;
  top: -10px;
  right: -10px;
  width: auto;
  min-width: 20px;
  height: 20px;
  background-color: ${(props: badgeProps): string => props.color!};
  border-radius: 50;
  justify-content: center;
  align-items: center;
  opacity: ${(props: badgeProps): any =>
    props.count === 0 || props.count! <= props.maximumValue! ? 1 : 0.6};
`;

const StyledText = styled.Text`
  margin-left: 3px;
  margin-right: 3px;
  color: whitesmoke;
  text-align: center;
`;

const Badge: FC<badgeProps> = (props) => {
  const {
    count = 10,
    color = 'red',
    maximumValue = 300,
    showZero,
  } = props;

  if (!showZero) {
    if (count == 0) return null;
  }

  return (
    <StyledView count={count} maximumValue={maximumValue} color={color}>
      <StyledText>
        {count! <= maximumValue! ? count : maximumValue + '+'}
      </StyledText>
    </StyledView>
  );
};

//TODO: 기존 코드들인데 삭제하기 아까워서..!
// const Badge = ({
//   maximumValue = 0,
//   count = 0,
//   color = 'red',
//   showZero = true,
// }: badgeProps): React.ReactElement => {
//   if (!showZero) {
//     if (count == 0) return null;
//   }

//   return (
//     <StyledView count={count} maximumValue={maximumValue} color={color}>
//       <StyledText>
//         {count <= maximumValue ? count : maximumValue + '+'}
//       </StyledText>
//     </StyledView>
//   );
// };

export { Badge };
