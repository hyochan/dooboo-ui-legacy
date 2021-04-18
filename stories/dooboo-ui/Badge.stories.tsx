import React, {ReactElement} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Badge} from '../../main/Badge';
import {ContainerDeco} from '../../storybook/decorators';
import {storiesOf} from '@storybook/react-native';
import styled from '@emotion/native';

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

const StyledBasicView = styled.View`
  margin: 20px;
  width: 100px;
  height: 100px;
  background-color: #bfbfbf;
  border-radius: 12px;
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.5);
`;

const StyledView = (props): React.ReactElement => {
  return <StyledBasicView style={{elevation: 1}} {...props} />;
};

const Badge1 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <Container>
          <View>
            <StyledTitle>Badge (default)</StyledTitle>
            <StyledView>
              <Badge />
            </StyledView>
          </View>

          <View style={{marginTop: 20}}>
            <Container>
              <StyledTitle>Badge (color, count, showZero)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge color="#6B98F2" count={17} />
              </StyledView>
              <StyledView>
                <Badge color="#6B98F2" count={0} showZero />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{marginTop: 20}}>
            <Container>
              <StyledTitle>Badge (variant, position)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge variant="dot" color="#ED2939" />
              </StyledView>
              <StyledView>
                <Badge color="#F2B9AC" count={100} badgePlacement="left" />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{marginTop: 20}}>
            <Container>
              <StyledTitle>Badge (maximumCount, opacityVisible)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge
                  opacityVisible={false}
                  color="#34AFF9"
                  count={300}
                  maximumCount={100}
                />
              </StyledView>
              <StyledView>
                <Badge
                  opacityVisible={true}
                  color="#34AFF9"
                  count={300}
                  maximumCount={100}
                />
              </StyledView>
            </ShowContainer>
          </View>

          <View style={{marginTop: 20}}>
            <Container>
              <StyledTitle>Badge (border, textColor)</StyledTitle>
            </Container>
            <ShowContainer>
              <StyledView>
                <Badge color="#91AAF2" border="#F2B9AC" count={37} />
              </StyledView>
              <StyledView>
                <Badge
                  color="white"
                  border="#F2B9AC"
                  textColor="#F2B9AC"
                  count={50}
                />
              </StyledView>
            </ShowContainer>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Badge',
};

export const toStorybook1 = (): ReactElement => <Badge1 />;
// export const toStorybook2 = (): ReactElement => <Badge2 />;

toStorybook1.story = {
  name: 'default',
  notes: 'Basic Badge style',
};
// toStorybook2.story = {
//   name: 'Badge2',
//   notes: 'You can change the label position.',
// };

/**
 * Below are stories for app
 */
storiesOf('Badge', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Badge1 />, {
    notes: 'Basic Badge style',
  });
