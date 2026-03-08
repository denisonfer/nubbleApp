import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './reactotron';

import { Toast } from '@components';
import { Routes } from '@routes';
import { theme } from '@theme';

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./reactotron');
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Routes />
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
