import * as React from 'react';

// Note: test renderer must be required after react-native.
import { SwitchToggle } from '../../main';
import { TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';

const component = (props?): React.ReactElement => {
  return <SwitchToggle {...props} />;
};

describe('[SwitchToggle]', (): void => {
  it('should render without crashing', (): void => {
    const rendered = renderer.create(component());
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[SwitchToggle] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();
      const rendered = renderer.create(
        component({
          testID: 'SWITCH_ID',
          onPress: handlePress,
        }),
      );
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
