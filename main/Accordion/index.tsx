import React, { FC } from 'react';

import AccrordionItem from './AccordionItem';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

type ItemType = {
  itemTitle: string;
  itemBodies: Array<string>;
}

interface Props {
  data: Array<ItemType>;
  isAnimated?: boolean;
  collapsedWhenRendered: boolean;
  animDuration?: number;
  activeOpacity?: number;
  customTitleStyle?: ViewStyle;
  customItemStyle?: ViewStyle;
  titleElementLeft?: React.ReactElement;
  itemBodyElementLeft?: React.ReactElement;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    isAnimated,
    collapsedWhenRendered,
    animDuration,
    activeOpacity,
    customTitleStyle,
    customItemStyle,
    titleElementLeft,
    itemBodyElementLeft,
  } = props;

  return (
    <Container>
      {
        data.map((itemData, idx) => {
          return (
            <AccrordionItem
              testID={`${idx}`}
              key={idx}
              itemData={itemData}
              isAnimated={isAnimated}
              collapsedWhenRendered={collapsedWhenRendered}
              animDuration={animDuration}
              activeOpacity={activeOpacity}
              customTitleStyle={customTitleStyle}
              customItemStyle={customItemStyle}
              titleElementLeft={titleElementLeft}
              itemBodyElementLeft={itemBodyElementLeft}
            />
          );
        })
      }
    </Container>
  );
};
export default Accordion;
