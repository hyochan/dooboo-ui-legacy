import 'react-native';

import * as React from 'react';

import Calendar from '../CalendarCarousel';
import renderer from 'react-test-renderer';

let props: any;

const component = (): React.ReactElement => {
  return <Calendar {...props} />;
};

describe('[Calendar]', () => {
  it('should render without crashing', () => {
    const rendered = renderer.create(component());

    // expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
