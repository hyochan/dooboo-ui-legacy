import 'react-native';

import * as React from 'react';

import Snackbar, { SnackbarProps } from '../Snackbar';

import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.

let props: SnackbarProps;
let component: React.ReactElement;

describe('[Snackbar]', () => {
  beforeEach(() => {
    props = {
      testID: 'snackbar',
    };
    component = <Snackbar {...props} />;
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
