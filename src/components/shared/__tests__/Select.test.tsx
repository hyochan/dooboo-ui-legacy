import 'react-native';

import * as React from 'react';

import { RenderResult, act, render } from '@testing-library/react-native';
import Select, { Item, Props, TESTID, ThemeEnum } from '../Select';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const ITEMS: Item[] = [
  { value: 'Category1', text: 'Category1' },
  { value: 'Category2', text: 'Category2' },
  { value: 'Category3', text: 'Category3' },
  { value: 'Category4', text: 'Category4' },
  { value: 'Category5', text: 'Category5' },
];

type selectProp<K extends string> = {
  [T in K]: Props;
};
const onSelect = (item: Item): void => {
  console.log(item);
};

const mockProp: selectProp<
  'noTheme' | 'inputTheme' | 'themeAndRootView' | 'disabled'
> = {
  noTheme: {
    testID: 'select',
    placeholder: 'select',
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
    placeholder: 'select',
    items: ITEMS,
    activeOpacity: 0.5,
    onSelect,
  },
  themeAndRootView: {
    testID: 'select',
    theme: ThemeEnum.box,
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
    let testingLib: RenderResult;

    beforeEach(() => {
      testingLib = render(component);
    });

    it('check theme and rootTextStyle and placeholder with case "notheme"', () => {
      const theme = 'noTheme';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const selectRoot = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTSELECT}`,
      );
      const selectRootText = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const [inputtedRootTextStyle] =
        selectRootText.props.style &&
        selectRootText.props.style.filter((style) => {
          return style === mockProp[theme].rootTextStyle;
        });
      expect(selectRoot.props.theme).toEqual(ThemeEnum.none);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.blank);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootTextStyle).toEqual(mockProp[theme].rootTextStyle);
    });

    it('check theme and rootTextStyle and placeholder with case "inputTheme"', () => {
      const theme = 'inputTheme';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const selectRoot = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTSELECT}`,
      );
      const selectRootText = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const [inputtedRootTextStyle] =
        selectRootText.props.style &&
        selectRootText.props.style.filter((style) => {
          return style === mockProp[theme].rootTextStyle;
        });
      expect(selectRoot.props.theme).toEqual(ThemeEnum.box);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootTextStyle).toEqual(mockProp[theme].rootTextStyle);
    });

    it('check theme and rootViewStyle and placeholder with case "themeAndRootView"', () => {
      const theme = 'themeAndRootView';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const selectRoot = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTSELECT}`,
      );
      const selectRootText = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
      );
      const [inputtedRootViewStyle] =
        selectRoot.props.style &&
        selectRoot.props.style.filter((style) => {
          return style === mockProp[theme].rootViewStyle;
        });
      expect(selectRoot.props.theme).toEqual(ThemeEnum.blank);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.box);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootViewStyle).toEqual(mockProp[theme].rootViewStyle);
    });

    it('check theme & rootViewStyle & rootTextTheme and placeholder with case "disabled"', () => {
      const theme = 'disabled';
      const props = createTestProps({ case: theme });
      const component = <Select {...props} />;
      const testingLib = render(component);
      const selectRoot = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTSELECT}`,
      );
      const selectRootText = testingLib.getByTestId(
        `${props.testID}-${TESTID.ROOTTEXT}`,
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
      expect(selectRoot.props.theme).toEqual(ThemeEnum.disabled);
      expect(selectRootText.props.theme).toEqual(ThemeEnum.disabled);
      expect(selectRootText.props.children).toEqual(
        mockProp[theme].placeholder,
      );
      expect(inputtedRootViewStyle).toBeUndefined();
      expect(inputtedRootTextStyle).toBeUndefined();
    });
  });

  it('check render list when onPress', () => {
    const theme = 'disabled';
    const props = createTestProps({ case: theme });
    const component = <Select {...props} />;
    const testingLib = render(component);
    const touchableOpacity = testingLib.getByTestId(
      `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
    );
    const selectListView = testingLib.getByTestId(
      `${props.testID}-${TESTID.SELECTLISTVIEW}`,
    );
    act(() => touchableOpacity.props.onClick());

    expect(selectListView.props.style[1].display).toBe('flex');
  });

  it('check hide list when click list item ', () => {
    const theme = 'disabled';
    const props = createTestProps({ case: theme });
    const component = <Select {...props} />;
    const testingLib = render(component);
    const touchableOpacity = testingLib.getByTestId(
      `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
    );
    const selectListView = testingLib.getByTestId(
      `${props.testID}-${TESTID.SELECTLISTVIEW}`,
    );
    const firstListItem = testingLib.getByTestId(
      `${props.testID}-${TESTID.LISTITEM}-${ITEMS[0].value}`,
    );
    act(() => touchableOpacity.props.onClick());
    expect(selectListView.props.style[1].display).toBe('flex');

    act(() => firstListItem.props.onClick());
    expect(selectListView.props.style[1].display).toBe('none');
  });

  it('check hide list when click root close view  ', () => {
    const theme = 'disabled';
    const props = createTestProps({ case: theme });
    const component = <Select {...props} />;
    const testingLib = render(component);
    const touchableOpacity = testingLib.getByTestId(
      `${props.testID}-${TESTID.TOUCHABLEOPACITY}`,
    );
    const selectListView = testingLib.getByTestId(
      `${props.testID}-${TESTID.SELECTLISTVIEW}`,
    );
    const rootCloseView = testingLib.getByTestId(
      `${props.testID}-${TESTID.MODALCLOSEVIEW}`,
    );
    act(() => touchableOpacity.props.onClick());
    expect(selectListView.props.style[1].display).toBe('flex');

    act(() => rootCloseView.props.onClick());
    expect(selectListView.props.style[1].display).toBe('none');
  });
});
