import 'react-native';

import * as React from 'react';

import LoadingIndicator from '../LoadingIndicator';
import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

const createTestProps = (obj: object): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[LoadingIndicator] render', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = <LoadingIndicator {...props} />;
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
