import * as React from 'react';

import { Mode, ThemeEnum } from '../Select/constants';
import {
  RenderResult,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import Select, { Props, TESTID } from '../Select';
import renderer, { act } from 'react-test-renderer';

import { DIALOG_TEST_ID } from '../Select/Dialog';
import { DROPDOWN_TEST_ID } from '../Select/DropDown';
import { PICKER_TEST_ID } from '../Select/Picker';
import { View } from 'react-native';

jest.useFakeTimers();

const ITEMS = [
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
  { value: '30', label: 'Thirty' },
  { value: '40', label: 'Forty' },
  { value: '50', label: 'Fifty' },
  { value: '60', label: 'Sixty' },
  { value: '70', label: 'Seventy' },
  { value: '80', label: 'Eighty' },
  { value: '90' },
];

type selectProp<K extends string> = {
  [T in K]: Props;
};
const onSelect = jest.fn();

const mockProp: selectProp<
  'noTheme' | 'inputTheme' | 'themeAndRootView' | 'disabled'
> = {
  noTheme: {
    testID: 'select',
    placeholder: 'select',
    title: 'noTheme',
    titleStyle: {
      color: 'green',
    },
    textStyle: {
      color: 'orange',
    },
    items: ITEMS,
    onSelect,
    selectedValue: null,
  },
  inputTheme: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'inputTheme',
    placeholder: 'select',
    items: ITEMS,
    onSelect,
    selectedValue: null,
  },
  themeAndRootView: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'themeAndRootView',
    style: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: 'orange',
    },
    placeholder: 'select',
    items: ITEMS,
    onSelect,
    selectedValue: null,
  },
  disabled: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'disabled',
    style: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: 'orange',
    },
    textStyle: {
      color: 'orange',
    },
    placeholder: 'select',
    items: ITEMS,
    disabled: true,
    onSelect,
    selectedValue: null,
  },
};

interface ObjParam {
  case?: string;
  prop?: object;
}

const createTestProps = (props): Props => {
  return {
    testID: 'select',
    navigation: {
      navigate: jest.fn(),
    },
    items: ITEMS,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    onItemPressIn: jest.fn(),
    onItemPressOut: jest.fn(),
    ...props,
  };
};

const TestComponent = (props): React.ReactElement => {
  const [selectedValue, setSelectedValue] = React.useState(
    props.selectedValue || null,
  );
  let onValueChange = null;
  if (props.onValueChange !== null) {
    onValueChange = jest.fn((item) => {
      setSelectedValue(item.value);
    });
  }
  let onSelect = null;
  if (props.onSelect !== null) {
    onSelect = jest.fn((item) => {
      setSelectedValue(item.value);
    });
  }

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Select
        {...props}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        onSelect={onSelect}
      />
    </View>
  );
};

describe('[Select][ROOT] render', () => {
  let props: Props;
  let component: React.ReactElement;
  let testLib: RenderResult;

  it('renders without crashing', () => {
    props = createTestProps({});
    component = <TestComponent {...props} />;
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
  });

  describe('style changes according to theme', () => {
    it('[none] If no value is set for theme props, it looks like none', () => {
      const propsWithoutTheme = createTestProps({});
      const component1 = <TestComponent {...propsWithoutTheme} />;
      const testLib1 = render(component1);
      const props = createTestProps({ theme: ThemeEnum.none });
      const component2 = <TestComponent {...props} />;
      const testLib2 = render(component2);
      expect(testLib1.asJSON()).toMatchSnapshot();
      expect(testLib2.asJSON()).toMatchSnapshot();
      expect(testLib1.asJSON()).toEqual(testLib2.asJSON());
    });

    it('[underbar] If underbar is selected', () => {
      props = createTestProps({ theme: ThemeEnum.underbar });
      component = <TestComponent {...props} />;
      testLib = render(component);
      expect(testLib.asJSON()).toMatchSnapshot();
    });

    it('[box] If underbar is selected', () => {
      props = createTestProps({ theme: ThemeEnum.box });
      component = <TestComponent {...props} />;
      testLib = render(component);
      expect(testLib.asJSON()).toMatchSnapshot();
    });

    it('[disabled] If disabled is true', () => {
      props = createTestProps({ disabled: true });
      component = <TestComponent {...props} />;
      testLib = render(component);
      expect(testLib.asJSON()).toMatchSnapshot();
    });
  });
});

