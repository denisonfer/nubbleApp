import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/routes/Routes';
import { theme } from './src/theme/theme';

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
