import { OptionText, OptionWrapper, OptionsContainer } from './styles';
import React, { FC, ReactElement } from 'react';

import { RenderOptionProps } from './types';

const RenderOption: FC<RenderOptionProps> = ({
  id,
  label,
  value,
  onPress,
  underlayColor,
}): ReactElement => {
  return (
    <OptionWrapper
      onPress={(): void => onPress(label)}
      underlayColor={underlayColor}
    >
      <OptionText>{`${label} (${id}) +${value}`}</OptionText>
    </OptionWrapper>
  );
};

const RenderOptions = ({
  data,
  onPress,
  underlayColor = 'black',
}): ReactElement => {
  return (
    <OptionsContainer
      data={data}
      extraData={data}
      renderItem={({ item }): ReactElement => (
        <RenderOption
          {...item}
          onPress={onPress}
          underlayColor={underlayColor}
        />
      )}
      keyExtractor={(item): string => item.id}
    />
  );
};

export default RenderOptions;
