import {
  Animated,
  Easing,
  StyleProp,
  TextStyle,
} from 'react-native';
import React, { Fragment, ReactNode } from 'react';

import Arrow from './Arrow';
import LoadingIndicator from '../LoadingIndicator';
import { THEME } from './theme';
import styled from 'styled-components/native';

interface Props {
  testID?: string; // Id for tests
  open?: boolean; // Select is toggled?
  loading?: boolean; // is Loading?
  disabled?: boolean; // is Disabled?
  showArrow?: boolean; // show Right Arrow?
  dark?: boolean; // dark mode
  bordered?: boolean; // with round borders?
  activeOpacity?: number; // set the opacity of selected value
  listHeight?: number; // fix the height of dropdown list
  placeholder?: string | number; // placeholder value
  value?: string | number; // current selected value
  defaultValue?: string | number; // initial value instead of placeholder
  onSelect?: (param: string | number | undefined) => any;
  onOpen?: (param: boolean) => any;
  prefixIcon?: ReactNode; // Icon on the left of placeholder
  suffixIcon?: ReactNode; // Icon on the right of placeholder
  customLoader?: ReactNode; // custom loader while loading is true
  textStyle?: StyleProp<TextStyle>;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
const RootWrapper = styled.TouchableOpacity<{
  dark: boolean;
  disabled: boolean;
  bordered: boolean;
}>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px;
  background-color: ${({ dark, disabled }): string =>
    dark
      ? disabled
        ? THEME.DARK.DISABLED.backgroundColor
        : THEME.DARK.backgroundColor
      : disabled
        ? THEME.LIGHT.DISABLED.backgroundColor
        : THEME.LIGHT.backgroundColor};
  border-radius: ${({ bordered }): string => (bordered ? '5px' : '0')};
  border-color: ${({ dark, disabled }): string =>
    dark
      ? disabled
        ? THEME.DARK.DISABLED.borderColor
        : THEME.DARK.borderColor
      : disabled
        ? THEME.LIGHT.DISABLED.borderColor
        : THEME.LIGHT.borderColor};
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 0.8);
  opacity: 0.7;
`;
const SelectListModal = styled.Modal<{
  visible: boolean;
  dark: boolean;
  bordered: boolean;
}>`
  width: 100%;
  border-color: transparent;
  background-color: ${({ dark }): string =>
    dark
      ? THEME.DARK.INVERTED.backgroundColor
      : THEME.LIGHT.INVERTED.backgroundColor};
  border-bottom-left-radius: ${({ bordered }): string =>
    bordered ? '5px' : '0'};
  border-bottom-right-radius: ${({ bordered }): string =>
    bordered ? '5px' : '0'};
  border-width: ${({ visible }): string => (visible ? '1px' : '0px')};
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 0.8);
`;

const ItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 12px;
  justify-content: center;
  color: inherit;
`;
const IconView = styled.View`
  width: 20px;
  height: 20px;
`;

const RootText = styled.Text<{ dark: boolean }>`
  font-size: 12px;
  color: ${({ dark }): string =>
    dark ? THEME.DARK.fontColor : THEME.LIGHT.fontColor};
  opacity: ${({ dark }): number => (dark ? 0.9 : 0.3)};
`;
const ItemText = styled.Text<{ dark: boolean }>`
  font-size: 12px;
  color: ${({ dark }): string =>
    dark ? THEME.DARK.fontColor : THEME.LIGHT.fontColor};
`;

const Select : React.FC<Props> = (props): React.ReactElement => {
  // Init props
  const {
    testID,
    open,
    loading,
    disabled,
    showArrow,
    dark,
    bordered,
    activeOpacity,
    listHeight,
    placeholder,
    value,
    defaultValue,
    onSelect,
    onOpen,
    prefixIcon,
    suffixIcon,
    customLoader,
    children,
  } = props;

  // Initialize
  const [containerHeight, setContainerHeight] = React.useState(0);
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  const slideAnimValue = React.useRef(new Animated.Value(0)).current;

  const handleOnSelect = (param?: Props['value']): Props['onSelect'] =>
    onSelect && onSelect(param);
  const handleModalOpen = (param?: Props['open']): Props['onOpen'] =>
    onOpen && onOpen(param || false);

  // LifeCycle
  React.useEffect(() => {
    const rotateValue = open ? 1 : 0;
    Animated.timing(rotateAnimValue, {
      toValue: rotateValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const slideValue = open ? 1 : 0;
    Animated.timing(slideAnimValue, {
      toValue: slideValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [open]);

  React.useEffect(() => {
  }, [value]);
  React.useEffect(() => {
  }, [bordered]);

  return (
    <Container
      onLayout={(e): void => setContainerHeight(e.nativeEvent.layout.height)}>
      <RootWrapper
        testID={testID}
        activeOpacity={activeOpacity}
        disabled={disabled || false}
        bordered={bordered || false}
        dark={dark || false}
        style={[
          {
            borderBottomLeftRadius: open ? 0 : 3,
            borderBottomRightRadius: open ? 0 : 3,
          },
        ]}
        onPress={(): any => handleModalOpen(!open)}>
        {value && value !== placeholder ? (
          <ItemText dark={dark || false}>{value}</ItemText>
        ) : (
          <Fragment>
            {prefixIcon && <IconView>{prefixIcon}</IconView>}
            <RootText dark={dark || false}>
              {defaultValue || placeholder}
            </RootText>
          </Fragment>
        )}

        {
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
            <IconView>
              {loading ? (
                <LoadingIndicator /> || customLoader
              ) : showArrow ? (
                <Arrow
                  color={dark ? THEME.DARK.fontColor : THEME.LIGHT.fontColor}
                />
              ) : (
                suffixIcon || null
              )}
            </IconView>
          </Animated.View>
        }
      </RootWrapper>
      <SelectListModal
        animationType="slide"
        transparent={true}
        visible={open || false}
        dark={dark || false}
        bordered={bordered || false}>
        <Animated.ScrollView
          keyboardDismissMode={'on-drag'}
          style={{
            overflow: 'hidden',
            height: slideAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                listHeight ||
                  containerHeight * (React.Children.count(children) + 1),
              ],
            }),
          }}>
          {placeholder && (
            <ItemWrapper
              onPress={(): any => {
                handleModalOpen(!open);
                return handleOnSelect(placeholder);
              }}
              style={{ height: containerHeight }}>
              {prefixIcon && <PrefixView>{prefixIcon}</PrefixView>}
              <RootText dark={dark || false}>{placeholder}</RootText>
            </ItemWrapper>
          )}
          {React.Children.map(children, (child) => {
            // Checking isValidElement is the safe way and avoids a TS error too.
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onSelectItem: (value) => {
                  handleModalOpen(!open);
                  return handleOnSelect(value);
                },
                activeOpacity,
                containerHeight,
                dark,
              });
            }
            return child;
          })}
        </Animated.ScrollView>
      </SelectListModal>
    </Container>
  );
};

export default Select;
