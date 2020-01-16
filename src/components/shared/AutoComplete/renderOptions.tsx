import { DummyDatum, RenderOptionProps, RenderOptionsProps } from './types';
import { OptionText, OptionWrapper, styles } from './styles';
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
}): ReactElement => (
  <FlatList<DummyDatum>
    keyboardShouldPersistTaps="always"
    contentContainerStyle={{ paddingVertical: 10 }}
    style={styles.optionsWrapper}
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
