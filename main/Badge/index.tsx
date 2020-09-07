import React, { FC, useRef } from 'react';
import styled from 'styled-components/native';

interface BadgeProps {
  count?: number;
  color?: string;
  maximumCount?: number;
  showZero?: boolean;
  opacityVisible?: boolean;
  variant?: string;
}

interface StyleProps {
  color?: string;
  opacity?: number;
}

// TODO: Border 스타일 추가바람!
const StyledView = styled.View`
  position: absolute;
  top: -10px;
  right: -10px;
  width: auto;
  min-width: 20px;
  height: 20px;
  background-color: ${(props: StyleProps): string => props.color!};
  border-radius: 50;
  justify-content: center;
  align-items: center;
  opacity: ${(props: StyleProps): number => props.opacity!};
`;

const StyledText = styled.Text`
  margin-left: 3px;
  margin-right: 3px;
  color: whitesmoke;
  text-align: center;
`;

const StyledDotView = styled.View`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  background-color: ${(props: StyleProps): string => props.color!};
  border-radius: 50;
  justify-content: center;
  align-items: center;
`;

const Badge: FC<BadgeProps> = (props) => {
  const {
    count = 1,
    color = 'red',
    maximumCount = 300,
    showZero,
    opacityVisible = true,
    variant = 'standard',
  } = props;

  if (!showZero) {
    if (count === 0) return null;
  }
  switch (true) {
    case variant === 'dot':
      return <StyledDotView color={color} />; // TODO: position 추가 필요
    case maximumCount >= count:
      return (
        <StyledView color={color}>
          <StyledText>{count}</StyledText>
        </StyledView>
      );
    case maximumCount < count && opacityVisible:
      return (
        <StyledView color={color} opacity={0.6}>
          <StyledText>{count + '+'}</StyledText>
        </StyledView>
      );
    case maximumCount < count && !opacityVisible:
      return (
        <StyledView color={color} opacity={1}>
          <StyledText>{count + '+'}</StyledText>
        </StyledView>
      );
  }

  // return variant === 'dot' ? (

  // ) : (
  //   <StyledView
  //     count={count}
  //     maximumValue={maximumValue}
  //     color={color}
  //     opacityVisible={opacityVisible}>
  //     <StyledText>
  //       {count}
  //     </StyledText>
  //   </StyledView>
  // );
};

export { Badge };
