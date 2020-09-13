import { Checkbox, CheckboxGroup } from '../Checkbox';
import React, { ReactElement } from 'react';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';
import { TouchableHighlight } from 'react-native';
import renderer from 'react-test-renderer';

let props: unknown;
// Note: test renderer must be required after react-native.
const createTestProps = (
  obj: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

const component = (props?): React.ReactElement => {
  return <Checkbox {...props} />;
};

describe('[Checkbox]', () => {
  beforeEach(() => {
    props = createTestProps({});
  });

  it('render without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component(props))
      .toJSON();

    expect(rendered).toMatchSnapshot();
  });

  describe('[Checkbox] Interaction', (): void => {
    it('should simulate onPress', (): void => {
      const handlePress = jest.fn();
      const rendered = renderer.create(
        component({
          label: 'CHECKBOX_LABEL',
          onChange: handlePress,
        }),
      );

      const checkboxClick = rendered.root.findByType(TouchableHighlight);

      renderer.act(() => {
        checkboxClick.props.onPress();
      });
      expect(handlePress).toHaveBeenCalled();
    });
    it('should simulate props', (): void => {
      const rendered = renderer.create(
        component({
          label: 'CHECKBOX_LABEL',
        }),
      );

      rendered.update(component({ disabled: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(component({ checked: true }));
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(
        component({ disabled: false, customStyle: { boxColor: '#FF0000' } }),
      );
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();

      rendered.update(
        component({ disabled: false, checked: false, indeterminate: true }),
      );
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });
  });
});

// ##### CheckboxGroup TestCode #####

const checkboxGroupData = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
  { label: 'Mango', value: 'Mango' },
];

const checkboxGroupDataStr = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

let groupProps: unknown;
let groupComponent: ReactElement;
let testingLib: RenderResult;

const createTestGroupProps = (
  obj: Record<string, unknown>,
): Record<string, unknown> => ({
  ...obj,
});

describe('[CheckboxGroup] render test', () => {
  it('should render without crashing', () => {
    groupProps = createTestGroupProps({
      options: checkboxGroupData,
      values: defaultCheckedList,
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render disabled when CheckboxGroup props is true', () => {
    groupProps = createTestProps({
      disabled: true,
      options: checkboxGroupData,
      values: [],
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render options when CheckboxGroup props is string of Array', () => {
    groupProps = createTestProps({
      disabled: true,
      options: checkboxGroupDataStr,
      values: [],
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render checkall when values is not undefined', () => {
    groupProps = createTestProps({
      disabled: true,
      options: checkboxGroupData,
      values: defaultCheckedList,
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render disabled in Options', () => {
    const checkboxGroupDataDisabled = checkboxGroupData.map((item) => {
      return {
        ...item,
        disabled: false,
      };
    });

    groupProps = createTestProps({
      options: checkboxGroupDataDisabled,
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should render customStyle in Options', () => {
    const checkboxGroupDataCustom = checkboxGroupData.map((item) => {
      return {
        ...item,
        customStyle: {},
      };
    });

    groupProps = createTestProps({
      options: checkboxGroupDataCustom,
    });
    groupComponent = <CheckboxGroup {...groupProps} />;
    testingLib = render(groupComponent);

    expect(testingLib.baseElement).toMatchSnapshot();
    expect(testingLib.baseElement).toBeTruthy();
  });

  it('should reRender without creashing when value props change', () => {
    groupProps = createTestProps({
      options: checkboxGroupDataStr,
      values: [],
    });

    const { rerender } = render(<CheckboxGroup {...groupProps} />);

    const updatedValue = ['Apples'];

    groupProps = createTestProps({
      options: checkboxGroupDataStr,
      values: updatedValue,
    });

    rerender(<CheckboxGroup {...groupProps} />);

    groupProps = createTestProps({
      options: checkboxGroupDataStr,
      values: null,
    });

    rerender(<CheckboxGroup {...groupProps} />);
  });

  it('should be toggleOption triggered by checkbox', () => {
    const handlePress = jest.fn();
    const defaultProps = {
      options: checkboxGroupData,
      values: defaultCheckedList,
      onChange: handlePress,
    };

    const groupComponent = (props?): React.ReactElement => {
      return <CheckboxGroup {...props} />;
    };

    const rendered = renderer.create(groupComponent(defaultProps));
    const checkbox = rendered.root.findAllByType(Checkbox)[0];

    renderer.act(() => {
      checkbox.findByType(TouchableHighlight).props.onPress();
    });

    expect(rendered.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      rendered.update(groupComponent({ ...defaultProps, values: [] }));
      checkbox.findByType(TouchableHighlight).props.onPress();
    });

    expect(rendered.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      rendered.update(groupComponent({ ...defaultProps, values: undefined }));
      checkbox.findByType(TouchableHighlight).props.onPress();
    });

    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
