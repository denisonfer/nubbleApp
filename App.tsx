import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Toast } from '@components';
import { Routes } from '@routes';
import { theme } from '@theme';

import './reactotron';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Routes />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
