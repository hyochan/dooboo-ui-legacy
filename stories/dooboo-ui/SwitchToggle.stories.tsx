import React, { ReactElement, useState } from 'react';

import { ContainerDeco } from '../../.storybook/decorators';
import SwitchToggle from '../../main/SwitchToggle';
import { storiesOf } from '@storybook/react-native';

const Small = (): React.ReactElement => {
  const [switchOn1, setSwitchOn1] = useState(false);
  return (
    <SwitchToggle
      switchOn={switchOn1}
      onPress={(): void => setSwitchOn1(!switchOn1)}
    />
  );
};

const Medium = (): React.ReactElement => {
  const [switchOn2, setSwitchOn2] = useState<boolean>(false);
  return (
    <SwitchToggle
      containerStyle={{
        marginTop: 16,
        width: 108,
        height: 48,
        borderRadius: 25,
        backgroundColor: '#ccc',
        padding: 5,
      }}
      circleStyle={{
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'white', // rgb(102,134,205)
      }}
      switchOn={switchOn2}
      onPress={(): void => setSwitchOn2(!switchOn2)}
      circleColorOff="white"
      circleColorOn="red"
      duration={500}
    />
  );
};

const WithText = (): React.ReactElement => {
  const [switchOn4, setSwitchOn4] = useState(false);
  return (
    <SwitchToggle
      buttonText={switchOn4 ? 'Hour' : 'Day'}
      backTextRight={switchOn4 ? '' : 'Hour'}
      backTextLeft={switchOn4 ? 'Day' : ''}
      type={1}
      buttonStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      }}
      rightContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      leftContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      buttonTextStyle={{ fontSize: 20 }}
      textRightStyle={{ fontSize: 20 }}
      textLeftStyle={{ fontSize: 20 }}
      containerStyle={{
        marginTop: 16,
        width: 160,
        height: 65,
        borderRadius: 30,
        padding: 5,
      }}
      backgroundColorOn="#fff"
      backgroundColorOff="#fff"
      circleStyle={{
        width: 80,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: 'blue', // rgb(102,134,205)
      }}
      switchOn={switchOn4}
      onPress={(): void => setSwitchOn4(!switchOn4)}
      circleColorOff="#e5e1e0"
      circleColorOn="#e5e1e0"
      duration={500}
    />
  );
};
const Large = (): React.ReactElement => {
  const [switchOn3, setSwitchOn3] = useState(false);
  return (
    <SwitchToggle
      containerStyle={{
        marginTop: 16,
        width: 160,
        height: 65,
        borderRadius: 30,
        padding: 5,
      }}
      backgroundColorOn="#a0e1e5"
      backgroundColorOff="#e5e1e0"
      circleStyle={{
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: 'blue', // rgb(102,134,205)
      }}
      switchOn={switchOn3}
      onPress={(): void => setSwitchOn3(!switchOn3)}
      circleColorOff="#ff11ff"
      circleColorOn="green"
      duration={500}
    />
  );
};

/**
 * Below are stories for web
 */

export default {
  title: 'SwitchToggle',
};

export const toStorybook1 = (): ReactElement => <Small />;
toStorybook1.story = { name: 'small' };

export const toStorybook2 = (): ReactElement => <Medium />;
toStorybook2.story = { name: 'medium' };

export const toStorybook3 = (): ReactElement => <Large />;
toStorybook3.story = { name: 'large' };

export const toStorybook4 = (): ReactElement => <WithText />;
toStorybook4.story = { name: 'WithText' };

/**
 * Below are stories for app
 */

storiesOf('SwitchToggle', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Small />
      <Medium />
      <Large />
      <WithText />
    </>
  ))
  .add('└small', () => <Small />)
  .add('└medium', () => <Medium />)
  .add('└large', () => <Large />)
  .add('└with text', () => <WithText />);
