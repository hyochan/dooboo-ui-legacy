import { ImageSourcePropType, View } from 'react-native';
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import TinderCard, {
  TinderCardDirection,
  TinderCardRef,
} from '../../packages/TinderCard';

import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
// @ts-ignore
import useInterval from 'react-useinterval';

const tinderCardDummyData = [
  {
    id: '0',
    title: 'Blueberry',
    content: 'perennial flowering plants with blue– or purple–colored berries.',
    image: {
      uri:
        'https://cdn.pixabay.com/photo/2016/04/13/07/18/blueberry-1326154_1280.jpg',
    },
  },
  {
    id: '1',
    title: 'Strawberry',
    content:
      'a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries...',
    image: {
      uri:
        'https://cdn.pixabay.com/photo/2017/11/18/17/09/strawberry-2960533_1280.jpg',
    },
  },
  {
    id: '2',
    title: 'Grapefruit',
    content:
      'a subtropical citrus tree known for its relatively large sour to semi-sweet, somewhat bitter fruit',
    image: {
      uri:
        'https://cdn.pixabay.com/photo/2019/07/20/19/04/grapefruit-4351352_1280.jpg',
    },
  },
  {
    id: '3',
    title: 'Apple',
    content:
      'a sweet, edible fruit produced by an apple tree (Malus domestica)',
    image: {
      uri:
        'https://cdn.pixabay.com/photo/2018/12/07/01/53/apple-3860991_1280.jpg',
    },
  },
  {
    id: '4',
    title: 'Peach',
    content:
      'a deciduous tree native to the region of Northwest China between the Tarim Basin and the ...',
    image: {
      uri:
        'https://cdn.pixabay.com/photo/2019/07/18/14/24/eat-4346598_1280.jpg',
    },
  },
];

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const CardContainer = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const CardOverlay = styled.View`
  position: absolute;
  z-index: 98;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
  border-radius: 20px;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const CardInfoWrapper = styled.View`
  position: absolute;
  z-index: 99;
  width: 100%;
  height: 100%;
  padding: 20px;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  padding: 15px;
  background-color: #48454d;
  justify-content: center;
  align-items: center;
`;

const LikeLabel = styled.Text`
  color: #44d1a6;
  font-size: 43px;
  font-style: italic;
  font-weight: bold;
`;

const UnlikeLabel = styled.Text`
  color: #ff7676;
  font-size: 43px;
  font-style: italic;
  font-weight: bold;
`;

const StyledText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 40px;
`;

const NoCard = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  background-color: black;
`;

interface Item {
  id: string;
  title: string;
  content: string;
  image: ImageSourcePropType;
}

function Default(): React.ReactElement {
  const tinderCard = useRef<TinderCardRef>(null);
  const [, setLike] = useState(0);
  const [, setUnlike] = useState(0);
  const [data, setData] = useState(tinderCardDummyData);

  useInterval(() => {
    if (data.length > 20) return;

    setData([...data, ...tinderCardDummyData]);
  }, 500);

  const actionStack = useMemo<string[]>(() => [], []);

  const handleUnlike = (): void => {
    setUnlike((unlike) => unlike + 1);
    actionStack.push('unlike');
  };

  const handleLike = (): void => {
    setLike((like) => like + 1);
    actionStack.push('like');
  };

  const handleCancel = (): void => {
    if (actionStack.pop() === 'like') setLike((value) => value - 1);
    else setUnlike((value) => value - 1);
  };

  const _renderCards = (item: Item): ReactElement => {
    return (
      <CardContainer key={`card__${item.id}`}>
        <CardOverlay />
        <CardImage source={item.image} resizeMode="cover" />
        <CardInfoWrapper>
          <StyledText>{item.title}</StyledText>
          <StyledText
            style={{ fontSize: 15, fontWeight: '500', fontStyle: 'italic' }}>
            {item.content}
          </StyledText>
        </CardInfoWrapper>
      </CardContainer>
    );
  };

  const _renderNoMoreCards = (): ReactElement => (
    <NoCard>
      <StyledText>No more cards</StyledText>
    </NoCard>
  );

  return (
    <Container>
      <TinderCard
        testID="tinderCard"
        ref={tinderCard}
        onSwipeRight={handleUnlike}
        onSwipeLeft={handleLike}
        onCancel={handleCancel}
        data={data}
        // @ts-ignore
        renderCards={_renderCards}
        renderNoMoreCards={_renderNoMoreCards}
        containerStyle={{ width: 300, height: 500 }}
        shouldRotate
        swipeRightLabelElement={(): ReactElement => (
          <LikeLabel>Like!</LikeLabel>
        )}
        swipeLeftLabelElement={(): ReactElement => (
          <UnlikeLabel>Unlike!</UnlikeLabel>
        )}
        swipeLabelAlignStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <ButtonWrapper
          style={{ backgroundColor: '#ff7676' }}
          onPress={(): void => {
            if (tinderCard.current)
              tinderCard.current.forceSwipe(TinderCardDirection.LEFT);
          }}>
          <StyledText style={{ fontSize: 15 }}>UNLIKE</StyledText>
        </ButtonWrapper>

        <ButtonWrapper
          onPress={(): void => {
            if (tinderCard.current) tinderCard.current.handleCancel();
          }}>
          <StyledText style={{ fontSize: 15 }}>UNDO</StyledText>
        </ButtonWrapper>

        <ButtonWrapper
          style={{ backgroundColor: '#44d1a6' }}
          onPress={(): void => {
            if (tinderCard.current)
              tinderCard.current.forceSwipe(TinderCardDirection.RIGHT);
          }}>
          <StyledText style={{ fontSize: 15 }}>LIKE</StyledText>
        </ButtonWrapper>
      </View>
    </Container>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'TinderCard',
};

export const toStorybook = (): ReactElement => (
  <>
    <Default />
  </>
);

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */

storiesOf('TinderCard', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
