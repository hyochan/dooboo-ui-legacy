import * as React from 'react';
import { TouchableOpacity } from 'react-native';

// Note: test renderer must be required after react-native.
import SwitchToggle from '../SwitchToggle';

import renderer from 'react-test-renderer';

const component = (props?: any) => {
  return (
    <SwitchToggle
      {...props}
    />
  );
};

describe('[SwitchToggle]', () => {
  it('should render without crashing', () => {
    const rendered = renderer.create(component());
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[SwitchToggle] Interaction', () => {
    it('should simulate onPress', () => {
      const handlePress = jest.fn();
      const rendered = renderer.create(component({
        onPress: handlePress,
      }));
      const switchToggle = rendered.root.findByType(TouchableOpacity);
      renderer.act(() => {
        switchToggle.props.onPress();
      });
      expect(handlePress).toHaveBeenCalled();
    });

    it('should toggle switchOn on press', () => {
      const props = {
        switchOn: false,
      };
      const rendered = renderer.create(component(props));
      const switchToggle = rendered.root.findByType(TouchableOpacity);

      renderer.act(() => {
        switchToggle.props.onPress();
      });
      expect(props.switchOn).toBeFalsy();

      // renderer.act(() => {
      //   switchToggle.props.onPress();
      // });
      // expect(props.switchOn).toBeTruthy();

      renderer.act(() => {
        switchToggle.props.onPress();
      });
      expect(props.switchOn).toBeFalsy();
    });
  });
});
