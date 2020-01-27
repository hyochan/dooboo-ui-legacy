import { Datum, Direction, RenderOptionProps, RenderOptionsProps } from './types';
import { InnerOptionWrapper, MarginSpace, OptionText, OptionWrapper, styles } from './styles';
import React, { FC, ReactElement } from 'react';

import { FlatList } from 'react-native';

const RenderOption: FC<RenderOptionProps> = ({
  id,
  label,
  value,
  leftIcon,
  rightIcon,
  onPress,
  isSelected,
  underlayColor,
}): ReactElement => {
  return (
    <OptionWrapper
      isSelected={isSelected}
      onPress={(): void => onPress({ id, label, value, leftIcon, rightIcon })}
      underlayColor={underlayColor}>
      <InnerOptionWrapper>
        {(leftIcon && typeof leftIcon !== 'string') &&
          [
            leftIcon,
            <MarginSpace key={Direction.right} location={Direction.right} />,
          ]
        }
        <OptionText>{`${
          typeof leftIcon === 'string' ? leftIcon + ' ' : ''
        }${label} (${id}) ${value}${
          typeof rightIcon === 'string' ? ' ' + rightIcon : ''
        }`}</OptionText>
        {(rightIcon && typeof rightIcon !== 'string') &&
          [
            <MarginSpace key={Direction.left} location={Direction.left} />,
            rightIcon,
          ]
        }
      </InnerOptionWrapper>
    </OptionWrapper>
  );
};

const RenderOptions: FC<RenderOptionsProps> = ({
  data,
  onPress,
  selectedData,
  underlayColor,
  bgColor,
}): ReactElement => (
  <FlatList<Datum>
    keyboardShouldPersistTaps="always"
    contentContainerStyle={{ paddingVertical: 10 }}
    style={[
      styles.optionsWrapper,
      { backgroundColor: bgColor || 'whitesmoke' },
    ]}
    data={data}
    extraData={data}
    renderItem={({ item }): ReactElement => {
      const selectedDataId = selectedData?.id;
      const itemId = item?.id;

      return (
        <RenderOption
          {...item}
          isSelected={
            selectedDataId && itemId ? selectedDataId === itemId : null
          }
          onPress={onPress}
          underlayColor={underlayColor}
        />
      );
    }}
    keyExtractor={(item): string => item.id}
  />
);

export default RenderOptions;
