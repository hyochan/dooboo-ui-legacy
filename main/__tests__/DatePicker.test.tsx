import * as React from 'react';

import { DatePicker } from '../DatePicker';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line
const component = (props?: any): React.ReactElement => {
  return <DatePicker {...props} />;
};

describe('[DatePicker]', () => {
  let rendered: renderer.ReactTestRenderer;

  it('should render without crasing', () => {
    rendered = renderer.create(component());
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();
  });
});
