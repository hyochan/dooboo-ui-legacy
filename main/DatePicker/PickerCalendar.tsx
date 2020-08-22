import { Modal, TextStyle, ViewStyle } from 'react-native';
import React, { FC } from 'react';

import DateInput from './DateInput';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

const TempText = styled.Text``;
interface Props {
  open: boolean;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
}

const PickerCalendar: FC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [pickerOpen, setPickerOpen] = React.useState<boolean>(false);

  return (
    <Modal>
      <TempText>{'가나다라..'}</TempText>
    </Modal>
  );
};

export default PickerCalendar;
