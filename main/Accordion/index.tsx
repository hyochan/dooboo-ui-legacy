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
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  titleStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTitleLeft?: React.ReactElement;
  itemBodyLeft?: React.ReactElement;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    isAnimated: shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    titleStyle,
    itemStyle,
    itemTitleLeft,
    itemBodyLeft,
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
              shouldAnimate={shouldAnimate}
              collapseOnStart={collapseOnStart}
              animDuration={animDuration}
              activeOpacity={activeOpacity}
              titleStyle={titleStyle}
              itemStyle={itemStyle}
              itemTitleLeft={itemTitleLeft}
              itemBodyLeft={itemBodyLeft}
            />
          );
        })
      }
    </Container>
  );
};
export default Accordion;
