import { Animated, Easing, TextStyle, View, ViewStyle } from 'react-native';
import React, { Fragment, ReactElement, ReactNode } from 'react';

import Arrow from './Arrow';
import { SelectItemProps } from './SelectItem';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  opened?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  placeholder?: string | number;
  value: string;
  onSelect: (param: any) => void;
  onOpen?: (param: boolean) => void;
  prefixIcon?: ReactNode;
  customIcon?: ReactElement;
  children?: ReactNode;

  renderSelectElement?: () => ReactElement;

  style?: ViewStyle;
  selectedElementStyle?: ViewStyle;
  childrenElementStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;

  boxShadow?: string;
}

const Container = styled.View`
  height: 40px;
`;

type SelectPropsType = {
  visible?: boolean;
  disabled?: boolean;
};

const SelectWrapper = styled.TouchableOpacity<SelectPropsType>`
  position: relative;
  background-color: #ffffff;

  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border-radius: 5px;
  border: ${({ disabled }): string => disabled ? 'none' : '1px solid #CBD7E5'};
  border-radius: 6px;
`;

const SelectChildWrapper = styled.View<SelectPropsType>`
  width: 100%;
  margin-top: 1px;
  display: ${({ visible }): string => (visible ? 'block' : 'none')};
  overflow: hidden;
`;

const IconView = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text<{ disabled: boolean }>`
  align-self: center;
  font-size: 12px;
  color: ${({ disabled }): string => (disabled ? '#969696' : '#2b2b2b')};
`;

const Select: React.FC<Props> = (props): React.ReactElement => {
  const {
    testID,
    style,
    opened = false,
    disabled = false,
    showArrow = true,
    activeOpacity = 0.9,
    placeholder,
    onSelect,
    onOpen,
    prefixIcon,
    customIcon,
    renderSelectElement = (): null => null,
    selectedElementStyle,
    childrenElementStyle,
    textStyle,
    boxShadow = '0px 2px 4px rgba(212, 210, 212, 0.8)',
    children,
  } = props;

  const [value, setValue] = React.useState<string>(props.value);
  const [labelValue, setLabelValue] = React.useState<string>('');

  const [isOpen, setOpen] = React.useState<boolean>(opened);
  const [childrenHeight, setChildrenHeight] = React.useState(40);
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  const slideAnimValue = React.useRef(new Animated.Value(0)).current;

  const handlePressItem = (): void => {
    setOpen(!isOpen);
  };

  const handleBlurItem = (): void => {
    setOpen(false);
  };

  React.useEffect(() => {
    const rotateValue = isOpen ? 1 : 0;
    Animated.timing(rotateAnimValue, {
      toValue: rotateValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    const slideValue = !disabled && isOpen ? 1 : 0;
    Animated.timing(slideAnimValue, {
      toValue: slideValue,
      duration: 120,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOpen, disabled]);

  React.useEffect(() => {
    onSelect(value);
  }, [value]);

  React.useEffect(() => {
    if (onOpen) {
      onOpen(isOpen);
    }
  }, [isOpen]);

  React.useEffect(() => {
    // This will set title of the first of child element to labelValue when the component mounted
    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement(child) && index === 0) {
        setLabelValue(child.props.children);
      }
    });
  }, []);

  return (
    <Container testID={testID} style={style}>
      <SelectWrapper
        testID={'SELECT_WRAPPER'}
        activeOpacity={activeOpacity}
        disabled={disabled}
        style={selectedElementStyle}
        onPress={handlePressItem}
        onBlur={handleBlurItem}
      >
        <Fragment>
          {renderSelectElement() || (
            <Fragment>
              {prefixIcon && <IconView>{prefixIcon}</IconView>}
              {
                <StyledText disabled={disabled} style={textStyle}>
                  {placeholder || labelValue}
                </StyledText>
              }
            </Fragment>
          )}
          <Animated.View
            testID={'SELECT_SUFFIX'}
            style={[
              {
                transform: [
                  {
                    rotate: rotateAnimValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <IconView>
              {customIcon ||
              (showArrow && <Arrow customColor={textStyle} />)}
            </IconView>
          </Animated.View>
        </Fragment>
      </SelectWrapper>
      <SelectChildWrapper visible={isOpen}>
        <Animated.ScrollView
          testID={'SELECT_CHILD_SCROLLVIEW'}
          keyboardDismissMode={'on-drag'}
          style={[
            {
              backgroundColor: '#ffffff',
              border: disabled ? 'none' : '1px solid #CBD7E5',
              borderRadius: 6,
              boxShadow,
              height: slideAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  0,
                  childrenHeight,
                ],
              }),
              ...childrenElementStyle,
            },
          ]}
        >
          <View onLayout={(e): void => setChildrenHeight(e.nativeEvent.layout.height + 5)}>
            {React.Children.map(children, (child, index) => {
              const firstElementStyle: ViewStyle = index === 0
                ? {}
                : { borderTopWidth: 1, borderTopColor: '#CBD7E5' };

              if (React.isValidElement(child)) {
                return React.cloneElement<SelectItemProps>(child, {
                  onSelectItem: (value): void => {
                    setOpen(false);
                    setLabelValue(child.props.children);
                    setValue(value);
                  },
                  style: firstElementStyle,
                  textStyle,
                });
              }
            })}
          </View>
        </Animated.ScrollView>
      </SelectChildWrapper>
    </Container>
  );
};

export default Select;
