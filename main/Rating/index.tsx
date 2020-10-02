import React, { useMemo } from 'react';

import styled from 'styled-components/native';

interface Props {
  total: number;
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

interface ContainerWrapperProps {
  total: number;
  disabled?: boolean;
}

interface StarProps {
  key: number;
  on: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const ContainerWrapper = styled.View<ContainerWrapperProps>`
  width: ${({ total }): number => total * 30}px;
  height: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.5 : 1)};
`;

const StarWrapper = styled.TouchableOpacity`
  width: 30px;
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
    ? require('../__assets__/star_s.png')
    : require('../__assets__/star_d.png');

  return (
    <StarWrapper onPress={handlePress} activeOpacity={props.disabled ? 1 : 0.7}>
      <StyledImage source={image} resizeMode="contain" />
    </StarWrapper>
  );
}

function Rating(props: Props): React.ReactElement {
  const _handlePress = (position: number): void => {
    props.onChange && props.onChange(position + 1);
  };

  const initArr = useMemo(() => {
    return new Array(props.total).fill(false);
  }, [props.total]);

  const starsArr = useMemo(() => {
    return initArr.map((item, index) => (
      <StarComponent
        key={index}
        on={props.value - 1 >= index}
        onPress={(): void => {
          (props.onChange && !props.disabled) && _handlePress(index);
        }}
        disabled={!props.onChange || props.disabled}
      />
    ));
  }, [props.value, props.onChange, props.disabled]);

  return (
    <ContainerWrapper total={props.total} disabled={props.disabled}>
      {starsArr}
    </ContainerWrapper>
  );
}

export { Rating };
