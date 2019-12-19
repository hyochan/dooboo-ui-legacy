import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import EditText from '../EditText';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[EditText]', () => {
  let value = '';

  describe('default', () => {
    beforeEach(() => {
      props = { onBlur: (): void => {}, onFocus: (): void => {}, errorText: 'error', focused: true };
      component = <EditText {...props} />;
    });

    it('renders without crashing', () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('interactions', () => {
      const props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        onChangeText: (word: string): void => {
          value = word;
        },
        onBlur: (): void => {},
        onFocus: (): void => {},
      };
      beforeEach(() => {
        component = <EditText {...props} />;
        testingLib = render(component);
      });

      it('should set error message when no valid email has been written', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.changeText(input, 'input test');
        });
        expect(value).toEqual('input test');
      });

      it('should trigger blur', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.blur(input);
        });
      });

      it('should trigger onFocus', () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.focus(input);
        });
      });

      it('should trigger onSubmit', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.submitEditing(input);
        });
      });
    });
  });

  describe('row', () => {
    describe('default', () => {
      const props = {
        isRow: true,
        testID: 'INPUT_TEST',
        onChangeText: (word: string): void => {
          value = word;
        },
      };
      beforeEach(() => {
        component = <EditText {...props} />;
        testingLib = render(component);
      });

      it('should set error message when no valid email has been written', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.changeText(input, 'input test');
        });
        expect(value).toEqual('input test');
      });

      it('should trigger blur', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.blur(input);
        });
      });

      it('should trigger onFocus', () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.focus(input);
        });
      });

      it('should trigger onSubmit', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.submitEditing(input);
        });
      });
    });

    describe('props', () => {
      const props = {
        isRow: true,
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        onChangeText: (word: string): void => {
          value = word;
        },
        onBlur: (): void => {},
        onFocus: (): void => {},
        errorText: 'error',
        focused: true,
        label: 'label',
      };
      beforeEach(() => {
        component = <EditText {...props} />;
        testingLib = render(component);
      });

      it('should set error message when no valid email has been written', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.changeText(input, 'input test');
        });
        expect(value).toEqual('input test');
      });

      it('should trigger blur', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.blur(input);
        });
      });

      it('should trigger onFocus', () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.focus(input);
        });
      });

      it('should trigger onSubmit', async () => {
        const input = testingLib.getByTestId('INPUT_TEST');
        act(() => {
          fireEvent.submitEditing(input);
        });
      });
    });
  });
});
