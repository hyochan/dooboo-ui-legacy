import * as React from 'react';

import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof TouchableWithoutFeedback> & {
  children?: React.ReactNode;
  numberOfLines?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const StyledText = styled.Text`
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  align-items: center;
  text-align: center;
`;

function TableTitle(props: Props): React.ReactElement {
  const { children, onPress, style, numberOfLines, ...rest } = props;

  return (
    <TouchableWithoutFeedback
      disabled={!onPress}
      onPress={onPress}
      {...rest}
      testID="table-title-test-id">
      <View style={[styles.container, style]}>
        <StyledText numberOfLines={numberOfLines}>{children}</StyledText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 12,
  },
});

export default TableTitle;
