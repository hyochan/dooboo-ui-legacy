import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SwitchNavigator from './components/navigation/SwitchNavigator';

const App = (): React.ReactElement => {
  return (
    <SafeAreaProvider>
      <SwitchNavigator />
    </SafeAreaProvider>
  );
};

export default App;
