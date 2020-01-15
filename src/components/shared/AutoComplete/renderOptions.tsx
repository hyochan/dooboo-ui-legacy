import { DummyDatum, RenderOptionProps, RenderOptionsProps } from './types';
import { OptionText, OptionWrapper, OptionsContainer } from './styles';
import React, { FC, ReactElement } from 'react';

import { FlatList } from 'react-native';

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
  onPressOutside,
}): ReactElement => (
  <OptionsContainer onPress={onPressOutside}>
    <FlatList<DummyDatum>
      contentContainerStyle={{ paddingVertical: 10 }}
      data={data}
      extraData={data}
      renderItem={({ item }): ReactElement => {
        const selectedDataId = selectedData && selectedData.id;
        const itemId = item && item.id;

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
  </OptionsContainer>
);

export default RenderOptions;
