import React, { FC } from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

interface BadgeProps {
  count?: number;
  color?: string;
  maximumCount?: number;
  showZero?: boolean;
  opacityVisible?: boolean;
  variant?: string;
  position?: string;
  border?: string;
  textColor?: string;
}

interface StyleProps {
  color?: string;
  opacity?: number;
  position?: string;
  border?: string;
  textColor?: string;
}

const StyledView = styled.View`
  position: absolute;
  top: -15px;
  ${(props: StyleProps) => props.position}: -10px;
  width: auto;
  min-width : 20px;
  height: 30px;
  border-color: ${(props: StyleProps) => props.border ? props.border : "#00ff0000"};
  border-width: 3px;
  background-color: ${(props: StyleProps): string => props.color!};
  border-radius: 100;
  justify-content: center;
  align-items: center;
  opacity: ${(props: StyleProps): number => props.opacity!};
`;

const StyledText = styled.Text`
  color :${(props: StyleProps) => props.textColor};
  text-align: center;
  padding: 8px;
`;

const StyledDotView = styled.View`
  position: absolute;
  top: -5px;
  ${(props: StyleProps) => props.position}: -5px;
  width: 10px;
  height: 10px;
  background-color: ${(props: StyleProps): string => props.color!};
  border-radius: 100;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  fontDesign: {
    fontWeight: "500",
    fontSize: 14,
  },
})

const Badge: FC<BadgeProps> = (props) => {
  const {
    count = 1,
    color = 'red',
    maximumCount = 300,
    showZero,
    opacityVisible = true,
    variant = 'standard',
    position = 'right',
    border,
    textColor = '#FFFFFF',
  } = props;

  if (!showZero) {
    if (count === 0) return null;
  }
  switch (true) {
    case variant === 'dot':
      return <StyledDotView color={color} position={position} />;
    case maximumCount >= count:
      return (
        <StyledView color={color} opacity={1} position={position} border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>{count}</StyledText>
        </StyledView>
      );
    case maximumCount < count && opacityVisible:
      return (
        <StyledView color={color} opacity={0.6} position={position} border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>{count + '+'}</StyledText>
        </StyledView>
      );
    case maximumCount < count && !opacityVisible:
      return (
        <StyledView color={color} opacity={1} position={position} border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>{count + '+'}</StyledText>
        </StyledView>
      );
    default:
      return (
        <StyledView color={color} opacity={1} position={position} border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>{count}</StyledText>
        </StyledView>
      );
  }
};

export { Badge };
