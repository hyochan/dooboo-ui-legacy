import * as React from 'react';

import Button, { TESTID, THEME } from '../Button';
import {
  NativeTestInstance,
  NativeTestInstanceJSON,
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

import { ReactTestInstance } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  dark?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  indicatorColor?: string;
  activeOpacity?: number;
  children?: string | React.ReactElement;
  text?: string;
  onClick?: (params?: any) => void | Promise<void>;
}

const renderComponent = (props?: Props): RenderResult => {
  const defaultProps = {
    testID: TESTID.BUTTON,
  };

  const propsToApply = props ? {
    ...defaultProps,
    ...props,
  } : defaultProps;

  const component = (
    <ThemeProvider theme={THEME.LIGHT}>
      <Button {...propsToApply} />
    </ThemeProvider>
  );

  return render(component);
};
const renderComponentAsJson = (props?: Props): NativeTestInstanceJSON => renderComponent(props).asJSON();
const getButton = (comp: RenderResult): NativeTestInstance | null => comp.getByTestId(TESTID.BUTTON);
const getText = (comp: RenderResult): NativeTestInstance | null => comp.getByTestId(TESTID.TEXT);
const queryIconLeft = (comp: RenderResult): NativeTestInstance | null => comp.queryByTestId(TESTID.ICONLEFT);
const queryIconRight = (comp: RenderResult): NativeTestInstance | null => comp.queryByTestId(TESTID.ICONRIGHT);
const queryActivityIndicator =
  (comp: RenderResult): NativeTestInstance | null => comp.queryByTestId(TESTID.ACTIVITYINDICATOR);

describe('[Button]', () => {
  it('renders without crashing', () => {
    const comp = renderComponentAsJson();

    expect(comp).toMatchSnapshot();
    expect(comp).toBeTruthy();
  });

  it('renders without crashing when children is not empty', () => {
    const comp = renderComponentAsJson({
      children: (
        <Text>Sample text</Text>
      ),
    });

    expect(comp).toMatchSnapshot();
    expect(comp).toBeTruthy();
  });

  it('should render text by the value of text prop', async () => {
    const SAMPLE_TEXT = 'sampleText';
    const comp = renderComponent({
      text: SAMPLE_TEXT,
    });

    const text = await getText(comp);
    expect(text.children).toContain(SAMPLE_TEXT);
  });

  it('should render children', async () => {
    const SAMPLE_ELEMENT_TESTID = 'sampleElement';
    const SAMPLE_TEXT = 'sampleElementText';
    const sampleElement = (
      <Text testID={SAMPLE_ELEMENT_TESTID}>{SAMPLE_TEXT}</Text>
    );
    const comp = renderComponent({
      children: sampleElement,
    });

    const text = await comp.queryByTestId(SAMPLE_ELEMENT_TESTID);
    expect(text.children).toContain(SAMPLE_TEXT);
  });

  it('should render text when type of children is string', async () => {
    const SAMPLE_TEXT = 'sampleElementText';
    const comp = renderComponent({
      children: SAMPLE_TEXT,
    });

    const text = await getText(comp);
    expect(text.children).toContain(SAMPLE_TEXT);
  });

  it('should not render [ActivityIndicator] as default', async () => {
    const comp = renderComponent();
    const activityIndicator = await queryActivityIndicator(comp);

    expect(activityIndicator).toBeNull();
  });

  it('should render [ActivityIndicator] when isLoading prop is true', async () => {
    const comp = renderComponent({
      isLoading: true,
    });
    const activityIndicator = await queryActivityIndicator(comp);

    expect(activityIndicator).not.toBeNull();
  });

  it('should render [ActivityIndicator] with the value of indicatorColor prop', async () => {
    const SAMPLE_COLOR = 'red';
    const comp = renderComponent({
      isLoading: true,
      indicatorColor: SAMPLE_COLOR,
    });
    const activityIndicator = await queryActivityIndicator(comp);

    expect(activityIndicator.props.color).toEqual(SAMPLE_COLOR);
  });

  it('should render left icon when iconLeft prop is not empty', async () => {
    const SAMPLE_TEXT = 'sampleElementText';
    const sampleElement = (
      <Text>{SAMPLE_TEXT}</Text>
    );
    const comp = renderComponent({
      iconLeft: sampleElement,
    });
    const iconLeft = await queryIconLeft(comp);
    const icon = iconLeft.children[0] as ReactTestInstance;

    expect(iconLeft).not.toBeNull();
    expect(icon.children).toContain(SAMPLE_TEXT);
  });

  it('should not render left icon when isLoading prop is true', async () => {
    const SAMPLE_ELEMENT_TESTID = 'sampleElement';
    const sampleElement = (
      <Text testID={SAMPLE_ELEMENT_TESTID}>sampleElemenetText</Text>
    );
    const comp = renderComponent({
      iconLeft: sampleElement,
      isLoading: true,
    });
    const iconLeft = await queryIconLeft(comp);
    const icon = await comp.queryByTestId(SAMPLE_ELEMENT_TESTID);

    expect(iconLeft).toBeNull();
    expect(icon).toBeNull();
  });

  it('should render right icon when iconRight prop is not empty', async () => {
    const SAMPLE_TEXT = 'sampleElementText';
    const sampleElement = (
      <Text>{SAMPLE_TEXT}</Text>
    );
    const comp = renderComponent({
      iconRight: sampleElement,
    });
    const iconRight = await queryIconRight(comp);
    const icon = iconRight.children[0] as ReactTestInstance;

    expect(iconRight).not.toBeNull();
    expect(icon.children).toContain(SAMPLE_TEXT);
  });

  it('should not render right icon when isLoading prop is true', async () => {
    const SAMPLE_ELEMENT_TESTID = 'sampleElement';
    const sampleElement = (
      <Text testID={SAMPLE_ELEMENT_TESTID}>sampleElemenetText</Text>
    );
    const comp = renderComponent({
      iconRight: sampleElement,
      isLoading: true,
    });
    const iconRight = await queryIconLeft(comp);
    const icon = await comp.queryByTestId(SAMPLE_ELEMENT_TESTID);

    expect(iconRight).toBeNull();
    expect(icon).toBeNull();
  });

  describe('interactions', () => {
    it('should call onClick on pressed', () => {
      const onClick = jest.fn();
      const comp = renderComponent({
        onClick,
      });
      const button = getButton(comp);

      fireEvent.press(button);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
