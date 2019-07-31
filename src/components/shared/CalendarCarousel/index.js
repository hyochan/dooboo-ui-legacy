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
} from 'react-native';
import PropTypes from 'prop-types';

function Item(props) {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Item;
