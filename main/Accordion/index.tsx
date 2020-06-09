import { Animated, LayoutChangeEvent, View } from 'react-native';
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableWithoutFeedback`
  width: 100%;
`;
const HeaderContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
`;
const ContentContainer = styled(Container)``;

interface Props {
  contentVisible?: boolean;
  header: ReactElement;
  children: ReactElement;
  visibleElement?: ReactElement;
  invisibleElement?: ReactElement;
  isAnimated?: boolean;
}

type EVProps = {
  value: number;
  mounted: boolean;
};

const Accordion: FC<Props> = (props) => {
  const animValue = useRef(new Animated.Value(1000)).current;

  const [visible, setVisible] = useState<boolean | undefined>(
    props.contentVisible,
  );

  const [header, setHeader] = useState<EVProps>({
    value: 0,
    mounted: false,
  });
  const [content, setContent] = useState<EVProps>({
    value: 0,
    mounted: false,
  });

  const handleHeaderLayout = (e: LayoutChangeEvent): void => {
    if (header.mounted) return;
    const { height } = e.nativeEvent.layout;
    setHeader({ value: height, mounted: true });
  };
  const handleContentLayout = (e: LayoutChangeEvent): void => {
    if (content.mounted) return;
    const { height } = e.nativeEvent.layout;
    setContent({ value: height, mounted: true });
  };

  const handlePress = (): void => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (header.mounted && content.mounted) {
      animValue.setValue(visible ? header.value + content.value : header.value);
    }
  }, [header.mounted, content.mounted]);

  useEffect(() => {
    const targetValue = visible ? header.value + content.value : header.value;

    if (props.isAnimated) {
      Animated.spring(animValue, {
        toValue: targetValue,
        tension: 0,
      }).start();
    } else {
      animValue.setValue(targetValue);
    }
  }, [visible]);

  return (
    <Animated.View
      style={{
        height: animValue,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}>
      <HeaderContainer onLayout={handleHeaderLayout} onPress={handlePress}>
        <View>
          {props.header}
          {visible ? props.visibleElement : props.invisibleElement}
        </View>
      </HeaderContainer>
      <ContentContainer onLayout={handleContentLayout}>
        {props.children}
      </ContentContainer>
    </Animated.View>
  );
};
export default Accordion;
