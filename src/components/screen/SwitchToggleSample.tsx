import React, { useState } from 'react';

import { NavigationScreenProp } from 'react-navigation';
import SwitchToggle from '../shared/SwitchToggle';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #f5fcff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  const [switchOn1, setSwitchOn1] = useState(false);
  const [switchOn2, setSwitchOn2] = useState(false);
  const [switchOn3, setSwitchOn3] = useState(false);
  const [switchOn4, setSwitchOn4] = useState(false);

  return (
    <Container>
      <SwitchToggle
        switchOn={switchOn1}
        onPress={() => setSwitchOn1(!switchOn1)}
      />
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
        onPress={() => setSwitchOn2(!switchOn2)}
        circleColorOff='white'
        circleColorOn='red'
        duration={500}
      />
      <SwitchToggle
        containerStyle={{
          marginTop: 16,
          width: 160,
          height: 65,
          borderRadius: 30,
          padding: 5,
        }}
        backgroundColorOn='#a0e1e5'
        backgroundColorOff='#e5e1e0'
        circleStyle={{
          width: 55,
          height: 55,
          borderRadius: 27.5,
          backgroundColor: 'blue', // rgb(102,134,205)
        }}
        switchOn={switchOn3}
        onPress={() => setSwitchOn3(!switchOn3)}
        circleColorOff='#ff11ff'
        circleColorOn='green'
        duration={500}
      />
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
        backgroundColorOn='#fff'
        backgroundColorOff='#fff'
        circleStyle={{
          width: 80,
          height: 55,
          borderRadius: 27.5,
          backgroundColor: 'blue', // rgb(102,134,205)
        }}
        switchOn={switchOn4}
        onPress={() => setSwitchOn4(!switchOn4)}
        circleColorOff='#e5e1e0'
        circleColorOn='#e5e1e0'
        duration={500}
      />
    </Container>
  );
}

export default Page;
