import { Icon, Input, Screen, Text } from '@components';
import { useUserSearch } from '@domains';
import { useAppDebounce } from '@hooks';

import { TAppScreenProps } from '@routes';
import { useState } from 'react';

export function SearchScreen({}: TAppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useAppDebounce(search, 500);

  const { list: userList, isLoading } = useUserSearch(debouncedSearch);

  return (
    <Screen
      canGoBack
      HeaderComponent={
        <Input
          placeholder="Digite sua busca"
          value={search}
          onChangeText={setSearch}
          LeftComponent={<Icon name="search" color="gray3" />}
          boxProps={{ flex: 1 }}
        />
      }
      paddingHorizontal="spc24">
      <Text>Search Screen</Text>
      {isLoading && <Text>Loading...</Text>}
      {userList &&
        userList.map(user => <Text key={user.id}>{user.userName}</Text>)}
    </Screen>
  );
}
