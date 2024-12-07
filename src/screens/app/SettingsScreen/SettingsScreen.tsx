import React from 'react';

import { useToastServices } from '@services';

import { Button, Screen } from '@components';

import { useAuthLogout } from '@domains';

export function SettingsScreen() {
  const { showToast } = useToastServices();
  const { mutate, isLoading } = useAuthLogout({
    onError: () => {
      showToast({
        type: 'error',
        message: 'Erro ao sair da conta',
        position: 'top',
      });
    },
  });

  return (
    <Screen canGoBack paddingHorizontal="spc24" title="Configurações">
      <Button
        title="Sair da conta"
        isLoading={isLoading}
        onPress={() => mutate()}
      />
    </Screen>
  );
}
