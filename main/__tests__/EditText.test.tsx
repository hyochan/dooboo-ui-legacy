import * as React from 'react';

import {
  RenderAPI,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {EditText} from '../../main';
import {View} from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let component: React.ReactElement;
let testingLib: RenderAPI;

describe('[EditText]', () => {
  let value = '';

  describe('interactions', () => {
    const props = {
      testID: 'INPUT_TEST',
      testError: 'ERROR_TEST',
      type: 'box',
      borderWidth: 3,
      textStyle: {},
      labelWidth: 90,
      borderStyle: {},
      borderColor: '#fff',
      errorColor: '#fff',
      onChangeText: (word: string): void => {
        value = word;
      },
      leftElement: <View />,
      rightElement: <View />,
      rightElementStyle: {},
      leftElementStyle: {},
      focusColor: '#fff',
      inputContainerRadius: 30,
      onFocus: undefined,
      focusLabelStyle: {fontWeight: 500},
      focusBorderWidth: 10,
    };

    beforeEach(() => {
      component = <EditText {...props} autoCapitalize="words" />;
      testingLib = render(component);
    });

    it('should set error message when no valid email has been written', async () => {
      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent.changeText(input, 'input test');
      });

      expect(value).toEqual('input test');
    });

    // it('should trigger onSubmit', async () => {
    //   const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

    //   await waitFor(() => {
    //     fireEvent.submitEditing(input);
    //   });
    // });

    it('renders editText and running onFocus', async () => {
      props.onFocus = (): void => {};
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent(input, 'focus');
      });
    });
  });

  // errorText == undefined ? true : false
  describe('Type: [default]', () => {
    const props = {
      testID: 'INPUT_TEST',
      testError: 'ERROR_TEST',
      label: 'label text',
      errorText: undefined,
      onFocus: undefined,
      onBlur: undefined,
    };

    it('renders without crashing', () => {
      component = <EditText {...props} />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders editText and running onFocus', async () => {
      props.onFocus = (): void => {};
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};

      it('should trigger blur without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur with errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });
    });
  });

  describe('Type: [row]', () => {
    const props = {
      testID: 'INPUT_TEST',
      testError: 'ERROR_TEST',
      type: 'row',
      label: undefined,
      errorText: undefined,
      onFocus: undefined,
      onBlur: undefined,
    };

    it('renders without crashing', () => {
      component = <EditText {...props} />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders row type input and runs onFocus', async () => {
      props.label = 'label text';
      props.onFocus = (): void => {};
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};
      // props.errorText = 'error test';

      it('renders row type input without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('renders row type input with props errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur focus when onBlur and onFocus are undefined', async () => {
        props.onBlur = undefined;
        props.onFocus = undefined;
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });

        await waitFor(() => {
          fireEvent(input, 'focus');
        });
      });
    });
  });

  describe('Type: [box]', () => {
    const props = {
      testID: 'INPUT_TEST',
      testError: 'ERROR_TEST',
      type: 'box',
      label: 'label text',
      errorText: undefined,
      onFocus: undefined,
      onBlur: undefined,
    };

    it('renders without crashing', () => {
      component = <EditText {...props} />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders editText and running onFocus', async () => {
      props.onFocus = (): void => {};
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};

      it('should trigger blur without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur with errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });
    });
  });

  describe('Type: [rowBox]', () => {
    const props = {
      testID: 'INPUT_TEST',
      testError: 'ERROR_TEST',
      type: 'rowBox',
      label: undefined,
      errorText: undefined,
      onFocus: undefined,
      onBlur: undefined,
    };

    it('renders without crashing', () => {
      component = <EditText {...props} />;
      testingLib = render(component);

      const rendered = renderer.create(component).toJSON();

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('renders row type input and runs onFocus', async () => {
      props.label = 'label text';
      props.onFocus = (): void => {};
      component = <EditText {...props} />;
      testingLib = render(component);

      const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

      await waitFor(() => {
        fireEvent(input, 'focus');
      });
    });

    describe('when running onBlur (focused === false)', () => {
      props.onBlur = (): void => {};
      // props.errorText = 'error test';

      it('renders row type input without errorText', async () => {
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('renders row type input with props errorText', async () => {
        props.errorText = 'error text';
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });
      });

      it('should trigger blur focus when onBlur and onFocus are undefined', async () => {
        props.onBlur = undefined;
        props.onFocus = undefined;
        component = <EditText {...props} />;
        testingLib = render(component);

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        await waitFor(() => {
          fireEvent(input, 'blur');
        });

        await waitFor(() => {
          fireEvent(input, 'focus');
        });
      });
    });
  });
});
