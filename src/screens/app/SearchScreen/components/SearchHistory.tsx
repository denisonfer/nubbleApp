import { Box, Button, Icon, ProfileUser, Text } from '@components';
import { TUser } from '@domains';
import { useSearchHistory, useSearchHistoryServices } from '@services';
import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

export function SearchHistory() {
  const usersSearchHistory = useSearchHistory();
  const { removeFromUsersSearchHistory, clearUsersSearchHistory } =
    useSearchHistoryServices();

  const headerComponent = () => {
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="spc16">
        <Text preset="headingMedium">Buscas recentes</Text>
        {usersSearchHistory.length > 0 && (
          <Button
            preset="text"
            onPress={() => {
              clearUsersSearchHistory();
            }}
            title="Limpar buscas"></Button>
        )}
      </Box>
    );
  };

  const renderItem = useCallback(({ item }: ListRenderItemInfo<TUser>) => {
    return (
      <Box
        mb="spc16"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <ProfileUser user={item} avatarSize={48} />
        <Icon
          name="trash"
          color="gray3"
          onPress={() => {
            removeFromUsersSearchHistory(item.id);
          }}
        />
      </Box>
    );
  }, []);

  return (
    <Box>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={usersSearchHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Box>
  );
}
