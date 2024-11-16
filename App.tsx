import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { ThemeProvider } from '@shopify/restyle';
import { Button } from './src/components/Button';
import { Text } from './src/components/Text';
import { theme } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar />

        <Text preset="headingLarge">Nubble App</Text>
        <Button title="Button" />
        <Button title="Button" isDisabled />
        <Button title="Outline" preset="outline" />
        <Button title="Outline" preset="outline" isDisabled />
        <Button title="Loading" isLoading />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
