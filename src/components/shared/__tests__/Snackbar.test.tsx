import * as React from 'react';

import Snackbar, { SnackbarRef } from '../Snackbar';
import { Text, TouchableOpacity, View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

// Note: test renderer must be required after react-native.
let snackbarRef: React.MutableRefObject<SnackbarRef>;

jest.useFakeTimers();

function TestWrapper(): React.ReactElement {
  snackbarRef = React.useRef();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        testID="Button"
        onPress={(): void => snackbarRef.current && snackbarRef.current.show({
          text: 'snackbar content',
        })}>
        <Text>
          show snack bar
        </Text>
      </TouchableOpacity>
      <Snackbar ref={snackbarRef} />
    </View>
  );
}

describe('[Snackbar]', () => {
  it('renders TestWrapper without crashing', () => {
    const rendered = renderer.create(<TestWrapper />);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('should simulate showing snackbar', async () => {
    const renderResult = render(<TestWrapper />);
    const btn = renderResult.getByTestId('Button');
    act(() => {
      fireEvent.press(btn);
      fireEvent.press(btn);
    });
    jest.runAllTimers();
  });
});
