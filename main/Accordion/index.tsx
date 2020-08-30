import { Animated, ViewStyle } from 'react-native';
import React, { FC, useRef } from 'react';

import AccrordionItem from './AccordionItem';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

export interface Datum {
  title: string;
  bodies: string[];
}
interface Props {
  data: Datum[];
  shouldAnimate?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  renderTitle?: (item: string) => React.ReactElement;
  renderBody?: (item: string) => React.ReactElement;
  titleContainerStyle?: ViewStyle;
  bodyContainerStyle?: ViewStyle;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    renderTitle,
    renderBody,
    titleContainerStyle,
    bodyContainerStyle,
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
              renderTitle={renderTitle}
              renderBody={renderBody}
              titleContainerStyle={titleContainerStyle}
              bodyContainerStyle={bodyContainerStyle}
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
