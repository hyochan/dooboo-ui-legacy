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
  onChange: Function;
  readonly: boolean;
  disabled: boolean;
}

interface ContainerWrapperProps {
  total: number;
  disabled: boolean;
}

interface ChildProps {
  total: number;
  on: boolean;
  focus: boolean;
}

const ContainerWrapper = styled.View<ContainerWrapperProps>`
  width: ${({ total }): number => total * 30};
  height: 30px;
  background-color: ${COLOR.BACKGROUND};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.3 : 1)};
`;

const StarComponent = styled.TouchableOpacity`
  width: ${(props: ChildProps): string =>
    props.focus ? `${(100 / props.total) * 1.02}%` : `${100 / props.total}%`};
  height: ${(props: ChildProps): string => (props.focus ? '102%' : '100%')};
  background-color: ${(props: ChildProps): string =>
    props.on ? COLOR.ACTIVE : COLOR.INACTIVE};
  border: 1px solid white;
`;

function Rating(props: Props): React.ReactElement {
  const [value, setValue] = useState(0);
  const [stars, setStars] = useState(new Array(props.total).fill(false));
  const [focus, setfocus] = useState(false);
  const active = !(props.readonly || props.disabled);
  const _onChangeValue = (): void => {
    const result = stars.fill(false);
    let i = 0;
    while (i < value) {
      result[i] = true;
      i++;
    }

    setStars(result);

    props.onChange && props.onChange({ stars: value });
  };

  const _handlePress = (index: number): void => {
    active && setValue(index + 1);
  };

  const _handlePressIn = (): void => {
    active && setfocus(true);
  };

  const _handlePressOut = (): void => {
    active && setfocus(false);
  };

  React.useEffect(() => {
    setValue(props.value);
  }, []);

  React.useEffect(() => {
    _onChangeValue();
  }, [value]);

  return (
    <ContainerWrapper total={props.total} disabled={props.disabled}>
      {stars.map((item, index) => (
        <StarComponent
          key={index}
          total={props.total}
          focus={focus}
          onPress={(): void => _handlePress(index)}
          onPressIn={_handlePressIn}
          onPressOut={_handlePressOut}
          on={stars[index]}
          activeOpacity={active ? 0.8 : 1}
        />
      ))}
    </ContainerWrapper>
  );
}

export default Rating;
