import { Animated, Easing, StyleProp, TextStyle } from 'react-native';
import styled, { DefaultTheme, ThemeProps } from 'styled-components/native';

import Arrow from './Arrow';
import React from 'react';

interface TextThemeType {
  fontColor: string;
  fontSize: string;
}
interface TextType extends ThemeProps<TextThemeType> {
  theme: TextThemeType;
}
interface ThemeType extends DefaultTheme {
  backgroundColor: string;
  borderColor: string;
  fontColor: string;
}
interface StatefulThemeType extends ThemeType {
  DEFAULT: ThemeType;
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#3a8bff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
};

export const THEME: {
  LIGHT: StatefulThemeType;
  DARK: StatefulThemeType;
} = {
  LIGHT: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.BLUE,
    fontColor: COLOR.STRONGBLUE,
    DEFAULT: {
      backgroundColor: COLOR.WHITE,
      borderColor: COLOR.BLUE,
      fontColor: COLOR.STRONGBLUE,
    },
    INVERTED: {
      backgroundColor: COLOR.BLUE,
      borderColor: COLOR.STRONGBLUE,
      fontColor: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
  DARK: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GRAY7,
    fontColor: COLOR.WHITE,
    DEFAULT: {
      backgroundColor: COLOR.GRAY7,
      borderColor: COLOR.GRAY3,
      fontColor: COLOR.WHITE,
    },
    INVERTED: {
      backgroundColor: COLOR.GRAY7,
      borderColor: COLOR.GRAY3,
      fontColor: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
};

interface Props {
  testID?: string;
  textStyle: StyleProp<TextStyle>;
  dark?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  indicatorColor: string;
  activeOpacity: number;
  children?: React.ReactElement | undefined;
  text?: string;
  onPress?: (params?: any) => void | Promise<void>;
  placeholder?: string | number;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
const RootWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
  background-color: #ffffff;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-color: rgba(224, 224, 224, 0.5);
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 1);
`;
const SelectListModal = styled.Modal`
  width: 100%;
  border-color: transparent;
  background-color: rgba(224, 224, 224, 0.2);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

const ItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 6px;
  justify-content: center;
`;

const Text = styled.Text<TextType>`
  font-size: ${({ theme }): string => theme.fontSize};
  color: ${({ theme }): string => theme.fontColor};
  padding: 0px 6px;
`;

function Select(props: Props): React.ReactElement {
  // Props
  const {
    testID,
    dark,
    disabled,
    activeOpacity,
    onPress,
    placeholder,
    style,
  } = props;
  // Initialize
  const [isOpen, toggle] = React.useState(false);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState<any>();
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  const slideAnimValue = React.useRef(new Animated.Value(0)).current;

  // LifeCycle
  React.useEffect(() => {
    const rotateValue = isOpen ? 1 : 0;
    Animated.timing(rotateAnimValue, {
      toValue: rotateValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const slideValue = isOpen ? 1 : 0;
    Animated.timing(slideAnimValue, {
      toValue: slideValue,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Container
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}>
      <RootWrapper
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={(): void => toggle(!isOpen)}
        disabled={disabled}
        style={[
          dark ? THEME.DARK.DEFAULT : THEME.LIGHT.DEFAULT,
          {
            borderBottomLeftRadius: isOpen ? 0 : 3,
            borderBottomRightRadius: isOpen ? 0 : 3,
          },
        ]}>
        <Text
          theme={{
            fontSize: style.fontSize ? style.fontSize : '12',
            fontColor: style.fontColor
              ? style.fontColor
              : dark
                ? THEME.DARK.DEFAULT.fontColor
                : THEME.LIGHT.DEFAULT.fontColor,
          }}>
          {selectedItem || placeholder}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateAnimValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
            ],
          }}>
          <Arrow
            color={
              dark
                ? THEME.DARK.DEFAULT.fontColor
                : THEME.LIGHT.DEFAULT.fontColor
            }
          />
        </Animated.View>
      </RootWrapper>
      <SelectListModal
        animationType="slide"
        transparent={true}
        visible={isOpen}>
        <Animated.ScrollView
          style={{
            overflow: 'hidden',
            height: slideAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          }}>
          <ItemWrapper
            onPress={() => setSelectedItem('Item1')}
            style={{ height: containerHeight }}>
            <Text
              theme={{
                fontSize: style.fontSize ? style.fontSize : '12',
                color: style.fontColor
                  ? style.fontColor
                  : dark
                    ? THEME.DARK.INVERTED.fontColor
                    : THEME.LIGHT.INVERTED.fontColor,
              }}>
              {'Item1'}
            </Text>
          </ItemWrapper>
          <ItemWrapper onPress={() => setSelectedItem('Item2')}>
            <Text
              theme={{
                fontSize: style.fontSize ? style.fontSize : '12',
                color: style.fontColor
                  ? style.fontColor
                  : dark
                    ? THEME.DARK.INVERTED.fontColor
                    : THEME.LIGHT.INVERTED.fontColor,
              }}>
              {'Item2'}
            </Text>
          </ItemWrapper>
        </Animated.ScrollView>
      </SelectListModal>
    </Container>
  );
}

Select.defaultProps = {
  style: {},
  textStyle: {},
  indicatorColor: COLOR.WHITE,
  activeOpacity: 0.5,
};

export default Select;
