import * as React from 'react';

import SearchInput from '../SearchInput';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

const createTestProps = ({ value = '' }: { value: string }): object => ({
  testID: 'RESET_BUTTON',
  onDebounceOrOnReset: jest.fn(),
  value: value,
});

const component = (props): React.ReactElement => <SearchInput {...props} />;

describe('[SearchInput] render', () => {
  it('component and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(component(createTestProps({ value: '' })))
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[SearchInput] interaction', () => {
  it('should show reset button when input `value` exists', () => {
    const rendered = render(
      component(createTestProps({ value: 'initial value' })),
    );
    expect(rendered.getByTestId('RESET_BUTTON')).toBeTruthy();
  });

  it('should not show reset button when empty input value', () => {
    const rendered = render(component(createTestProps({ value: '' })));
    expect(rendered.queryByTestId('RESET_BUTTON')).toBeNull();
  });
});
