import {
  Animated,
  Easing,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  overflow: hidden;
  width: 300px;
`;

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #141414;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: white;
  z-index: 10;
`;

const StyledItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

type titleType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type bodyType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type datumType = {
  title: titleType;
  bodies: Array<bodyType>;
};
interface Props {
  testID: string;
  datum: datumType;
  shouldAnimate?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  accordionItemStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
}

let layoutHeight = 0;

const AccordionItem: FC<Props> = (props) => {
  const {
    testID,
    datum,
    shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    accordionItemStyle,
    titleStyle,
    bodyStyle,
  } = props;

  const dropDownAnimValue = useRef(new Animated.Value(0)).current;
  const rotateAnimValue = useRef(new Animated.Value(0)).current;

  const [opened, setItemVisible] = useState<boolean>(collapseOnStart);
  const [rotateState, setRotateState] = useState<boolean>(false);
  const [bodyMounted, setBodyMounted] = useState<boolean>(false);

  const [bodyHeight, setBodyHeight] = useState<number>(1);

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (bodyMounted) return;
    const { height } = e.nativeEvent.layout;
    layoutHeight = height;
    setBodyMounted(true);
    setBodyHeight(height);
  };

  const handleAnimState = (): void => {
    setItemVisible(!opened);
    setRotateState(!opened);
  };

  useEffect((): void => {
    if (bodyMounted) {
      dropDownAnimValue.setValue(opened ? layoutHeight : 0);
    }
  }, [bodyMounted]);

  useEffect((): void => {
    if (bodyHeight === layoutHeight) {
      Animated.timing(dropDownAnimValue, {
        toValue: 0,
        duration: animDuration || 300,
        useNativeDriver: true,
        delay: 10,
      }).start();
    }
  }, [bodyHeight]);

  useEffect((): void => {
    if (shouldAnimate) {
      if (!opened) {
        setBodyHeight(layoutHeight);
        return;
      }

      Animated.timing(dropDownAnimValue, {
        toValue: 1,
        duration: animDuration || 300,
        useNativeDriver: true,
      }).start(() => {
        setBodyHeight(0);
      });
    } else {
      const targetValue = opened ? 1 : 0;
      dropDownAnimValue.setValue(targetValue);
    }
  }, [opened]);

  useEffect(() => {
    const targetValue = opened ? 0 : 1;
    Animated.timing(rotateAnimValue, {
      toValue: targetValue,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [rotateState]);

  return (
    <Container
      style={accordionItemStyle}
    >
      <TitleContainer
        testID={`title_${testID}`}
        onPress={handleAnimState}
        activeOpacity={activeOpacity}
        style={titleStyle}
      >
        {datum.title.leftElement && datum.title.leftElement}
        {datum.title.name}
        {datum.title.rightElement ? (
          datum.title.rightElement
        ) : (
          <Animated.View
            style={{
              position: 'absolute',
              right: 20,
              transform: [
                {
                  rotate: rotateAnimValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}>
            {toggleElement || null}
          </Animated.View>
        )}
      </TitleContainer>
      <Animated.View
        testID={`body_${testID}`}
        style={{
          height: !bodyMounted
            ? undefined
            : bodyHeight,
          transform: [
            {
              translateY: dropDownAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -bodyHeight],
              }),
            },
          ],
        }}
        onLayout={handleBodyLayout}
      >
        {datum.bodies.map((body, bodyKey) => {
          return (
            <StyledItem key={bodyKey} style={bodyStyle}>
              {body.leftElement && body.leftElement}
              {body.name}
              {body.rightElement && body.rightElement}
            </StyledItem>
          );
        })}
      </Animated.View>
    </Container>
  );
};

export default AccordionItem;
