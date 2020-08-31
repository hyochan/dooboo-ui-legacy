import * as React from 'react';
import { Checkbox } from '../Checkbox';
import renderer from 'react-test-renderer';

// Note: test renderer must be required after react-native.
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
  return <Checkbox {...props} />;
};

describe('[Checkbox] render', () => {
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

  describe('[Checkbox] Interaction', (): void => {
    it('should simulate props', (): void => {
      const rendered = renderer.create(
        component({
          testID: 'RADIOBUTTON_ID',
        }),
      );

      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });
});
