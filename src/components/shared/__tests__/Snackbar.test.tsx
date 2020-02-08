import * as React from 'react';

import { Animated, Text, TouchableOpacity, View } from 'react-native';
import Snackbar, { SnackbarProvider, SnackbarRef, useSnackbarContext } from '../Snackbar';

import { fireEvent, render, wait } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

// Note: test renderer must be required after react-native.
let snackbarRef: React.MutableRefObject<SnackbarRef>;

jest.useFakeTimers();

const buttonText = 'show snack bar';
const message = 'snackbar content';

function TestWrapper(): React.ReactElement {
  snackbarRef = React.useRef();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        testID="Button"
        onPress={(): void => {
          snackbarRef.current && snackbarRef.current.show({
            text: message,
            actionText: 'some action',
          });
        }}>
        <Text>
          {buttonText}
        </Text>
      </TouchableOpacity>
      <Snackbar testID={'snackbar'} ref={snackbarRef} />
    </View>
  );
}

function TestSnackbarProvider(): React.ReactElement {
  const snackbar = useSnackbarContext();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        testID="Button"
        onPress={(): void => {
          snackbar.show({
            text: message,
            actionText: 'some action',
          });
        }}>
        <Text>
          {buttonText}
        </Text>
      </TouchableOpacity>
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
    });
    await wait(() => expect(renderResult.getByTestId('snackbar')).toBeTruthy());
    expect(renderResult.asJSON()).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(renderResult.queryByTestId('snackbar')).toBeFalsy();

    // Test hide previous snackbar when showing new one.
    const timingSpy = jest.spyOn(Animated, 'timing');

    act(() => {
      fireEvent.press(btn);
    });
    await wait(() => expect(renderResult.getByTestId('snackbar')).toBeTruthy());
    act(() => {
      fireEvent.press(btn);
    });

    // Check if close(50) called!
    expect(timingSpy.mock.calls.find(
      (predicate) => predicate[1].toValue === 0 && predicate[1].duration === 50),
    ).toBeTruthy();

    act(() => jest.runAllTimers());

    // Check hide
    expect(renderResult.queryByTestId('snackbar')).toBeFalsy();
  });
});

describe('[Snackbar] using provider', () => {
  const TestElement = (
    <SnackbarProvider>
      <TestSnackbarProvider/>
    </SnackbarProvider>
  );
  it('renders TestWrapper without crashing', () => {
    const rendered = renderer.create(TestElement);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('should simulate showing snackbar', async () => {
    const renderResult = render(TestElement);
    const btn = renderResult.getByTestId('Button');
    act(() => {
      fireEvent.press(btn);
    });
    await wait(() => expect(renderResult.getByText(message)).toBeTruthy());
    expect(renderResult.asJSON()).toMatchSnapshot();
    act(() => {
      jest.runAllTimers();
    });
    expect(renderResult.queryByTestId('snackbar')).toBeFalsy();

    // Test hide previous snackbar when showing new one.
    const timingSpy = jest.spyOn(Animated, 'timing');

    act(() => {
      fireEvent.press(btn);
    });
    await wait(() => expect(renderResult.getByText(message)).toBeTruthy());
    act(() => {
      fireEvent.press(btn);
    });

    // Check if close(50) called!
    expect(timingSpy.mock.calls.find(
      (predicate) => predicate[1].toValue === 0 && predicate[1].duration === 50),
    ).toBeTruthy();

    act(() => jest.runAllTimers());

    // Check hide
    expect(renderResult.queryByTestId('snackbar')).toBeFalsy();
  });
});