describe('[Select] render', () => {
  const createTestProps = (obj: ObjParam): Props => ({
    testID: 'select',
    navigation: {
      navigate: jest.fn(),
    },
    items: ITEMS,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    ...mockProp[obj.case],
    ...obj.prop,
  });

  describe('interactions', () => {
    it('check theme, title, textStyle, titleTextStyle, and placeholder with case "notheme"', () => {
      const theme = 'noTheme';
      const props = createTestProps({ case: theme });
      const component = <TestComponent {...props} />;
      const testingLib = render(component);
      expect(testingLib.asJSON()).toMatchSnapshot();
      const rootButton = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTBUTTON}`,
      );
      const selectRootText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const [inputtedRootTextStyle] =
        selectRootText.props.style &&
        selectRootText.props.style.filter((style) => {
          return style === mockProp[theme].textStyle;
        });
      expect(rootButton.props.theme).toEqual(ThemeEnum.none);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.blank);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootTextStyle).toEqual(mockProp[theme].textStyle);
    });

    it('check theme, title, textStyle, and placeholder with case "inputTheme"', () => {
      const theme = 'inputTheme';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTBUTTON}`,
      );
      const selectRootText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const selectTitleText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TITLETEXT}`,
      );
      const [inputtedRootTextStyle] =
        selectRootText.props.style &&
        selectRootText.props.style.filter((style) => {
          return style === mockProp[theme].textStyle;
        });
      expect(rootButton.props.theme).toEqual(ThemeEnum.box);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
      expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootTextStyle).toEqual(mockProp[theme].textStyle);
    });

    it('check theme, title, style, and placeholder with case "themeAndRootView"', () => {
      const theme = 'themeAndRootView';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTBUTTON}`,
      );
      const selectRootText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const selectTitleText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TITLETEXT}`,
      );
      const [inputtedRootViewStyle] =
        rootButton.props.style &&
        rootButton.props.style.filter((style) => {
          return style === mockProp[theme].style;
        });
      expect(rootButton.props.theme).toEqual(ThemeEnum.blank);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
      expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootViewStyle).toEqual(mockProp[theme].style);
    });

    it('check theme, title, style, rootTextTheme, and placeholder with case "disabled"', () => {
      const theme = 'disabled';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTBUTTON}`,
      );
      const selectRootText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const selectTitleText = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TITLETEXT}`,
      );
      expect(rootButton.props.theme).toEqual(ThemeEnum.disabled);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.disabled);
      expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
    });
  });
});

describe('[DROPDOWN] interactions', () => {
  let props: Partial<Props>;
  let component: React.ReactElement;

  beforeEach(() => {
    props = {
      mode: Mode.dropdown,
      style: {
        position: 'absolute',
        top: 100,
        left: 100,
      },
    };
  });

  describe('Check the interaction of nullable', () => {
    beforeEach(() => {
      props.nullable = true;
    });

    it('If nullable, the list displays null values', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('You can set a nullable label by entering a nullableLabel value', () => {
      props.nullableLabel = 'none';
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the theme and style', () => {
    beforeEach(() => {
      delete props.theme;
    });

    it('Make sure that none is applied when the theme is undefined', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that box is applied when the theme is "box"', () => {
      props.theme = ThemeEnum.box;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "blank"', () => {
      props.theme = ThemeEnum.blank;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "underbar"', () => {
      props.theme = ThemeEnum.underbar;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the custom style', () => {
    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the listStyle`, () => {
      props.listStyle = {
        right: 0,
        bottom: 0,
      };
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the itemStyle`, () => {
      props.itemViewStyle = {};
      let testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      let testingLib = render(component);
      let rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
      props.itemViewStyle = { height: 20 };
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('If bottom and right are not applied to listStyle, the default value is applied', () => {
      props.listStyle = {};
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction based on user behavior', () => {
    let testingLib: RenderResult;
    let rootButton;
    let testProps;
    beforeEach(() => {
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
    });

    it('If you do not define onSelect, the item is not selected', () => {
      testProps = createTestProps(props);
      testProps.onSelect = null;
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${DROPDOWN_TEST_ID.ITEM}-0`,
      );
      act(() => {
        fireEvent.pressIn(item);
        fireEvent.pressOut(item);
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('Enter onSelect and click the item to call the callback to change the selected value', () => {
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${DROPDOWN_TEST_ID.ITEM}-0`,
      );
      act(() => {
        fireEvent.pressIn(item);
        fireEvent.pressOut(item);
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction other props', () => {
    it('Given a selected value, the initial position of the list is determined', () => {
      props.selectedValue = '90';
      const testProps = createTestProps(props);
      const component = <TestComponent {...testProps} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });
});

describe('[DIALOG] interactions', () => {
  let props: Partial<Props>;
  let component: React.ReactElement;

  beforeEach(() => {
    props = {
      mode: Mode.dialog,
      style: {
        position: 'absolute',
        top: 100,
        left: 100,
      },
    };
  });

  describe('Check the interaction of nullable', () => {
    beforeEach(() => {
      props.nullable = true;
    });

    it('If nullable, the list displays null values', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('You can set a nullable label by entering a nullableLabel value', () => {
      props.nullableLabel = 'none';
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of title', () => {
    beforeEach(() => {
      props.title = 'title';
    });

    it('If there is a title, it is displayed at the top', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Entering listTitleStyle changes the style of the title', () => {
      props.listTitleStyle = {
        fontSize: 20,
      };
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the theme and style', () => {
    beforeEach(() => {
      delete props.theme;
    });

    it('Make sure that none is applied when the theme is undefined', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that box is applied when the theme is "box"', () => {
      props.theme = ThemeEnum.box;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "blank"', () => {
      props.theme = ThemeEnum.blank;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "underbar"', () => {
      props.theme = ThemeEnum.underbar;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the custom style', () => {
    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the listStyle`, () => {
      props.listStyle = {
        right: 0,
        bottom: 0,
      };
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the itemStyle`, () => {
      props.itemViewStyle = {};
      let testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      let testingLib = render(component);
      let rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
      props.itemViewStyle = { height: 20 };
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('If bottom and right are not applied to listStyle, the default value is applied', () => {
      props.listStyle = {};
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction based on user behavior', () => {
    let testingLib: RenderResult;
    let rootButton;
    let testProps;
    beforeEach(() => {
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
    });

    it('If you do not define onSelect, the item is not selected', () => {
      testProps = createTestProps(props);
      testProps.onSelect = null;
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${DIALOG_TEST_ID.ITEM}-0`,
      );
      act(() => {
        fireEvent.pressIn(item);
        fireEvent.pressOut(item);
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('Enter onSelect and click the item to call the callback to change the selected value', () => {
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${DIALOG_TEST_ID.ITEM}-0`,
      );
      act(() => {
        fireEvent.pressIn(item);
        fireEvent.pressOut(item);
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction other props', () => {
    it('Given a selected value, the initial position of the list is determined', () => {
      props.selectedValue = '30';
      const testProps = createTestProps(props);
      const component = <TestComponent {...testProps} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });
});

describe('[PICKER] interactions', () => {
  let props: Partial<Props>;
  let component: React.ReactElement;

  beforeEach(() => {
    props = {
      mode: Mode.picker,
      style: {
        position: 'absolute',
        top: 100,
        left: 100,
      },
    };
  });

  describe('Check the interaction of nullable', () => {
    beforeEach(() => {
      props.nullable = true;
    });

    it('If nullable, the list displays null values', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('You can set a nullable label by entering a nullableLabel value', () => {
      props.nullableLabel = 'none';
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the theme and style', () => {
    beforeEach(() => {
      delete props.theme;
    });

    it('Make sure that none is applied when the theme is undefined', () => {
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that box is applied when the theme is "box"', () => {
      props.theme = ThemeEnum.box;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "blank"', () => {
      props.theme = ThemeEnum.blank;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it('Make sure that default is applied when the theme is "underbar"', () => {
      props.theme = ThemeEnum.underbar;
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction of the custom style', () => {
    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the listStyle`, () => {
      props.listStyle = {
        right: 0,
        bottom: 0,
      };
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });

    it(`Check that the top and left styles disappear
    when you apply bottom and right styles to the itemStyle`, () => {
      props.itemViewStyle = {};
      let testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      let testingLib = render(component);
      let rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
      props.itemViewStyle = { height: 20 };
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('If bottom and right are not applied to listStyle, the default value is applied', () => {
      props.listStyle = {};
      const testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      const { queryByTestId, asJSON } = render(component);
      const rootButton = queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(asJSON()).toMatchSnapshot();
    });
  });

  describe('Check the interaction based on user behavior', () => {
    let testingLib: RenderResult;
    let rootButton;
    let testProps;
    let nativeEvent;
    beforeEach(() => {
      testProps = createTestProps(props);
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      nativeEvent = {
        contentOffset: { y: 0, x: 0 },
        layoutMeasurement: { width: 128, height: 400 },
        contentSize: { width: 128, height: 240 },
        zoomScale: 1,
        contentInset: { right: 0, top: 0, left: 0, bottom: 0 },
      };
    });

    it('If onValueChange is not defined, no callback is executed', () => {
      testProps.onValueChange = null;
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      const list = testingLib.queryByTestId(
        `${testProps.testID}-${PICKER_TEST_ID.LIST}`,
      );
      for (let i = -1; i < 40; i++) {
        nativeEvent.contentOffset.y = i * 10;
        list.props.onScroll({ nativeEvent });
      }
    });

    it('This list disappears when you press a part other than the list', () => {
      const close = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.CLOSELIST}`,
      );
      act(() => {
        fireEvent.press(close);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('Pressing on an item that is not selected will move to scroll', () => {
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${PICKER_TEST_ID.ITEM}-3`,
      );
      act(() => {
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('The list disappears when the selected item is pressed.', () => {
      testProps.selectedValue = '10';
      component = <TestComponent {...testProps} />;
      testingLib = render(component);
      rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      const item = testingLib.queryByTestId(
        `${testProps.testID}-${PICKER_TEST_ID.ITEM}-0`,
      );
      act(() => {
        fireEvent.press(item);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });

    it('called callback function when move to scroll', async () => {
      const list = testingLib.queryByTestId(
        `${testProps.testID}-${PICKER_TEST_ID.LIST}`,
      );
      list.props.getItemLayout();
      list.props.onScrollBeginDrag();
      for (let i = -1; i < 30; i++) {
        act(() => {
          nativeEvent.contentOffset.y = i * 10;
          list.props.onScroll({ nativeEvent });
        });
      }

      list.props.onScrollEndDrag({ nativeEvent });
      act(() => {
        fireEvent.scrollEndDrag(list);
      });
      await wait(() => {});

      list.props.onMomentumScrollBegin();
      list.props.onMomentumScrollEnd();
      act(() => {
        fireEvent.momentumScrollEnd(list);
      });
      await wait(() => {});

      list.props.onMomentumScrollEnd();
      jest.runAllTimers();
      list.props.onMomentumScrollEnd();
      list.props.onScrollEndDrag({ nativeEvent });

      list.props.onScrollBeginDrag();
      jest.runAllTimers();
      list.props.onScrollEndDrag({ nativeEvent });
      list.props.onMomentumScrollEnd();
      jest.runAllTimers();
    });
  });

  describe('Check the interaction other props', () => {
    it('Given a selected value, the initial position of the list is determined', () => {
      props.selectedValue = 'Category3';
      const testProps = createTestProps(props);
      const component = <TestComponent {...testProps} />;
      const testingLib = render(component);
      const rootButton = testingLib.queryByTestId(
        `${testProps.testID}-${TESTID.ROOTBUTTON}`,
      );
      act(() => {
        fireEvent.press(rootButton);
      });
      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });
});
