import React, { useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Snackbar, { SnackbarProvider, SnackbarRef, useSnackbarContext } from '../shared/Snackbar';

function Container(): React.ReactElement {
  const snackbar = useSnackbarContext();
  const onPress = (): void => {
    snackbar.show({
      text: 'Simple Snackbar is opened',
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

export default Provider;
