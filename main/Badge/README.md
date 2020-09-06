# Badge  
> [Badge] component that can be used inside product. Has `OpacityVisible` state, `badgeZero` state.  
<br/>
<br/>
  
## Props  
  
|                       | required | types                 | default   |description |
| --------------------- | -------- | --------------------- | --------- | ---------- |
| count                 |          | number                |    10     | Proportionally controls opacity of badge color |
| color                 |     ✓    | string                |    red    | Set badge color |
| maximumValue          |          | number                |     300   | Set maximum limit where opacity stay 1.0, and if count exceeds maximumValue, badge color opacity sets to 0.6 | 
| showZero              |          | boolean               |           | Set whether to show '0' count number in badge or not |
| opacityVisible        |          | boolean               |    true   | Set application of change in color opacity |
| variant               |          | string                |           | Set shape of the badge. Available choices are 'dot' and 'standard' |
| position              |          | string                |           | Set position of the badge. Available choices are 'left', 'right' , 'top', 'down'. |

<br/>
<br/>  

## Installation  
  
```sh
yarn add dooboo-ui
```
<br/>
<br/>


## Getting started  
  
- Import

  ```javascript
  import { Badge } from 'dooboo-ui';
  ```  
<br/>
<br/>


## Usage

```tsx

```import React, { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Badge } from '../../main/Badge';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ShowContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledView: any = styled.View`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: gray;
`;

const Badge1 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}>
        <Container>
          <View style={{ marginTop: 50 }}>
            <StyledTitle>Badge (default)</StyledTitle>
            <StyledView>
              <Badge />
            </StyledView>
          </View>

          <View>
            <StyledTitle>Badge (showZero,opacityVisible)</StyledTitle>
            <ShowContainer>
              <StyledView>
                <Badge
                  opacityVisible={false}
                  color="blue"
                  count={3000}
                  maximumValue={100}
                />
              </StyledView>
              <StyledView>
                <Badge color="pink" count={0} maximumValue={0} showZero />
              </StyledView>
            </ShowContainer>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const Badge2 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}>
        <Container>
          <View>
            <StyledTitle>Badge 3</StyledTitle>
            <StyledView>
              <Badge color="blue" count={0} maximumValue={0} />
            </StyledView>
          </View>
          <View style={{ marginTop: 50 }}>
            <StyledTitle style={{ marginBottom: 10 }}>Badge 4</StyledTitle>
            <StyledView>
              <Badge color="red" count={0} maximumValue={0} showZero />
            </StyledView>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
