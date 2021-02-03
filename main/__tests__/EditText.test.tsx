import * as React from 'react';

import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {EditText} from '../../main';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let component: React.ReactElement;
let testingLib: RenderAPI;

const props: Record<string, unknown> = {
  testID: 'INPUT_TEST',
  testError: 'ERROR_TEST',
  labelText: 'label text',
  errorText: undefined,
  onFocus: undefined,
  onBlur: undefined,
  borderColor: '#fff',
  errorColor: '#fff',
  focusColor: '#fff',
};

describe('[EditText]', () => {
  let value = '';

  describe('interactions', () => {
    props.onChangeText = (word: string): void => {
      value = word;
    };

    beforeEach(() => {
      component = <EditText {...props} autoCapitalize="words" />;
      testingLib = render(component);
    });

    it('should set error message when no valid email has been written', async () => {
      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      act(() => {
        fireEvent.changeText(input, 'input test');
      });

      expect(value).toEqual('input test');
    });

    it('renders editText and running onFocus', async () => {
      props.onFocus = jest.fn();
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      expect(input).toBeTruthy();

      act(() => {
        fireEvent(input, 'focus');
      });
    });
  });

  describe('Type: [row] - default', () => {
    it('renders without crashing', () => {
      component = <EditText {...props} />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders editText and running onFocus', async () => {
      props.onFocus = jest.fn();
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      expect(input).toBeTruthy();

      act(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};

      it('should trigger blur without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur with errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'blur');
        });
      });
    });
  });

  describe('Type: [row]', () => {
    it('renders without crashing', () => {
      component = <EditText {...props} type="row" />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders row type input and runs onFocus', async () => {
      props.label = 'label text';
      props.onFocus = (): void => {};
      component = <EditText {...props} type="row" />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      expect(input).toBeTruthy();

      act(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};

      it('renders row type input without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'blur');
        });
      });

      it('renders row type input with props errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur focus when onBlur and onFocus are undefined', async () => {
        props.onBlur = undefined;
        props.onFocus = undefined;
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'blur');
        });

        act(() => {
          fireEvent(input, 'focus');
        });
      });
    });
  });
});
