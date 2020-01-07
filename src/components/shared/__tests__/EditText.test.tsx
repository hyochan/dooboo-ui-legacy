import * as React from 'react';

import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import EditText from '../EditText';
import { View } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

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
      borderStyle: { },
      borderColor: '#fff',
      errorColor: '#fff',
      onChangeText: (word: string): void => {
        value = word;
      },
      rightElementStyle: {},
      leftElementStyle: {},
      focusColor: '#fff',
      inputContainerRadius: 30,
    };
    beforeEach(() => {
      component = <EditText {...props} autoCapitalize="words" />;
      testingLib = render(component);
    });

    it('should set error message when no valid email has been written', async () => {
      const input = testingLib.getByTestId('INPUT_TEST');
      act(() => {
        fireEvent.changeText(input, 'input test');
      });
      expect(value).toEqual('input test');
    });

    it('should trigger onSubmit', async () => {
      const input = testingLib.getByTestId('INPUT_TEST');
      act(() => {
        fireEvent.submitEditing(input);
      });
    });
  });

  describe('default', () => {
    beforeEach(() => {
      component = <EditText />;
    });

    it('renders without crashing', () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('Default type input with errorText', () => {
      const props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        errorText: 'error text',
      };
      beforeEach(() => {
        component = <EditText {...props} />;
      });

      it('renders default type input with errorText', () => {
        const rendered = renderer.create(component).toJSON();
        expect(rendered).toMatchSnapshot();
        expect(rendered).toBeTruthy();
      });
    });

    describe('props: [onFocus, onBlur]', () => {
      describe('With errorText', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
          onFocus: (): void => {},
          onBlur: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('renders default type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });

      describe('Without errorText', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          onFocus: (): void => {},
          onBlur: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('renders default type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });

      describe('undefined', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
        };

        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });
    });
  });

  describe('row', () => {
    beforeEach(() => {
      props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        type: 'row',
      };
      component = <EditText {...props} />;
    });

    it('renders without crashing', () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('props: [label]', () => {
      describe('only label without focus', () => {
        const props = {
          type: 'row',
          label: 'label text',
          errorText: 'errorText',
          onBlur: (): void => {},
          onFocus: (): void => {},
        };

        beforeEach(() => {
          component = <EditText {...props} />;
        });

        it('renders row type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });
      });

      describe('focus is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
          label: 'label text',
          focused: true,
          onBlur: (): void => {},
          onFocus: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('renders row type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });

      describe('focus is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
          label: 'label text',
          focused: false,
          onBlur: (): void => {},
          onFocus: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
        });

        it('renders row type input without errorText', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });
      });
    });
  });

  describe('box', () => {
    beforeEach(() => {
      props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        type: 'box',
        onFocus: (): void => {},
        onBlur: (): void => {},
      };
      component = <EditText {...props} />;
    });

    it('renders without crashing', () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('props: [onFocus, onBlur]', () => {
      describe('focused is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          onFocus: (): void => {},
          onBlur: (): void => {},
        };

        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('renders box type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });

      describe('focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          errorText: 'error text',
          onFocus: (): void => {},
          onBlur: (): void => {},
        };

        beforeEach(() => {
          component = <EditText {...props} />;
        });

        it('renders box type input with props errorText', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });
      });

      describe('undefined', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
        };

        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });
    });

    describe('props: [leftElement, rightElement]', () => {
      const props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        type: 'box',
        leftElement: <View />,
        rightElement: <View />,
      };
      beforeEach(() => {
        component = <EditText {...props} />;
      });
      it('renders box type input with leftElement and rightElement', () => {
        const rendered = renderer.create(component).toJSON();
        expect(rendered).toMatchSnapshot();
        expect(rendered).toBeTruthy();
      });
    });
  });

  describe('box row', () => {
    beforeEach(() => {
      props = {
        testID: 'INPUT_TEST',
        testError: 'ERROR_TEST',
        type: 'rowBox',
      };
      component = <EditText {...props} />;
    });

    it('renders without crashing', () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('props: [label]', () => {
      describe('only label without focus', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label text',
          errorText: 'errorText',
          onFocus: (): void => {},
          onBlur: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} onFocus={props.onFocus} onBlur={props.onBlur}/>;
          testingLib = render(component);
        });

        it('renders row type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });
      });

      describe('focus is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label text',
          focused: true,
          onFocus: (): void => {},
          onBlur: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });

        it('renders row type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });

        it('should trigger blur for [focused: false]', async () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.blur(input);
          });

          // const onFocus = testingLib.getByOnFocus(component).toJSON();
        });

        it('should trigger onFocus for [focused: true]', () => {
          const input = testingLib.getByTestId('INPUT_TEST');
          act(() => {
            fireEvent.focus(input);
          });
        });
      });

      describe('focus is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label text',
          focused: false,
          onFocus: (): void => {},
          onBlur: (): void => {},
        };
        beforeEach(() => {
          component = <EditText {...props} />;
        });

        it('renders row type input', () => {
          const rendered = renderer.create(component).toJSON();
          expect(rendered).toMatchSnapshot();
          expect(rendered).toBeTruthy();
        });
      });
    });
  });
});
