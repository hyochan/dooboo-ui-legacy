import * as React from 'react';

import {act, fireEvent, render, waitFor} from '@testing-library/react-native';

import {Button} from '../../main';
import type {ButtonProps} from '../../main/Button';
import {LoadingIndicator} from '../LoadingIndicator';
import type {RenderAPI} from '@testing-library/react-native';
import {Text} from 'react-native';

let testingLib: RenderAPI;

jest.mock('react-native-web-hooks', () => ({
  useHover: () => true,
}));

const component = (props?: ButtonProps): React.ReactElement => {
  return <Button {...props} />;
};

describe('[Button]', () => {
  it('should render without crashing', () => {
    testingLib = render(component());

    const json = testingLib.toJSON();

    expect(json).toBeTruthy();
  });

  describe('Loading', () => {
    it('should render loading status', () => {
      testingLib = render(component({loading: true}));

      expect(LoadingIndicator).toBeDefined();
      expect(testingLib.getByTestId('loading-view')).toBeTruthy();
    });

    it('should render default disabled style when disabled', () => {
      testingLib = render(
        component({
          loading: true,
          disabled: true,
        }),
      );

      expect(
        testingLib.getByTestId('loading-view').props.style[4],
      ).toBeTruthy();
    });

    it('should render disabled button style when disabled', () => {
      testingLib = render(
        component({
          loading: true,
          disabled: true,
          styles: {
            disabledButton: {
              borderColor: 'red',
            },
          },
        }),
      );

      const disabledButtonStyle = testingLib.getByTestId('loading-view').props
        .style[4][1];

      expect(disabledButtonStyle).toEqual({
        borderColor: 'red',
      });
    });

    it('should render custom container', () => {
      testingLib = render(
        component({
          loading: true,
          disabled: false,
          styles: {
            container: {
              borderRadius: 0,
            },
          },
        }),
      );

      expect(testingLib.getByTestId('loading-view')).toBeTruthy();
    });
  });

  describe('Button', () => {
    it('should render disabled status', () => {
      testingLib = render(
        component({
          disabled: true,
        }),
      );

      const json = testingLib.toJSON();

      expect(json).toBeTruthy();
    });

    it('should render disabled status with disabled style', () => {
      testingLib = render(
        component({
          disabled: true,
          styles: {
            disabledButton: {
              backgroundColor: 'yellow',
            },
          },
        }),
      );

      const button = testingLib.getByTestId('button-view');
      const disabledButtonStyle = button.props.style[3];

      const found = disabledButtonStyle.some(
        (el) => el.backgroundColor === 'yellow',
      );

      expect(found).toBeTruthy();
    });

    it('should render container', () => {
      testingLib = render(
        component({
          styles: {
            container: {
              backgroundColor: 'blue',
            },
          },
        }),
      );

      const button = testingLib.getByTestId('button-view');
      const buttonContainerStyle = button.props.style[1];

      expect(buttonContainerStyle).toEqual({
        backgroundColor: 'blue',
      });
    });
  });

  describe('After onLayout', () => {
    it('should trigger onLayout then set loading-view layout', async () => {
      testingLib = render(component());

      const button = testingLib.getByTestId('button-view');

      act(() => {
        button.props.onLayout({
          nativeEvent: {
            layout: {
              width: 375,
              height: 667,
            },
          },
        });
      });

      testingLib.rerender(
        component({
          loading: true,
        }),
      );

      const loading = await waitFor(() =>
        testingLib.getByTestId('loading-view'),
      );

      const buttonLayoutStyle = loading.props.style[2];

      expect(buttonLayoutStyle.width).toEqual(375);
      expect(buttonLayoutStyle.height).toEqual(667);
    });
  });

  it('should render left and right elements', () => {
    testingLib = render(
      component({leftElement: <Text />, rightElement: <Text />}),
    );

    const button = testingLib.getByTestId('button-view');

    expect(button.findAllByType(Text)).toHaveLength(3);
  });

  describe('[Button] Interaction', () => {
    let cnt = 1;

    it('should simulate onPress', () => {
      testingLib = render(
        component({
          onPress: () => cnt++,
        }),
      );

      const button = testingLib.getByTestId('button-view');

      fireEvent.press(button);

      expect(cnt).toBe(2);
    });
  });
});
