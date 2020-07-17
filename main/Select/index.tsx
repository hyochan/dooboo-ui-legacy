import {
  Modal,
  StyleProp,
  TextStyle,
} from 'react-native';
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
  fontSize: string;
}
interface StatefulThemeType extends ThemeType {
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}

interface Props {
  testID?: string;
  style: React.CSSProperties;
  textStyle: StyleProp<TextStyle>;
  dark?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  indicatorColor: string;
  activeOpacity: number;
  children?: string | React.ReactElement;
  text?: string;
  onPress?: (params?: any) => void | Promise<void>;
  placeholder?: string | number;
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
    fontSize: COLOR.STRONGBLUE,
    INVERTED: {
      backgroundColor: COLOR.BLUE,
      borderColor: COLOR.STRONGBLUE,
      fontColor: COLOR.WHITE,
      fontSize: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
      fontSize: COLOR.GRAY59,
    },
  },
  DARK: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GRAY7,
    fontColor: COLOR.GRAY3,
    fontSize: COLOR.GRAY3,
    INVERTED: {
      backgroundColor: COLOR.GRAY7,
      borderColor: COLOR.GRAY3,
      fontColor: COLOR.WHITE,
      fontSize: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
      fontSize: COLOR.GRAY59,
    },
  },
};

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
const RootWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;
const RootSelect = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
  background-color: #ffffff;
  border-radius: 3px;
  border-color: rgb(224, 224, 224);
  box-shadow: 2px 2px 4px rgba(212, 210, 212, 1);
`;
// TODO: config max-height to set default height
const SelectItemListView = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

const Text = styled.Text<TextType>`
  font-size: ${({ theme }): string => theme.fontSize};
  color: ${({ theme }): string => theme.fontColor};
  padding: 0px 6px;
`;

function Select(props: Props): React.ReactElement {
  const {
    testID,
    disabled,
    activeOpacity,
    onPress,
    placeholder,
    style,
  } = props;

  const [isOpen, toggle] = React.useState(false);

  return (
    <Container>
      <RootWrapper
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={disabled}>
        <RootSelect>
          <Text
            theme={{
              fontSize: style.fontSize ? style.fontSize : '12px',
              color: style.color ? style.color : '#000',
            }}>
            {placeholder}
          </Text>
          <Arrow color={'#000'} />
        </RootSelect>
      </RootWrapper>
      <Modal visible={true} transparent={true}>
        <SelectItemListView
          onPress={():void => toggle(!isOpen)}
          style={{
            display: isOpen ? 'flex' : 'none',
          }}>
          {props.children}
        </SelectItemListView>
      </Modal>
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
