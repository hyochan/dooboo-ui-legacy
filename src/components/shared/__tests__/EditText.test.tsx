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
import { transpileModule } from 'typescript';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

describe('[EditText]', () => {
  let value = '';

  describe('default', () => {
    beforeEach(() => {
      props = {
        onBlur: (): void => {},
        onFocus: (): void => {},
        errorText: 'error',
        focused: true,
      };
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

    describe('errorText', () => {
      it('renders default(underlined) type input with errorText', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
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
      });
    });

    describe('focused', () => {
      it('renders default(underlined) type input and focused is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders default(underlined) type input and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: false,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders default(underlined) type input with props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          errorText: 'error text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: false,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });
    });
  });

  describe('row', () => {
    beforeEach(() => {
      props = {
        onBlur: (): void => {},
        onFocus: (): void => {},
        type: 'row',
        errorText: 'error',
        focused: true,
      };
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
        type: 'row',
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

    describe('label', () => {
      it('renders [row] direction with label', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
          label: 'label text',
          errorText: 'error text',
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
      });

      it('renders row type input with props label and not including props errorText and focused is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
          label: 'label text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders row type input with props label and not including props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
          label: 'label text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: false,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders [row] direction without label', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'row',
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
      });
    });
  });

  describe('box', () => {
    beforeEach(() => {
      props = {
        onBlur: (): void => {},
        onFocus: (): void => {},
        type: 'box',
        errorText: 'error',
        focused: true,
      };
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
        type: 'box',
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

    describe('focused', () => {
      it('renders box type input and focused is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders box type input with props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          errorText: 'error text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders box type input without props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });
    });

    describe('left, right element', () => {
      it('renders [box] direction with left, right element', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          leftElement: <View />,
          rightElement: <View />,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders [box] direction without left, right element', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'box',
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
      });
    });
  });

  describe('box row', () => {
    beforeEach(() => {
      props = {
        onBlur: (): void => {},
        onFocus: (): void => {},
        type: 'rowBox',
        errorText: 'error',
        focused: true,
      };
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
        type: 'rowBox',
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

    describe('focused', () => {
      it('renders row box type input and focused is true', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders row box type input with props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label',
          errorText: 'error text',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });

      it('renders row box type input without props errorText and focused is false', () => {
        const props = {
          testID: 'INPUT_TEST',
          testError: 'ERROR_TEST',
          type: 'rowBox',
          label: 'label',
          onChangeText: (word: string): void => {
            value = word;
          },
          onBlur: (): void => {},
          onFocus: (): void => {},
          focused: true,
        };
        beforeEach(() => {
          component = <EditText {...props} />;
          testingLib = render(component);
        });
      });
    });
  });
});
