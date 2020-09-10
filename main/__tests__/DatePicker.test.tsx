import * as React from 'react';

import DateInput from '../DatePicker/DateInput';
import { DatePicker } from '../DatePicker';
import PickerCalendar from '../DatePicker/PickerCalendar';

import { render } from '@testing-library/react-native';

describe('[DateInput] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <DateInput
        onPressCalendar={(): void => {}}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[DatePicker] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <DatePicker />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[PickerCalendar] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <PickerCalendar
        visible={false}
        onSelectDate={(): void => {}}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
