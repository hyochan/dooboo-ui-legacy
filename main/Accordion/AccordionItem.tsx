import {
  Animated,
  Easing,
  LayoutChangeEvent,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';

import { Datum } from './index';
import styled from 'styled-components/native';

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  height: 50px;
  z-index: 10;
`;

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
`;

const StyledTitle = styled.Text`
  font-weight: bold;
  color: #ffffff;
`;

const StyledItem = styled.Text`
  font-weight: bold;
`;

type toggleIndicatorType = React.ReactElement | undefined;

interface TranslateYType {
  translateY: Animated.Value;
}
interface Props {
  testID: string;
  datum: Datum;
  shouldAnimate?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  dropDownAnimValueList: Animated.Value;
  sumOfPrecedingTranslateY: TranslateYType[];
  renderCustomTitle?: (item: string) => React.ReactElement;
  renderCustomBody?: (item: string) => React.ReactElement;
  customTitleStyle?: ViewStyle;
  customBodyStyle?: ViewStyle;
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
    dropDownAnimValueList,
    sumOfPrecedingTranslateY,
    renderCustomTitle,
    renderCustomBody,
    customTitleStyle,
    customBodyStyle,
  } = props;

  const rotateAnimValue = useRef(new Animated.Value(0)).current;

  const [opened, setItemVisible] = useState<boolean>(collapseOnStart);
  const [rotateState, setRotateState] = useState<boolean>(true);
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

  const renderDefaultTitle = (title: string): React.ReactElement => {
    return (
      <StyledTitle>
        {title}
      </StyledTitle>
    );
  };

  const renderDefaultBody = (body: string): React.ReactElement => {
    return (
      <StyledItem>
        {body}
      </StyledItem>
    );
  };

  const renderIndicator = (toggleElement: toggleIndicatorType): React.ReactElement => {
    return (
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
    );
  };

  useEffect((): void => {
    if (bodyMounted) {
      dropDownAnimValueList.setValue(opened ? -layoutHeight : 0);
    }
  }, [bodyMounted]);

  useEffect((): void => {
    if (shouldAnimate) {
      if (!opened) {
        Animated.timing(dropDownAnimValueList, {
          toValue: 0,
          duration: animDuration || 300,
          useNativeDriver: true,
        }).start();
        return;
      }

      Animated.timing(dropDownAnimValueList, {
        toValue: -bodyHeight,
        duration: animDuration || 300,
        useNativeDriver: true,
      }).start();
    } else {
      const targetValue = opened ? -bodyHeight : 0;
      dropDownAnimValueList.setValue(targetValue);
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
    <Animated.View
      style={[
        {
          backgroundColor: 'transparent',
          overflow: 'hidden',
          width: 300,
          transform: sumOfPrecedingTranslateY,
        },
      ]}
    >
      <TitleContainer
        testID={`title_${testID}`}
        onPress={handleAnimState}
        activeOpacity={activeOpacity}
        style={customTitleStyle}
      >
        {
          renderCustomTitle
            ? renderCustomTitle(datum.title)
            : renderDefaultTitle(datum.title)
        }
        {renderIndicator(toggleElement)}
      </TitleContainer>

      <Animated.View
        testID={`body_${testID}`}
        style={{
          height: !bodyMounted
            ? undefined
            : bodyHeight,
          transform: [
            {
              translateY: dropDownAnimValueList,
            },
          ],
        }}
        onLayout={handleBodyLayout}
      >
        {
          datum.bodies.map((body, key) => {
            return (
              <ItemContainer
                key={key}
                style={customBodyStyle}
              >
                {
                  renderCustomBody
                    ? renderCustomBody(body)
                    : renderDefaultBody(body)
                }
              </ItemContainer>
            );
          })
        }
      </Animated.View>
    </Animated.View>
  );
};

export default AccordionItem;
