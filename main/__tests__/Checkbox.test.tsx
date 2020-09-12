import * as React from 'react';
import { Checkbox } from '../Checkbox';
import { TouchableHighlight } from 'react-native';
import renderer from 'react-test-renderer';

let props: unknown;

// Note: test renderer must be required after react-native.
const createTestProps = (obj: Record<string, unknown>): Record<string, unknown> => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

const component = (props?): React.ReactElement => {
  return <Checkbox {...props}/>;
};

describe('[CheckBox]', () => {
  beforeEach(() => {
    props = createTestProps({});
  });

  it('render without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component(props))
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  describe('[CheckBox] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();
      const rendered = renderer.create(
        component({
          label: 'CHECKBOX_LABEL',
          onChange: handlePress,
        }),
      );

      const checkboxClick = rendered.root.findByType(TouchableHighlight);
      renderer.act(() => {
        checkboxClick.props.onPress();
      });
      expect(handlePress).toHaveBeenCalled();
    });
    it('should simulate props', (): void => {
      const rendered = renderer.create(
        component({
          label: 'CHECKBOX_LABEL',
        }),
      );

      rendered.update(component({ disabled: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });
});
