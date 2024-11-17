import React from 'react';
import { SafeAreaView } from 'react-native';

import { ThemeProvider } from '@shopify/restyle';
import { Box } from './src/components/Box/Box';
import { Button } from './src/components/Button';
import { Icon } from './src/components/Icon';
import { Input } from './src/components/Input/Input';
import { Text } from './src/components/Text';
import { theme } from './src/theme/theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Box paddingHorizontal="spc24">
          <Text preset="headingLarge" mb="spc8">
            Olá!
          </Text>
          <Text preset="paragraphLarge" mb="spc40">
            Digite seu e-mail e senha para entrar{' '}
          </Text>

          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            boxProps={{ mb: 'spc20' }}
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            RightComponent={<Icon name="eyeOff" color="gray2" />}
            boxProps={{ mb: 'spc10' }}
          />
          <Text preset="paragraphSmall" bold color="primary">
            Esqueci minha senha
          </Text>

          <Button mt="spc48" title="Entrar" />
          <Button preset="outline" mt="spc12" title="Criar uma conta" />
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
