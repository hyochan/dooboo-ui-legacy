import * as React from 'react';

import { ERR_MSG_ITEMS_REQUIRED, PICKER_TEST_ID } from '../Select/Picker';
import {
  RenderResult,
  fireEvent,
  render,
  wait,
} from '@testing-library/react-native';
import Select, { Mode, Props, TESTID, ThemeEnum } from '../Select';
import renderer, { act } from 'react-test-renderer';

import { View } from 'react-native';

const ITEMS = [
  { value: 'Category1', label: 'Category1' },
  { value: 'Category2', label: 'Category2' },
  { value: 'Category3', label: 'Category3' },
  { value: 'Category4', label: 'Category4' },
  { value: 'Category5', label: 'Category5' },
  { value: 'Category6' },
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
    rootTextStyle: {
      color: 'orange',
    },
    items: ITEMS,
    activeOpacity: 0.5,
    onSelect,
  },
  inputTheme: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'inputTheme',
    placeholder: 'select',
    items: ITEMS,
    activeOpacity: 0.5,
    onSelect,
  },
  themeAndRootView: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'themeAndRootView',
    rootViewStyle: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: 'orange',
    },
    placeholder: 'select',
    items: ITEMS,
    activeOpacity: 0.5,
    onSelect,
  },
  disabled: {
    testID: 'select',
    theme: ThemeEnum.box,
    title: 'disabled',
    rootViewStyle: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      backgroundColor: 'orange',
    },
    rootTextStyle: {
      color: 'orange',
    },
    placeholder: 'select',
    items: ITEMS,
    disabled: true,
    activeOpacity: 0.5,
    onSelect,
  },
};

interface ObjParam {
  case?: number;
  prop?: object;
}
const createTestProps = (obj: ObjParam): object => ({
  navigation: {
    navigate: jest.fn(),
  },
  ...mockProp[obj.case],
  ...obj.prop,
});

