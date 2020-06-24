import React, { FC } from 'react';
import AccrordionItem from './AccordionItem';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type ItemType = {
  itemTitle: string;
  itemBodies: Array<string>;
}

interface Props {
  data: Array<ItemType>;
  isAnimated?: boolean;
  collapsedWhenRedered: boolean;
  animDuration?: number;
  activeOpacity?: number;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    isAnimated,
    collapsedWhenRedered,
    animDuration,
    activeOpacity,
  } = props;

  return (
    <Container>
      {
        data.map((itemData, idx) => {
          return (
            <AccrordionItem
              key={idx}
              itemData={itemData}
              isAnimated={isAnimated}
              collapsedWhenRedered={collapsedWhenRedered}
              animDuration={animDuration}
              activeOpacity={activeOpacity}
            />
          );
        })
      }
    </Container>
  );
};

export default Accordion;
