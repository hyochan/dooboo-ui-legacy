import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

interface CustomItem {
  onComponent: React.ReactElement;
  offComponent: React.ReactElement;
}
interface Props {
  total: number;
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  customItem?: CustomItem;
  containerStyle?: StyleProp<ViewStyle>;
}

interface ContainerWrapperProps {
  total: number;
  disabled?: boolean;
}

interface StarProps {
  key: number;
  isOn: boolean;
  onPress: () => void;
  disabled?: boolean;
  customItem?: CustomItem;
}

const ContainerWrapper = styled.View<ContainerWrapperProps>`
  width: ${({ total }): number => total * 30}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${({ disabled }): number => (disabled ? 0.5 : 1)};
`;

const StarWrapper = styled.TouchableOpacity`
`;

const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`;

function StarComponent({ customItem, onPress, isOn, disabled }: StarProps): React.ReactElement {
  const handlePress = (): void => {
    onPress();
  };

  const star: React.ReactElement = React.useMemo(() => {
    if (customItem) {
      return isOn ? customItem.onComponent : customItem.offComponent;
    } else {
      const image = isOn
        ? require('./__assets__/star_s.png')
        : require('./__assets__/star_d.png');

      return <StyledImage source={image} resizeMode="contain" />;
    }
  }, [customItem?.onComponent, customItem?.offComponent, isOn]);

  return (
    <StarWrapper onPress={handlePress} activeOpacity={disabled ? 1 : 0.7}>
      {star}
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
        isOn={props.value - 1 >= index}
        onPress={(): void => {
          (props.onChange && !props.disabled) && _handlePress(index);
        }}
        disabled={!props.onChange || props.disabled}
        customItem={props.customItem}
      />
    ));
  }, [props.value, props.onChange, props.disabled]);

  return (
    <ContainerWrapper style={props.containerStyle} total={props.total} disabled={props.disabled}>
      {starsArr}
    </ContainerWrapper>
  );
}

export { Rating };
