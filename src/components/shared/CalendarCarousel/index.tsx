import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

interface Props {}

function Item(props: Props) {
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
