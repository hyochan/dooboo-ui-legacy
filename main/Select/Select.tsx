import {
  Animated,
  Easing,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { Fragment, ReactNode } from 'react';

import Arrow from './Arrow';
import { LoadingIndicator } from '../LoadingIndicator';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  opened?: boolean;
  loading?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  bordered?: boolean;
  activeOpacity?: number;
  listHeight?: number;
  placeholder?: string | number;
  value?: string | number;
  defaultValue?: string | number;
  onSelect?: (param: string | number) => void;
  onOpen?: (param: boolean) => void;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  customLoader?: ReactNode;
  customStyle?: ViewStyle
  customTextStyle?: TextStyle;
  children?: ReactNode;
}

const Container = styled.View`
  height: 100%;
  width: 100%;
`;

const SelectWrapper = styled.TouchableOpacity<{
  disabled: boolean;
  bordered: boolean;
}>`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: 14px 12px;
  background-color: #f7f7f7;
  border-radius: ${({ bordered }): string => (bordered ? '5px' : '0')};
  border-color: ${({ disabled }): string => disabled ? '#c8c8c8' : 'transparent'};
  box-shadow: 0px 2px 4px rgba(212, 210, 212, 0.8);
  opacity: 0.9;
`;

const SelectChildWrapper = styled.View<{
  visible: boolean;
  bordered: boolean;
}>`
  border-color: transparent;
  background-color: #ffffff;
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

const StyledText = styled.Text<{disabled: boolean}>`
  align-self: center;
  font-size: 12px;
  color: ${({ disabled }): string => disabled ? '#969696' : '#2b2b2b'};
`;

const Select : React.FC<Props> = (props): React.ReactElement => {
  const {
    testID,
    opened = false,
    loading = false,
    disabled = false,
    showArrow = true,
    bordered = true,
    activeOpacity = 0.75,
    listHeight,
    placeholder,
    value,
    defaultValue,
    onSelect = (value): string | number => value,
    onOpen = (opened): boolean => opened,
    prefixIcon,
    suffixIcon,
    customLoader,
    customStyle,
    customTextStyle,
    children,
  } = props;

  const [containerHeight, setContainerHeight] = React.useState(10);
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  const slideAnimValue = React.useRef(new Animated.Value(0)).current;

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
    <Container testID={testID}>
      <SelectWrapper
        testID={'SELECT_WRAPPER'}
        onLayout={(e): void => setContainerHeight(e.nativeEvent.layout.height)}
        activeOpacity={0.95}
        disabled={loading ? true : disabled}
        bordered={bordered}
        style={[
          {
            borderBottomLeftRadius: opened ? 0 : bordered ? 5 : 0,
            borderBottomRightRadius: opened ? 0 : bordered ? 5 : 0,
          },
          customStyle,
        ]}
        onPress={(): void => onOpen(!opened)}>
        <Fragment>
          {prefixIcon && <IconView>{prefixIcon}</IconView>}
          {
            <StyledText
              disabled={loading}
              style={[customTextStyle]}>
              {defaultValue || value || placeholder}
            </StyledText>
          }
        </Fragment>
        <Animated.View
          testID={'SELECT_SUFFIX'}
          style={[
            {
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
            },
            customStyle,
          ]}>
          <IconView>
            {(loading && (customLoader || <LoadingIndicator size="small" />)) ||
              suffixIcon ||
              (showArrow && (
                <Arrow
                  customColor={customTextStyle}
                />
              ))}
          </IconView>
        </Animated.View>
      </SelectWrapper>
      <SelectChildWrapper
        visible={opened}
        bordered={bordered}
        style={[customStyle]}>
        <Animated.ScrollView
          testID={'SELECT_CHILD_SCROLLVIEW'}
          keyboardDismissMode={'on-drag'}
          style={[
            {
              height: slideAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  listHeight ||
                    containerHeight * React.Children.count(children) + 1,
                ],
              }),
            },
            customStyle,
          ]}>
          <Fragment>
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  onSelectItem: (value) => {
                    onOpen(!opened);
                    return onSelect(value);
                  },
                  activeOpacity,
                  containerHeight,
                });
              }
              return child;
            })}
          </Fragment>
        </Animated.ScrollView>
      </SelectChildWrapper>
    </Container>
  );
};

export default Select;
