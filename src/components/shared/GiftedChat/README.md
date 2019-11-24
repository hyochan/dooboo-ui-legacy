# GiftedChat

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-gifted-chat.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-gifted-chat)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui-gifted-chat/native.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui-gifted-chat/native)

> [GiftedChat] component contains essential features to be implemented in `Chat` screen.

![image](https://user-images.githubusercontent.com/27461460/67629842-31894600-f8c0-11e9-846d-a6b3fdac7dac.png)

## Props

|                      | necessary | types               | default |
| -------------------- | --------- | ------------------- | ------- |
| chats                |           | any[]               |         |
| borderColor          |           | string              |         |
| backgroundColor      |           | string              |         |
| fontColor            |           | string              |         |
| keyboardOffset       |           | number              |         |
| renderItem           |           | ListRenderItem<any> |         |
| emptyItem            |           | ReactElement        |         |
| renderViewMenu       |           | () => ReactElement  |         |
| optionView           |           | ReactElement        |         |
| onChangeMessage      |           | Function            |         |
| placeholder          |           | string              |         |
| placeholderTextColor |           | string              |         |
| renderSendButton     |           | () => ReactElement  |         |

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-gifted-chat
```

## Getting started

- Import

  ```javascript
  import { GiftedChat } from '@dooboo-ui/native';
  // or
  import GiftedChat from '@dooboo-ui/native-gifted-chat';
  ```

- Usage

  ```javascript
  import { Image, Platform, TouchableOpacity, View } from 'react-native';
  import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';
  import React, { useState } from 'react';
  import styled, {
    DefaultTheme,
    ThemeProps,
  } from 'styled-components/native';

  import Button from '../shared/Button';
  import { Chat } from '../../types';
  import ChatListItem from '../shared/ChatListItem';
  import Constants from 'expo-constants';
  import EmptyListItem from '../shared/EmptyListItem';
  import GiftedChat from '../shared/GiftedChat';
  import { Header } from 'react-navigation-stack';
  import { IC_SMILE } from '../../utils/Icons';
  import { Ionicons } from '@expo/vector-icons';
  import { getString } from '../../../STRINGS';

  const StyledContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }): string => theme.background};
    flex-direction: column;
    align-items: center;
  `;

  interface Props extends ThemeProps<DefaultTheme> {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  }

  interface State {
    isLoading: boolean;
    showMenu: boolean;
    message: string;
    chats: Chat[];
  }

  function Screen(props: Props): React.ReactElement {
    const { theme } = props;

    const [isSending, setIsSending] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([
      {
        id: '',
        sender: {
          uid: '0',
          displayName: 'sender111',
          thumbURL: '',
          photoURL: '',
          statusMsg: '',
        },
        message: 'hello1',
      },
      {
        id: '',
        sender: {
          uid: '2',
          displayName: 'sender111',
          thumbURL: '',
          photoURL: '',
          statusMsg: '',
        },
        message:
          'Hello2. This is long message. This is long message.This is long message.' +
          'This is long message. This is long message. This is long message.' +
          'This is long message. This is long message.' +
          'This is long message. This is long message. This is long message.',
      },
      {
        id: '',
        sender: {
          uid: '0',
          displayName: 'sender111',
          thumbURL: '',
          photoURL: '',
          statusMsg: '',
        },
        message: 'hello',
      },
      {
        id: '',
        sender: {
          uid: '0',
          displayName: 'sender111',
          thumbURL: '',
          photoURL: '',
          statusMsg: '',
        },
        message: 'hello2',
      },
    ]);

    const onSubmit = (): void => {
      setIsSending(true);
    };

    return (
      <StyledContainer>
        <GiftedChat
          chats={chats}
          borderColor={theme.lineColor}
          backgroundColor={theme.background}
          fontColor={theme.fontColor}
          keyboardOffset={Constants.statusBarHeight + Header.HEIGHT}
          message={message}
          placeholder={getString('WRITE_MESSAGE')}
          placeholderTextColor={theme.status}
          onChangeMessage={(text: string): void => setMessage(text)}
          renderItem={({
            item,
            index,
          }: {
            item: Chat;
            index: number;
          }): React.ReactElement => {
            return (
              <ChatListItem
                prevItem={index > 0 ? chats[index - 1] : undefined}
                item={item}
              />
            );
          }}
          optionView={
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={IC_SMILE}
            />
          }
          emptyItem={<EmptyListItem>{getString('NO_CONTENT')}</EmptyListItem>}
          renderViewMenu={(): React.ReactElement => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 16,
                  marginTop: 2,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="ios-camera"
                  size={36}
                  color={theme ? theme.fontColor : '#3d3d3d'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 16,
                  marginTop: 4,
                  width: 60,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="md-images"
                  size={36}
                  color={theme ? theme.fontColor : '#3d3d3d'}
                />
              </TouchableOpacity>
            </View>
          )}
          renderSendButton={(): React.ReactElement => (
            <Button
              testID="btn_chat"
              height={Platform.OS === 'android' ? 40 : undefined}
              isLoading={isSending}
              onPress={onSubmit}
            >
              {getString('SEND')}
            </Button>
          )}
        />
      </StyledContainer>
    );
  }

  export default Screen;

  ```
