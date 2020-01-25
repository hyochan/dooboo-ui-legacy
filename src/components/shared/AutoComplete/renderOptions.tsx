import { Datum, RenderOptionProps, RenderOptionsProps } from './types';
import { OptionText, OptionWrapper, styles } from './styles';
import React, { FC, ReactElement } from 'react';

import { FlatList } from 'react-native';

const RenderOption: FC<RenderOptionProps> = ({
  id,
  label,
  value,
  flag,
  onPress,
  isSelected,
  underlayColor,
}): ReactElement => {
  return (
    <OptionWrapper
      isSelected={isSelected}
      onPress={(): void => onPress({ id, label, value, flag })}
      underlayColor={underlayColor}
    >
      <OptionText>{`${flag ? flag + ' ' : ''}${label} (${id}) ${value}`}</OptionText>
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
    style={[styles.optionsWrapper, { backgroundColor: bgColor || 'whitesmoke' }]}
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
