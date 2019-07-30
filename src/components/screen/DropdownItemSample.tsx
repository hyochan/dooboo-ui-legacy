import React from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';
import DropdownItem from '../../../libraries/dropdown-item';
import { IC_ARR_DOWN, IC_ARR_UP } from '../../utils/icons';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  const contents = [
    {
      title: 'Title 1',
      body: 'Hi. I love this component. What do you think?',
    },
    {
      title: 'See this one too',
      body: 'Yes. You can have more items.',
    },
    {
      title: 'Thrid thing',
      body: `What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?`,
    },
  ];

  return (
    <Container>
      <ScrollView style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
        {
          contents.map((param, i) => {
            return (
              <DropdownItem
                key={i}
                contentVisible={false}
                invisibleImage={IC_ARR_DOWN}
                visibleImage={IC_ARR_UP}
                header={
                  <View style={{ height: 28 }}>
                    <Text style={{
                      fontSize: 16,
                      color: 'blue',
                    }}>{param.title}</Text>
                  </View>
                }
              >
                <Text style={{ fontSize: 20 }}>
                  {param.body}
                </Text>
              </DropdownItem>
            );
          })
        }
      </ScrollView>
    </Container>
  );
}

export default Page;
