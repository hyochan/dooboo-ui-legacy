import { Animated, ViewStyle } from 'react-native';
import React, { FC, useRef } from 'react';

import AccrordionItem from './AccordionItem';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

type TitleType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type BodyType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type DatumType = {
  title: TitleType;
  bodies: Array<BodyType>;
};

interface Props {
  data: Array<DatumType>;
  isAnimated?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  accordionItemStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    isAnimated: shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    accordionItemStyle,
    titleStyle,
    bodyStyle,
  } = props;

  const dropDownAnimValueList = useRef(data.map(() => new Animated.Value(0))).current;

  return (
    <Container>
      {
        data.map((datum, titleKey) => {
          return (
            <AccrordionItem
              testID={`${titleKey}`}
              key={titleKey}
              datum={datum}
              shouldAnimate={shouldAnimate}
              collapseOnStart={collapseOnStart}
              animDuration={animDuration}
              activeOpacity={activeOpacity}
              toggleElement={toggleElement}
              accordionItemStyle={accordionItemStyle}
              titleStyle={titleStyle}
              bodyStyle={bodyStyle}
              dropDownAnimValueList={dropDownAnimValueList[titleKey]}
              sumOfPrecedingTranslateY={
                dropDownAnimValueList
                  .filter((item, idx) => idx < titleKey)
                  .map((value) => ({ translateY: value }))
              }
            />
          );
        })
      }
    </Container>
  );
};

export { Accordion };
