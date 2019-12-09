import { OptionText, OptionWrapper, OptionsContainer } from './styles';
import React, { FC, ReactElement } from 'react';

import { RenderOptionProps, RenderOptionsProps } from './types';

const RenderOption: FC<RenderOptionProps> = ({
  id,
  label,
  value,
  onPress,
  isSelected,
  underlayColor,
}): ReactElement => {
  return (
    <OptionWrapper
      isSelected={isSelected}
      onPress={(): void => onPress({ id, label, value })}
      underlayColor={underlayColor}
    >
      <OptionText>{`${label} (${id}) +${value}`}</OptionText>
    </OptionWrapper>
  );
};

const RenderOptions: FC<RenderOptionsProps> = ({
  data,
  onPress,
  selectedData,
  underlayColor,
}): ReactElement => {
  return (
    <OptionsContainer
      data={data}
      extraData={data}
      renderItem={({ item }): ReactElement => (
        <RenderOption
          {...item}
          isSelected={selectedData && selectedData.id && item && item.id && selectedData.id === item.id}
          onPress={onPress}
          underlayColor={underlayColor}
        />
      )}
      keyExtractor={(item): string => item.id}
    />
  );
};

export default RenderOptions;
