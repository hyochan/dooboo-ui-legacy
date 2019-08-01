import React, { Component, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  InteractionManager,
  Platform,
  Dimensions,
  Animated,
  ViewPropTypes,
  ImageSourcePropType,
} from 'react-native';
import PropTypes from 'prop-types';

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

function DropdownItem(props) {
  const [animatedValue, setAnimatedValue] = useState(null);
  const [isMounted, setMounted] = useState(false);
  const [isContentVisible, setContentVisible] =
    useState(!!props.contentVisible);
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

    animatedValue.setValue(initialValue);
    Animated.spring(
      animatedValue,
      {
        toValue: finalValue,
      },
    ).start();
  };

  const onAnimLayout = (evt) => {
    const headerHeight = evt.nativeEvent.layout.height;
    if (!isMounted && !props.contentVisible) {
      setAnimatedValue(new Animated.Value(headerHeight));
      setMounted(true);
      setHeaderHeight(headerHeight);
      return;
    } else if (!isMounted) {
      InteractionManager.runAfterInteractions(() => {
        setAnimatedValue(new Animated.Value(
          headerHeight + contentHeight,
        ));
      });
    }
    setMounted(true);
    setHeaderHeight(headerHeight);
  };

  const onLayout = (evt) => {
    const contentHeight = evt.nativeEvent.layout.height;
    setContentHeight(contentHeight);
  };

  const onPress = () => {
    runAnimation();
  };

  return (
    <Animated.View style={[
      styles.container,
      {
        height: animatedValue,
        backgroundColor: props.backgroundColor,
      },
      props.style,
    ]}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
      >
        <View
          onLayout={ onAnimLayout }
        >
          { props.header }
          <Image source={
            isContentVisible
              ? props.visibleImage
              : props.invisibleImage
          } style={styles.icons}/>
        </View>
      </TouchableOpacity>
      <View
        style={styles.content}
        onLayout={onLayout}
      >
        <View
          style={[
            styles.contentChild,
          ]}
        >
          { props.children }
        </View>
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

DropdownItem.propTypes = {
  contentVisible: PropTypes.bool,
  backgroundColor: PropTypes.string,
  titleBackground: PropTypes.string,
  contentBackground: PropTypes.string,
  underlineColor: PropTypes.string,
  visibleImage: PropTypes.any,
  invisibleImage: PropTypes.any,
  header: PropTypes.element.isRequired,
  style: ViewPropTypes.style,
  children: PropTypes.element,
};

export default DropdownItem;
