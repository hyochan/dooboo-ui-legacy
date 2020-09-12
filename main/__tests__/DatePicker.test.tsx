import * as React from 'react';
import Calendar from '../DatePicker/Calendar/Calendar';
import CalendarDate from '../DatePicker/Calendar/CalendarDate';
import CalendarMonth from '../DatePicker/Calendar/CalendarMonth';
import CalendarWeekDays from '../DatePicker/Calendar/CalendarWeekDays';
import DateInput from '../DatePicker/DateInput';
import { DatePicker } from '../DatePicker';
import PickerCalendar from '../DatePicker/PickerCalendar';
import { TouchableOpacity } from 'react-native';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('[DatePicker] render', () => {
  it('should render without crashing', () => {
    const rendered = render(<DatePicker />).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[DateInput] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <DateInput onPressCalendar={(): void => {}} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
  describe('[DateInput] Interaction', () => {
    it('should simulate onPress', () => {
      const onPressCalendar = jest.fn();
      const rendered = renderer.create(
        <DateInput onPressCalendar={onPressCalendar} />,
        {
          createNodeMock: () => {
            return {
              onPressCalendarIn: onPressCalendar,
              onPressCalendarOut: onPressCalendar,
            };
          },
        },
      );

      const dateInputClicked = rendered.root.findByType(TouchableOpacity);
      renderer.act(() => {
        dateInputClicked.props.onPress();
      });
      expect(onPressCalendar).toHaveBeenCalled();
    });
  });
});

describe('[PickerCalendar] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <PickerCalendar visible={false} onSelectDate={(): void => {}} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Calendar]', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <Calendar
        calendarWidth={300}
        renderDay={() => <CalendarDate date={new Date()}></CalendarDate>}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[CalendarDate] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <CalendarDate onPress={(): void => {}} date={new Date()} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[CalendarDate] Interaction', () => {
    it('should simulate onPress', () => {
      const onSelectDate = jest.fn();
      const rendered = renderer.create(
        <CalendarDate onPress={onSelectDate} date={new Date()} />,
        {
          createNodeMock: () => {
            return {
              onSelectDateIn: onSelectDate,
              onSelectDateOut: onSelectDate,
            };
          },
        },
      );

      const dateSelected = rendered.root.findByType(TouchableOpacity);
      renderer.act(() => {
        dateSelected.props.onPress();
      });
      expect(onSelectDate).toHaveBeenCalled();
    });
  });
});

describe('[CalendarMonth] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <CalendarMonth
        monthDate={new Date()}
        calendarWidth={300}
        renderDay={() => <CalendarDate date={new Date()}></CalendarDate>}
        today={new Date()}
      />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[CalendarWeekDays] render', () => {
  it('should render without crashing', () => {
    const rendered = render(
      <CalendarWeekDays calendarWidth={300} weekdayFormat={'narrow'} />,
    ).asJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
