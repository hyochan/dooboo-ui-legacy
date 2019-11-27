import {
  Animated,
  InteractionManager,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  underline: {
    width: '100%',
    height: 1,
    position: 'absolute',
    top: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentChild: {
    padding: 12,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  contentTxt: {
    color: 'black',
    marginLeft: 8,
    fontSize: 12,
  },
  contentFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
  },
});

interface Props {
  contentVisibleOnLoad?: boolean;
  backgroundColor?: string;
  titleBackground?: string;
  contentBackground?: string;
  underlineColor?: string;
  visibleElement?: ReactElement;
  invisibleElement?: ReactElement;
  header: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  children: React.ReactElement;
}

function Accordion(props: Props): React.ReactElement {
  const [animatedValue, setAnimatedValue] = useState<Animated.Value | null>(
    null,
  );
  const [isMounted, setMounted] = useState<boolean>(false);
  const [isContentVisible, setContentVisible] = useState<boolean>(
    !!props.contentVisibleOnLoad,
  );
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const runAnimation = (): void => {
    const initialValue = isContentVisible
      ? headerHeight + contentHeight
      : headerHeight;
    const finalValue = isContentVisible
      ? headerHeight
      : contentHeight + headerHeight;

    setContentVisible(!isContentVisible);

    if (animatedValue) {
      animatedValue.setValue(initialValue);
      Animated.spring(animatedValue, {
        toValue: finalValue,
      }).start();
    }
  };

  const onAnimLayout = (evt: LayoutChangeEvent): void => {
    const headerHeight = evt.nativeEvent.layout.height;
    if (!isMounted && !props.contentVisibleOnLoad) {
      setAnimatedValue(new Animated.Value(headerHeight));
      setMounted(true);
      setHeaderHeight(headerHeight);
      return;
    } else if (!isMounted) {
      InteractionManager.runAfterInteractions(() => {
        setAnimatedValue(new Animated.Value(headerHeight + contentHeight));
      });
    }
    setMounted(true);
    setHeaderHeight(headerHeight);
  };

  const onLayout = (evt: LayoutChangeEvent): void => {
    const contentHeight = evt.nativeEvent.layout.height;
    setContentHeight(contentHeight);
  };

  const onPress = (): void => {
    runAnimation();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: animatedValue,
          backgroundColor: props.backgroundColor,
        },
        props.style,
      ]}
    >
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View onLayout={onAnimLayout}>
          {props.header}
          {isContentVisible ? props.visibleElement : props.invisibleElement}
        </View>
      </TouchableOpacity>
      <View style={styles.content} onLayout={onLayout}>
        <View style={[styles.contentChild]}>{props.children}</View>
      </View>
    </Animated.View>
  );
}

Accordion.defaultProps = {
  contentVisible: false,
  backgroundColor: 'transparent',
  titleBackground: 'transparent',
  contentBackground: 'transparent',
  underlineColor: '#d3d3d3',
  visibleElement: null,
  invisibleElement: null,
};

export default Accordion;
