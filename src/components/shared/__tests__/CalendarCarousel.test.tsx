import * as React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import Calendar from '../CalendarCarousel';

const component = (props?: any) => {
  return (
    <Calendar
      {...props}
    />
  );
};

describe('[Calendar]', () => {
  it('should render without crashing', () => {
    const rendered = renderer.create(component());
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
