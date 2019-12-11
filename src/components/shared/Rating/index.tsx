import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

interface Props {
  total: number;
  value: number;
  onChange?: Function;
  disabled?: boolean;
}

interface ContainerWrapperProps {
  total: number;
  disabled?: boolean;
}

interface StarProps {
  key: number;
  on: boolean;
  onPress: Function;
  disabled?: boolean;
}

const ContainerWrapper = styled.View<ContainerWrapperProps>`
  width: ${({ total }): number => total * 30};
  height: 30;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.5 : 1)};
`;

const StarWrapper = styled.TouchableOpacity`
  width: 30;
  height: 100%;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

function StarComponent(props: StarProps): React.ReactElement {
  const handlePress = (): void => {
    props.onPress();
  };

  const image = props.on
    ? require('./images/Star.png')
    : require('./images/UnStar.png');

  return (
    <StarWrapper onPress={handlePress} activeOpacity={props.disabled ? 1 : 0.7}>
      <StyledImage source={image} resizeMode="contain" />
    </StarWrapper>
  );
}

function Rating(props: Props): React.ReactElement {
  const [position, setPosition] = useState(0);
  const initStars = new Array(props.total).fill(false);
  const active = Boolean(props.onChange);
  const disabled = Boolean(props.disabled);

  const _handlePress = (position: number): void => {
    props.onChange && props.onChange({ value: position + 1 });
  };

  useEffect(() => {
    setPosition(props.value - 1);
  }, [props.value]);

  return (
    <ContainerWrapper total={props.total} disabled={props.disabled}>
      {initStars.map((item, index) => {
        return (
          <StarComponent
            key={index}
            on={position >= index}
            onPress={(): void => {
              active && _handlePress(index);
            }}
            disabled={!active || disabled}
          />
        );
      })}
    </ContainerWrapper>
  );
}

export default Rating;
