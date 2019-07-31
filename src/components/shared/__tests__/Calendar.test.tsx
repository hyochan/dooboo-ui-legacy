import 'react-native';
import * as React from 'react';

// Note: test renderer must be required after react-native.
import Calendar from '../Calendar';

import renderer from 'react-test-renderer';

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
