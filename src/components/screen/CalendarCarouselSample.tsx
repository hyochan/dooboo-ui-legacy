import { Text, View } from 'react-native';

import React from 'react';

function Page(): React.ReactElement {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        testID='myText'
        style={{
          fontSize: 16,
          color: 'blue',
        }}
      >
        dooboolab
      </Text>
    </View>
  );
}

export default Page;
