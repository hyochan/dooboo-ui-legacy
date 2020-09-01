import * as React from 'react';

import { CheckboxGroup } from '../Checkbox';

import renderer from 'react-test-renderer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let props: any;
let component: React.ReactElement;

const createTestProps = (obj: Record<string, unknown>): Record<string, unknown> => ({
  ...obj,
});

describe('[CheckboxGroup] render', () => {
  beforeEach(() => {
    props = createTestProps({});
    component = <CheckboxGroup {...props} />;
  });
  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
