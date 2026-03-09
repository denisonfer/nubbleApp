import React from 'react';

import { useSearchHistoryServices, useToastServices } from '@services';

import { Button, Screen, Separator } from '@components';

import { useAuthLogout } from '@domains';
import { TAppScreenProps } from '@routes';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { MenuItem, TMenuItemProps } from './components/MenuItem';

export function SettingsScreen({
  navigation,
}: TAppScreenProps<'SettingsScreen'>) {
  const { showToast } = useToastServices();
  const { clearUsersSearchHistory } = useSearchHistoryServices();

  const { mutate, isLoading } = useAuthLogout({
    onSuccess: () => {
      clearUsersSearchHistory();
    },
    onError: () => {
      showToast({
        type: 'error',
        message: 'Erro ao sair da conta',
        position: 'top',
      });
    },
  });

  const menuItems = [
    {
      label: 'Termos de uso',
      onPress: () => {},
    },
    {
      label: 'Política de privacidade',
      onPress: () => {},
    },
    {
      label: 'Modo escuro',
      onPress: () => {
        navigation.navigate('DarkModeScreen');
      },
    },
  ];

  const renderItem = ({ item }: ListRenderItemInfo<TMenuItemProps>) => (
    <MenuItem key={item.label} label={item.label} onPress={item.onPress} />
  );

  return (
    <Screen canGoBack paddingHorizontal="spc24" title="Configurações" flex={1}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.label}
        ItemSeparatorComponent={Separator}
        bounces={false}
        ListFooterComponent={() => (
          <Button
            title="Sair da conta"
            isLoading={isLoading}
            onPress={() => mutate()}
            mt="spc48"
          />
        )}
      />
    </Screen>
  );
}
