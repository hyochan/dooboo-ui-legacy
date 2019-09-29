import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function Item(props: {}) {
  return (
    <View style={styles.container}>
      <Text>Calendar</Text>
    </View>
  );
}

export default Item;
