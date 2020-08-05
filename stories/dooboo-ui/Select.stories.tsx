import { Image, View } from 'react-native';
import { LoadingIndicator, Select, SelectItem } from '../../main';
import React, { ReactElement } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const CustomContainer = styled.View` 
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TogglerWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`;
const ThemeSwitch = styled.Switch`
  width: 30px;
  height: 30px;
`;
const CustomTextInput = styled.TextInput`
  background-color: #ffffff;
  width: 190px;
  height: 50px;
  padding: 10px;
  font-size: 12px;
`;
const CustomSelectContainer = styled.View`
  width: 185px;
  height: 45px;
  align-items: center;
  justify-content: center;
`;
const CustomText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  margin: 5px;
`;

const Default = (): React.ReactElement => {
  const [selectedValue, onSelectedValue] = React.useState<
    string | number
  >();
  const [isOpen, toggleSelect] = React.useState<
    boolean
  >(false);

  return (
    <CustomContainer style={{ justifyContent: 'center' }}>
      <CustomText>{'Selected Item [value]'}</CustomText>
      <CustomText style={{ fontSize: 14 }}>{selectedValue || ' '}</CustomText>
      <CustomSelectContainer>
        <Select
          opened={isOpen}
          activeOpacity={0.5}
          placeholder={'New fancy select'}
          value={selectedValue}
          onSelect={(value): void => onSelectedValue(value)}
          onOpen={(isOpen): void => toggleSelect(isOpen)}>
          <SelectItem value={'Item-Value-1'}>{'Item-1'}</SelectItem>
          <SelectItem value={'Item-Value-2'}>{'Item-2'}</SelectItem>
          <SelectItem value={'Item-Value-3'}>{'Item-3'}</SelectItem>
        </Select>
      </CustomSelectContainer>
    </CustomContainer>
  );
};

const ChangeProps = (): React.ReactElement => {
  const [darkTheme, setDarkTheme] = React.useState<boolean>(true);
  const [borderless, setBorder] = React.useState<boolean>(true);
  const [showArrow, setShowArrow] = React.useState<boolean>(true);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const [selectedValue, onSelectedValue] = React.useState<string | number>();
  const [isOpen, toggleSelect] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const delaySelect = (selectedItem): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectedValue(selectedItem);
    }, 700);
  };

  return (
    <CustomContainer>
      <TogglerWrapper>
        <View style={{ alignSelf: 'center' }}>
          <CustomText>{'Dark mode?'}</CustomText>
          <ThemeSwitch
            value={darkTheme}
            onValueChange={(): void => setDarkTheme(!darkTheme)}
          />
          <CustomText>{'Bordered?'}</CustomText>
          <ThemeSwitch
            value={borderless}
            onValueChange={(): void => setBorder(!borderless)}
          />
          <CustomText>{'Show default Suffix (Arrow)?'}</CustomText>
          <ThemeSwitch
            value={showArrow}
            onValueChange={(): void => setShowArrow(!showArrow)}
          />
          <CustomText>{'disabled?'}</CustomText>
          <ThemeSwitch
            value={disabled}
            onValueChange={(): void => setDisabled(!disabled)}
          />
        </View>
      </TogglerWrapper>
      <CustomSelectContainer>
        <Select
          opened={isOpen}
          loading={isLoading}
          disabled={disabled}
          showArrow={showArrow}
          bordered={borderless}
          activeOpacity={0.5}
          placeholder={'New fancy select'}
          value={selectedValue}
          onSelect={(value): void => delaySelect(value)}
          onOpen={(isOpen): void => toggleSelect(isOpen)}>
          <SelectItem value={'Item-1'}>{'Item-1'}</SelectItem>
          <SelectItem value={'Item-2'}>{'Item-2'}</SelectItem>
          <SelectItem value={'Item-3'}>{'Item-3'}</SelectItem>
        </Select>
      </CustomSelectContainer>
    </CustomContainer>
  );
};

const Customized = (): React.ReactElement => {
  const [listHeightValue, setListHeightValue] = React.useState<string>('');
  const [customPrefix, setCustomPrefix] = React.useState<string>(
    'https://user-images.githubusercontent.com/50701501/88152214-ae263680-cc3e-11ea-9a72-062e0208ee79.png',
  );
  const [customSuffix, setCustomSuffix] = React.useState<string>(
    'https://user-images.githubusercontent.com/50701501/88151403-9dc18c00-cc3d-11ea-95c0-447162f8465e.png',
  );

  const [selectedValue, onSelectedValue] = React.useState<
    string | number
  >();
  const [isOpen, toggleSelect] = React.useState<
    boolean
  >(false);
  const [isLoading, setLoading] = React.useState<
    boolean
  >(false);

  const delaySelect = (selectedItem) : void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectedValue(selectedItem);
    }, 700);
  };

  return (
    <CustomContainer>
      <TogglerWrapper>
        <View style={{ alignSelf: 'center' }}>
          <CustomText>{'Fixed List height'}</CustomText>
          <CustomTextInput
            placeholder={'Set or Auto-sized'}
            value={listHeightValue}
            onChangeText={(text): void => setListHeightValue(text)}
          />
          <CustomText>{'Custom Prefix icon'}</CustomText>
          <CustomTextInput
            style={{ width: 300 }}
            value={customPrefix}
            onChangeText={(text): void => setCustomPrefix(text)}
          />
          <CustomText>{'Custom Suffix icon'}</CustomText>
          <CustomTextInput
            style={{ width: 300 }}
            value={customSuffix}
            onChangeText={(text): void => setCustomSuffix(text)}
          />
        </View>
      </TogglerWrapper>
      <CustomSelectContainer style={{ height: 60, width: 200 }}>
        <Select
          opened={isOpen}
          loading={isLoading}
          activeOpacity={0.9}
          listHeight={Number(listHeightValue)}
          placeholder={'My placeholder'}
          value={selectedValue}
          defaultValue={undefined}
          onSelect={(value): void => delaySelect(value)}
          onOpen={(isOpen): void => toggleSelect(isOpen)}
          prefixIcon={
            <Image
              style={{ width: 15, height: 15 }}
              source={{
                uri: customPrefix,
              }}
            />
          }
          suffixIcon={
            <Image
              style={{ width: 15, height: 15 }}
              source={{
                uri: customSuffix,
              }}
            />
          }
          customLoader={
            <LoadingIndicator
              size="small"
              imgSource="https://user-images.githubusercontent.com/50701501/88150309-2f2ffe80-cc3c-11ea-8507-a4b45487eec5.gif"
            />
          }
          customStyle={{
            backgroundColor: '#ede682',
          }}
          customTextStyle={{ color: '#e84a5f', fontSize: 18 }}>
          <SelectItem
            value={'Banana'}
            customStyle={{
              backgroundColor: '#e84a5f',
            }}
            customTextStyle={{ color: '#ede682' }}>
            {'Banana'}
          </SelectItem>
          <SelectItem value={'Apple'}>{'Apple'}</SelectItem>
          <SelectItem value={'Orange'}>{'Orange'}</SelectItem>
        </Select>
      </CustomSelectContainer>
    </CustomContainer>
  );
};

const MultipleSelect = (): React.ReactElement => {
  const [selectedValue1, onSelectedValue1] = React.useState<string | number>();
  const [isOpen1, toggleSelect1] = React.useState<boolean>(false);
  const [selectedValue2, onSelectedValue2] = React.useState<string | number>();
  const [isOpen2, toggleSelect2] = React.useState<boolean>(false);

  return (
    <CustomContainer style={{ justifyContent: 'center' }}>
      <CustomText>{'Select-1'}</CustomText>
      <CustomSelectContainer>
        <Select
          opened={isOpen1}
          activeOpacity={0.5}
          placeholder={'New fancy select1'}
          value={selectedValue1}
          onSelect={(value): void => onSelectedValue1(value)}
          onOpen={(isOpen): void => toggleSelect1(isOpen)}>
          <SelectItem value={'Item-Value-1'}>{'Item-1'}</SelectItem>
          <SelectItem value={'Item-Value-2'}>{'Item-2'}</SelectItem>
          <SelectItem value={'Item-Value-3'}>{'Item-3'}</SelectItem>
        </Select>
      </CustomSelectContainer>
      <View style={{ margin: 10 }} />
      <CustomText>{'Select-2'}</CustomText>
      <CustomSelectContainer>
        <Select
          opened={isOpen2}
          activeOpacity={0.5}
          placeholder={'New fancy select2'}
          value={selectedValue2}
          onSelect={(value): void => onSelectedValue2(value)}
          onOpen={(isOpen): void => toggleSelect2(isOpen)}>
          <SelectItem value={'Item-Value-4'}>{'Item-4'}</SelectItem>
          <SelectItem value={'Item-Value-5'}>{'Item-5'}</SelectItem>
          <SelectItem value={'Item-Value-6'}>{'Item-6'}</SelectItem>
        </Select>
      </CustomSelectContainer>
    </CustomContainer>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Select',
};

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <ChangeProps />;
export const toStorybook3 = (): ReactElement => <Customized />;
export const toStorybook4 = (): ReactElement => <MultipleSelect />;

toStorybook1.story = {
  name: 'default',
};
toStorybook2.story = {
  name: 'ChangeProps',
};
toStorybook3.story = {
  name: 'Customized',
};
toStorybook4.story = {
  name: 'MultipleSelect',
};

/**
 * Below are stories for app
 */
storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Default Select component',
  })
  .add('ChangeProps', () => <ChangeProps />, {
    notes: 'Test props changing',
  })
  .add('Customized', () => <Customized />, {
    notes: 'A customized Select example',
  })
  .add('MultipleSelect', () => <MultipleSelect />, {
    notes: 'Using more than one Select',
  });
