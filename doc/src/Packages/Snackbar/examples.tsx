import React, { ReactElement, useCallback, useRef, useState } from 'react';
import Snackbar, {
  SnackbarProvider,
  SnackbarRef,
  Timer,
  useSnackbarContext,
  Content,
} from '@dooboo-ui/snackbar';

import styled from 'styled-components/native';
import { Button, EditText } from 'dooboo-ui';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  flex: 1;
  min-height: 400px;
`;

export function Simple(): React.ReactElement {
  const snackbar = useRef<SnackbarRef>();
  const [ text, setText ] = useState<string>('Simple text');
  const [ actionText, setActionText ] = useState<string>('');
  const [ timer, setTimer ] = useState('1500');
  const onPress = () => {
    snackbar?.current?.show({
      text,
      timer: +timer,
      actionText,
    })
  }
  return <Container>
    <EditText label="text" onChangeText={(changedText) => setText(changedText)} value={text}/>
    <EditText label="timer" onChangeText={(timer) => setTimer(timer)} value={timer}/>
    <EditText label="actionText" onChangeText={(changedText) => setActionText(changedText)} value={actionText}/>
    <Button text="Click this to show snackbar" onPress={onPress} containerStyle={{ backgroundColor: "#eee", borderRadius: 4, margin: 10 }} />
    <Snackbar ref={snackbar} />
  </Container>
}

function getExample(param: Partial<Content>) {
  return (): React.ReactElement => {
    const snackbar = useRef<SnackbarRef>();
    const onPress = () => {
      snackbar?.current?.show({
        text: 'Simple text message',
        ...param
      });
    }
    return <Container style={{justifyContent: 'center'}}>
      <Button text="Click this to show snackbar" onPress={onPress} containerStyle={{ backgroundColor: "#eee", borderRadius: 4, margin: 10 }} />
      <Snackbar ref={snackbar} />
    </Container>
  }
}

export const StyleChanged = getExample({
  containerStyle: {
    alignSelf: 'flex-start',
    backgroundColor: '#0008',
    bottom: 0,
    minWidth: 300,
  }      
});

export const TextStyleChanged = getExample({
  messageStyle: {
    color: '#ff0000',
    fontSize: 14,
  },
  actionText: 'Some Action',
  actionStyle: {
    fontSize: 22,
  }
});