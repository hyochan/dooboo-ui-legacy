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
  },
});

function Item(props) {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

Item.defaultProps = {

};

Item.propTypes = {

};

export default Item;
