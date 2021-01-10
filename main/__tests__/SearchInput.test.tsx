import React, { ReactElement } from 'react';
import {
  RenderAPI,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

import { SearchInput } from '../../main';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[SearchInput] render test', () => {
  const inputValue = '';

  it('should render without crashing', () => {
    props = createTestProps();
    component = <SearchInput {...props} value={inputValue} />;
    testingLib = render(component);

    expect(testingLib.toJSON()).toMatchSnapshot();
  });
});

describe('[SearchInput] event test', () => {
  beforeAll(() => {
    const inputValue = '';

    props = createTestProps();
    testingLib = render(<SearchInput {...props} value={inputValue} />);
  });

  it('should change borderColor when focused', () => {
    const input = testingLib.getByTestId('SEARCH_INPUT');
    const container = testingLib.getByTestId('SEARCH_CONTAINER');

    act(() => {
      fireEvent(input, 'focus');
    });

    expect(container.props.style[2].borderColor).toEqual('#109CF1');
  });

  // it('should change borderColor when Blured', () => {
  //   const input = testingLib.getByTestId('SEARCH_INPUT');
  //   const container = testingLib.getByTestId('SEARCH_CONTAINER');

  //   act(() => {
  //     fireEvent(input, 'blur');
  //   });

  //   expect(container.props.style[0].borderColor).toEqual('#E0E0E0');
  // });

  afterAll((done) => {
    done();
  });
});

describe('[SearchInput] ResetIndicator test', () => {
  beforeAll(() => {
    const inputValue = 'some value';

    props = createTestProps();
    testingLib = render(<SearchInput {...props} value={inputValue} />);
  });

  afterAll((done) => {
    done();
  });
});
