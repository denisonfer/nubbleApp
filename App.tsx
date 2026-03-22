import React from 'react';

import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './reactotron';

import { Toast } from '@components';
import { useAppColorScheme } from '@hooks';
import { Routes } from '@routes';

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./reactotron');
}

const queryClient = new QueryClient();

function App() {
  const themeScheme = useAppColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider theme={themeScheme}>
          <Routes />
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
