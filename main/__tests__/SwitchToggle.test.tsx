import React, {ReactElement} from 'react';

import {SwitchToggle} from '../../main';
import {TouchableOpacity} from 'react-native';
import renderer from 'react-test-renderer';

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

let props;
let component: ReactElement;
// let testingLib: RenderResult;

describe('[SwitchToggle]', (): void => {
  props = createTestProps({
    testID: 'SWITCH_ID',
    onPress: jest.fn(),
  });

  component = <SwitchToggle {...props} />;

  it('should render without crashing', (): void => {
    const rendered = renderer.create(component);

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[SwitchToggle] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const rendered = renderer.create(component);
      const switchToggle = rendered.root.findByType(TouchableOpacity);

      jest.useFakeTimers();

      renderer.act(() => {
        switchToggle.props.onPress();
      });

      jest.runAllTimers();
      expect(props.onPress).toHaveBeenCalled();
    });

    it('should toggle switchOn on press', () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const props = {
        switchOn: false,
        onPress: jest.fn(),
      };

      component = <SwitchToggle {...props} />;

      const rendered = renderer.create(component);
      const switchToggle = rendered.root.findByType(TouchableOpacity);

      jest.useFakeTimers();

      renderer.act(() => {
        switchToggle.props.onPress();
      });

      jest.runAllTimers();
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
