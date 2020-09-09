import * as React from 'react';

import { RadioButton } from '../../main';
// Note: test renderer must be required after react-native.
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

/**
 * using for animation easing
 * check: https://stackoverflow.com/questions/50793885/referenceerror-you-are-trying-to-import-a-file-after-the-jest-environment-has
 */
jest.useFakeTimers();

let props: unknown;
// let component: React.ReactElement;
// let testingLib: RenderResult;

const createTestProps = (obj: Record<string, unknown>): Record<string, unknown> => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

const component = (props?): React.ReactElement => {
  return <RadioButton {...props} />;
};

describe('[RadioButton] render', () => {
  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component(props))
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[RadioButton] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();
      const rendered = renderer.create(
        component({
          testID: 'RADIOBUTTON_ID',
          onPress: handlePress,
        }),
      );
      const radioButtonClick = rendered.root.findByType(TouchableOpacity);
      renderer.act(() => {
        radioButtonClick.props.onPress();
      });
      expect(handlePress).toHaveBeenCalled();
    });
    it('should simulate props', (): void => {
      const rendered = renderer.create(
        component({
          testID: 'RADIOBUTTON_ID',
        }),
      );

      rendered.update(component({ labelPlacement: 'top' }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(component({ disabled: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(
        component({ disabled: false, value: 0, selectedValue: 1 }),
      );
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });
});
