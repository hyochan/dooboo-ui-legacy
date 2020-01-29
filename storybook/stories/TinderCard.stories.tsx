import { Dimensions, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import React, {
  ReactElement,
  useMemo,
  useRef,
  useState,
} from 'react';
import TinderCard, { TinderCardDirection, TinderCardRef } from '../../src/components/shared/TinderCard';

import { ContainerDeco } from '../decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { tinderCardDummyData } from './asset/dummyData/data';
import useInterval from 'react-useinterval';

const INNER_HEIGHT = Dimensions.get('screen').height;

storiesOf('TinderCard', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: ${INNER_HEIGHT * 0.1};
`;

const HeadContainer = styled.View`
  width: 250px;
  height: 50px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: lightgrey;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const CardContainer = styled.View`
  flex: 1;
  min-height: ${INNER_HEIGHT * 0.5};
  margin: 10%;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
  border-width: 2px;
  border-color: white;
  border-radius: 5px;
  position: relative;
`;

const IndexText = styled.Text`
  position: absolute;
  color: white;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: black;
  opacity: 0.7;
`;

const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const CardLabel = styled.Text`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 50;
  font-size: 35px;
  font-weight: 600;
  color: lightcyan;
  position: absolute;
  top: 50;
`;

const NoCard = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

interface Item {
  id: string;
  image: ImageSourcePropType;
}

function Default(): React.ReactElement {
  const tinderCard = useRef<TinderCardRef>(null);
  const [like, setLike] = useState(0);
  const [unlike, setUnlike] = useState(0);
  const [data, setData] = useState(tinderCardDummyData);

  useInterval(() => {
    if (data.length > 20) return;
    setData([...data, ...tinderCardDummyData]);
  }, 5000);

  const actionStack = useMemo(() => [], []);

  const handleUnlike = (): void => {
    setUnlike((unlike) => unlike + 1);
    actionStack.push('unlike');
  };

  const handleLike = (): void => {
    setLike((like) => like + 1);
    actionStack.push('like');
  };

  const handleCancel = (): void => {
    if (actionStack.pop() === 'like') {
      setLike((value) => value - 1);
    } else {
      setUnlike((value) => value - 1);
    }
  };

  const _renderCards = (item: Item): ReactElement => {
    return (
      <CardContainer>
        <IndexText>{item.id}</IndexText>
        <BannerImage source={item.image} resizeMode="cover" />
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
      <HeadContainer>
        <StyledText style={{ color: 'red' }}>Like: {like}</StyledText>
        <StyledText style={{ color: 'blue' }}>Unlike: {unlike}</StyledText>
      </HeadContainer>
      <View
        style={{
          width: '100%',
          height: 600,
          alignItems: 'center',
        }}
      >
        <TinderCard
          testID="tinderCard"
          ref={tinderCard}
          onSwipeRight={handleUnlike}
          onSwipeLeft={handleLike}
          onCancel={handleCancel}
          data={data}
          renderCards={_renderCards}
          renderNoMoreCards={_renderNoMoreCards}
          shouldRotate
          stackSize={0}
        />
        <View style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 80,
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity
            style={{
              padding: 8,
            }}
            onPress={(): void => {
              tinderCard.current.forceSwipe(TinderCardDirection.LEFT);
            }}
          ><Text>LEFT</Text></TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 8,
            }}
            onPress={(): void => {
              tinderCard.current.handleCancel();
            }}
          ><Text>UNDO</Text></TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 8,
            }}
            onPress={(): void => {
              tinderCard.current.forceSwipe(TinderCardDirection.RIGHT);
            }}
          ><Text>RIGHT</Text></TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}
