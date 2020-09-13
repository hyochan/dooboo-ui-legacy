import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

interface StyleProps {
  color?: string;
  opacity?: number;
  badgePlacement?: 'left' | 'top' | 'bottom' | 'right';
  border?: string;
  textColor?: string;
}

export interface BadgeProps extends StyleProps{
  count?: number;
  maximumCount?: number;
  showZero?: boolean;
  opacityVisible?: boolean;
  variant?: string;
}

const StyledView = styled.View<StyleProps>`
  position: absolute;
  top: -15px;
  ${(props) => props.badgePlacement}: -10px;
  width: auto;
  min-width: 45px;
  height: 45px;
  border-color: ${(props) =>
    props.border ? props.border : '#00ff0000'};
  border-width: 3px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => props.opacity};
`;

const StyledText = styled.Text<StyleProps>`
  color: ${(props) => props.textColor};
  text-align: center;
  padding: 5px;
  margin-left: 3px;
  margin-right: 3px;
`;

const StyledDotView = styled.View<StyleProps>`
  position: absolute;
  top: -5px;
  ${(props) => props.badgePlacement}: -5px;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  fontDesign: {
    fontWeight: '500',
    fontSize: 20,
  },
});

const Badge: FC<BadgeProps> = (props) => {
  const {
    count = 1,
    color = '#34AFF9',
    maximumCount = 300,
    showZero,
    opacityVisible = true,
    variant = 'standard',
    badgePlacement: position = 'right',
    border,
    textColor = '#FFFFFF',
  } = props;

  if (!showZero) {
    if (count === 0) return null;
  }

  switch (true) {
    case variant === 'dot':
      return <StyledDotView color={color} badgePlacement={position} />;

    case maximumCount >= count:
      return (
        <StyledView
          color={color}
          opacity={1}
          badgePlacement={position}
          border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>
            {count}
          </StyledText>
        </StyledView>
      );

    case maximumCount < count && opacityVisible:
      return (
        <StyledView
          color={color}
          opacity={0.6}
          badgePlacement={position}
          border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>
            {count + '+'}
          </StyledText>
        </StyledView>
      );

    case maximumCount < count && !opacityVisible:
      return (
        <StyledView
          color={color}
          opacity={1}
          badgePlacement={position}
          border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>
            {count + '+'}
          </StyledText>
        </StyledView>
      );

    default:
      return (
        <StyledView
          color={color}
          opacity={1}
          badgePlacement={position}
          border={border}>
          <StyledText textColor={textColor} style={styles.fontDesign}>
            {count}
          </StyledText>
        </StyledView>
      );
  }
};

export { Badge };
