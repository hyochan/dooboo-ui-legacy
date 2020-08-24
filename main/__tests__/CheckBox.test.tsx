import * as React from 'react';
import { CheckBox } from '../../main';

import {
  render,
} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.

describe('[CheckBox]', () => {
  it('render without crashing', () => {
    const rendered = render(<CheckBox/>);
    expect(rendered).toMatchSnapshot();
  });
});
