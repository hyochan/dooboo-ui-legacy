import {
  Animated,
  Easing,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { Fragment, ReactNode } from 'react';

import Arrow from './Arrow';
import LoadingIndicator from '../LoadingIndicator';
import { THEME } from './theme';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  opened?: boolean; // Select is toggled?
  loading?: boolean; // is Loading?
  disabled?: boolean; // is Disabled?
  showArrow?: boolean; // show Right Arrow?
  isDarkMode?: boolean; // isDarkMode mode
  bordered?: boolean; // with round borders?
  activeOpacity?: number; // set the opacity of selected value
  listHeight?: number; // fix the height of dropdown list
  placeholder?: string | number; // placeholder value
  value?: string | number; // current selected value
  defaultValue?: string | number; // initial value instead of placeholder
  onSelect?: (param: string | number) => any;
  onOpen?: (param: boolean) => any;
  prefixIcon?: ReactNode; // Icon on the left of placeholder
  suffixIcon?: ReactNode; // Icon on the right of placeholder
  customLoader?: ReactNode; // custom loader while loading is true
  customTextStyle?: TextStyle;
  customStyle?: ViewStyle;
  children?: ReactNode;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
const RootWrapper = styled.TouchableOpacity<{
  isDarkMode: boolean;
  disabled: boolean;
  bordered: boolean;
}>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: 14px 12px;
  background-color: ${({ isDarkMode, disabled }): string =>
    disabled
      ? THEME.LIGHT.DISABLED.backgroundColor
      : (isDarkMode && THEME.DARK.backgroundColor) ||
        THEME.LIGHT.backgroundColor};
  border-radius: ${({ bordered }): string => (bordered ? '5px' : '0')};
  border-color: ${({ isDarkMode, disabled }): string =>
    disabled
      ? THEME.LIGHT.DISABLED.borderColor
      : (isDarkMode && THEME.DARK.borderColor) || THEME.LIGHT.borderColor};
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 0.8);
  opacity: 0.9;
`;
const SelectListWrapper = styled.View<{
  visible: boolean;
  isDarkMode: boolean;
  bordered: boolean;
}>`
  border-color: transparent;
  background-color: ${({ isDarkMode }): string =>
    (isDarkMode && THEME.DARK.INVERTED.backgroundColor) || THEME.LIGHT.INVERTED.backgroundColor};
  border-bottom-left-radius: ${({ bordered }): string =>
    bordered ? '5px' : '0'};
  border-bottom-right-radius: ${({ bordered }): string =>
    bordered ? '5px' : '0'};
  border-width: ${({ visible }): string => (visible ? '1px' : '0px')};
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 0.8);
`;

const IconView = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const RootText = styled.Text<{ isDarkMode: boolean; disabled: boolean }>`
  align-self: center;
  font-size: 12px;
  color: ${({ isDarkMode, disabled }): string =>
    disabled
      ? THEME.LIGHT.DISABLED.fontColor
      : (isDarkMode && THEME.DARK.fontColor) || THEME.LIGHT.fontColor};
  opacity: ${({ isDarkMode }): number => (isDarkMode ? 0.6 : 0.8)};
`;

const Select : React.FC<Props> = (props): React.ReactElement => {
  // Init props
  const {
    testID = 'Select',
    opened = false,
    loading = false,
    disabled = false,
    showArrow = true,
    isDarkMode = false,
    bordered = true,
    activeOpacity = 1,
    listHeight,
    placeholder = '  ',
    value = '',
    defaultValue = '',
    onSelect = (value): string | number => value,
    onOpen = (opened): boolean => opened,
    prefixIcon,
    suffixIcon,
    customLoader,
    customTextStyle,
    customStyle,
    children,
  } = props;

  // Initialize
  const [containerHeight, setContainerHeight] = React.useState(0);
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  const slideAnimValue = React.useRef(new Animated.Value(0)).current;

  // LifeCycle
  React.useEffect(() => {
    const rotateValue = opened ? 1 : 0;
    Animated.timing(rotateAnimValue, {
      toValue: rotateValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const slideValue = !disabled && opened ? 1 : 0;
    Animated.timing(slideAnimValue, {
      toValue: slideValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [opened, disabled]);

  React.useEffect(() => {
  }, [value, bordered, loading]);

  return (
    <Container
      testID={testID}
      onLayout={(e): void => setContainerHeight(e.nativeEvent.layout.height)}>
      <RootWrapper
        activeOpacity={activeOpacity}
        disabled={loading ? true : disabled}
        bordered={bordered}
        isDarkMode={isDarkMode}
        style={[
          {
            borderBottomLeftRadius: opened ? 0 : bordered ? 5 : 0,
            borderBottomRightRadius: opened ? 0 : bordered ? 5 : 0,
          },
          customStyle,
        ]}
        onPress={(): any => onOpen(!opened)}>
        {
          <Fragment>
            {prefixIcon && <IconView>{prefixIcon}</IconView>}
            {
              <RootText
                isDarkMode={isDarkMode}
                disabled={loading}
                style={[customTextStyle]}>
                {defaultValue || value || placeholder}
              </RootText>
            }
          </Fragment>
        }
        {
          <Animated.View
            style={{
              position: 'absolute',
              right: 10,
              transform: [
                {
                  rotate: rotateAnimValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}>
            <IconView>
              {(loading && (customLoader || <LoadingIndicator size="small" />)) ||
              suffixIcon || (showArrow && (
                <Arrow
                  color={ (isDarkMode && THEME.DARK.fontColor) || THEME.LIGHT.fontColor }
                  customColor={customTextStyle}
                />
              ))}
            </IconView>
          </Animated.View>
        }
      </RootWrapper>

      <SelectListWrapper
        visible={opened}
        isDarkMode={isDarkMode}
        bordered={bordered}
        style={[customStyle]}>
        <Animated.ScrollView
          keyboardDismissMode={'on-drag'}
          style={[
            {
              zIndex: 9999,
              overflow: 'hidden',
              height: slideAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  listHeight ||
                    containerHeight * React.Children.count(children),
                ],
              }),
            },
            customStyle,
          ]}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onSelectItem: (value) => {
                  onOpen(!opened);
                  return onSelect(value);
                },
                activeOpacity,
                containerHeight,
                isDarkMode,
                customTextStyle,
                customStyle,
              });
            }
            return child;
          })}
        </Animated.ScrollView>
      </SelectListWrapper>
    </Container>
  );
};

export default Select;
