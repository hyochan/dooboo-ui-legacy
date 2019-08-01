import 'react-native';
import * as React from 'react';
import LoadingIndicator from '../LoadingIndicator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { fireEvent, render, RenderResult } from '@testing-library/react-native';

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...obj,
});

describe('[LoadingIndicator] render', () => {
  beforeEach(() => {
    props = createTestProps({ });
    component = (
      <LoadingIndicator {...props} />
    );
  });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON =
      renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
