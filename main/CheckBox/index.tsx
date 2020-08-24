import React, { FC } from 'react';
import {
  Text,
  View,
} from 'react-native';

interface Props {
  defaultChecked?: boolean,
  disabled?: boolean,
}

const CheckBox: FC<Props> = ({ defaultChecked = false, disabled = false }) => {
  return (
    <View>
      <Text>Checkbox</Text>
    </View>
  );
};

export { CheckBox };
