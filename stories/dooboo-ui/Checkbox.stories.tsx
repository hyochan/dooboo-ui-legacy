import { Checkbox, CheckboxGroup } from '../../main';
import React, { ReactElement, useState } from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

const Container = styled.View`
  background-color: transparent;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Title = styled.Text`
  padding: 10px;
  font-size: 22px;
  font-weight: bold;
`;

const Divider = styled.View`
  display: flex;
  margin: 10px;
  border: 0.5px solid lightgray;
`;

function DefaultCheckbox(): React.ReactElement {
  const customStyle = {
    labelLeft: true,
  };

  return (
    <ScrollContainer>
      <Container>
        <Title>default</Title>
        <Checkbox label="defaultChecked" defaultChecked></Checkbox>

        <Divider />

        <Title>disabled</Title>
        <Checkbox label="disabled" disabled />

        <Divider />

        <Title>indeterminate</Title>
        <Checkbox label="indeterminate" indeterminate />

        <Divider />

        <Title>labelLeft</Title>
        <Checkbox label="labelLeft" customStyle={customStyle} />
      </Container>
    </ScrollContainer>
  );
}

function DefaultCheckboxGroup(): React.ReactElement {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  const onChange = (checkedValues): void => {
    // eslint-disable-next-line no-console
    console.log('checked = ', checkedValues);
  };

  return (
    <ScrollContainer>
      <Container>
        <Title>plainOption</Title>
        <CheckboxGroup options={plainOptions} onChange={onChange} />

        <Divider />

        <Title>default with Row</Title>
        <CheckboxGroup
          direction={'row'}
          options={options}
          onChange={onChange}
        />

        <Divider />

        <Title>option with disabled</Title>
        <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />

        <Divider />

        <Title>with disabled props</Title>
        <CheckboxGroup options={options} disabled onChange={onChange} />

        <Divider />
      </Container>
    </ScrollContainer>
  );
}

function CheckAllExample(): React.ReactElement {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const defaultCheckedList = ['Apple', 'Orange'];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(
    defaultCheckedList.length > 0,
  );
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (checkedList): void => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length,
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = (e): void => {
    setCheckedList(e.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.checked);
  };

  return (
    <ScrollContainer>
      <Container>
        <Title>Check All Example</Title>
        <Checkbox
          label={'Check All'}
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        />
        <Divider />
        <CheckboxGroup
          direction="row"
          values={checkedList}
          options={plainOptions}
          onChange={onChange}
        />
      </Container>
    </ScrollContainer>
  );
}

export default {
  title: 'Checkbox',
};

/**
 * Below are stories for WEB
 */

export const Checkbox_ = (): ReactElement => <DefaultCheckbox />;
export const CheckboxGroup_ = (): ReactElement => <DefaultCheckboxGroup />;
export const CheckAllExample_ = (): ReactElement => <CheckAllExample />;

/**
 * Below are stories for app
 */
storiesOf('Checkbox', module)
  .add('Checkbox', () => (
    <>
      <DefaultCheckbox />
    </>
  ))
  .add('CheckboxGroup', () => (
    <>
      <DefaultCheckboxGroup />
    </>
  ))
  .add('ㄴ Check All Eaxample', () => (
    <>
      <CheckAllExample />
    </>
  ));
