import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { ThemeProvider } from '@shopify/restyle';
import { Button } from './src/components/Button';
import { Icon } from './src/components/Icon';
import { Text } from './src/components/Text';
import { theme } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <StatusBar />

        <Text preset="headingLarge">Nubble App - Buttons</Text>
        <Button title="Button" />
        <Button title="Button" isDisabled />
        <Button title="Outline" preset="outline" />
        <Button title="Outline" preset="outline" isDisabled />
        <Button title="Loading" isLoading />
        <Text preset="headingLarge">Nubble App - Icons</Text>
        <Icon name="eyeOn" color="redError" size={50} />
        <Icon name="eyeOff" color="greenSuccess" size={50} />
        <Icon name="flashOn" color="gray4" size={50} />
        <Icon name="flashOff" color="buttonPrimary" size={50} />
        <Icon name="bell" color="buttonPrimary" size={50} />
        <Icon name="bellOn" color="errorLight" size={50} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
