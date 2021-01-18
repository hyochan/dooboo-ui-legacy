import React, {ReactElement} from 'react';
import {boolean, number} from '@storybook/addon-knobs';

import {ContainerDeco} from '../../storybook/decorators';
import {Rating} from '../../main';
import {storiesOf} from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Result = styled.Text`
  width: 200px;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
`;

const CustomOn = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #888;
`;

const CustomOff = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #000;
`;

function Default(): React.ReactElement {
  const [value, setValue] = React.useState(0);
  const disabled = boolean('disabled', false);

  const handleChange = (prop: number): void => {
    setValue(prop);
  };

  React.useEffect(() => {
    setValue(number('initValue', 3) || 0);
  }, []);

  return (
    <Container>
      <Rating
        total={number('total', 5)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      <Rating
        total={number('total', 5)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        customItem={{
          onComponent: <CustomOn />,
          offComponent: <CustomOff />,
        }}
      />
      <Rating
        total={number('total', 5)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        customItem={{
          onComponent: <CustomOn />,
          offComponent: <CustomOff />,
        }}
        containerStyle={{width: 200}}
      />
      <Result>Selected: {value} stars</Result>
    </Container>
  );
}

/**
 * Below are stories for web
 */

export default {
  title: 'Rating',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Rating', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