describe('[Select] render', () => {
  let props: Props;
  let component: React.ReactElement;
  // beforeEach(() => {
  //   props = createTestProps({});
  //   component = <Select {...props} />;
  // });

  it('renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(component)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    // expect(rendered).toBeTruthy();
  });

  describe('[Select] render', () => {
    let props: Props;
    let component: React.ReactElement;
    beforeEach(() => {
      props = createTestProps({});
      component = <Select {...props} />;
    });

    it('renders without crashing', () => {
      const rendered: renderer.ReactTestRendererJSON | null = renderer
        .create(component)
        .toJSON();
      expect(rendered).toMatchSnapshot();
      expect(rendered).toBeTruthy();
    });

    describe('interactions', () => {
      it('check theme, title, rootTextStyle, titleTextStyle, and placeholder with case "notheme"', () => {
        const theme = 'noTheme';
        const props = createTestProps({ case: theme });
        const component = <Select {...props} />;
        const testingLib = render(component);
        const view = testingLib.queryByTestId(props.testID);
        const selectRoot = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTSELECT}`,
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
            return style === mockProp[theme].rootTextStyle;
          });
        const [inputtedTitleTextStyle] =
          selectTitleText.props.style &&
          selectTitleText.props.style.filter((style) => {
            return style === mockProp[theme].titleStyle;
          });
        expect(view.props.style).toEqual(mockProp[theme].style);
        expect(selectRoot.props.theme).toEqual(ThemeEnum.none);
        expect(selectRootText.props.theme).toEqual(ThemeEnum.blank);
        expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
        expect(selectRootText.props.children).toEqual(
          mockProp[theme].placeholder,
        );
        expect(inputtedRootTextStyle).toEqual(mockProp[theme].rootTextStyle);
        expect(inputtedTitleTextStyle).toEqual(mockProp[theme].titleStyle);
      });

      it('check theme, title, rootTextStyle, and placeholder with case "inputTheme"', () => {
        const theme = 'inputTheme';
        const props = createTestProps({ case: theme });
        const component = <Select {...props} />;
        const testingLib = render(component);
        const view = testingLib.queryByTestId(props.testID);
        const selectRoot = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTSELECT}`,
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
            return style === mockProp[theme].rootTextStyle;
          });
        expect(view.props.style).toEqual(mockProp[theme].style);
        expect(selectRoot.props.theme).toEqual(ThemeEnum.box);
        expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
        expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
        expect(selectRootText.props.children).toEqual(
          mockProp[theme].placeholder,
        );
        expect(inputtedRootTextStyle).toEqual(mockProp[theme].rootTextStyle);
      });

      it('check theme, title, rootViewStyle, and placeholder with case "themeAndRootView"', () => {
        const theme = 'themeAndRootView';
        const props = createTestProps({ case: theme });
        const component = <Select {...props} />;
        const testingLib = render(component);
        const view = testingLib.queryByTestId(props.testID);
        const selectRoot = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTSELECT}`,
        );
        const selectRootText = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTTEXT}`,
        );
        const selectTitleText = testingLib.queryByTestId(
          `${props.testID}-${TESTID.TITLETEXT}`,
        );
        const [inputtedRootViewStyle] =
          selectRoot.props.style &&
          selectRoot.props.style.filter((style) => {
            return style === mockProp[theme].rootViewStyle;
          });
        expect(view.props.style).toEqual(mockProp[theme].style);
        expect(selectRoot.props.theme).toEqual(ThemeEnum.blank);
        expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
        expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
        expect(selectRootText.props.children).toEqual(
          mockProp[theme].placeholder,
        );
        expect(inputtedRootViewStyle).toEqual(mockProp[theme].rootViewStyle);
      });

      it('check theme, title, rootViewStyle, rootTextTheme, and placeholder with case "disabled"', () => {
        const theme = 'disabled';
        const props = createTestProps({ case: theme });
        const component = <Select {...props} />;
        const testingLib = render(component);
        const view = testingLib.queryByTestId(props.testID);
        const selectRoot = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTSELECT}`,
        );
        const selectRootText = testingLib.queryByTestId(
          `${props.testID}-${TESTID.ROOTTEXT}`,
        );
        const selectTitleText = testingLib.queryByTestId(
          `${props.testID}-${TESTID.TITLETEXT}`,
        );
        const [inputtedRootViewStyle] =
          selectRoot.props.style &&
          selectRoot.props.style.filter((style) => {
            return style === mockProp[theme].rootViewStyle;
          });
        const [inputtedRootTextStyle] =
          selectRootText.props.style &&
          selectRootText.props.style.filter((style) => {
            return style === mockProp[theme].rootTextStyle;
          });
        expect(view.props.style).toEqual(mockProp[theme].style);
        expect(selectRoot.props.theme).toEqual(ThemeEnum.disabled);
        expect(selectRootText.props.theme).toEqual(ThemeEnum.disabled);
        expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
        expect(selectRootText.props.children).toEqual(
          mockProp[theme].placeholder,
        );
        expect(inputtedRootViewStyle).toBeUndefined();
        expect(inputtedRootTextStyle).toBeUndefined();
      });
    });
  });

  describe('rendering list', () => {
    let testingLib: RenderResult;

    it('should render list when onPress', () => {
      const theme = 'disabled';
      act(() => touchableOpacity.props.onClick());

      expect(selectListView.props.style[1].display).toBe('flex');
    });
  });
  describe('interactions', () => {
    it('check theme, title, rootTextStyle, titleStyle, and placeholder with case "notheme"', () => {
      const theme = 'noTheme';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      testingLib = render(component);
      const touchableOpacity = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
      );
      const selectListView = testingLib.queryByTestId(
        `${props.testID}-${TESTID.SELECTLISTVIEW}`,
      );

      const [inputtedRootTextStyle] =
        selectRootText.props.style &&
        selectRootText.props.style.filter((style) => {
          return style === mockProp[theme].rootTextStyle;
        });
      const [inputtedTitleTextStyle] =
        selectTitleText.props.style &&
        selectTitleText.props.style.filter((style) => {
          return style === mockProp[theme].titleStyle;
        });
      expect(view.props.style).toEqual(mockProp[theme].style);
      expect(selectRoot.props.theme).toEqual(ThemeEnum.none);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.blank);
      expect(selectTitleText.props.children).toEqual(mockProp[theme].title);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootTextStyle).toEqual(mockProp[theme].rootTextStyle);
      expect(inputtedTitleTextStyle).toEqual(mockProp[theme].titleStyle);
    });

    it('should hide list when click list item ', () => {
      const theme = 'disabled';
      const props = createTestProps({
        case: theme,
      });
      const component = <Select {...props} />;
      testingLib = render(component);
      const touchableOpacity = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
      );
      const selectListView = testingLib.queryByTestId(
        `${props.testID}-${TESTID.SELECTLISTVIEW}`,
      );
      const firstListItem = testingLib.queryByTestId(
        `${props.testID}-${TESTID.LISTITEM}-${ITEMS[0].value}`,
      );
      act(() => touchableOpacity.props.onClick());
      expect(selectListView.props.style[1].display).toBe('flex');

      act(() => firstListItem.props.onClick());
      expect(selectListView.props.style[1].display).toBe('none');
    });

    it('should hide list when click root close view', () => {
      const theme = 'disabled';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const touchableOpacity = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
      );
      const selectListView = testingLib.queryByTestId(
        `${props.testID}-${TESTID.SELECTLISTVIEW}`,
      );
      const rootCloseView = testingLib.queryByTestId(
        `${props.testID}-${TESTID.MODALCLOSEVIEW}`,
      );
      act(() => touchableOpacity.props.onClick());
      expect(selectListView.props.style[1].display).toBe('flex');

      act(() => rootCloseView.props.onClick());
      expect(selectListView.props.style[1].display).toBe('none');
    });
    it('should change placeholder', () => {
      const theme = 'disabled';
      const props = createTestProps({
        case: theme,
        selectedValue: ITEMS[0].value,
      });
      const component = <Select {...props} />;
      testingLib = render(component);
      const touchableOpacity = testingLib.queryByTestId(
        `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
      );
      const selectListView = testingLib.queryByTestId(
        `${props.testID}-${TESTID.SELECTLISTVIEW}`,
      );
      const firstListItem = testingLib.queryByTestId(
        `${props.testID}-${TESTID.LISTITEM}-${ITEMS[0].value}`,
      );
      act(() => touchableOpacity.props.onClick());
      expect(selectListView.props.style[1].display).toBe('flex');

      act(() => {
        fireEvent.press(firstListItem);
      });
      expect(selectListView.props.style[1].display).toBe('none');

      expect(testingLib.asJSON()).toMatchSnapshot();
    });
  });

  describe('Interaction when mode is picker', () => {
    let props: Partial<Props>;
    let component: React.ReactElement;
    const createTestProps = (props): Props => {
      return {
        testID: 'select',
        navigation: {
          navigate: jest.fn(),
        },
        items: ITEMS,
        onShow: jest.fn(),
        onDismiss: jest.fn(),
        onValueChange: jest.fn(),
        ...props,
      };
    };

    const createTestComponent = (props): React.ReactElement => (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 300,
          height: 400,
        }}
      >
        <Select {...props} />
      </View>
    );

    beforeEach(() => {
      props = {
        mode: Mode.picker,
        rootViewStyle: {
          position: 'absolute',
          top: 100,
          left: 100,
        },
      };
    });

    // it('If there are no items in props, an error is displayed', () => {
    //   const testProps = createTestProps(props);
    //   delete testProps.items;
    //   component = createTestComponent(testProps);
    //   try {
    //     render(component);
    //   } catch (error) {
    //     expect(error).toEqual(new Error(ERR_MSG_ITEMS_REQUIRED));
    //   }
    // });

    describe('Check the interaction of the theme and style', () => {
      beforeEach(() => {
        delete props.theme;
      });

      it('Make sure that none is applied when the theme is undefined', () => {
        const testProps = createTestProps(props);
        component = createTestComponent(testProps);
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
        component = createTestComponent(testProps);
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
        component = createTestComponent(testProps);
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
        component = createTestComponent(testProps);
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
      when you apply bottom and right styles to the itemListStyle`, () => {
        props.itemListStyle = {
          right: 0,
          bottom: 0,
        };
        const testProps = createTestProps(props);
        component = createTestComponent(testProps);
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
        component = createTestComponent(testProps);
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
        component = createTestComponent(testProps);
        testingLib = render(component);
        rootButton = testingLib.queryByTestId(
          `${testProps.testID}-${TESTID.ROOTBUTTON}`,
        );
        act(() => {
          fireEvent.press(rootButton);
        });
        expect(testingLib.asJSON()).toMatchSnapshot();
      });

      it('If bottom and right are not applied to itemListStyle, the default value is applied', () => {
        props.itemListStyle = {};
        const testProps = createTestProps(props);
        component = createTestComponent(testProps);
        const { queryByTestId, asJSON } = render(component);
        const rootButton = queryByTestId(testProps.testID);
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
        component = createTestComponent(testProps);
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
        delete testProps.onValueChange;
        component = createTestComponent(testProps);
        testingLib = render(component);
        rootButton = testingLib.queryByTestId(
          `${testProps.testID}-${TESTID.ROOTBUTTON}`,
        );
        act(() => {
          fireEvent.press(rootButton);
        });
        const list = testingLib.queryByTestId(
          `${testProps.testID}-picker-${PICKER_TEST_ID.LIST}`,
        );
        for (let i = -1; i < 30; i++) {
          nativeEvent.contentOffset.y = i * 10;
          list.props.onScroll({ nativeEvent });
        }
      });

      it('This list disappeaers when you press a part other than the list', () => {
        const close = testingLib.queryByTestId(
          `${testProps.testID}-picker-${PICKER_TEST_ID.CLOSE}`,
        );
        act(() => {
          fireEvent.press(close);
        });
        expect(testingLib.asJSON()).toMatchSnapshot();
      });

      it('Pressing on an item that is not selected will move to scroll', () => {
        const item = testingLib.queryByTestId(
          `${testProps.testID}-picker-${PICKER_TEST_ID.ITEM}-3`,
        );
        act(() => {
          fireEvent.press(item);
        });
        expect(testingLib.asJSON()).toMatchSnapshot();
      });

      it('called callback function when move to scroll', async () => {
        const list = testingLib.queryByTestId(
          `${testProps.testID}-picker-${PICKER_TEST_ID.LIST}`,
        );
        list.props.getItemLayout();

        list.props.onScrollBeginDrag();
        for (let i = -1; i < 20; i++) {
          nativeEvent.contentOffset.y = i * 10;
          list.props.onScroll({ nativeEvent });
        }
        list.props.onScrollEndDrag({ nativeEvent });
        fireEvent.scrollEndDrag(list);
        await wait(() => {});

        list.props.onMomentumScrollBegin();
        list.props.onMomentumScrollEnd();
        fireEvent.momentumScrollEnd(list);
        await wait(() => {});

        list.props.onMomentumScrollEnd();
      });
    });

    describe('Check the interaction other props', () => {
      it('Given a selected value, the initial position of the list is determined', () => {
        props.selectedValue = 'Category3';
        const testProps = createTestProps(props);
        const component = createTestComponent(testProps);
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
});
