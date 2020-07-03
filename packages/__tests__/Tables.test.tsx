import 'react-native';

import React, { ReactElement } from 'react';
import { RenderResult, render } from '@testing-library/react-native';
import Table, { Props } from '../Tables';

const TEST_ID = {
  CELL: 'table-cell-test-id',
  ROW: 'table-row-test-id',
  HEADER: 'table-header-test-id',
  TITLE: 'table-title-test-id',
  CHECK: 'check-wrapper-test-id',
  CHECKBOX: 'checkbox-test-id',
};
let props: any;
let component: ReactElement;
let testingLib: RenderResult;

const data = [
  {
    id: 1,
    name: 'song',
    phoneNumber: '010-1234-1234',
    email: 'song@email.com',
    nickname: 'song',
  },
  {
    id: 2,
    name: 'james',
    phoneNumber: '010-1234-1234',
    email: 'james@email.com',
    nickname: 'james',
  },
  {
    id: 3,
    name: 'jerry',
    phoneNumber: '010-1234-1234',
    email: 'jerry@email.com',
    nickname: 'jerry',
  },
  {
    id: 4,
    name: 'ethan',
    phoneNumber: '010-1234-1234',
    email: 'ethan@email.com',
    nickname: 'ethan',
  },
  {
    id: 5,
    name: 'rim',
    phoneNumber: '010-1234-1234',
    email: 'rim@email.com',
    nickname: 'rim',
  },
  {
    id: 6,
    name: 'zong',
    phoneNumber: '010-1234-1234',
    email: 'zong@email.com',
    nickname: 'zong',
  },
  {
    id: 7,
    name: 'kong',
    phoneNumber: '010-1234-1234',
    email: 'kong@email.com',
    nickname: 'kong',
  },
  {
    id: 8,
    name: 'cong',
    phoneNumber: '010-1234-1234',
    email: 'cong@email.com',
    nickname: 'cong',
  },
  {
    id: 9,
    name: 'king',
    phoneNumber: '010-1234-1234',
    email: 'king@email.com',
    nickname: 'king',
  },
  {
    id: 10,
    name: 'kim',
    phoneNumber: '010-1234-1234',
    email: 'kim@email.com',
    nickname: 'kim',
  },
];

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});
const initialProps: Props = {
  data: data,
};

describe('[Tables] render test', (): void => {
  it('should render without crashing', () => {
    props = createTestProps();
    component = <Table {...props} {...initialProps} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toBeTruthy();
  });
  it('should render collapsed when collapsedWhenRendered props is false', () => {
    props = createTestProps({
      collapsedWhenRendered: false,
      data: data,
    });
    component = <Table {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });
  describe('required components', () => {
    it('should have a [TITLE].', () => {
      props = createTestProps();
      const { getAllByTestId } = render(<Table {...initialProps} {...props} />);

      const title = getAllByTestId(TEST_ID.TITLE);
      expect(title).not.toBeNull();
    });

    it('should have a [HEADER].', () => {
      props = createTestProps();
      const { getAllByTestId } = render(<Table {...initialProps} {...props} />);

      const header = getAllByTestId(TEST_ID.HEADER);
      expect(header).not.toBeNull();
    });

    it('should have a [ROW].', () => {
      props = createTestProps();
      const { getAllByTestId } = render(<Table {...props} {...initialProps} />);

      const row = getAllByTestId(TEST_ID.ROW);
      expect(row).not.toBeNull();
    });

    it('should have a [CELL].', () => {
      props = createTestProps();
      const { getAllByTestId } = render(<Table {...props} {...initialProps} />);
      const cell = getAllByTestId(TEST_ID.CELL);
      expect(cell).not.toBeNull();
    });
  });
  it('should hide [Checkbox] when isCheckAble is (false or undefined.)', () => {
    const { queryByTestId } = render(
      <Table {...props} {...initialProps} isCheckAble={false} />,
    );
    const checkbox = queryByTestId(TEST_ID.CHECKBOX);

    expect(checkbox).toBeNull();
  });
  it('should show [Checkbox] when isCheckAble is (true.)', () => {
    const { getAllByTestId } = render(
      <Table {...props} {...initialProps} isCheckAble={true} />,
    );
    const checkbox = getAllByTestId(TEST_ID.CHECKBOX);
    expect(checkbox).not.toBeNull();
  });
  it('should render checkbox when isCheckAble is true', () => {
    jest.useFakeTimers();
    props = createTestProps({
      isCheckAble: true,
      data: data,
    });
    component = <Table {...props} />;
    testingLib = render(component);
    jest.runAllTimers();

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  describe('[Table] event test', () => {
    describe('[CHECKBOX] Interaction', (): void => {
      it('should simulate onPress', (): void => {});
      it('should show simulate isChecked count', () => {});
    });
  });
});
