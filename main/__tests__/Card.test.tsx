import * as React from 'react';

import { Card } from '..';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line
const component = (props?: any): React.ReactElement => {
  return <Card {...props} />;
};

describe('[Card]', () => {
  let rendered: renderer.ReactTestRenderer;

  it('should render without crashing', () => {
    rendered = renderer.create(component());
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();
  });
});
