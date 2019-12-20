import React, { useMemo, useState } from 'react';

import { ContainerDeco } from '../decorators';
import { Dimensions } from 'react-native';
import TinderCard from '../../src/components/shared/TinderCard';
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

interface DataProps {
  [key: string]: any;
}

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

const Text = styled.Text`
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
`;

const IndexText = styled.Text`
  position: absolute;
  color: white;
  font-size: 32;
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

const NoCard = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

function Default(): React.ReactElement {
  const [like, setLike] = useState(0);
  const [unlike, setUnlike] = useState(0);
  const [data, setData] = useState(tinderCardDummyData);

  useInterval(() => {
    if (data.length > 20) return;
    setData([...data, ...tinderCardDummyData]);
  }, 5000);

  const actionStack = useMemo(() => [], []);

  const handleUnlike = (item: DataProps): void => {
    setUnlike((unlike) => unlike + 1);
    actionStack.push('unlike');
  };

  const handleLike = (item: DataProps): void => {
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

  const _renderCards = (item: DataProps): React.ReactElement => {
    return (
      <CardContainer>
        <IndexText>{item.id}</IndexText>
        <BannerImage source={item.image} resizeMode="cover" />
      </CardContainer>
    );
  };

  const _renderNoMoreCards = (): React.ReactElement => (
    <NoCard>
      <Text>No more cards</Text>
    </NoCard>
  );

  return (
    <Container>
      <HeadContainer>
        <Text style={{ color: 'red' }}>Like: {like}</Text>
        <Text style={{ color: 'blue' }}>Unlike: {unlike}</Text>
      </HeadContainer>
      <TinderCard
        testID="tinderCard"
        onSwipeRight={handleUnlike}
        onSwipeLeft={handleLike}
        onCancel={handleCancel}
        data={data}
        renderCards={_renderCards}
        renderNoMoreCards={_renderNoMoreCards}
        rotate
        stackSize={0}
      />
    </Container>
  );
}
