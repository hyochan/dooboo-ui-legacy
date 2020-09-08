import * as React from 'react';
import { Checkbox } from '../Checkbox';

import {
  render,
} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

describe('[CheckBox]', () => {
  const defaultPros = {
    label: 'testProps',
  };
  it('render without crashing', () => {
    const rendered = render(<Checkbox {...defaultPros}/>);
    expect(rendered).toMatchSnapshot();
  });
});
