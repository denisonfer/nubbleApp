import { Icon, Input, Screen, Text } from '@components';

import { TAppScreenProps } from '@routes';
import { useState } from 'react';

export function SearchScreen({}: TAppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');

  return (
    <Screen
      canGoBack
      HeaderComponent={
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Pesquisar"
          LeftComponent={<Icon name="search" color="gray3" />}
        />
      }
      paddingHorizontal="spc24">
      <Text>Search Screen</Text>
    </Screen>
  );
}
