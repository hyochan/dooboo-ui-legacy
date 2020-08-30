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
  renderCustomTitle?: (item: string) => React.ReactElement;
  renderCustomBody?: (item: string) => React.ReactElement;
  customTitleStyle?: ViewStyle;
  customBodyStyle?: ViewStyle;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    renderCustomTitle,
    renderCustomBody,
    customTitleStyle,
    customBodyStyle,
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
              renderCustomTitle={renderCustomTitle}
              renderCustomBody={renderCustomBody}
              customTitleStyle={customTitleStyle}
              customBodyStyle={customBodyStyle}
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
