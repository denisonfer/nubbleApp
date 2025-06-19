import { Box, Icon, Input, ProfileUser, Screen } from '@components';
import { TUser, useUserSearch } from '@domains';
import { useAppDebounce } from '@hooks';

import { TAppScreenProps } from '@routes';
import { useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

export function SearchScreen({}: TAppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');
  const debouncedSearch = useAppDebounce(search, 500);

  const { list: userList } = useUserSearch(debouncedSearch);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TUser>) => {
      return (
        <Box mb="spc16">
          <ProfileUser user={item} />
        </Box>
      );
    },
    [userList],
  );

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
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={userList}
        renderItem={renderItem}
      />
    </Screen>
  );
}
