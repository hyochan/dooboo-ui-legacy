import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import EditText from '../EditText';

let props: any;
let component: ReactElement;
let testingLib: RenderResult;

const createTestProps = (
  obj?: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[EditText] render default component test', () => {
  it('should render without crasing', () => {
    component = <EditText />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render with error message when isErrored props is true', () => {
    props = createTestProps({
      isErrored: true,
    });

    component = <EditText {...props} />;
    testingLib = render(component);

    expect(testingLib.baseElement).toMatchSnapshot();
  });

  it('should render Row type component when labelPosition props is row', () => {
    props = createTestProps({
      labelPosition: 'row',
    });

    component = <EditText {...props} />;
    testingLib = render(component);
    expect(testingLib.baseElement).toMatchSnapshot();
  });
});

describe('[EditText] event test', () => {
  beforeAll(() => {
    props = createTestProps();
    testingLib = render(<EditText />);
  });

  it('should change borderColor when focused', () => {
    const textInput = testingLib.getByTestId('TextInput-test');

    act(() => {
      fireEvent.focus(textInput);
    });

    expect(textInput.props.style[1].borderColor).toEqual('#109CF1');
  });

  it('should change borderColor when blured', () => {
    const textInput = testingLib.getByTestId('TextInput-test');

    act(() => {
      fireEvent.blur(textInput);
    });

    expect(textInput.props.style[0].borderColor).toEqual('#e0e0e0');
  });

  afterAll((done) => {
    cleanup();
    done();
  });
});
