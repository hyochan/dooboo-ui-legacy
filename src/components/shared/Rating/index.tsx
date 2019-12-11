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
  total: number;
  value: number;
  onChange?: Function;
  disabled?: boolean;
}

interface ContainerWrapperProps {
  total: number;
  disabled?: boolean;
}

interface StarWrapperProps {
  focus: boolean;
  onPressIn: Function;
  onPressOut: Function;
  onPress: Function;
  activeOpacity: number;
}

interface StarProps {
  key: number;
  on: boolean;
  onPress: Function;
  disabled?: boolean;
}

const ContainerWrapper = styled.View<ContainerWrapperProps>`
  width: ${({ total }): number => total * 30};
  height: 30px;
  /* background-color: ${COLOR.BACKGROUND}; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.5 : 1)};
`;

const StarWrapper = styled.TouchableOpacity<StarWrapperProps>`
  width: 30;
  height: 100%;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

function StarComponent(props: StarProps): React.ReactElement {
  const [focus, setfocus] = useState(false);

  const _handlePressIn = (): void => {
    setfocus(true);
  };

  const handlePress = (): void => {
    props.onPress();
  };

  const _handlePressOut = (): void => {
    setfocus(false);
  };

  const image = props.on
    ? require('./images/Star.png')
    : require('./images/UnStar.png');

  return (
    <StarWrapper
      focus={focus}
      onPressIn={_handlePressIn}
      onPress={handlePress}
      onPressOut={_handlePressOut}
      activeOpacity={props.disabled ? 1 : 0.7}
    >
      <StyledImage source={image} resizeMode="contain" />
    </StarWrapper>
  );
}

function Rating(props: Props): React.ReactElement {
  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(new Array(props.total).fill(false));
  const active = props.onChange;
  const disabled = props.disabled;

  const _onChangeValue = (): void => {
    const result = stars.fill(false);
    let i = 0;
    while (i < value) {
      result[i] = true;
      i++;
    }

    setStars(result);

    props.onChange && props.onChange({ value });
  };

  const _handlePress = (index: number): void => {
    active && !disabled && setValue(index + 1);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, []);

  React.useEffect(() => {
    _onChangeValue();
  }, [value]);

  return (
    <ContainerWrapper total={props.total} disabled={props.disabled}>
      {stars.map((item, index) => {
        return (
          <StarComponent
            key={index}
            on={item}
            onPress={(): void => _handlePress(index)}
            disabled={!active || disabled}
          />
        );
      })}
    </ContainerWrapper>
  );
}

export default Rating;
