import * as React from 'react';

import { Text, View } from 'react-native';
import { fireEvent, render, wait } from '@testing-library/react-native';
import renderer, { act } from 'react-test-renderer';

import SearchInput from '../SearchInput';

const createTestProps = ({ value = '' }: { value: string }) => ({
  onDebounceOrOnReset: jest.fn(),
  value: value,
});

const component = (props) => <SearchInput {...props} />;

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
