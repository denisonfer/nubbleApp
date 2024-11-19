import React from 'react';

import { Routes } from '@routes';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from '@theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (__DEV__) {
  require('./src/reactotron');
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
