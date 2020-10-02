import React, { ReactElement } from 'react';
import {
  RenderAPI,
  cleanup,
  render,
} from '@testing-library/react-native';
import { Select, SelectItem } from '../../main';

let props: any;
let component: ReactElement;
let testingLib: RenderAPI;

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[Select] render test', () => {
  const placeholderText = 'Testing-placeholder';

  it('should render without crashing', () => {
    props = createTestProps({
      onSelect: jest.fn(),
    });

    component = <Select {...props} placeholder={placeholderText} />;
    testingLib = render(component);

    expect(testingLib.toJSON()).toMatchSnapshot();
  });
});

describe('[SelectItem] render test', () => {
  const itemValue = 'Item-1';

  it('should render without crashing', () => {
    props = createTestProps({
      onSelect: jest.fn(),
    });

    component = <Select {...props} placeholder={itemValue} />;
    testingLib = render(component);

    expect(testingLib.toJSON()).toMatchSnapshot();
  });
});

// describe('[Select, Item] event test', () => {
//   beforeEach(() => {
//     jest.useFakeTimers();
//     props = createTestProps({
//       disabled: false,
//       opened: true,
//       showArrow: true,
//     });
//     component = (
//       <Select {...props}>
//         <SelectItem value="Item-1">{'Item-1'}</SelectItem>
//         <SelectItem value="Item-2">{'Item-2'}</SelectItem>
//       </Select>
//     );
//     testingLib = render(component);
//     jest.runAllTimers();
//   });

//   it('when Disabled is false and Opened is true should operate dropdown animation', () => {
//     const selectChild = testingLib.getByTestId('SELECT_CHILD_SCROLLVIEW');

//     expect(selectChild.props.style.height).toBeGreaterThan(0);
//   });

//   it('when Disabled is false and Opened is true should operate arrow rotate animation', () => {
//     const selectSuffix = testingLib.getByTestId('SELECT_SUFFIX');

//     expect(selectSuffix.props.style.transform[0].rotate).toBe('180deg');
//   });

//   afterAll((done) => {
//     cleanup();
//     done();
//   });
// });
