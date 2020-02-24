import React, { useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Snackbar, { SnackbarRef } from '../shared/Snackbar';

function Page(): React.ReactElement {
  const snackbar = useRef<SnackbarRef>(null);
  const onPress = (): void => {
    snackbar.current && snackbar.current.show({
      text: 'Simple Snackbar is opened',
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, padding: 10 }}>
          <Text>Show Snackbar</Text>
        </TouchableOpacity>
        <Snackbar ref={snackbar}/>
      </View>
    </SafeAreaView>
  );
}

export default Page;
