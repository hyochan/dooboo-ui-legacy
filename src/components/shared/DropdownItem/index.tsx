import {
  Animated,
  Image,
  ImageSourcePropType,
  InteractionManager,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  icons: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 16,
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
  contentVisible?: boolean;
  backgroundColor?: string;
  titleBackground?: string;
  contentBackground?: string;
  underlineColor?: string;
  visibleImage?: ImageSourcePropType | any;
  invisibleImage?: ImageSourcePropType | any;
  header: React.ReactElement;
  style?: ViewStyle;
  children: React.ReactElement;
}

function DropdownItem(props: Props) {
  const [animatedValue, setAnimatedValue] = useState<Animated.Value | null>(
    null,
  );
  const [isMounted, setMounted] = useState<boolean>(false);
  const [isContentVisible, setContentVisible] = useState<boolean>(
    !!props.contentVisible,
  );
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const runAnimation = () => {
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

  const onAnimLayout = (evt: LayoutChangeEvent) => {
    const headerHeight = evt.nativeEvent.layout.height;
    if (!isMounted && !props.contentVisible) {
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

  const onLayout = (evt: LayoutChangeEvent) => {
    const contentHeight = evt.nativeEvent.layout.height;
    setContentHeight(contentHeight);
  };

  const onPress = () => {
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
          <Image
            source={
              isContentVisible ? props.visibleImage : props.invisibleImage
            }
            style={styles.icons}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.content} onLayout={onLayout}>
        <View style={[styles.contentChild]}>{props.children}</View>
      </View>
    </Animated.View>
  );
}

DropdownItem.defaultProps = {
  contentVisible: false,
  backgroundColor: 'transparent',
  titleBackground: 'transparent',
  contentBackground: 'transparent',
  underlineColor: '#d3d3d3',
  visibleImage: false,
  invisibleImage: false,
};

export default DropdownItem;
