import { Dimensions, Text, TouchableWithoutFeedback } from 'react-native';
import {
  Mode,
  SCREEN_HEIGHT,
  ThemeEnum,
} from '../../src/components/shared/Select/constants';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { boolean, number, object, select, text } from '@storybook/addon-knobs';

import { ContainerDeco } from '../decorators';
import Select from '../../src/components/shared/Select';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const ITEMS = [
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
  { value: '30', label: 'Thirty' },
  { value: '40', label: 'Forty' },
  { value: '50', label: 'Fifty' },
  { value: '60', label: 'Sixty' },
  { value: '70', label: 'Seventy' },
  { value: '80', label: 'Eighty' },
  { value: '90', label: 'Ninety' },
];

const CustomContainer = styled.SafeAreaView`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  height: 150px;
`;

const SelectContainer = styled.View`
  flex: 1;
  margin: 0 30px;
  align-items: flex-start;
  justify-content: center;
`;

const SelectThemeText = styled.Text`
  margin: 0 0 20px 10px;
  font-size: 15px;
  font-weight: bold;
  align-self: flex-start;
`;

const GROUP_ID = 'CUSTOM_PROPS';

const PropsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #efefef;
`;

const PropsName = styled.Text`
  font-size: 14px;
  line-height: 20px;
  width: 100px;
`;

const PropsValue = styled.Text`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
`;

const Prop = ({ name, value }): React.ReactElement => {
  const [color, setColor] = useState('black');
  const [width, setWidth] = useState(100);
  let timer;
  useEffect(() => {
    setColor('blue');
    timer = setTimeout(() => {
      setColor('black');
    }, 2000);
    return (): void => {
      clearTimeout(timer);
    };
  }, [value]);
  const onPressIn = useCallback(() => {
    setWidth(200);
  }, []);
  const onPressOut = useCallback(() => {
    setWidth(100);
  }, []);
  return (
    <PropsWrapper>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <PropsName numberOfLines={1} style={{ color, width }}>
          {name}
        </PropsName>
      </TouchableWithoutFeedback>
      <Text>:</Text>
      <PropsValue style={{ color }}>
        {typeof value === 'string' ? value : JSON.stringify(value, null, 2)}
      </PropsValue>
    </PropsWrapper>
  );
};

function Default(): React.ReactElement {
  const scrollEl = useRef(null);
  useEffect(() => {
    if (scrollEl && scrollEl.current) {
      scrollEl.current.scrollTo({ y: SCREEN_HEIGHT - 30 });
    }
  }, []);
  const moveToCustom = useCallback(() => {
    if (scrollEl && scrollEl.current) {
      scrollEl.current.scrollTo({ y: SCREEN_HEIGHT + 450 });
    }
  }, []);

  const mode = select('mode', Mode, Mode.dropdown, GROUP_ID);
  const theme = select('theme', ThemeEnum, ThemeEnum.none, GROUP_ID);
  const [selectedValue, setSelectedValue] = useState(null);
  const placeholder = text('placeholder', '', GROUP_ID);

  const style = object('style', undefined, GROUP_ID);
  const textStyle = object('textStyle', undefined, GROUP_ID);

  const title = text('title', 'Number', GROUP_ID);
  const titleStyle = object('titleStyle', undefined, GROUP_ID);

  const itemListStyle = object('itemListStyle', undefined, GROUP_ID);
  const itemViewStyle = object('itemViewStyle', undefined, GROUP_ID);
  const itemTextStyle = object('itemTextStyle', undefined, GROUP_ID);
  const selectedItemViewStyle = object(
    'selectedItemViewStyle',
    undefined,
    GROUP_ID,
  );
  const selectedItemTextStyle = object('itemListStyle', undefined, GROUP_ID);

  const showsVerticalScrollIndicator = boolean(
    'showsVerticalScrollIndicator',
    false,
    GROUP_ID,
  );

  const disabled = boolean('disabled', false, GROUP_ID);

  const nullable = boolean('nullable', false, GROUP_ID);
  const nullableLabel = text('nullableLabel', 'none', GROUP_ID);

  const onSelect = useCallback((item, index) => {
    setSelectedValue(item.value);
    action(`onSelect: ${item.value}`);
  }, []);
  const onValueChange = useCallback((item, index) => {
    setSelectedValue(item.value);
    action(`onValueChange: ${item.value}`);
  }, []);

  const onOpen = action('onOpen');
  const onClose = action('onClose');

  const propsWithoutStyle = {
    items: ITEMS,
    theme,
    selectedValue,
    placeholder,
    style,
    title,
    mode,
    showsVerticalScrollIndicator,
    disabled,
    nullable,
    nullableLabel,
    onSelect,
    onValueChange,
    onOpen,
    onClose,
  };

  const props = {
    ...propsWithoutStyle,
    style,
    textStyle,
    titleStyle,
    itemListStyle,
    itemViewStyle,
    itemTextStyle,
    selectedItemViewStyle,
    selectedItemTextStyle,
  };
  return (
    <CustomContainer>
      <StyledScrollView ref={scrollEl}>
        <RowContainer style={{ marginTop: SCREEN_HEIGHT }}>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.none}(default)`}</SelectThemeText>
            <Select {...propsWithoutStyle} theme={ThemeEnum.none} />
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.underbar}`}</SelectThemeText>
            <Select {...propsWithoutStyle} theme={ThemeEnum.underbar} />
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <SelectContainer>
            <SelectThemeText>{`Theme : ${ThemeEnum.box}`}</SelectThemeText>
            <Select {...propsWithoutStyle} theme={ThemeEnum.box} />
          </SelectContainer>
        </RowContainer>
        <RowContainer>
          <SelectContainer>
            <TouchableWithoutFeedback onPress={moveToCustom}>
              <SelectThemeText>Custom</SelectThemeText>
            </TouchableWithoutFeedback>
            <Select {...props} />
          </SelectContainer>
        </RowContainer>
        <RowContainer style={{ marginBottom: SCREEN_HEIGHT, height: null }}>
          <SelectContainer>
            <SelectThemeText style={{ fontWeight: '500' }}>
              Props
            </SelectThemeText>
            <Prop name="mode" value={mode} />
            <Prop name="theme" value={theme} />
            <Prop name="placeholder" value={placeholder} />
            <Prop name="style" value={style} />
            <Prop name="textStyle" value={textStyle} />
            <Prop name="title" value={title} />
            <Prop name="titleStyle" value={titleStyle} />
            <Prop name="itemListStyle" value={itemListStyle} />
            <Prop name="itemViewStyle" value={itemViewStyle} />
            <Prop name="itemTextStyle" value={itemTextStyle} />
            <Prop name="selectedItemViewStyle" value={selectedItemViewStyle} />
            <Prop
              name="showsVerticalScrollIndicator"
              value={showsVerticalScrollIndicator}
            />
            <Prop name="disabled" value={disabled} />
            <Prop name="nullable" value={nullable} />
            <Prop name="nullableLabel" value={nullableLabel} />
          </SelectContainer>
        </RowContainer>
      </StyledScrollView>
    </CustomContainer>
  );
}

storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />);
