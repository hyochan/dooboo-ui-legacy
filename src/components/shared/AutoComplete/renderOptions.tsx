import { OptionText, OptionWrapper, OptionsContainer } from './styles';
import React, { FC, ReactElement } from 'react';

import { RenderOptionProps } from './types';

const RenderOption: FC<RenderOptionProps> = ({
  id,
  label,
  value,
  onPress,
}): ReactElement => {
  return (
    <OptionWrapper onPress={(): void => onPress(label)}>
      <OptionText>{`${label} (${id}) +${value}`}</OptionText>
    </OptionWrapper>
  );
};

const RenderOptions = ({ data, onPress }): ReactElement => {
  return (
    <OptionsContainer
      data={data}
      extraData={data}
      renderItem={({ item }): ReactElement => (
        <RenderOption {...item} onPress={onPress} />
      )}
      keyExtractor={(item): string => item.id}
    />
  );
};

export default RenderOptions;
