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
import React, { ReactElement, useEffect, useState } from 'react';

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

interface ContentVisibleState {
  isContentVisible: boolean;
  currentAnimation: AnimationType;
}

enum AnimationType {
  showContent = 'showContent',
  hideContent = 'hideContent',
  null = 'null',
}

let lastContentVisibleState: ContentVisibleState;

function Accordion(props: Props): React.ReactElement {
  const [animatedValue, setAnimatedValue] = useState<Animated.Value | null>(
    null,
  );
  const [isMounted, setMounted] = useState<{header: boolean; content: boolean}>({ header: false, content: false });
  const [contentVisibleState, setContentVisibleState] = useState<ContentVisibleState>(
    {
      isContentVisible: !!props.contentVisibleOnLoad,
      currentAnimation: AnimationType.null,
    },
  );
  const { isContentVisible, currentAnimation } = contentVisibleState;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const runAnimation = (): void => {
    const targetAnimation = currentAnimation === AnimationType.null
      ? (isContentVisible
        ? AnimationType.hideContent
        : AnimationType.showContent)
      : (currentAnimation === AnimationType.hideContent
        ? AnimationType.showContent
        : AnimationType.hideContent);
    lastContentVisibleState = {
      isContentVisible: isContentVisible,
      currentAnimation: targetAnimation,
    };
    setContentVisibleState(lastContentVisibleState);
  };

  useEffect(() => {
    if (currentAnimation === AnimationType.null) return;
    const isCollapsing = currentAnimation === AnimationType.hideContent;
    const initialValue = isCollapsing
      ? headerHeight + contentHeight
      : headerHeight;
    const finalValue = isCollapsing
      ? headerHeight
      : contentHeight + headerHeight;

    if (animatedValue) {
      animatedValue.setValue(initialValue);
      Animated.spring(animatedValue, {
        toValue: finalValue,
      }).start(() => {
        if (lastContentVisibleState === contentVisibleState) {
          setContentVisibleState({
            isContentVisible: !isCollapsing,
            currentAnimation: AnimationType.null,
          });
        }
      });
    }
  }, [contentVisibleState]);

  const onAnimLayout = (evt: LayoutChangeEvent): void => {
    if (isMounted.header && currentAnimation !== AnimationType.null) return;
    const headerHeight = evt.nativeEvent.layout.height;
    if (!isMounted.header && !props.contentVisibleOnLoad) {
      setAnimatedValue(new Animated.Value(headerHeight));
      setMounted({ ...isMounted, header: true });
      setHeaderHeight(headerHeight);
      return;
    } else if (!isMounted.header) {
      InteractionManager.runAfterInteractions(() => {
        setAnimatedValue(new Animated.Value(headerHeight + contentHeight));
      });
    }
    setMounted({ ...isMounted, header: true });
    setHeaderHeight(headerHeight);
  };

  const onLayout = (evt: LayoutChangeEvent): void => {
    if (isMounted.content && (
      !isContentVisible || currentAnimation !== AnimationType.null
    )) return;
    const contentHeight = evt.nativeEvent.layout.height;
    setContentHeight(contentHeight);
    setMounted({ ...isMounted, content: true });
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
      <TouchableOpacity activeOpacity={0.5} onPress={runAnimation}>
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
