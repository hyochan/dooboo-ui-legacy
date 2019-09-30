import 'react-native';

import * as React from 'react';

import { RenderResult, fireEvent, render } from '@testing-library/react-native';

import LoadingIndicator from '../LoadingIndicator';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

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
