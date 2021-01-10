import * as React from 'react';
// Note: test renderer must be required after react-native.
import { TouchableOpacity, View } from 'react-native';
import { Rating } from '../../main';
import renderer from 'react-test-renderer';

const defaultProps = {
  total: 5,
  value: 0,
};

const component = (props?): React.ReactElement => {
  return <Rating {...props} />;
};

describe('[Rating] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(component(defaultProps)).toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('[Rating] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();

      const rendered = renderer.create(
        component({
          ...defaultProps,
          testID: 'RATING_ID',
          onChange: handlePress,
        }),
        {
          createNodeMock: () => {
            return {
              handlePressIn: handlePress,
              handlePressOut: handlePress,
            };
          },
        },
      );

      const stars = rendered.root.findAllByType(TouchableOpacity);
      const ratingClick = stars[stars.length - 1];

      renderer.act(() => {
        ratingClick.props.onPress();
      });

      expect(handlePress).toHaveBeenCalled();
    });

    it('should simulate props', (): void => {
      const rendered = renderer.create(
        component({
          ...defaultProps,
          testID: 'RATING_ID',
        }),
      );

      rendered.update(component({ value: 1 }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(component({ disabled: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    it('should simulate customItem and containerStyle props', (): void => {
      const rendered = renderer.create(
        component({
          ...defaultProps,
          customItem: {
            onComponent: <View />,
            offComponent: <View />,
          },
          containerStyle: {
            width: 300,
          },
          testID: 'RATING_ID',
        }),
      );

      rendered.update(component({ value: 3 }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(component({ disabled: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });
});
