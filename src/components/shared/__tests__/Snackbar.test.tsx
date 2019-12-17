import 'react-native';

import * as React from 'react';

import Snackbar, { SnackbarProps } from '../Snackbar';

import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.

const props: SnackbarProps = {
  testID: 'snackbar',
  text: 'SnackBar!',
  show: true,
  setShow: jest.fn(),
};
let component: React.ReactElement;

jest.useFakeTimers();

describe('[Snackbar]', () => {
  beforeEach(() => {
    component = <Snackbar {...props} />;
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component);
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();

    rendered.update(<Snackbar {...{ ...props, show: false }} />);
    expect(rendered.toJSON()).toBeFalsy();
  });

  it('should dismiss after timeout', async () => {
    render(component);
    jest.runAllTimers();
    expect(props.setShow).toBeCalled();
  });
});
