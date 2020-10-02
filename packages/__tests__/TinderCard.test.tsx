import 'react-native';

import * as React from 'react';

import TinderCard from '../TinderCard';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line
let props: any;
let component: React.ReactElement;
// let testingLib: RenderResult;

const createTestProps = (obj: Record<string, unknown>): Record<string, unknown> => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[TinderCard] render', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = <TinderCard {...props} />;
  });

  it('renders without crashing', () => {
    const rendered = renderer
      .create(component)
      .toJSON();

    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  // describe('interactions', () => {
  //   beforeEach(() => {
  //     testingLib = render(component);
  //   });

  //   it('should simulate onClick', () => {
  //     const btn = testingLib.queryByTestId('btn');
  //     act(() => {
  //       fireEvent.press(btn);
  //     });
  //     expect(cnt).toBe(3);
  //   });
  // });
});
