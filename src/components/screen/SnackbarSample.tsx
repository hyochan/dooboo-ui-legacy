import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { SnackbarProvider, useSnackbarContext } from '../../../package/Snackbar';

import React from 'react';

function Container(): React.ReactElement {
  const snackbar = useSnackbarContext();
  const onPress = (): void => {
    snackbar.show({
      text: 'Simple Snackbar is opened',
      actionText: 'Some action',
      onPressAction: () => Alert.alert('Some action occurs!!'),
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, padding: 10 }}>
          <Text>Show Snackbar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Provider(): React.ReactElement {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SnackbarProvider>
        <Container/>
      </SnackbarProvider>
    </SafeAreaView>
  );
}

export default Provider;
