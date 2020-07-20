import { Item, Select } from '../../main/Select';
import React, { ReactElement } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import LoadingIndicator from '../../main/LoadingIndicator';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View` 
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const TogglerWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;
`;
const ThemeSwitch = styled.Switch`
  width: 20px;
  height: 10px;
`;
const CustomSelectContainer = styled.View`
  width: 185px;
  height: 45px;
  align-items: center;
  justify-content: center;
`;
const CustomText = styled.Text`
  font-size: 10px;
  margin: 5px;
`;

const Default = (): React.ReactElement => {
  // [Toggler] states
  const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
  const [borderless, setBorder] = React.useState<boolean>(false);

  // [Select] states
  const [selectedValue, onSelectValue] = React.useState<
    string | number
  >();
  const [isOpen, toggleSelect] = React.useState<
    boolean
  >(false);
  const [isLoading, setLoading] = React.useState<
    boolean
  >(false);

  const delaySelect = (selectedItem) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSelectValue(selectedItem);
    }, 2000);
  };

  return (
    <Container>
      <TogglerWrapper>
        <CustomText>{'Dark mode?'}</CustomText>
        <ThemeSwitch
          value={darkTheme}
          onValueChange={() => setDarkTheme(!darkTheme)}
        />
        <CustomText>{'Bordered?'}</CustomText>
        <ThemeSwitch
          value={borderless}
          onValueChange={() => setBorder(!borderless)}
        />
      </TogglerWrapper>
      <CustomSelectContainer>
        <Select
          testID={'defaultSelect'}
          open={isOpen}
          loading={isLoading}
          disabled={false}
          showArrow={true}
          dark={darkTheme}
          bordered={borderless}
          activeOpacity={0.7}
          listHeight={undefined}
          placeholder={'New fancy select'}
          value={selectedValue}
          defaultValue={undefined}
          onSelect={(value): any => onSelectValue(value)}
          onOpen={(isOpen): any => toggleSelect(isOpen)}
          prefixIcon={undefined}
          suffixIcon={undefined}
          customLoader={LoadingIndicator}>
          <Item value={'Item-1'}>{'Item-1'}</Item>
          <Item value={'Item-2'}>{'Item-2'}</Item>
          <Item value={'Item-3'}>{'Item-3'}</Item>
        </Select>
      </CustomSelectContainer>
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Select',
};

export const toStorybook1 = (): ReactElement => <Default />;

toStorybook1.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
