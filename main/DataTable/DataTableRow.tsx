import React, { ReactElement, ReactNode } from 'react';
import { StyleSheet, StyleProp, View, ViewStyle, TouchableOpacity } from 'react-native';

interface Props {
  children: React.ReactNode;
  isChecked?: boolean;
  style?: StyleProp<ViewStyle>;
};


function DataTableRow(props: Props): ReactElement {

  const { isChecked, style, ...rest } = props;
  return (
    <View testID='table-row-test-id'
      {...rest}
      style={[styles.container, style, isChecked && styles.isChecked]}
    >
      <View style={styles.content}>
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderStyle: 'solid',
  },
  content: {
    height: 48,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  isChecked: {
    backgroundColor: '#f2f9ff'
  }
});

export default DataTableRow;
