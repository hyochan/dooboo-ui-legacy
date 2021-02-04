import * as React from 'react';

import {
  RenderAPI,
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';

import {EditText} from '../../main';
import type {EditTextProps} from '../../main/EditText';
import RNWebHooks from 'react-native-web-hooks';
import {ReactTestInstance} from 'react-test-renderer';

jest.mock('react-native-web-hooks', () => ({
  useHover: () => false,
}));

let testingLib: RenderAPI;

const component = (editProps?: EditTextProps): React.ReactElement => {
  return <EditText {...editProps} />;
};

describe('[EditText]', () => {
  describe('interactions', () => {
    beforeAll(() => {
      testingLib = render(
        component({
          autoCapitalize: 'words',
        }),
      );
    });

    describe('hovered', () => {
      let container: ReactTestInstance;

      beforeAll(() => {
        jest.spyOn(RNWebHooks, 'useHover').mockImplementation(() => true);
      });

      it('should render styles', async () => {
        testingLib = render(
          component({
            styles: {
              hovered: {
                backgroundColor: 'green',
              },
            },
          }),
        );

        container = await waitFor(() => testingLib.getByTestId('container-id'));

        const containerCustomStyle = container.props.style[0][1];

        expect(containerCustomStyle).toEqual({backgroundColor: 'green'});
      });

      describe('labeText', () => {
        it('should render text', async () => {
          testingLib = render(
            component({
              labelText: 'label text',
            }),
          );

          const label = await waitFor(() => testingLib.getByText('label text'));

          expect(label).toBeTruthy();
        });

        it('should render style', async () => {
          testingLib = render(
            component({
              labelText: 'label text',
              styles: {
                labelText: {
                  color: 'green',
                },
              },
            }),
          );

          const label = await waitFor(() => testingLib.getByText('label text'));
          const labelTextStyle = label.props.style[1];

          expect(labelTextStyle).toEqual({color: 'green'});
        });

        describe('unhovered', () => {
          beforeAll(() => {
            jest.spyOn(RNWebHooks, 'useHover').mockImplementation(() => false);
          });

          it('should contain `disableColor` - default', async () => {
            testingLib = render(
              component({
                labelText: 'label text',
                styles: {
                  labelText: {
                    color: 'green',
                  },
                },
                disableColor: '#666',
              }),
            );

            const label = await waitFor(() =>
              testingLib.getByText('label text'),
            );

            const unhoveredTextStyle = label.props.style[2];

            expect(unhoveredTextStyle).toEqual({color: '#666'});
          });

          it('should contain `focusColor` when focused', async () => {
            testingLib = render(
              component({
                testID: 'INPUT_TEST',
                labelText: 'label text',
                styles: {
                  labelText: {
                    color: 'green',
                  },
                },
                disableColor: '#666',
                focusColor: 'pink',
              }),
            );

            const input = await waitFor(() =>
              testingLib.getByTestId('INPUT_TEST'),
            );

            act(() => {
              input.props.onFocus();
            });

            const label = testingLib.getByText('label text');

            const unhoveredTextStyle = label.props.style[2];

            expect(unhoveredTextStyle).toEqual({color: 'pink'});
          });

          it('should contain `errorColor` when `errorText is provided', async () => {
            testingLib = render(
              component({
                testID: 'INPUT_TEST',
                labelText: 'label text',
                errorText: 'error text',
                styles: {
                  labelText: {
                    color: 'green',
                  },
                },
                errorColor: 'orange',
              }),
            );

            const input = await waitFor(() =>
              testingLib.getByTestId('INPUT_TEST'),
            );

            act(() => {
              input.props.onFocus();
            });

            const label = testingLib.getByText('label text');
            const error = testingLib.getByText('error text');

            const unhoveredTextStyle = label.props.style[2];

            expect(error).toBeTruthy();
            expect(unhoveredTextStyle).toEqual({color: 'orange'});
          });
        });
      });

      it('should trigger `onFocus`', async () => {
        testingLib = render(
          component({
            testID: 'INPUT_TEST',
            onFocus: jest.fn(),
          }),
        );

        const input = await waitFor(() => testingLib.getByTestId('INPUT_TEST'));

        expect(input).toBeTruthy();

        act(() => {
          fireEvent(input, 'focus');
        });
      });

      describe('onBlur (focused === false)', () => {
        it('should trigger blur without errorText', async () => {
          testingLib = render(
            component({
              onBlur: () => {},
              testID: 'INPUT_TEST',
            }),
          );

          const input = await waitFor(() =>
            testingLib.getByTestId('INPUT_TEST'),
          );

          expect(input).toBeTruthy();

          act(() => {
            fireEvent(input, 'blur');
          });
        });

        it('should trigger blur with errorText', async () => {
          testingLib = render(
            component({
              testID: 'INPUT_TEST',
              errorText: 'error text',
            }),
          );

          const input = await waitFor(() =>
            testingLib.getByTestId('INPUT_TEST'),
          );

          expect(input).toBeTruthy();

          act(() => {
            fireEvent(input, 'blur');
          });
        });
      });
    });

    describe('Type: [row] - default', () => {
      it('should render without crashing', () => {
        testingLib = render(component());

        const json = testingLib.toJSON();

        expect(json).toBeTruthy();

        testingLib = render(
          component({
            type: 'row',
          }),
        );

        expect(json).toMatchSnapshot();
        expect(json).toBeTruthy();
      });
    });

    describe('Type: [column]', () => {
      it('renders without crashing', () => {
        testingLib = render(
          component({
            type: 'column',
          }),
        );

        const json = testingLib.toJSON();

        expect(json).toMatchSnapshot();
        expect(json).toBeTruthy();
      });
    });

    // Below tests is emitting console error but this is expeted
    describe('web', () => {
      beforeAll(() => {
        jest.mock('react-native/Libraries/Utilities/Platform', () => ({
          OS: 'web',
          select: () => ({
            web: true,
            default: undefined,
          }),
        }));
      });

      it('renders without crashing', () => {
        testingLib = render(
          component({
            type: 'column',
          }),
        );

        const json = testingLib.toJSON();

        expect(json).toMatchSnapshot();
        expect(json).toBeTruthy();
      });
    });
  });
});
